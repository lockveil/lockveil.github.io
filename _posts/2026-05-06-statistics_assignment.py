"""
Probability and Statistical Distributions - Programming Assignment
Faculty of Computers and Information Sciences - Mansoura University
Spring Semester 2025/2026 | Prof. Samir Elmougy
Author: Yousef Serag
"""

from collections import Counter

data = [115, 182, 191, 31, 196, 1099, 5, 172, 10, 179,
        83, 21, 20, 21, 186, 177, 195, 193, 188, 199,
        62, 109, 105, 183, 110]

n = len(data)
sorted_data = sorted(data)


# ── helpers ──────────────────────────────────────────────────────────────────

def percentile(sorted_arr, p):
    """Percentile using the nearest-rank method (1-indexed)."""
    rank = (p / 100) * len(sorted_arr)
    if rank == int(rank):
        return (sorted_arr[int(rank) - 1] + sorted_arr[int(rank)]) / 2
    return sorted_arr[int(rank)]


# ── (i) Mean ──────────────────────────────────────────────────────────────────
mean = sum(data) / n

# ── (ii) Mode ────────────────────────────────────────────────────────────────
freq = Counter(data)
max_freq = max(freq.values())
mode = [k for k, v in freq.items() if v == max_freq]
mode_str = mode[0] if len(mode) == 1 else mode   # single or multimodal

# ── (iii) Median ─────────────────────────────────────────────────────────────
if n % 2 == 1:
    median = sorted_data[n // 2]
else:
    median = (sorted_data[n // 2 - 1] + sorted_data[n // 2]) / 2

# ── (iv) Variance (population) ───────────────────────────────────────────────
variance = sum((x - mean) ** 2 for x in data) / n

# ── (v) P20 ──────────────────────────────────────────────────────────────────
p20 = percentile(sorted_data, 20)

# ── (vi) P50 ─────────────────────────────────────────────────────────────────
p50 = percentile(sorted_data, 50)

# ── (vii/viii/ix) Quartiles ──────────────────────────────────────────────────
q1 = percentile(sorted_data, 25)   # First  quartile
q2 = percentile(sorted_data, 50)   # Second quartile  (= median)
q3 = percentile(sorted_data, 75)   # Third  quartile

# ── (x) Range ────────────────────────────────────────────────────────────────
data_range = max(data) - min(data)

# ── (xi) Interquartile Range ─────────────────────────────────────────────────
iqr = q3 - q1

# ── (xii) Standard Deviation ─────────────────────────────────────────────────
std_dev = variance ** 0.5

# ── (xiii) Summation of Deviations ───────────────────────────────────────────
sum_of_deviations = sum(x - mean for x in data)   # always ≈ 0 by definition

# ── Part 2: Outlier detection (IQR fence method) ─────────────────────────────
lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr


# ── Output ───────────────────────────────────────────────────────────────────

def sep(title=""):
    width = 50
    if title:
        print(f"\n{'─' * 3} {title} {'─' * (width - len(title) - 5)}")
    else:
        print("─" * width)


print("=" * 50)
print("  STATISTICAL ANALYSIS")
print("  Mansoura University — Prob. & Stats Assignment")
print("=" * 50)
print(f"\n  Dataset  : {data}")
print(f"  n        : {n}")
print(f"  Sorted   : {sorted_data}")

sep("Descriptive Statistics")
print(f"  (i)    Mean               : {mean:.4f}")
print(f"  (ii)   Mode               : {mode_str}")
print(f"  (iii)  Median             : {median}")
print(f"  (iv)   Variance           : {variance:.4f}")

sep("Percentiles")
print(f"  (v)    P20                : {p20}")
print(f"  (vi)   P50                : {p50}")

sep("Quartiles")
print(f"  (vii)  Q1 (First  Quartile): {q1}")
print(f"  (viii) Q2 (Second Quartile): {q2}")
print(f"  (ix)   Q3 (Third  Quartile): {q3}")

sep("Spread")
print(f"  (x)    Range              : {data_range}")
print(f"  (xi)   Interquartile Range: {iqr}")
print(f"  (xii)  Standard Deviation : {std_dev:.4f}")
print(f"  (xiii) Sum of Deviations  : {sum_of_deviations:.6f}")

sep("Outlier Detection  (IQR × 1.5 fence)")
print(f"  Lower fence : {lower_fence}  |  Upper fence : {upper_fence}")
print()

outliers = []
for x in data:
    status = "OUTLIER ⚠" if x < lower_fence or x > upper_fence else "normal"
    marker = "  <<" if status.startswith("OUTLIER") else ""
    print(f"  {x:>6}  →  {status}{marker}")
    if status.startswith("OUTLIER"):
        outliers.append(x)

print()
if outliers:
    print(f"  Detected outliers: {outliers}")
else:
    print("  No outliers detected.")

print("\n" + "=" * 50)
