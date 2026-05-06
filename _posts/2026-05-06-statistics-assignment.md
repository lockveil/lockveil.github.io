---
layout: post
title: "Probability and Statistics - Assignment"
date: 2026-05-06 00:00:00 +0200
categories:[]
tags: []
description: Prof. Samir Elmougy | Spring 2025/2026
last_modified_at: 2026-05-06 00:00:00 +0200
hidden: true
---

```python

import statistics

# ─── Data ────────────────────────────────────────────────────────────────────
data = [115, 182, 191, 31, 196, 1099, 5, 172, 10, 179,
        83, 21, 20, 21, 186, 177, 195, 193, 188, 199,
        62, 109, 105, 183, 110]

n = len(data)
sorted_data = sorted(data)

# ─── Helper: percentile (nearest-rank method) ────────────────────────────────
def percentile(sorted_lst, p):
    rank = (p / 100) * len(sorted_lst)
    index = int(rank)          # floor
    if rank == index:          # exact hit → average with previous
        index = max(index - 1, 0)
    return sorted_lst[index]

# ─── Task 1: Statistics ──────────────────────────────────────────────────────

# (i) Mean
mean = sum(data) / n

# (ii) Mode  (statistics.multimode returns all modes)
modes = statistics.multimode(data)
mode_str = modes[0] if len(modes) == 1 else modes   # show list if multimodal

# (iii) Median
median = statistics.median(data)

# (iv) Variance (population variance)
variance = sum((x - mean) ** 2 for x in data) / n

# (xii) Standard Deviation  (needed before summation of deviations)
std_dev = variance ** 0.5

# (v) P20
p20 = percentile(sorted_data, 20)

# (vi) P50
p50 = percentile(sorted_data, 50)

# (vii/viii/ix) Quartiles
q1 = percentile(sorted_data, 25)   # First  / Second quartile boundary
q2 = percentile(sorted_data, 50)   # Second / median
q3 = percentile(sorted_data, 75)   # Third  quartile

# (x) Range
data_range = max(data) - min(data)

# (xi) Interquartile Range
iqr = q3 - q1

# (xiii) Summation of Deviations  (sum of |xi - mean|)
sum_of_deviations = sum(abs(x - mean) for x in data)

# ─── Print Results ───────────────────────────────────────────────────────────
print("=" * 45)
print("        DESCRIPTIVE STATISTICS REPORT")
print("=" * 45)
print(f"  n (count)              : {n}")
print(f"  Data (sorted)          : {sorted_data}")
print("-" * 45)
print(f"  (i)   Mean             : {mean:.4f}")
print(f"  (ii)  Mode             : {mode_str}")
print(f"  (iii) Median           : {median}")
print(f"  (iv)  Variance         : {variance:.4f}")
print(f"  (v)   P20              : {p20}")
print(f"  (vi)  P50              : {p50}")
print(f"  (vii) Third Quartile   : {q3}")
print(f"  (viii)Second Quartile  : {q2}")
print(f"  (ix)  Third Quartile   : {q3}")
print(f"  (x)   Range            : {data_range}")
print(f"  (xi)  Interquartile    : {iqr}")
print(f"  (xii) Std Deviation    : {std_dev:.4f}")
print(f"  (xiii)Sum of Deviations: {sum_of_deviations:.4f}")
print("=" * 45)


# ─── Task 2: Outlier Detection (IQR method) ──────────────────────────────────
# A value is an outlier if it falls below Q1 - 1.5*IQR  or above Q3 + 1.5*IQR

lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr

print("\n        OUTLIER DETECTION  (IQR Method)")
print("=" * 45)
print(f"  Lower fence : {q1} - 1.5 × {iqr} = {lower_fence}")
print(f"  Upper fence : {q3} + 1.5 × {iqr} = {upper_fence}")
print("-" * 45)

outliers     = []
non_outliers = []

for value in data:
    if value < lower_fence or value > upper_fence:
        outliers.append(value)
        status = "OUTLIER  ✗"
    else:
        non_outliers.append(value)
        status = "Normal   ✓"
    print(f"  {value:<6} → {status}")

print("-" * 45)
print(f"  Outliers     : {outliers}")
print(f"  Non-outliers : {non_outliers}")
print("=" * 45)

```
