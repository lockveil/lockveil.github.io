---
layout: post
title: "Probability and Statistics - Assignment"
date: 2026-05-06 00:00:00 +0200
categories: []
tags: []
description: Prof. Samir Elmougy | Spring 2025/2026
last_modified_at: 2026-05-06 00:00:00 +0200
hidden: true
image:
  path: https://github.com/user-attachments/assets/76489b52-8778-4166-8f6f-efa2916b3f02
---

```python

import statistics

# ── Input Data ───────────────────────────────────────────────
data = [115, 182, 191, 31, 196, 1099, 5, 172, 10, 179,
        83,  21,  20,  21, 186, 177,  195, 193, 188, 199,
        62,  109, 105, 183, 110]

n           = len(data)
sorted_data = sorted(data)

print("Input data (sorted):", sorted_data)
print(f"n = {n}\n")

# ── Percentile using Nearest-Rank Formula ────────────────────
# Formula: index = floor((p / 100) * n)
def percentile(p):
    index = int((p / 100) * n)
    if index >= n:
        index = n - 1
    return sorted_data[index]

# ============================================================
#  TASK 1 — Descriptive Statistics
# ============================================================

# (i) Mean — sum of all values divided by count
# Formula: mean = Σxi / n
mean = sum(data) / n

# (ii) Mode — most frequently occurring value
# 21 appears twice, making it the only mode
modes = statistics.multimode(data)
mode_display = modes[0] if len(modes) == 1 else modes

# (iii) Median — middle value of sorted data
# n=25 (odd), so median = value at position (n+1)/2 = 13th element
median = statistics.median(data)

# (iv) Variance — average squared deviation from the mean
# Formula: σ² = Σ(xi - mean)² / n   (population variance)
variance = sum((x - mean) ** 2 for x in data) / n

# (v) P20 — 20th percentile
p20 = percentile(20)

# (vi) P50 — 50th percentile (should equal median)
p50 = percentile(50)

# (vii) & (ix) Third Quartile — 75th percentile
q3 = percentile(75)

# (viii) Second Quartile — 50th percentile (equals median)
q2 = percentile(50)

# First Quartile — 25th percentile (used for IQR)
q1 = percentile(25)

# (x) Range — spread between max and min
# Formula: Range = max - min
data_range = max(data) - min(data)

# (xi) Interquartile Range — middle 50% spread
# Formula: IQR = Q3 - Q1
iqr = q3 - q1

# (xii) Standard Deviation — square root of variance
# Formula: σ = √σ²
std_dev = variance ** 0.5

# (xiii) Summation of Deviations — sum of absolute deviations from mean
# Formula: Σ|xi - mean|
sum_of_deviations = sum(abs(x - mean) for x in data)

# ── Print Results ────────────────────────────────────────────
print("=" * 50)
print("         TASK 1 — DESCRIPTIVE STATISTICS")
print("=" * 50)
print(f"  (i)    Mean                 : {mean:.4f}")
print(f"  (ii)   Mode                 : {mode_display}  (appears {data.count(modes[0])} times)")
print(f"  (iii)  Median               : {median}")
print(f"  (iv)   Variance             : {variance:.4f}")
print(f"  (v)    P20                  : {p20}")
print(f"  (vi)   P50                  : {p50}")
print(f"  (vii)  Third Quartile  (Q3) : {q3}")
print(f"  (viii) Second Quartile (Q2) : {q2}")
print(f"  (ix)   Third Quartile  (Q3) : {q3}")
print(f"  (x)    Range                : {data_range}")
print(f"  (xi)   Interquartile Range  : {iqr}")
print(f"  (xii)  Standard Deviation   : {std_dev:.4f}")
print(f"  (xiii) Sum of Deviations    : {sum_of_deviations:.4f}")
print("=" * 50)

# ============================================================
#  TASK 2 — Outlier Detection (Tukey's IQR Method)
# ============================================================
# A value is an outlier if it lies outside the inner fences:
#   Lower fence = Q1 - 1.5 * IQR
#   Upper fence = Q3 + 1.5 * IQR

lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr

print("\n" + "=" * 50)
print("         TASK 2 — OUTLIER DETECTION")
print("         Method: Tukey's IQR Fences")
print("=" * 50)
print(f"  Q1 = {q1},  Q3 = {q3},  IQR = {iqr}")
print(f"  Lower fence = {q1} - 1.5 × {iqr} = {lower_fence}")
print(f"  Upper fence = {q3} + 1.5 × {iqr} = {upper_fence}")
print("-" * 50)

outliers = []

for x in data:
    if x < lower_fence or x > upper_fence:
        status = "OUTLIER"
        outliers.append(x)
    else:
        status = "Not an outlier"
    print(f"  {x:<6} →  {status}")

print("-" * 50)
if outliers:
    print(f"  Outliers found: {outliers}")
else:
    print("  No outliers found.")
print("=" * 50)

```
