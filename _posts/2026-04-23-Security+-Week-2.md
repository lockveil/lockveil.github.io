---
layout: post
title: "L1 Week 2: Social Engineering, Malware, Cryptographic Concepts and Nmap Cheat Sheet"
date: 2026-04-23 00:00:00 +0200
categories: [Infosec Field Notes, Security+ SY0-601]
tags: ["security+", "sy0-601", "social-engineering", "malware", "cryptography", "phishing", "ransomware", "encryption"]
description: Covers social engineering attacks, malware classification, and foundational cryptographic concepts from the Security+ (SY0-601) course.
last_modified_at: 2026-04-23 00:00:00 +0200
image:
  path: https://github.com/user-attachments/assets/dfdb4a05-e773-4fcf-9134-d51fa1b50b1e
---

> **Playlist:** [Security+ Video Series (11–19)](https://www.youtube.com/watch?v=dyKg_bQOXfU&list=PLky4bd7_03m8o1NB0j96OsxZs0KcKlgMO&index=1)

---

## 1. Social Engineering

Social engineering exploits human psychology rather than technical vulnerabilities. It is often called **"hacking the human"** because it bypasses technical controls by targeting trust, authority, and urgency.

### 1.1 Core Techniques

| Technique | Description |
|---|---|
| **Impersonation** | Pretending to be someone else (e.g., IT support, a manager) to extract credentials or access. Most effective when identity cannot be easily verified. |
| **Shoulder Surfing** | Observing a target's screen or keyboard input to steal PINs, passwords, or sensitive data. Can be done remotely using binoculars or CCTV. |
| **Dumpster Diving** | Searching discarded documents, drives, or hardware for sensitive information. Countered by shredding and proper media disposal policies. |
| **Tailgating** | Entering a secured area by following an authorized person through a door — without their awareness. |
| **Piggybacking** | Like tailgating, but the authorized employee knowingly allows the attacker entry, bypassing the entry log. |
| **Lunchtime Attack** | Accessing an unattended, logged-in workstation. Mitigated by screen lock policies and user training. |
| **Identity Fraud** | Using another person's specific identity details to commit fraud (e.g., opening accounts, applying for loans). |
| **Identity Theft** | Stealing another person's real identity — distinct from fraud in that the victim's actual identity is taken, not just mimicked. |

> **Exam tip:** Know the difference between **tailgating** (unauthorized, without permission) and **piggybacking** (with the employee's knowledge/consent).

### 1.2 Phishing Variants

Phishing combines **social engineering** and **spoofing** to trick targets into revealing credentials or executing malicious payloads.

| Variant | Target | Vector |
|---|---|---|
| **Phishing** | General / mass audience | Email with malicious links or spoofed login pages |
| **Spear Phishing** | Specific individual | Personalized email using known details (name, job title, recent activity) |
| **Whaling** | C-level executives (CEO, CFO) | Highly tailored spear phishing; high value targets |
| **Vishing** | Anyone | Voice call or VoIP — harder for targets to refuse live requests |
| **Smishing** | Mobile users | SMS-based phishing |

**How a phishing site attack works:**
1. Attacker clones a trusted site (bank, webmail, SaaS app).
2. Target receives an email with a spoofed link pointing to the fake site.
3. Target authenticates on the fake site — credentials are captured.

### 1.3 Other Delivery Methods

- **Spam:** Mass email used to deliver phishing links, malicious attachments, or credential-harvesting campaigns. Attacker builds target lists from breached databases or marketing data.
- **Hoaxes:** Fake security alerts (pop-ups or emails) claiming virus infection, offering a "fix" that is actually a Trojan. Designed to create panic and prompt reckless action.

---

## 2. Malware

Malware (malicious software) is any code designed to cause harm, gain unauthorized access, or disrupt systems. The **vector** is how the malware executes and spreads.

### 2.1 Malware Classifications

| Type | Key Characteristic |
|---|---|
| **Virus** | Requires a host file; spreads when user executes infected code |
| **Worm** | Self-replicating; spreads across networks without user interaction |
| **Trojan** | Disguised as legitimate software; no replication, but delivers a payload |
| **PUP / Grayware** | Installed without clear consent; not automatically malicious |
| **Spyware** | Covert monitoring — keystrokes, screenshots, webcam/microphone |
| **Adware** | Browser hijacking, unsolicited ads; often bundled with free software |
| **Ransomware** | Locks files or system; demands payment for recovery |
| **Rootkit** | Operates at elevated privilege; hides its presence from the OS |
| **RAT** | Remote Access Trojan; gives attacker covert remote control |
| **Backdoor** | Persistent unauthorized access mechanism |
| **Botnet** | Network of compromised hosts controlled by a threat actor |

### 2.2 Viruses vs. Worms

**Viruses** must infect a host and require user action to execute (opening a file, running a macro, attaching a USB drive). Common virus types:

- **File infector (non-resident):** Attaches to executables; runs alongside the host process, then returns control.
- **Memory-resident:** Launches a persistent process in memory even after the host program closes.
- **Boot sector virus:** Infects the MBR or partition table; runs before the OS loads.
- **Macro / Script virus:** Abuses scripting environments — VBA in Office documents, JavaScript in PDFs, PowerShell, WMI.

**Worms** are memory-resident and self-propagating. They do not need a host file and can spread by exploiting network vulnerabilities without any user interaction.

| | Virus | Worm |
|---|---|---|
| **Requires host file** | Yes | No |
| **User action needed** | Yes | No |
| **Spreads via network** | Indirectly | Directly |
| **Primary behavior** | Infect & replicate | Replicate & consume bandwidth |

### 2.3 Spyware, Keyloggers & Adware

- **Spyware:** Records user activity — screenshots, microphone, webcam, application usage — and exfiltrates data covertly.
- **Keylogger:** A subcategory of spyware focused on capturing keystrokes to steal passwords, credit card numbers, and other sensitive input.
- **Adware:** A PUP/grayware class that reconfigures the browser (hijacks search engine, adds bookmarks, opens sponsor pages). Can arrive as a standalone install or a browser extension.

### 2.4 Backdoors, RATs & Botnets

**Backdoor:** Any mechanism that allows remote administrative access while bypassing normal authentication. Backdoors are not always malware-installed — they can also result from:
- Developer debug code left in production.
- Misconfigured services (e.g., default router credentials, unsecured RDP).
- Open modems accepting dial-up connections.

**Remote Access Trojan (RAT):** Malware that mimics legitimate remote control software but operates covertly. Once installed, it allows the attacker to:
- Browse and exfiltrate the file system.
- Upload and execute additional payloads.
- Use the host as a pivot point for further attacks.

**Botnet:**
- A compromised host can be loaded with one or more **bots** — automated scripts performing malicious tasks.
- Multiple bots under unified command form a **botnet**, controlled through a **C2 (Command and Control)** server.
- Botnet uses: DDoS attacks, spam campaigns, cryptomining, credential stuffing.

### 2.5 Rootkits

A **rootkit** is malware that achieves elevated (kernel-level) privilege on the system, allowing it to hide its presence from the operating system, antivirus tools, and administrators.

- The name derives from Unix/Linux: a process running as **root** has unrestricted access to the entire file system.
- On Windows, rootkits exploit privilege escalation vulnerabilities to gain **SYSTEM**-level access — above standard Administrator.
- Because they operate below the OS layer, rootkits can intercept and manipulate system calls, making detection difficult without specialized tools (offline scanning, hypervisor-based detection).

**How Trojans evade detection before privilege escalation:**
- Name executables to mimic system files (e.g., `run32d11.exe` instead of `rundll32.exe`).
- Register themselves as services or add registry persistence keys.

### 2.6 Ransomware & Crypto-Malware

**Ransomware** extorts victims by restricting access to their system or data.

Two main classes:

| Class | Behavior |
|---|---|
| **Locker ransomware** | Locks the desktop/shell interface; usually easier to remediate |
| **Crypto-malware** | Encrypts files on local, removable, and network drives using strong asymmetric encryption |

**Crypto-malware attack flow:**
1. Ransomware infects host (often via phishing attachment or drive-by download).
2. Malware enumerates and encrypts files — fixed drives, USB, mapped network shares.
3. Victim is presented with a ransom demand and countdown timer.
4. Attacker holds the private decryption key; without payment (usually in cryptocurrency), files are unrecoverable.
5. If the timer expires (as in **CryptoLocker**), the key is destroyed.

**Mitigation:** Offline, tested, and current backups are the only reliable defense. If encrypted backups exist or shares are mapped at time of infection, they will also be encrypted.

### 2.7 Malware Indicators

| Indicator Type | What to Look For |
|---|---|
| **Antivirus / EPP alerts** | Signature-based or behavioral detection from endpoint protection platforms |
| **Sandbox analysis** | Isolated execution environment records file, registry, and network activity; tools include Cuckoo Sandbox |
| **Resource consumption** | Unexplained CPU spikes, memory leaks, unusual disk I/O (common in cryptominers, DDoS bots) |
| **File system anomalies** | Unexpected files in `%TEMP%`, modified timestamps, new services or registry autorun entries |
| **Network behavior** | Unusual outbound connections, beaconing, large data transfers to unknown IPs |

> **Note:** Resource-based indicators are suggestive, not definitive. Poorly written malware or high-intensity malware (DDoS bots, ransomware) will show these symptoms more clearly.

---

## 3. Cryptographic Concepts

Cryptography is the practice of securing information by encoding it so that only authorized parties can read it. Unlike **security through obscurity** (hiding that a secret exists), cryptography allows the existence of the secret to be public — only the key must remain protected.

### 3.1 Core Terminology

| Term | Definition |
|---|---|
| **Plaintext / Cleartext** | Unencrypted, readable data |
| **Ciphertext** | Encrypted, unreadable data |
| **Cipher** | The algorithm used to encrypt and decrypt |
| **Key** | The secret value that controls the cipher's output |
| **Cryptanalysis** | The study of breaking cryptographic systems |
| **Digest / Hash** | Fixed-length output of a hash function |

**Standard characters in cryptography examples:**
- **Alice** — the sender
- **Bob** — the intended recipient
- **Mallory** — the malicious attacker

### 3.2 Hashing

A **hash function** takes an input of any length and produces a fixed-length output (digest). It is a **one-way function** — the original input cannot be recovered from the hash.

**Key properties of a secure hash function:**
- **Deterministic:** Same input always produces the same output.
- **One-way (preimage resistance):** Cannot reverse the digest back to plaintext.
- **Collision resistant:** Different inputs should not produce the same digest.
- **Avalanche effect:** A tiny change in input produces a completely different digest.

**Use cases:**
- **Password storage:** Passwords are stored as hashes; on login, the entered password is hashed and compared.
- **File integrity verification:** Hash a file before and after transfer; a mismatch indicates tampering.
- **Digital signatures:** Combined with asymmetric encryption to prove authenticity and integrity.

| Algorithm | Digest Size | Status |
|---|---|---|
| **MD5** | 128-bit | Weak — vulnerable to collision attacks; use only for legacy compatibility |
| **SHA-1** | 160-bit | Deprecated — collision demonstrated in 2017 |
| **SHA-256** | 256-bit | Recommended — part of the SHA-2 family |
| **SHA-3** | Variable (224–512-bit) | Newest standard; different internal design from SHA-2 |

> **Exam tip:** SHA-256 is the most commonly referenced secure hash on the Security+ exam. MD5 is referenced as weak/legacy.

### 3.3 Symmetric Encryption

In **symmetric encryption**, the same key is used for both encryption and decryption. Both parties must possess a copy of the secret key before any communication takes place.

**Characteristics:**

| Property | Detail |
|---|---|
| **Also called** | Single-key, private-key, or shared-secret encryption |
| **Speed** | Very fast; suitable for bulk data encryption |
| **Use case** | Encrypting large files, disk encryption, VPN data tunnels |
| **Weakness** | Secure key distribution — how do two parties share the key without it being intercepted? |
| **Cannot provide** | Authentication or non-repudiation (both parties know the same key) |

**Common symmetric algorithms:**

| Algorithm | Key Size | Notes |
|---|---|---|
| **AES** | 128, 192, 256-bit | Current standard; used in WPA2, TLS, disk encryption |
| **3DES** | 112 / 168-bit | Legacy; deprecated but still tested on Security+ |
| **DES** | 56-bit | Broken; do not use |
| **RC4** | Variable | Deprecated (used in old WEP/SSL) |

### 3.4 Asymmetric Encryption

**Asymmetric encryption** uses a mathematically linked **key pair**: a **public key** and a **private key**. What one key encrypts, only the other can decrypt.

**How it works for confidentiality:**
1. Bob generates a key pair and keeps the **private key** secret.
2. Bob publishes his **public key** freely.
3. Alice encrypts a message using Bob's public key.
4. Only Bob can decrypt it — using his private key.
5. Even if Mallory intercepts the ciphertext and the public key, he cannot decrypt the message.

**Characteristics:**

| Property | Detail |
|---|---|
| **Also called** | Public key cryptography |
| **Speed** | Significantly slower than symmetric encryption |
| **Use case** | Key exchange, digital signatures, authentication |
| **Advantage** | No need to share a secret key beforehand |
| **Can provide** | Confidentiality, authentication, non-repudiation |

**Symmetric vs. Asymmetric — Comparison:**

| | Symmetric | Asymmetric |
|---|---|---|
| **Keys** | One shared key | Key pair (public + private) |
| **Speed** | Fast | Slow |
| **Key distribution problem** | Yes | No |
| **Authentication** | No | Yes |
| **Use in TLS** | Bulk data encryption | Initial key exchange |

> **In practice (e.g., TLS/HTTPS):** Asymmetric encryption is used to securely exchange a symmetric session key. All bulk data is then encrypted with the faster symmetric key. This hybrid approach is called a **key encapsulation mechanism**.

### 3.5 Public Key Algorithms

| Algorithm | Type | Notes |
|---|---|---|
| **RSA** | Asymmetric | Based on difficulty of factoring large integers (trapdoor function); widely used |
| **ECC (Elliptic Curve Cryptography)** | Asymmetric | Based on elliptic curve discrete logarithm problem; smaller keys for equivalent security |
| **Diffie-Hellman (DH)** | Key exchange | Allows two parties to derive a shared secret over an insecure channel; not encryption itself |
| **DSA** | Digital signatures | Used for signing only, not encryption |

**ECC vs. RSA key size equivalence:**

| RSA Key Size | Equivalent ECC Key Size |
|---|---|
| 1024-bit | ~160-bit |
| 2048-bit | ~256-bit |
| 3072-bit | ~384-bit |

> ECC's smaller key sizes mean faster computation and lower power consumption — important for mobile and IoT devices.

---

## 4. Public Key Infrastructure (PKI)

PKI is the framework that makes public key cryptography trustworthy at scale — solving the core problem of *"how do I know this public key really belongs to who it claims to?"*

### 4.1 Public and Private Key Usage

Public key cryptography serves two distinct purposes:

| Goal | How it works |
|---|---|
| **Confidentiality** | Sender encrypts with the recipient's **public key**; only the recipient's **private key** can decrypt |
| **Authentication / Non-repudiation** | Sender signs with their **private key**; anyone with the **public key** can verify the signature |

The fundamental weakness: **you cannot inherently verify that a public key belongs to the claimed entity**. This opens the door to **man-in-the-middle (MITM)** attacks — an attacker intercepts communications and substitutes their own public key. PKI exists to close this gap.

### 4.2 Certificate Authorities

A **Certificate Authority (CA)** is the trusted third party that vouches for the binding between a public key and an identity by issuing digitally signed **certificates**.

**Types of CAs:**

- **Private / Internal CA:** Set up within an organization (e.g., via Windows Active Directory Certificate Services) for internal communications only.
- **Public / Commercial CA:** Trusted by browsers and operating systems globally. Examples: IdenTrust, DigiCert, Sectigo/Comodo, GoDaddy, GlobalSign.

**Core CA responsibilities:**

1. Provide a range of certificate services to its user community.
2. Verify the identity of certificate applicants (registration).
3. Maintain trust with users, regulators, and enterprises (e.g., financial institutions).

### 4.3 PKI Trust Models

The **trust model** defines how users and CAs establish trust with one another.

#### Single CA
- All certificates are issued by one CA; clients trust only that CA.
- **Problem:** Single point of failure — if the CA is compromised, the entire PKI collapses.

#### Hierarchical (Intermediate CA) — most common
- A **Root CA** issues certificates to one or more **Intermediate CAs**.
- Intermediate CAs issue certificates to end entities (leaf certificates).
- Each leaf certificate traces back to the root via a **certification path** (also called a **chain of trust** or **certificate chaining**).
- The root CA's certificate is **self-signed**.
- **Advantage:** Different intermediate CAs can enforce different policies (e.g., internal vs. public-facing services).
- **Problem:** Root is still a single point of failure.

#### Online vs. Offline CAs

| Type | Description |
|---|---|
| **Online CA** | Available on the network to accept CSRs, publish CRLs, and manage certificates in real time |
| **Offline CA** | Disconnected from all networks, usually powered down; used for **root CAs** to reduce compromise risk |

> **Best practice:** Keep the root CA offline. Bring it online only to issue or update intermediate CA certificates.

### 4.4 Registration Authorities and CSRs

**Registration** is the process by which subjects (users or devices) enroll with a CA and become authorized to request certificates.

The workflow for obtaining a certificate:

1. Subject generates a **key pair**.
2. Subject creates a **Certificate Signing Request (CSR)** — a Base64 ASCII file containing the subject's identity information and public key.
3. Subject submits the CSR to the CA (or a **Registration Authority (RA)** that acts on the CA's behalf).
4. CA validates the CSR (e.g., verifying FQDN matches WHOIS records for a web server certificate).
5. If approved, the CA **signs** the certificate and returns it to the subject.

> **Note:** In Windows Active Directory environments, domain-joined machines and users can often **auto-enroll** by authenticating to AD — no manual CSR needed.

### 4.5 Digital Certificates

A **digital certificate** is essentially a container for a subject's public key, signed by a CA to prove authenticity.

**Based on the X.509 standard** (ITU / IETF RFC 5280). RSA's **PKCS (Public Key Cryptography Standards)** complement X.509 for implementation details.

**Key X.509 certificate fields:**

| Field | Purpose |
|---|---|
| **Serial Number** | Uniquely identifies the certificate within the CA's domain |
| **Signature Algorithm** | Algorithm the CA used to sign the certificate (e.g., sha256RSA) |
| **Issuer** | Name of the issuing CA |
| **Valid From / To** | Certificate validity window |
| **Subject** | Identity of the certificate holder — expressed as a Distinguished Name (DN); the Common Name (CN) typically matches the FQDN or user email |
| **Public Key** | The subject's public key and the algorithm it uses |
| **Extensions (v3)** | Optional fields: friendly names, contact email, key usage constraints |
| **Subject Alternative Name (SAN)** | Preferred field for listing the DNS name(s) the certificate is valid for; supports multi-domain certs |

### 4.6 Certificate and Key Management

A key's **life cycle** involves these stages:

1. **Key Generation** — Create a key pair of appropriate strength using the chosen cipher.
2. **Certificate Generation** — Submit the public key to the CA as a CSR; the CA issues a signed certificate after identity verification.
3. **Storage** — The private key must be stored securely to prevent unauthorized access or loss.
4. **Expiration and Renewal** — Certificates have a defined validity period. Root certificates may last 10+ years; web server and user certificates are typically 1 year.

When renewing:
- **Key renewal:** Reuse the existing key pair with a new certificate.
- **Rekeying:** Generate a fresh key pair along with the new certificate.

### 4.7 Certificate Revocation

A certificate may need to be invalidated before its natural expiration date.

**Revocation vs. Suspension:**

| | Revoked | Suspended |
|---|---|---|
| **Permanent?** | Yes — cannot be reinstated | No — can be re-enabled |

**Common revocation reasons:**
- Private key compromised.
- Business closed or domain changed.
- Employee left the organization.
- Certificate misused.

**Revocation mechanisms:**

| Mechanism | Description |
|---|---|
| **CRL (Certificate Revocation List)** | A published list of serial numbers for revoked certificates; clients download and check it |
| **OCSP (Online Certificate Status Protocol)** | Real-time per-certificate status check; more efficient than downloading full CRLs |

**Tooling:**

| Platform | Tool |
|---|---|
| **Windows** | Active Directory Certificate Services (`certsrv`), `certutil`, PowerShell |
| **Linux** | OpenSSL (`openssl.org`) |

---

## 5. Authentication Controls

Authentication is the mechanism that proves a subject is who or what it claims to be. This module covers the full stack: IAM concepts, authentication factors, common protocols, password attacks, and biometrics.

### 5.1 Identity and Access Management (IAM)

An **access control system** governs how **subjects** (users, devices, processes) interact with **objects** (networks, servers, files, databases).

IAM is described through four sequential processes:

| Process | Description |
|---|---|
| **Identification** | Creating an account or ID that uniquely represents the subject on the network |
| **Authentication** | Proving the subject is who it claims to be when requesting access |
| **Authorization** | Determining and enforcing what rights the subject has on each resource (via ACLs) |
| **Accounting** | Tracking authorized usage and alerting on unauthorized access attempts (audit logs) |

> **Exam tip:** The four IAM processes are sometimes called **AAA** — Authentication, Authorization, and Accounting — with Identification as the prerequisite.

### 5.2 Authentication Factors

Authentication credentials are categorized into three factor types:

| Factor | Category | Examples |
|---|---|---|
| **Something you know** | Knowledge | Password, PIN, swipe pattern |
| **Something you have** | Ownership | Smart card, hardware fob, wristband (hard tokens); OTP via smartphone (soft token) |
| **Something you are/do** | Biometric | Fingerprint, iris scan, gait, voice (physiological or behavioral) |

Key points:
- **Hard tokens** (smart cards, fobs) are programmed with a unique identity certificate or account number.
- **Soft tokens** (smartphone OTP codes) are valid for a single use within a short time window.
- Passwords are not transmitted or stored in plaintext — they are stored as **cryptographic hashes** and compared at login time.

### 5.3 Multifactor Authentication (MFA)

Authentication is considered **strong** when it combines **more than one factor type**. Single-factor authentication is vulnerable: a password can be written down, a smart card can be stolen, biometrics can be spoofed.

| Type | Factors Combined | Example |
|---|---|---|
| **2FA** | Knowledge + Ownership *or* Knowledge + Biometric | Password + OTP code; PIN + smart card |
| **3FA** | All three | Smart card (have) + fingerprint (are) + PIN (know) |

> Location can also be used as an additional attribute (e.g., only allow logins from a certain geographic region).

### 5.4 Local, Network, and Remote Authentication

**Authentication provider** = the software architecture that authenticates a user before starting a shell (login on Linux, logon/sign-in on Windows).

#### Windows Authentication

| Scenario | Mechanism |
|---|---|
| **Local sign-in** | LSA compares submitted credential hash to the SAM database (part of the registry) |
| **Network sign-in** | LSA passes credentials to a network auth service — preferred: **Kerberos**; legacy: **NTLM** |
| **Remote sign-in** | Authentication over VPN or web portal |

#### Linux Authentication

- Local user accounts stored in `/etc/passwd`; password hashes in `/etc/shadow`.
- Network interactive login uses **SSH** — authentication can be done via cryptographic keys instead of a password.

#### Single Sign-On (SSO)

SSO allows a user to authenticate **once** to their local device and be automatically authenticated to compatible application servers without re-entering credentials. In Windows environments, SSO is implemented via **Kerberos**.

### 5.5 Kerberos

Kerberos is a network SSO authentication and authorization protocol — the backbone of Microsoft Active Directory. Named after the three-headed dog Cerberus, it has three main components.

**Key Distribution Center (KDC)** — runs on port 88 (TCP/UDP), contains two services:
- **Authentication Service (AS)**
- **Ticket Granting Service (TGS)**

**Authentication flow:**

1. Client sends the AS a request for a **Ticket Granting Ticket (TGT)** — the request is encrypted using the user's password hash.
2. The AS validates the request against the AD database. If valid, it responds with:
   - A **TGT** (encrypted with the KDC's secret key) containing the client identity, IP, timestamp, and validity period.
   - A **TGS session key** (encrypted with the user's password hash) for communicating with the TGS.
3. The client presents the TGT to the TGS to request a **service ticket** for a specific application server.
4. The client presents the service ticket to the application server to gain access — no password is sent over the network at any point.

> **Key security property:** Kerberos never transmits passwords. Tickets have short validity windows, making replay attacks impractical.

### 5.6 PAP, CHAP, and MS-CHAP

These protocols were designed for **remote access** (serial links, dial-up, VPN) where Kerberos (designed for trusted LANs) is not applicable.

| Protocol | Security Level | Notes |
|---|---|---|
| **PAP** (Password Authentication Protocol) | ❌ Cleartext | Sends password in plaintext; obsolete except inside an encrypted tunnel |
| **CHAP** (Challenge Handshake Authentication Protocol) | ✅ Challenge-response | Three-way handshake; password never sent directly; challenge repeated periodically to prevent replay attacks |
| **MS-CHAPv2** | ⚠️ Use with tunnel | Microsoft's CHAP implementation; uses vulnerable NTLM hashes — must be wrapped in an encrypted tunnel (e.g., PEAP) |

**CHAP three-way handshake:**
1. **Challenge** — server sends a random challenge message to the client.
2. **Response** — client hashes the challenge + shared secret and sends the result.
3. **Verification** — server independently computes the same hash; grants access if it matches.

### 5.7 Password Attacks

Passwords are stored as hashes, not plaintext. Attackers target the hash to recover the original password.

#### Attack Types by Access Method

| Type | Description |
|---|---|
| **Plaintext/Unencrypted** | Exploits protocols that transmit credentials in cleartext (PAP, basic HTTP/FTP, Telnet). Also includes credentials hardcoded in source code pushed to public repos. |
| **Online** | Attacker submits password guesses directly to a live authentication service (web login, VPN gateway) using known password lists or credential databases (e.g., haveibeenpwned.com). |
| **Offline** | Attacker has already obtained a hash database (`SAM`, `NTDS.DIT`, `/etc/shadow`, or memory dump). Cracking happens locally with no interaction with the auth system — only detectable via file system audit logs. |

#### Cracking Techniques

| Technique | How it works | Weakness targeted |
|---|---|---|
| **Brute-force** | Tries every possible character combination; constrained by compute time; effective against short passwords; can be accelerated with GPU clusters | Key space size |
| **Dictionary** | Generates hashes from a wordlist and compares to captured hash | Predictable/common passwords |
| **Rainbow table** | Uses precomputed hash→plaintext lookup tables; chains of values stored to save space | Unsalted hash storage |
| **Hybrid** | Combines dictionary words with brute-force mutations (e.g., `james1`) | Naive complexity additions |

**Defense against rainbow tables:** Add a **salt** (random value appended to the plaintext before hashing) — this forces unique hashes even for identical passwords and renders precomputed tables useless. Linux/Unix use salted hashes; **Windows does not**, making strong password policies especially critical on Windows systems.

**Common tooling:** Hashcat (`hashcat -m HashType -a AttackMode -o OutputFile InputHashFile`), L0phtCrack, Cain & Abel (Windows).

### 5.8 Biometric Authentication

Biometrics use physical or behavioral characteristics to verify identity.

**Enrollment process:**
1. **Sensor module** acquires the biometric sample.
2. **Feature extraction module** identifies and records the unique characteristics as a template stored in the authentication server's database.
3. On login, a new scan is taken and compared to the stored template; access is granted if it matches within a defined **tolerance threshold**.

#### Physiological Biometrics ("Something You Are")

| Method | How it works | Notes |
|---|---|---|
| **Fingerprint** | Scans ridge patterns | Most widely deployed; inexpensive; can fail with moisture/dirt; can be spoofed with a mold |
| **Vascular / Vein matching** | Infrared light maps blood vessel patterns in finger or palm | Addresses spoofing weakness of fingerprints; harder to fake |
| **Facial recognition** | Records distances between facial features | High false acceptance/rejection rates; vulnerable to spoofing; popular for smartphones |
| **Retinal scan** | Infrared light maps blood vessel pattern on the retina | Most accurate biometric; highly stable (doesn't change from birth to death except via injury/disease); expensive and intrusive; false negatives from cataracts |
| **Iris scan** | Near-infrared imaging of the eye surface | Similar accuracy to retina; less intrusive (works with glasses); less disease-sensitive; scalable for high-volume use (e.g., airports); can be fooled by a high-res photo |

#### Behavioral Biometrics ("Something You Do")

| Method | How it works | Notes |
|---|---|---|
| **Voice recognition** | Analyzes vocal characteristics | Inexpensive (built-in hardware); hard to template accurately; affected by background noise; vulnerable to impersonation |
| **Gait analysis** | Analyzes walking pattern via camera or accelerometer/gyroscope | Emerging technology; can be camera-based or phone sensor-based |
| **Signature recognition** | Records stroke, speed, and pressure during signing | Harder to fake than copying a static signature |
| **Typing pattern** | Analyzes speed and rhythm of typing a passphrase | Passive, continuous authentication potential |

> **Behavioral biometrics** generally have higher error rates and are more difficult for subjects to perform consistently compared to physiological methods.

---

## 6. Nmap Reference

Nmap (Network Mapper) is the standard tool for network reconnaissance and port scanning. General syntax:

```
nmap [scan type] [options] {target specification}
```

### 6.1 Scan Types

| Switch | Description |
|---|---|
| `-sS` | **TCP SYN scan** (stealth/half-open) — default; sends SYN, doesn't complete handshake |
| `-sT` | **TCP connect scan** — full three-way handshake; noisier; used when SYN scan isn't available |
| `-sA` | **TCP ACK scan** — maps firewall rules; determines filtered vs. unfiltered ports |
| `-sU` | **UDP scan** — slower; targets DNS (53), SNMP (161), DHCP (67/68) etc. |
| `-sF` | **TCP FIN scan** — sends FIN packet; useful for bypassing simple firewalls |
| `-sX` | **XMAS scan** — sets FIN, PSH, URG flags simultaneously |
| `-sn` | **Ping scan** — host discovery only, no port scanning |
| `-sL` | **List scan** — lists targets without sending any packets |

### 6.2 Port Specification

| Switch | Example | Description |
|---|---|---|
| `-p` | `nmap -p 23 192.168.1.1` | Scan a specific port |
| `-p` | `nmap -p 23-100 192.168.1.1` | Scan a port range |
| `-p` | `nmap -pU:110,T:23-25,443 192.168.1.1` | Scan specific UDP and TCP ports |
| `-p-` | `nmap -p- 192.168.1.1` | Scan all 65535 ports |
| `-p` | `nmap -p smtp,https 192.168.1.1` | Scan by protocol name |
| `-F` | `nmap -F 192.168.1.1` | Fast scan — top 100 ports only |
| `-r` | `nmap -r 192.168.1.1` | Sequential (non-random) port scan |

### 6.3 Host Discovery

| Switch | Example | Description |
|---|---|---|
| `-sL` | `nmap 192.168.1.1-5 -sL` | List targets without scanning |
| `-sn` | `nmap 192.168.1.1/8 -sn` | Ping scan only — disable port scan |
| `-Pn` | `nmap 192.168.1.1-8 -Pn` | Skip host discovery; treat all as online |
| `-PS` | `nmap 192.168.1.185 -PS22-25,80` | TCP SYN discovery on specified ports |
| `-PA` | `nmap 192.168.1.185 -PA22-25,80` | TCP ACK discovery on specified ports |
| `-PU` | `nmap 192.168.1.1-8 -PU53` | UDP discovery on specified port |
| `-PR` | `nmap 192.168.1.1-1/8 -PR` | ARP discovery within local network |
| `-n` | `nmap 192.168.1.1 -n` | Disable DNS resolution |

### 6.4 Version and OS Detection

| Switch | Example | Description |
|---|---|---|
| `-sV` | `nmap 192.168.1.1 -sV` | Detect service version on open ports |
| `-sV --version-intensity` | `nmap 192.168.1.1 -sV --version-intensity 6` | Intensity 0 (light) to 9 (all probes) |
| `-sV --version-all` | `nmap 192.168.1.1 -sV --version-all` | Maximum intensity (equivalent to level 9) |
| `-sV --version-light` | `nmap 192.168.1.1 -sV --version-light` | Light mode — faster, less accurate |
| `-O` | `nmap 192.168.1.1 -O` | Remote OS detection |
| `-A` | `nmap 192.168.1.1 -A` | Aggressive: OS detection + version detection + script scanning + traceroute |

### 6.5 NSE Scripts

Nmap Scripting Engine (NSE) allows automation of complex tasks using Lua scripts.

| Command | Description |
|---|---|
| `nmap --script= test_script 192.168.1.0/24` | Run a named script against a target range |
| `nmap --script-update-db` | Update the local script database |
| `nmap -sV -sC 192.168.1.1` | Run safe default scripts |
| `nmap --script-help="Test Script"` | Get help/description for a specific script |

### 6.6 Output Formats

| Format | Command | Notes |
|---|---|---|
| **Normal** | `nmap -oN scan.txt 192.168.1.1` | Human-readable text |
| **XML** | `nmap -oX scanr.xml 192.168.1.1` | Machine-parseable; useful for importing into tools |
| **Grepable** | `nmap -oG grep.txt 192.168.1.1` | Easy to filter with `grep`/`awk` |
| **All formats** | `nmap -oA 192.168.1.1` | Saves normal, XML, and grepable simultaneously |

### 6.7 Timing, Firewall Evasion & Misc

**Timing templates** (`-T0` to `-T5`):

| Switch | Description |
|---|---|
| `-T0` | Paranoid — slowest; avoids IDS |
| `-T1` | Sneaky — tricky; avoids IDS |
| `-T2` | Polite — timely; reduces bandwidth |
| `-T3` | Normal — default scan speed |
| `-T4` | Aggressive — faster on reliable networks |
| `-T5` | Insane — very fast; may miss results |

**Firewall / IDS evasion:**

| Command | Description |
|---|---|
| `nmap -f 192.168.1.1` | Fragment packets to evade packet inspection |
| `nmap -mtu [MTU] 192.168.1.1` | Specify custom MTU for fragmentation |
| `nmap -sI [zombie] 192.168.1.1` | Idle scan using a zombie host |
| `nmap --source-port [port] 192.168.1.1` | Spoof source port |
| `nmap --data-length [size] 192.168.1.1` | Append random data to packets |
| `nmap --randomize-hosts 192.168.1.1` | Randomize scan order |
| `nmap --badsum 192.168.1.1` | Send packets with bad checksums (firewall fingerprinting) |

**Useful miscellaneous:**

```bash
nmap -6 192.168.1.1           # Scan IPv6 targets
nmap --open 192.168.1.1       # Show only open ports
nmap --proxies proxy1,proxy2  # Route scan through proxies
nmap -iL scan.txt             # Read targets from a file
nmap --exclude 192.168.1.1    # Exclude specific IP from scan
nmap -traceroute 192.168.1.1  # Run traceroute alongside scan
```

**Target specification examples:**

```bash
nmap 192.168.1.1              # Single IP
nmap 192.168.1.1 192.168.100.1  # Multiple IPs
nmap 192.168.1.1-254          # IP range
nmap xyz.org                  # Domain
nmap 10.1.1.0/8               # CIDR notation
```

---

## 7. Quick Review / Exam Cheat Sheet

### Social Engineering — Attack Types

```
Phishing       → Mass email, spoofed links/sites
Spear Phishing → Targeted, personalized email
Whaling        → Targeting C-suite executives
Vishing        → Voice-based phishing
Smishing       → SMS-based phishing
Tailgating     → Physical entry, no consent
Piggybacking   → Physical entry, with employee consent
Shoulder Surf  → Observing credentials being entered
Dumpster Dive  → Physical — garbage/discarded media
Hoax           → Fake security alert → Trojan delivery
```

### Malware — Quick Reference

```
Virus          → Needs host file + user action to spread
Worm           → Self-replicating, no user action, network spread
Trojan         → Disguised as legit software, no self-replication
RAT            → Covert remote access + file upload capability
Rootkit        → Kernel/SYSTEM-level privilege, hides itself
Ransomware     → Locker (UI) or Crypto (files encrypted)
Botnet         → Many RAT-infected hosts under one C2 controller
Keylogger      → Subtype of spyware; captures keystrokes
Adware         → Browser hijacking; PUP/grayware category
```

### Cryptography — Core Concepts

```
Hashing         → One-way, integrity only (cannot recover plaintext)
Symmetric       → Same key both sides; fast; key distribution problem
Asymmetric      → Key pair; slow; solves key distribution; enables auth
Hybrid (TLS)    → Asymmetric for key exchange → Symmetric for data
```

### Hash Algorithms

```
MD5     → 128-bit  → Weak / legacy only
SHA-1   → 160-bit  → Deprecated
SHA-256 → 256-bit  → Recommended (SHA-2 family)
```

### Symmetric Algorithms

```
AES     → 128/192/256-bit → Current standard
3DES    → 112/168-bit     → Legacy / deprecated
DES     → 56-bit          → Broken, do not use
```

### Asymmetric Algorithms

```
RSA     → Trapdoor (integer factorization) → Encryption + signatures
ECC     → Trapdoor (elliptic curve) → Smaller keys, efficient
DH/DHE  → Key exchange only (not encryption)
DSA     → Signing only
```

### Key Security Properties

| Property | Provided By |
|---|---|
| **Confidentiality** | Symmetric or asymmetric encryption |
| **Integrity** | Hashing (MD5, SHA) |
| **Authentication** | Asymmetric encryption / digital signatures |
| **Non-repudiation** | Digital signatures (asymmetric) |

### PKI — Quick Reference

```
CA            → Trusted third party that signs and issues certificates
Root CA       → Top of the chain; self-signed; keep OFFLINE
Intermediate  → Issued by root; issues leaf certs; online
CSR           → Certificate Signing Request — public key + identity info
X.509         → Standard defining certificate fields
SAN           → Subject Alternative Name — preferred DNS name field
```

### Certificate Lifecycle

```
Generate Key  → Create secure key pair
Get Cert      → Submit CSR → CA verifies → CA signs → cert issued
Renew         → Key renewal (same key) or Rekey (new key)
Revoke        → CRL (list) or OCSP (real-time query)
```

### Trust Models

```
Single CA       → Simple, single point of failure
Hierarchical    → Root → Intermediate → Leaf (chain of trust)
Offline Root    → Root CA powered down to reduce compromise risk
```

### Authentication — IAM & Factors

```
Identification  → Create unique account/ID for the subject
Authentication  → Prove identity (credentials vs. stored hash)
Authorization   → Enforce rights via ACL
Accounting      → Audit log of all access events

Know            → Password, PIN, swipe pattern
Have            → Smart card, fob (hard token); OTP app (soft token)
Are/Do          → Fingerprint, iris, retina, gait, voice
MFA             → 2+ different factor types combined
```

### Kerberos Flow

```
1. Client → AS: Request TGT (encrypted with password hash)
2. AS → Client: TGT (encrypted KDC key) + TGS session key
3. Client → TGS: Present TGT, request service ticket
4. TGS → Client: Service ticket for target application
5. Client → App: Present service ticket → access granted
KDC port: 88 TCP/UDP
```

### Remote Auth Protocols

```
PAP      → Cleartext password → NEVER use unencrypted
CHAP     → Challenge-response 3-way handshake → replay-resistant
MS-CHAP  → Microsoft CHAP using NTLM hashes → must use encrypted tunnel
```

### Password Attack Types

```
Plaintext    → Sniff unencrypted protocol or find hardcoded creds
Online       → Guess live against auth service (web, VPN)
Offline      → Crack obtained hash database locally (SAM, NTDS.DIT, /etc/shadow)
Brute-force  → Try all combinations; slow; GPU-accelerated
Dictionary   → Hash a wordlist; match to captured hash
Rainbow      → Precomputed hash→plaintext chains; defeated by salting
Hybrid       → Dictionary + brute-force mutations (e.g., james1)
```

### Biometrics — Accuracy & Intrusiveness

```
Most accurate  → Retina scan (blood vessel pattern, stable lifetime)
Least intrusive→ Iris scan (near-IR, works with glasses, scalable)
Most deployed  → Fingerprint (cheap, easy, but spoofable)
Behavioral     → Voice, gait, signature, typing (higher error rates)
Salt           → Defeats rainbow tables; used by Linux, NOT Windows
```

### Nmap — Essential Commands

```bash
# Scan types
nmap -sS 192.168.1.1       # SYN stealth (default)
nmap -sT 192.168.1.1       # TCP connect (full handshake)
nmap -sU 192.168.1.1       # UDP scan
nmap -sA 192.168.1.1       # ACK scan (firewall mapping)

# Port scope
nmap -p 80,443 192.168.1.1  # Specific ports
nmap -p- 192.168.1.1        # All 65535 ports
nmap -F 192.168.1.1         # Fast (top 100)

# Detection
nmap -sV 192.168.1.1        # Service version
nmap -O  192.168.1.1        # OS detection
nmap -A  192.168.1.1        # Aggressive (all detection + scripts)
nmap -sV -sC 192.168.1.1    # Default NSE scripts

# Evasion / timing
nmap -T0..T5                # T0=slowest/stealthy, T5=fastest/noisy
nmap -f 192.168.1.1         # Fragment packets
nmap -sI [zombie] target    # Idle scan (spoofed source)

# Output
nmap -oN out.txt            # Normal text
nmap -oX out.xml            # XML
nmap -oA out                # All formats
```

---

*Study notes compiled from CompTIA Security+ SY0-601 — Week 2 materials (Modules 04, 05, 06 & 07).*  

<img width="1116" height="528" alt="Screenshot 2026-04-20 132641" src="https://github.com/user-attachments/assets/7e029f9a-5aba-48e8-8b38-dd7d92979322" />
<img width="1128" height="316" alt="Screenshot 2026-04-20 133818" src="https://github.com/user-attachments/assets/07916d9e-be0d-407b-9fe5-2fc3bb277ea5" />

*TryHackMe — Rooms completed as part of Week 2 practical work.*

*CAT Reloaded Cybersecurity Circle — SOC & DFIR Track.*
