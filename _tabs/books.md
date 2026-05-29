---
layout: page
title: Books
icon: fas fa-book
order: 6
---

<style>
.page-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 28px; }
.books-section { margin-bottom: 36px; }
.books-section-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
.books-section-label::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
.books-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 14px; }
.book-card { display: flex; flex-direction: column; cursor: pointer; width: 130px; }
.book-cover-wrap { position: relative; border-radius: 8px; overflow: hidden; width: 130px; height: 195px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.book-card:hover .book-cover-wrap { transform: translateY(-4px) scale(1.02); box-shadow: 0 16px 40px rgba(0,0,0,0.6); border-color: rgba(255,255,255,0.18); }
.book-cover-wrap img { width: 130px; height: 195px; object-fit: cover; display: block; }
.book-spine { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: rgba(255,255,255,0.06); }
.book-meta { padding: 8px 2px 0; }
.book-title { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); line-height: 1.4; margin-bottom: 3px; }
.book-author { font-size: 13px; color: rgba(255,255,255,0.4); }
</style>

<p class="page-sub">Click a cover to open the PDF</p>

<div class="books-section">
<div class="books-section-label">🌐 Networking</div>
<div class="books-row">
  <div class="book-card" onclick="window.open('https://drive.google.com/file/d/FILE_ID/preview','_blank')">
    <div class="book-cover-wrap">
      <img src="https://placehold.co/260x390/111/444?text=." alt="Book Title" />
      <div class="book-spine"></div>
    </div>
    <div class="book-meta">
      <div class="book-title">Book Title</div>
      <div class="book-author">Author Name</div>
    </div>
  </div>
</div>
</div>

<div class="books-section">
<div class="books-section-label">🦠 Malware Analysis</div>
<div class="books-row">
  <div class="book-card" onclick="window.open('https://drive.google.com/file/d/FILE_ID/preview','_blank')">
    <div class="book-cover-wrap">
      <img src="https://placehold.co/260x390/111/444?text=." alt="Book Title" />
      <div class="book-spine"></div>
    </div>
    <div class="book-meta">
      <div class="book-title">Book Title</div>
      <div class="book-author">Author Name</div>
    </div>
  </div>
</div>
</div>

<div class="books-section">
<div class="books-section-label">🗡️ Pentesting</div>
<div class="books-row">
  <div class="book-card" onclick="window.open('https://drive.google.com/file/d/FILE_ID/preview','_blank')">
    <div class="book-cover-wrap">
      <img src="https://placehold.co/260x390/111/444?text=." alt="Book Title" />
      <div class="book-spine"></div>
    </div>
    <div class="book-meta">
      <div class="book-title">Book Title</div>
      <div class="book-author">Author Name</div>
    </div>
  </div>
</div>
</div>

<div class="books-section">
<div class="books-section-label">🔐 Cryptography</div>
<div class="books-row">
  <div class="book-card" onclick="window.open('https://drive.google.com/file/d/FILE_ID/preview','_blank')">
    <div class="book-cover-wrap">
      <img src="https://placehold.co/260x390/111/444?text=." alt="Book Title" />
      <div class="book-spine"></div>
    </div>
    <div class="book-meta">
      <div class="book-title">Book Title</div>
      <div class="book-author">Author Name</div>
    </div>
  </div>
</div>
</div>
