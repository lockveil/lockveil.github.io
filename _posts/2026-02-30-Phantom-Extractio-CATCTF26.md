---
title: "Phantom Extraction - CAT CTF 2026 Writeup"
date: 2026-02-30 00:00:00 +0200
categories: [Security Challenge Writeups, CTF]
tags: ["cat-reloaded", "2026", "entry-level", "wireshark", "dns-tunneling", "elf", "xor", "cyberchef", "network-forensics", "reverse-engineering"]
description: 
last_modified_at: 2026-02-1 00:00:00 +0200
image:
  path: https://github.com/user-attachments/assets/da115cf4-58ef-41fc-9975-cea271fc223b
---

# Phantom Extraction

> "I know that a rev guy created this challenge, I just can't prove it"

**Category:** Forensics / Network  
**Tools:** Wireshark, CyberChef

---

## First Look

We get a `traffic.pcap` file. Opening it in Wireshark, three protocol types show up immediately:

- **ICMP** — 421 packets, all with the payload `ping_noise`
- **UDP** — 478 packets with random-looking binary data
- **DNS** — 541 packets, all querying subdomains of `tunnel.local`

The ICMP and UDP traffic is an obvious decoy. Everything has `ping_noise` as the payload or looks like random garbage — it's clearly crafted noise meant to distract. The DNS traffic is where things get interesting.

---

## Spotting the Tunnel

Filtering with:

```
dns && dns.flags.response == 0 && ip.src == 192.168.1.50
```

Every single DNS query follows the same pattern:

```
0.53454c4602010100...tunnel.local
1.00004000000000...tunnel.local
2.1f001e0006000000...tunnel.local

```
<img width="1374" height="901" alt="image" src="https://github.com/user-attachments/assets/d7c230a8-f9f5-423f-bbb1-c8ebf66d21d4" />

The structure is: `[index].[hex_data].tunnel.local`

541 queries, each carrying 60 hex characters as a subdomain, sent in order from index 0 to 540. This is DNS tunneling — encoding binary data inside DNS queries to exfiltrate it through a firewall. DNS is almost never blocked, which makes it a stealthy exfiltration channel.

---

## Reassembling the Data

In CyberChef, I used the exported CSV from Wireshark with this recipe:

1. **Regular Expression** — extract the hex chunks:
   ```
   (?<=\d\.)[0-9a-f]{60}(?=\.tunnel)
   ```
   <img width="1301" height="568" alt="image" src="https://github.com/user-attachments/assets/36ba7023-61a1-46ed-9051-912db6899367" />

   Output: List matches

2. **Find / Replace** — merge all lines into one continuous hex string:
   - Find: `\n` (Regex ON)
   - Replace: *(empty)*

3. **From Hex**

Output: a **16,216 byte binary blob**.

---

## Identifying the Binary

The first four bytes of the output are `53 45 4C 46` — which in ASCII reads `SELF`.

That's not a coincidence. A real ELF binary starts with `7F 45 4C 46` (`\x7fELF`). The challenge author swapped the first byte from `0x7F` to `0x53` to obscure the file type. This is what the challenge description was hinting at — *"I know that a rev guy created this"* — it's an ELF binary, a reverse engineering artifact, hidden inside a network forensics challenge.

Fixed it in CyberChef with **Find / Replace**:
- Find: `\x53\x45\x4c\x46` (at position 0)
- Replace: `\x7f\x45\x4c\x46`

Now it's a valid 64-bit x86-64 Linux ELF (shared object, compiled with GCC on Ubuntu 13.3.0).

---

## Static Analysis

Added a **Strings** operation (minimum length 6) and scrolled through the output. Two things stood out immediately:

**The source filename:**
```
print_flag.c
```
This tells us exactly what the binary does — it prints a flag. And based on the filename it probably does it through some kind of encoding or encryption.

**The XOR key:**
```
<img width="1913" height="615" alt="image" src="https://github.com/user-attachments/assets/5d5d3937-29d7-436f-8156-367787bf23f0" />

my_super_long_key_that_is_definitely_longer_than_the_message_123456
```
A 67-character key sitting in the `.rodata` section. That's long on purpose — it's longer than the message it encrypts so every byte of the ciphertext gets XORed with a unique key byte (no key cycling).

---

## Finding the Ciphertext

Switched from **Strings** to **To Hex** in CyberChef and searched for the key in its hex representation:

```
6d795f737570657
```

*(That's just "my_super" in ASCII converted to hex — enough to locate it uniquely.)*

Right after the key ends there's a block of `00 00 00 00...` null padding, then 35 bytes of non-printable data, then `47 43 43 3a` which is `GCC:` in ASCII — the start of the compiler version string.

Those 35 bytes between the null padding and `GCC:` are the ciphertext:

```
2e380b350e450b416b07163154270d54152b065c15456f0746005413551b310d1a1611
```

The binary's job at runtime was simple: load the key, load these 35 bytes, XOR them together, and call `puts()` to print the result. We're just doing that step manually.

---

## Decryption

Fresh CyberChef tab:

**Input:**
```
2e380b350e450b416b07163154270d54152b065c15456f0746005413551b310d1a1611
```

**Recipe:**
1. From Hex
2. XOR
   - Key: `my_super_long_key_that_is_definitely_longer_than_the_message_123456`
   - Key format: UTF-8
   - Scheme: Standard

**Output:**
```
CATF{5n34ky_3xf1ltr4t10n5_0v3r_dns}
```

---

## Summary

The attack chain the challenge author built was actually pretty clever:

```
Flag (plaintext)
  └── XOR encrypted with a long key
        └── Stored in .rodata of an ELF binary
              └── ELF magic byte tampered (7f → 53)
                    └── Binary hex-encoded and split into 60-char chunks
                          └── Sent as indexed DNS subdomains to tunnel.local
                                └── Hidden inside a pcap with ICMP + UDP noise
```

Three disciplines in one challenge: network forensics to spot the DNS tunnel, data carving to reassemble the binary, and basic reverse engineering to extract and decrypt the flag. The hint in the description was pointing directly at the ELF the whole time.
