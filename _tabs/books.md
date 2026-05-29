---
title: Books
icon: fas fa-book
order: 3
---

<style>
.page-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 28px; }
.books-section { margin-bottom: 36px; }
.books-section-label { font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
.books-section-label::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
.books-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
.book-card { display: flex; flex-direction: column; cursor: pointer; width: 160px; }
.book-cover-wrap { position: relative; border-radius: 8px; overflow: hidden; width: 160px; height: 240px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.book-card:hover .book-cover-wrap { transform: translateY(-4px) scale(1.02); box-shadow: 0 16px 40px rgba(0,0,0,0.6); border-color: rgba(255,255,255,0.18); }
.book-cover-wrap img { width: 160px; height: 240px; object-fit: fill; display: block; margin: 0; padding: 0; position: absolute; top: 0; left: 0; }
.book-spine { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: rgba(255,255,255,0.06); }
.book-meta { padding: 8px 2px 0; }
.book-title { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); line-height: 1.4; margin-bottom: 3px; }
.book-author { font-size: 13px; color: rgba(255,255,255,0.4); }
</style>
<p class="page-sub">Click a cover to open the PDF</p>
{% assign categories = site.data.books | map: "category" | uniq %}
{% for category in categories %}
<div class="books-section">
  <div class="books-section-label">{{ category }}</div>
  <div class="books-row">
    {% assign cat_books = site.data.books | where: "category", category %}
    {% for book in cat_books %}
    <div class="book-card" onclick="window.open('https://drive.google.com/file/d/{{ book.drive_id }}/view','_blank')">
      <div class="book-cover-wrap">
        <img src="{{ book.cover }}" alt="{{ book.title }}" />
        <div class="book-spine"></div>
      </div>
      <div class="book-meta">
        <div class="book-title">{{ book.title }}</div>
        <div class="book-author">{{ book.author }}</div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
{% endfor %}
