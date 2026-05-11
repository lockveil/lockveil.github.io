---
layout: post
title: "L1 Week 3: Identity Management and Secure Network Design"
date: 2026-05-01 00:00:00 +0200
categories: [Infosec Field Notes, Security+ SY0-601]
tags: ["security+", "sy0-601", "iam", "account-management", "network-security", "dmz", "wireless", "ddos", "802.1x", "firewall", "ids", "ips", "siem", "soar", "waf", "nids", "nips", "dhcp", "dns", "dnssec", "tls", "https", "ftp", "sftp", "ssh", "vpn", "rdp"]
description: Covering Identity & Account Management controls, secure network architecture fundamentals, implementing network security appliances, and implementing secure network protocols (DHCP, DNS, TLS, FTP/SFTP, VPN, SSH).
last_modified_at: 2026-05-01 00:00:00 +0200
image:
  path: https://github.com/user-attachments/assets/55d61c2e-92bc-4ef1-b408-1b3eb9e1df4f

---

> **Playlist:** [Security+ Video Series (19–29)](https://www.youtube.com/watch?v=dyKg_bQOXfU&list=PLky4bd7_03m8o1NB0j96OsxZs0KcKlgMO&index=1)

---


## 1. Identity and Access Management (IAM)

**IAM** is the combination of processes, policies, and technologies used to manage digital identities and control what resources they can access. It spans the full account lifecycle: creation, maintenance, and removal.

IAM is not purely a technical discipline — it requires tight integration between IT, HR, and legal.

**Core IAM functions:**

| Function | Description |
|---|---|
| **Authentication** | Verifying who a user is |
| **Authorization** | Determining what a user is allowed to do |
| **Account lifecycle** | Creating, modifying, and disabling accounts |
| **Auditing** | Logging and reviewing account activity |

### 1.1 Background Checks & Onboarding

**Background checks** are performed before granting system access to a new employee or contractor. They verify identity, flag criminal history, and surface financial or association risks. Government and defense roles often require formal security clearances.

**Onboarding** is the formal process of provisioning access for a new joiner:
- Create accounts with least privilege permissions from the start.
- Deliver credentials securely — never in plaintext email.
- Coordinate with HR to ensure accounts are only created after hiring is confirmed.

> A classic IAM vulnerability: IT creates an account for a candidate who is never actually hired, leaving a dormant account that can be exploited.

### 1.2 Non-Disclosure Agreements

An **NDA** is a legal control — not a technical one. It requires employees and contractors to refrain from disclosing confidential information. NDAs support accountability and legal enforcement after a breach, but do not prevent technical attacks.

---

## 2. Personnel Security Policies

These policies reduce insider threat risk by structuring how privileges are managed and monitored.

| Policy | Purpose | How It Works |
|---|---|---|
| **Separation of Duties (SoD)** | Prevents one person from controlling a critical process end-to-end | Split tasks: one person requests, another approves, a third executes |
| **Least Privilege** | Limits damage if an account is compromised | Grant only the access needed for the job — no more |
| **Job Rotation** | Reduces long-term fraud and single-person dependency | Periodically move employees between roles |
| **Mandatory Vacation** | Exposes fraud that relies on uninterrupted access | Another person must cover duties; auditors can review during absence |

> **Exam tip:** Mandatory vacation is primarily a **fraud detection** control. Job rotation is primarily a **fraud prevention and knowledge distribution** control. Both reduce insider threat risk but in different ways.

---

## 3. Offboarding

Offboarding is a high-risk event — many breaches originate from former employees or contractors whose access was not fully revoked.

**Account actions:**
- Disable the account immediately upon termination (do not delete — preserve audit trail).
- Revoke active sessions, tokens, VPN access, and certificates.
- Recover encryption keys or credentials for company-owned assets.

**Asset recovery:** laptops, phones, smart cards, USB drives, building access badges.

**Data protection:** remotely wipe corporate data from personal (BYOD) devices via MDM before the employee leaves.

> **Critical detail:** Disabling an account does **not** automatically terminate active sessions. Sessions must be explicitly revoked.

---

## 4. Security Account Types

| Account Type | Purpose | Risk Level |
|---|---|---|
| **Standard User** | Daily work; limited permissions | Low |
| **Administrator / Root** | System management; full privileges | Critical — high-value attack target |
| **Guest** | Unauthenticated/anonymous access | High — disable unless explicitly required |
| **Service Account** | Run background services, scheduled tasks, server apps | Often overprivileged — apply least privilege |

**Built-in admin accounts:**
- Windows: `Administrator`
- Linux/Unix: `root`

These accounts are also called **superuser** accounts. They should be renamed, restricted, and monitored. Employees should never use admin accounts for daily tasks.

**Windows service account privilege levels:**

| Account | Privilege | Network Identity |
|---|---|---|
| **Local System** | Very high (near full control) | Machine account |
| **Local Service** | Low (standard user-like) | Anonymous |
| **Network Service** | Low (standard user-like) | Machine account |

---

## 5. Group-Based Privileges

Assigning permissions directly to individual user accounts does not scale and leads to misconfiguration. The correct approach is **group-based access control**:

1. Permissions are assigned to **security groups**.
2. User accounts are added to groups.
3. Users inherit the permissions of every group they belong to.

This model is the foundation of **RBAC (Role-Based Access Control)** and how Active Directory security is administered. A user can be a member of multiple groups simultaneously.

---

## 6. Account Policy Enforcement

### 6.1 Password Policies

Common enforced settings:

- **Minimum length** — longer passwords are exponentially harder to brute-force.
- **Complexity requirements** — mix of uppercase, lowercase, numbers, symbols.
- **Maximum age (expiration)** — forces periodic password change.
- **Password history** — prevents reuse of recent passwords.

> Password expiration is less effective than strong MFA combined with breach detection, but it remains a tested Security+ topic.

### 6.2 Account Restrictions

Accounts can be constrained by context to limit where and when login is permitted.

**Location-based restrictions:** limit login to specific IP ranges, VLANs, or Active Directory Organizational Units (OUs). For example, standard users can be blocked from logging into servers.

**Geofencing:** accept or reject authentication based on geographic location. Useful for blocking logins from unexpected countries or enforcing region-specific access policies.

**Time-of-day restrictions:** block logins outside business hours for accounts that have no legitimate after-hours use case.

**Account expiration:** set an automatic disable date — standard practice for contractors, interns, and temporary staff.

### 6.3 Lockout vs Disablement

| Mechanism | Trigger | Duration | Use Case |
|---|---|---|---|
| **Lockout** | Repeated failed login attempts | Temporary (auto-resets after time or admin unlock) | Brute-force prevention |
| **Disablement** | Admin action | Permanent until admin re-enables | Suspected compromise, termination |

---

## 7. Account Auditing and Logging

Auditing creates the accountability trail that supports detection, investigation, and compliance.

**What to log:**
- Login events (success and failure)
- Privilege escalation attempts
- Access to sensitive files or systems
- Configuration changes
- Account creation, modification, and deletion

**Non-repudiation:** audit logs make it difficult for a user to deny an action because the record proves it occurred. This is a key security property alongside CIA.

> Log everything that matters, but be selective — excessive logging creates noise, degrades performance, and makes real events harder to find. Prioritize failures and privileged actions.

---

## 8. Secure Network Design

A secure network is built around **segmentation** and **controlled trust boundaries** — not just a strong perimeter. Flat networks are dangerous: once the perimeter is breached, an attacker can move freely.

### 8.1 Network Appliances and OSI Layers

| Device | Primary Function | OSI Layer |
|---|---|---|
| **Switch** | Forwards frames using MAC addresses | Layer 2 |
| **Wireless AP** | Bridges wireless clients into the LAN | Layer 2 |
| **Router** | Forwards packets between networks | Layer 3 |
| **Firewall** | Filters traffic using rules/ACLs | Layer 3–7 |
| **Load Balancer** | Distributes traffic across servers | Layer 4 or 7 |

### 8.2 Switching and Routing

**Switching (Layer 2)** forwards traffic within the same broadcast domain using **MAC addresses**. Switches maintain a MAC address table (CAM table). VLANs create logical separation within the same physical switch infrastructure.

**Routing (Layer 3)** forwards traffic between different networks using **IP addresses**. Routers separate broadcast domains and enforce subnet boundaries.

```
Switching = Layer 2 → MAC addresses → same network
Routing   = Layer 3 → IP addresses  → between networks
```

IPv4 CIDR example: `172.16.1.101/16` = subnet mask `255.255.0.0`

IPv6 example: `2001:db8::abc:0:def0:1234` — first 64 bits are the network prefix, last 64 bits are the interface ID.

### 8.3 ARP

**ARP (Address Resolution Protocol)** resolves IP addresses to MAC addresses within a local network. A device broadcasts an ARP Request; the device that owns the IP responds with an ARP Reply containing its MAC address.

ARP is **unauthenticated** — this is the root cause of ARP spoofing attacks (covered in section 10).

---

## 9. Network Zones and DMZ Architecture

A **zone** is a network area where all systems share the same trust level. Traffic between zones must pass through a control point (firewall, ACL).

| Zone | Trust Level | Description |
|---|---|---|
| **Intranet** | Trusted | Internal corporate network; may contain sub-zones (users, servers, VoIP, management) |
| **Extranet** | Semi-trusted | Partner/B2B network; requires authentication; limited internal access |
| **Internet / Guest** | Untrusted | No trust; must be isolated from internal systems |
| **DMZ** | Controlled | Hosts public-facing services; isolated from internal LAN |

**DMZ (Demilitarized Zone)** is a perimeter network segment that exposes public services (web servers, mail gateways, DNS, reverse proxies) to the internet while protecting the internal LAN.

A typical three-interface firewall DMZ:

```
Internet ──[ Firewall ]──── DMZ (web/mail/DNS servers)
                       └─── Internal LAN
```

> The DMZ does not block all traffic — it **controls** it. External users can reach DMZ services, but cannot directly reach the internal LAN. Traffic from the DMZ to the LAN should be restricted by strict firewall rules.

---

## 10. Layer 2 Attacks and Mitigations

Layer 2 is inherently vulnerable because its foundational protocols (ARP, MAC learning) have no authentication.

| Attack | What Happens | Mitigation |
|---|---|---|
| **MitM / On-path** | Attacker intercepts, reads, or modifies traffic between two devices | TLS encryption, mutual authentication, DHCP snooping, DAI |
| **ARP Spoofing** | Attacker sends fake ARP replies to poison the ARP cache, redirecting traffic | Dynamic ARP Inspection (DAI), static ARP entries |
| **MAC Spoofing** | Attacker changes their MAC to impersonate another device | 802.1X, NAC posture validation |
| **MAC Flooding** | Attacker floods the CAM table with fake MACs; switch fails open and broadcasts all traffic | Port security (limit MACs per port), storm control |

**Port security** restricts which MAC addresses can communicate on a switch port — either by allow-listing specific MACs or capping the number of MACs per port. It mitigates flooding but is weak against spoofing since MAC addresses are easy to clone.

---

## 11. Network Access Control (802.1X)

**802.1X** is the IEEE standard for port-based Network Access Control (PNAC). It enforces authentication before granting any network access — far stronger than MAC filtering alone.

**How it works:**
1. Device connects to a switch port.
2. Switch (authenticator) blocks all traffic except authentication traffic.
3. Device (supplicant) authenticates via an AAA server (typically RADIUS).
4. On success, the switch opens the port and applies the appropriate VLAN/policy.

**The AAA model** (exam-critical):

| Component | Meaning | Example |
|---|---|---|
| **Authentication** | Prove identity | Password, certificate, MFA |
| **Authorization** | Define what is permitted | ACL, RBAC, VLAN assignment |
| **Accounting** | Log and track activity | SIEM, RADIUS accounting logs |

---

## 12. Wireless Security

Enterprise Wi-Fi must deliver coverage and capacity while enforcing confidentiality, integrity, and access control.

- **SSID** — the network name visible to users.
- **BSSID** — the MAC address of the AP's radio interface; uniquely identifies the AP.
- Wireless operates on **2.4 GHz** (longer range, more interference) and **5 GHz** (shorter range, less interference, faster) bands, each divided into channels.

**Site surveys** map coverage, identify dead zones, and minimize channel overlap between APs. Heat maps visualize signal strength across a floor plan.

**Wireless controllers** provide centralized management of multiple APs — consistent security policy, firmware updates, and monitoring from a single point.

### 12.1 Wireless Threats

| Threat | Description | Mitigation |
|---|---|---|
| **Rogue AP** | Unauthorized AP connected to the corporate network — creates an uncontrolled entry point | Wireless scanning, NAC, switch port security, disable unused Ethernet ports |
| **Evil Twin** | Rogue AP mimicking a legitimate SSID; uses stronger signal or deauth attacks to force clients to connect | WPA2/WPA3-Enterprise (802.1X), certificate validation, user training |
| **Jamming** | Intentional RF interference causing wireless DoS | Spectrum analyzer for detection; locate and remove jammer |

> Evil twins often work alongside **deauthentication attacks** — the attacker sends spoofed 802.11 deauth frames to disconnect clients from the legitimate AP, forcing them to reconnect to the evil twin. WPA3 mitigates this with Protected Management Frames (PMF).

---

## 13. DDoS and Load Balancing

**DDoS (Distributed Denial of Service)** overwhelms a target service with traffic from many sources simultaneously, typically from a botnet controlled via C2 servers.

**Effects:** bandwidth exhaustion, service downtime, degraded performance.

**Mitigation strategies:**

| Defense | Description |
|---|---|
| **Load balancing** | Distributes traffic across multiple servers; absorbs volumetric load |
| **Redundant infrastructure** | Eliminates single points of failure |
| **Upstream scrubbing** | ISP or CDN filters malicious traffic before it reaches the network |
| **Rate limiting** | Caps requests per source to reduce impact |
| **WAF / CDN** | Application-layer filtering and geographic distribution (e.g., Cloudflare) |

**Load balancers** distribute incoming requests across a server pool to improve performance, availability, and fault tolerance.

| Type | Decision Basis | OSI Layer | Use Case |
|---|---|---|---|
| **Layer 4** | IP address + TCP/UDP port | Layer 4 | General traffic distribution |
| **Layer 7** | URL, HTTP headers, cookies | Layer 7 | Content-aware routing (e.g., `/video` → video server pool) |

Layer 7 load balancing is more intelligent but requires deeper packet inspection and more processing overhead.

---

## 14. Implementing Network Security Appliances

### 14.1 Packet Filtering Firewalls

A **packet filtering firewall** is configured via **Access Control Lists (ACLs)** — a set of rules that define what traffic to allow or deny based on packet header fields.

Rules can filter on:
- **Source/destination IP** — IP filtering
- **Protocol type** — TCP, UDP, ICMP, routing protocols
- **Source/destination port** — application-layer filtering (e.g., block port 23/Telnet, allow 443/HTTPS)
- Some products also support MAC address filtering and ICMP type filtering.

Firewalls can control **ingress** (inbound) and **egress** (outbound) traffic with separate ACLs. Egress filtering is important — it can block unauthorized applications and defeat malware trying to phone home.

**Stateless operation:** a basic packet filter processes each packet independently with no memory of prior packets. Fast, but vulnerable to attacks spread across multiple packets and blind to session context.

### 14.2 Stateful Inspection Firewalls

A **stateful inspection firewall** solves the stateless problem by tracking active sessions in a **state table**. When a packet arrives, the firewall first checks whether it belongs to a known session; if not, it applies normal ACL rules.

**Transport layer (Layer 4) inspection:**
- Validates the TCP three-way handshake: `SYN → SYN/ACK → ACK`
- Detects anomalies — SYN floods, sequence number manipulation, session hijacking attempts
- Can track UDP (connectionless, so harder) and detect ICMP anomalies

**Application layer (Layer 7) inspection:**
- Verifies that the application protocol matches the port (e.g., confirms traffic on port 80 is actually HTTP, not raw TCP tunneling)
- A WAF at this layer can inspect HTTP headers and HTML for injection patterns
- Also called: **application layer gateway**, **stateful multilayer inspection**, **deep packet inspection (DPI)**
- Cannot inspect encrypted traffic unless an **SSL/TLS inspector** is configured

### 14.3 Firewall Implementation

**Appliance firewalls** are dedicated hardware devices. They can be deployed in two modes:

| Mode | How It Works | Use Case |
|---|---|---|
| **Routed (Layer 3)** | Each interface is a separate subnet / security zone; firewall performs inter-subnet forwarding | Standard perimeter and zone enforcement |
| **Bridged / Transparent (Layer 2)** | Inserted between two nodes (e.g., router and switch) with no IP address; inspects traffic without requiring subnet reconfiguration | Drop-in deployment with no topology changes |

**Router firewalls** integrate filtering into the router firmware. Common in SOHO gear (home routers/modems with built-in firewall). Routing is the primary function; firewall is secondary.

### 14.4 Virtual Firewalls

Virtual firewalls are common in data centers and cloud environments. Three deployment types:

| Type | Description |
|---|---|
| **Hypervisor-based** | Filtering built into the hypervisor or cloud platform; configured via API or web console (e.g., AWS Security Groups) |
| **Virtual appliance** | Vendor firewall image deployed as a VM — same software, virtualized hardware |
| **Multiple context** | Single physical firewall appliance running multiple virtual firewall instances, each with its own interface and policy |

### 14.5 IDS vs IPS

| Feature | IDS (Intrusion Detection System) | IPS (Intrusion Prevention System) |
|---|---|---|
| **Mode** | Passive — monitors and alerts | Active — monitors, alerts, and blocks |
| **Placement** | Out-of-band (tap/span port) | Inline — all traffic passes through |
| **Response** | Log and alert only | TCP reset, firewall filter, bandwidth throttle, packet modification |
| **Performance impact** | Minimal — does not slow traffic | Higher — must process every packet at wire speed |
| **Detectability** | Invisible to attacker | Can be detected (inline device) |

**NIDS** (Network-based IDS) uses a **sensor** (packet sniffer) to capture traffic. Common open-source tools: **Snort**, **Suricata**, **Zeek/Bro**.

A NIDS can detect: attack signatures, password guessing, port scans, worms, backdoors, malformed packets, and policy violations. Findings are used to tune firewall rules and feed SIEM.

**IPS** preventive responses include: sending TCP reset packets to the attacker, dynamically blocking the source IP on the firewall, throttling bandwidth, applying complex ACLs, modifying suspect packets, or triggering external scripts.

### 14.6 Detection Methods

**Signature-based detection (pattern matching):**
- Engine is loaded with a database of known attack signatures/patterns
- Generates an alert when traffic matches a signature
- Signatures must be updated regularly — commercial products require a subscription
- Updates should be fetched only from verified repositories over HTTPS
- Blind to zero-day attacks (no signature exists yet)

**Behavior/anomaly-based detection:**
- Engine is trained on a **baseline** of normal traffic using heuristics
- Deviations beyond a tolerance threshold generate an alert
- Can detect zero-days, insider threats, and novel attacks with no matching signature
- Products implementing this are called **NBAD** (Network Behavior and Anomaly Detection)
- Tradeoff: generates **false positives** and **false negatives** until the model matures

| Term | Meaning |
|---|---|
| **False positive** | Legitimate traffic flagged as malicious |
| **False negative** | Malicious traffic not detected |

### 14.7 NGFW and UTM

**Next-Generation Firewall (NGFW):**
- Combines stateful inspection + application-aware filtering + user account-based filtering + IPS in one product
- First commercial NGFW released by Palo Alto in 2010
- Enterprise-oriented: modular, highly configurable, higher performance, more complex to manage

**Unified Threat Management (UTM):**
- All-in-one appliance: firewall + anti-malware + IPS + spam filtering + content filtering + DLP + VPN + cloud access gateway
- Single management console for all controls
- Downsides: single point of failure, potential latency under heavy load, each function may perform worse than a dedicated appliance

> NGFW and UTM are marketing terms, not strict technical categories. Focus on specific product capabilities rather than the label.

### 14.8 Web Application Firewalls (WAF)

A **WAF** protects web applications and their backend databases from code injection and DoS attacks. It operates at Layer 7, using application-aware rules and pattern matching.

- Blocks requests containing code matching known attack signatures (SQLi, XSS, etc.)
- Logs all matched requests for threat analysis
- Deployed as a hardware appliance, VM, or web server plug-in

**Common WAF products:**

| Product | Type | Notes |
|---|---|---|
| **ModSecurity** | Open source | Supports Apache, nginx, IIS; sponsored by Trustwave |
| **NAXSI** | Open source | nginx module |
| **Imperva SecureSphere** | Commercial | Focus on data centers; covers WAF, DDoS, and database security |

---

## 15. Network Security Monitoring

Effective security operations require continuous, real-time visibility across the network — not just reactive review after incidents.

**Packet capture:** sensors and sniffers capture raw traffic for both statistical analysis (bandwidth, protocol distribution) and deep frame-level inspection.

**Network monitors** collect telemetry from infrastructure devices (switches, APs, routers, firewalls, servers) covering: CPU/memory load, state table usage, disk capacity, temperature, link utilization, and error rates. Heartbeat checks confirm device availability. Data is typically collected via **SNMP** or vendor-proprietary protocols. Anomalies in this data can surface attack activity.

**Logs** are among the most valuable security data sources. They serve as both an audit trail and an early warning system. Key log types include system logs (availability), security logs (authorized and unauthorized access), and application logs. Log review should be continuous — waiting until after a major incident means missing the opportunity to detect threats early.

---

## 16. SIEM and SOAR

### SIEM (Security Information and Event Management)

A **SIEM** aggregates logs and traffic data from across the environment into a single platform for correlation, alerting, and reporting.

Sources fed into a SIEM: Windows/Linux hosts, switches, routers, firewalls, IDS sensors, vulnerability scanners, malware scanners, DLP systems, databases.

Core SIEM capabilities: log aggregation, normalization, correlation, alerting, dashboards, and compliance reporting.

### SOAR (Security Orchestration, Automation, and Response)

**SOAR** addresses the alert volume problem — the sheer number of SIEM alerts that overwhelm analyst capacity.

- Can be standalone or integrated with a SIEM (sometimes called a **next-gen SIEM**)
- Scans the organization's security and threat intelligence data
- Uses machine learning / deep learning to analyze and prioritize
- Automates and enriches incident response workflows and threat hunting playbooks

```
SIEM  = aggregate + correlate + alert
SOAR  = automate + orchestrate + respond
```

---

## 17. Implementing Secure Network Protocols

### 17.1 Network Address Allocation (DHCP)

Most networks use a mix of static and dynamic address allocation. Router, firewall, and critical server interfaces are typically assigned static IPs; client workstations and most servers use **DHCP** for automatic allocation.

**Key DHCP security rule:** only one DHCP server should serve any given group of hosts.

**DHCP-based attacks:**

| Attack | Description |
|---|---|
| **Rogue DHCP server** | Attacker runs an unauthorized DHCP server; can cause DoS (wrong IP config) or redirect clients to attacker-controlled DNS/gateway |
| **DHCP starvation** | Rogue client floods the server with requests using spoofed MACs, exhausting the IP pool — making clients fall back to the rogue server |

**Mitigations:**
- Enable **DHCP snooping** on switches — ports are classified as trusted (uplinks) or untrusted (client-facing); DHCP offers from untrusted ports are dropped.
- Windows AD environments automatically log unauthorized DHCP server traffic.
- If an attacker compromises the DHCP server itself, they can redirect clients to rogue DNS resolvers or change the default gateway to route all traffic through an attacker-controlled machine.

### 17.2 Domain Name Resolution (DNS)

**DNS** resolves fully qualified domain names (FQDNs) to IP addresses using a distributed, hierarchical database. Name servers communicate over **port 53**.

DNS is a security-critical service and the target of multiple attack classes.

#### DNS Poisoning Attacks

| Method | How It Works |
|---|---|
| **Man-in-the-Middle** | Attacker on the same LAN uses ARP poisoning to impersonate the DNS server and respond with spoofed replies. May be paired with a DoS against the legitimate DNS server. A rogue DHCP server can also push clients toward a rogue DNS resolver. |
| **DNS Client Cache Poisoning** | Operating systems check the local `HOSTS` file before querying DNS. If an attacker modifies this file (requires admin access), they can redirect traffic by poisoning the local cache. Path: `/etc/hosts` (Linux/Unix), `%SystemRoot%\System32\Drivers\etc\hosts` (Windows). |
| **DNS Server Cache Poisoning** | Attacker performs DoS against the authoritative DNS server for a domain, then spoofs replies to other resolvers that query it — corrupting their caches with false records. |

#### DNSSEC

**DNS Security Extensions (DNSSEC)** mitigate spoofing and poisoning by adding cryptographic validation to DNS responses.

How it works:
1. The authoritative server creates a signed package of resource records using a **Zone Signing Key (ZSK)** (private key).
2. Requesting servers receive the package along with the server's public key to verify the signature.
3. The public ZSK is itself signed by a separate **Key Signing Key (KSK)** — so if the ZSK is compromised, it can be revoked and replaced without taking down the domain.

### 17.3 HTTP and TLS

**HTTP** is the foundation of web communication. A client (browser) connects to an HTTP server on **port 80** and requests a resource via URL. Responses are typically HTML pages with embedded resources.

**Problem:** early HTTP transmits everything in plaintext — credentials, session tokens, and data are all visible to anyone intercepting the traffic.

**SSL → TLS:** Netscape developed SSL in the 1990s to address this. It was standardized as **Transport Layer Security (TLS)**, now the default for secure web communication.

**How TLS works:**
1. The server presents a **digital certificate** signed by a trusted Certificate Authority (CA).
2. The certificate proves server identity and contains the server's public key.
3. Client and server negotiate supported cipher suites and establish an encrypted session.

**HTTPS** = HTTP over TLS. Default port: **443**. Indicated in the browser by `https://` and the padlock icon.

TLS is also used beyond HTTPS — it secures email (SMTPS, IMAPS), LDAP (LDAPS), and can underpin VPN tunnels.

### 17.4 File Transfer Services

**FTP** transfers files between client and server but has **no security mechanisms** — all authentication and data are transmitted in plaintext. Any intercepted FTP session leaks credentials.

**SFTP (SSH FTP)** — the secure replacement:
- Tunnels FTP commands and data over an **SSH session** (TCP port **22**)
- Encrypts both authentication and data transfer end-to-end
- Eliminates eavesdropping and MitM risk on file transfers
- Requires an SSH server with SFTP support and an SFTP-capable client

> FTP and SFTP look similar to the user but are fundamentally different protocols. Never use plain FTP over any network you don't fully control.

---

## 18. Secure Remote Access

### 18.1 Remote Access Architecture

Remote access connects a user to the private network across an intermediate (typically public) network. Modern implementations use **VPNs** rather than legacy modem or leased-line connections.

**Remote access VPN (client-to-site):**

```
VPN Client → Internet → VPN Gateway → Internal LAN
```

1. The client connects to the VPN gateway at the network edge using any internet connection.
2. The gateway authenticates the user and establishes an encrypted tunnel.
3. Client traffic is routed through the tunnel and can access authorized internal services.

**Site-to-site VPN:**

```
Branch Office Gateway ←── VPN Tunnel ──→ Head Office Gateway
```

- Configured to operate automatically — no manual client initiation required.
- Gateways exchange security credentials and maintain a permanent encrypted tunnel.
- Hosts on either side don't need VPN configuration; routing infrastructure handles it transparently.

### 18.2 Remote Desktop

Remote desktop protocols allow a user to control a graphical session on a remote machine over the network.

- **RDP (Remote Desktop Protocol)** — Microsoft's protocol for one-to-one graphical remote access to a Windows machine.
- **SSH** — provides secure terminal (command-line) access. Standard for Linux/Unix remote administration.
- GUI remote tools transmit screen and audio from the remote host to the client, and keyboard/mouse input from the client to the remote host.

### 18.3 Secure Shell (SSH)

**SSH** is the primary protocol for secure remote command-line access and encrypted file transfer.

**Primary uses:**
- Remote administration of servers and network devices
- Secure file transfer via SFTP

**How SSH identity works:**
- SSH servers are identified by a **host key** (public/private key pair).
- On first connection, the client receives the server's public key fingerprint and is prompted to verify it — this is the **TOFU (Trust on First Use)** model.
- Accepted host keys are cached; future connections compare against the cache. A mismatch warns of a potential MitM or server change.
- Enterprise environments use dedicated SSH host key management systems rather than per-client manual caching.

**Most widely used implementation:** OpenSSH (`openssh.com`) — available on all major operating systems.

> The SSH host key warning on first connection ("The server's host key was not found in the cache") is expected behavior — you're establishing trust for the first time. A warning on a *subsequent* connection to the same host is a red flag.

---

## 19. Quick Review / Exam Cheat Sheet

### IAM Lifecycle

```
Joiner  → onboarding: create account, assign least privilege, verify identity
Mover   → role change: update permissions, revoke old access
Leaver  → offboarding: disable account, revoke sessions, recover assets
```

### Personnel Security Controls

| Control | Primary Goal |
|---|---|
| Separation of Duties | Prevent single-person fraud/abuse |
| Least Privilege | Limit blast radius of compromise |
| Job Rotation | Prevent long-term fraud; spread knowledge |
| Mandatory Vacation | Detect ongoing fraud through temporary handover |

### CIA vs AAA

| CIA (Security Objectives) | AAA (Access Control Framework) |
|---|---|
| Confidentiality — prevent unauthorized disclosure | Authentication — prove identity |
| Integrity — prevent unauthorized modification | Authorization — define permissions |
| Availability — ensure services remain accessible | Accounting — log and track activity |

### Account Types

| Type | Risk | Key Control |
|---|---|---|
| Standard user | Low | Enforce least privilege |
| Admin / root | Critical | Restrict, rename, monitor |
| Guest | High | Disable unless required |
| Service account | Often overprivileged | Apply least privilege, rotate credentials |

### Account Policy Settings

```
Minimum password length
Complexity requirements
Password history (no reuse)
Maximum age (expiration)
Lockout threshold
Account expiration date
```

### Lockout vs Disablement

```
Lockout      → temporary, auto-resets → brute-force prevention
Disablement  → permanent until admin action → suspected compromise / termination
```

### Network Devices by Layer

| Device | Layer | Key Use |
|---|---|---|
| Switch | 2 | VLAN segmentation, port security |
| Router | 3 | Inter-network routing, ACLs |
| Firewall | 3–7 | Zone enforcement, traffic filtering |
| WAP | 2 | Wireless client access |
| Load Balancer | 4 / 7 | Availability, scaling, DDoS absorption |

### Layer 2 Attack Summary

| Attack | Effect | Defense |
|---|---|---|
| MitM / On-path | Intercept or modify traffic | TLS, mutual auth |
| ARP Spoofing | Redirect traffic via poisoned ARP cache | DAI, DHCP snooping |
| MAC Spoofing | Impersonate another device | 802.1X, NAC |
| MAC Flooding | Overflow CAM table → switch acts as hub | Port security, storm control |

### Wireless Threats

| Threat | Description | Mitigation |
|---|---|---|
| Rogue AP | Unauthorized AP on the network | NAC, scanning, port security |
| Evil Twin | Fake AP mimicking legitimate SSID | WPA2/3-Enterprise, cert validation |
| Jamming | RF interference → wireless DoS | Spectrum analyzer, locate jammer |

### DMZ

```
DMZ = buffer zone between internet and internal LAN
Hosts: web servers, mail gateways, DNS, reverse proxies
External users → DMZ services (allowed)
External users → Internal LAN (blocked)
```

### 802.1X / AAA

```
802.1X  = port-based NAC; blocks traffic until authentication succeeds
RADIUS  = common AAA server for 802.1X
AAA     = Authentication + Authorization + Accounting
```

### DDoS / Load Balancing

```
DDoS mitigation: load balancing + CDN/WAF + upstream scrubbing + rate limiting
Layer 4 LB = IP/port-based routing
Layer 7 LB = application-aware routing (URL, headers)
```

### Firewall Types

```
Packet filtering  → stateless, ACL-based, header inspection only
Stateful          → tracks sessions in state table; detects anomalies
Application-aware → DPI; verifies protocol matches port; inspects payload
NGFW              → stateful + app-aware + user-based + IPS
UTM               → all-in-one; single console; single point of failure risk
WAF               → Layer 7; protects web apps from injection and DoS
```

### IDS vs IPS

```
IDS  → passive; out-of-band; alert only; no traffic impact
IPS  → active; inline; blocks/modifies traffic; must handle wire speed
```

### Detection Methods

```
Signature-based  → known patterns; fast; blind to zero-days
Anomaly-based    → baseline deviation; catches novel attacks; higher false positive rate
```

### SIEM vs SOAR

```
SIEM  = collect + correlate + alert
SOAR  = automate response + orchestrate workflows + ML-driven enrichment
```

### Secure Protocols Quick Reference

| Protocol | Secure Version | Port | Notes |
|---|---|---|---|
| HTTP | HTTPS (HTTP + TLS) | 443 | Padlock in browser |
| FTP | SFTP (FTP over SSH) | 22 | Full encryption; requires SSH server |
| Telnet | SSH | 22 | SSH replaced Telnet entirely |
| DNS | DNSSEC | 53 | Adds cryptographic validation; doesn't change port |

### DHCP Security

```
Rogue DHCP → DoS or traffic redirection (DNS/gateway hijack)
DHCP starvation → exhaust IP pool via spoofed MACs → force fallback to rogue server
Mitigation → DHCP snooping on switches (trust uplinks only, drop offers from client ports)
```

### DNS Attacks

```
MitM DNS poisoning   → ARP spoof + fake DNS replies on local network
Client cache poison  → modify HOSTS file (/etc/hosts or Windows equivalent)
Server cache poison  → DoS authoritative server → spoof replies to resolvers
DNSSEC               → cryptographic signing of zone data; ZSK + KSK separation
```

### VPN Models

```
Remote access (client-to-site) → user initiates; encrypted tunnel to gateway
Site-to-site                   → automatic; gateway-to-gateway; transparent to hosts
```

### SSH Key Concepts

```
Host key       → server's identity key pair (public/private)
TOFU           → Trust on First Use; cache fingerprint on first connect
Key mismatch   → red flag on subsequent connections; possible MitM
OpenSSH        → most widely used SSH implementation
```

### Must-Know Acronyms

```
IAM    = Identity and Access Management
AAA    = Authentication, Authorization, Accounting
NDA    = Non-Disclosure Agreement
SoD    = Separation of Duties
GPO    = Group Policy Object
SID    = Security Identifier (Windows)
RBAC   = Role-Based Access Control
ARP    = Address Resolution Protocol
DAI    = Dynamic ARP Inspection
VLAN   = Virtual LAN
DMZ    = Demilitarized Zone
SSID   = Service Set Identifier (Wi-Fi network name)
BSSID  = Basic SSID (AP radio MAC address)
NAC    = Network Access Control
PNAC   = Port-based Network Access Control
DDoS   = Distributed Denial of Service
CDN    = Content Delivery Network
WAF    = Web Application Firewall
ACL    = Access Control List
NIDS   = Network-based Intrusion Detection System
NIPS   = Network-based Intrusion Prevention System
NBAD   = Network Behavior and Anomaly Detection
DPI    = Deep Packet Inspection
NGFW   = Next-Generation Firewall
UTM    = Unified Threat Management
SIEM   = Security Information and Event Management
SOAR   = Security Orchestration, Automation, and Response
SNMP   = Simple Network Management Protocol
DLP    = Data Loss Prevention
DHCP   = Dynamic Host Configuration Protocol
DNS    = Domain Name System
FQDN   = Fully Qualified Domain Name
DNSSEC = DNS Security Extensions
ZSK    = Zone Signing Key
KSK    = Key Signing Key
HTTP   = Hypertext Transfer Protocol
HTTPS  = HTTP Secure (HTTP over TLS)
TLS    = Transport Layer Security
SSL    = Secure Sockets Layer (deprecated predecessor to TLS)
CA     = Certificate Authority
FTP    = File Transfer Protocol
SFTP   = SSH File Transfer Protocol
SSH    = Secure Shell
RDP    = Remote Desktop Protocol
VPN    = Virtual Private Network
TOFU   = Trust on First Use
```

---

<img width="953" height="306" alt="image" src="https://github.com/user-attachments/assets/45b57611-c3a4-4a0d-aff1-7e84cd447286" />
<img width="946" height="405" alt="image" src="https://github.com/user-attachments/assets/ab4b41ea-227e-4ec4-a6e0-af77f35aefb0" />
