---
layout: post
title: "Probability and Statistics - Assignment"
date: 2026-05-06 00:00:00 +0200
categories: []
tags: []
description: Prof. Samir Elmougy | Spring 2025/2026
last_modified_at: 2026-05-06 00:00:00 +0200
hidden: true
---
<img width="1253" height="705" alt="image" src="https://github.com/user-attachments/assets/42027cf1-a2e7-4b6d-bae1-3fcedc12ec2c" />

```python

import statistics

# Input data
data = [115, 182, 191, 31, 196, 1099, 5, 172, 10, 179,
        83, 21, 20, 21, 186, 177, 195, 193, 188, 199,
        62, 109, 105, 183, 110]

n = len(data)
sorted_data = sorted(data)

print("Sorted data:", sorted_data)
print("n =", n)

# Percentile function (nearest rank)
def percentile(p):
    index = int((p / 100) * n)
    if index >= n:
        index = n - 1
    return sorted_data[index]

# -------------------------------
# TASK 1: Descriptive Statistics
# -------------------------------

mean = sum(data) / n

modes = statistics.multimode(data)
mode_display = modes[0] if len(modes) == 1 else modes

median = statistics.median(data)

variance = sum((x - mean) ** 2 for x in data) / n
std_dev = variance ** 0.5

p20 = percentile(20)
p50 = percentile(50)

q1 = percentile(25)
q2 = percentile(50)
q3 = percentile(75)

data_range = max(data) - min(data)
iqr = q3 - q1

sum_of_deviations = sum(abs(x - mean) for x in data)

print("\n" + "=" * 50)
print("TASK 1: DESCRIPTIVE STATISTICS")
print("=" * 50)
print(f"Mean                : {mean:.4f}")
print(f"Mode                : {mode_display}")
print(f"Median              : {median}")
print(f"Variance            : {variance:.4f}")
print(f"P20                 : {p20}")
print(f"P50                 : {p50}")
print(f"Q1                  : {q1}")
print(f"Q2 (Median)         : {q2}")
print(f"Q3                  : {q3}")
print(f"Range               : {data_range}")
print(f"IQR                 : {iqr}")
print(f"Standard Deviation  : {std_dev:.4f}")
print(f"Sum of Deviations   : {sum_of_deviations:.4f}")
print("=" * 50)

# -------------------------------
# TASK 2: Outlier Detection (IQR)
# -------------------------------

lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr

print("\n" + "=" * 50)
print("TASK 2: OUTLIER DETECTION")
print("=" * 50)
print(f"Lower fence: {lower_fence}")
print(f"Upper fence: {upper_fence}")
print("-" * 50)

outliers = []

for x in data:
    if x < lower_fence or x > upper_fence:
        outliers.append(x)
        print(f"{x}  -> OUTLIER")
    else:
        print(f"{x}  -> normal")

print("-" * 50)
print("Outliers:", outliers)
print("=" * 50)

```

<div id="editor-wrap">
  <textarea id="code" rows="10" style="width:100%;font-family:monospace;background:#000;color:#cdd6f4;padding:10px;border:none;">
# your code here
print("Hello")
  </textarea>
  <button id="run-btn" onclick="runCode()" style="margin-top:8px;padding:6px 16px;" disabled>Loading Python...</button>
  <pre id="output" style="background:#0d0d0d;color:#a6e3a1;padding:10px;margin-top:8px;"></pre>
</div>

<script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
<script>
  let pyodide;
  (async () => {
    pyodide = await loadPyodide();
    const btn = document.getElementById("run-btn");
    btn.textContent = "Run";
    btn.disabled = false;
  })();

  async function runCode() {
    if (!pyodide) return;
    const code = document.getElementById("code").value;
    const out = document.getElementById("output");
    try {
      pyodide.runPython(`import sys, io\nsys.stdout = io.StringIO()`);
      pyodide.runPython(code);
      out.textContent = pyodide.runPython("sys.stdout.getvalue()");
    } catch (e) {
      out.textContent = e.message;
    }
  }
</script>
