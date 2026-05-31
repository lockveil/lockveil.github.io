---
layout: page
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
.books-page { min-height: 80vh; }

.gslide-desc .book-btns { display: flex; gap: 10px; justify-content: center; margin-top: 16px; }
.gslide-desc .book-btns a { padding: 10px 28px; border-radius: 8px; font-size: 13px; font-weight: 500; text-decoration: none; transition: background 0.2s; }
.gslide-desc .btn-open { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18); color: #fff; }
.gslide-desc .btn-open:hover { background: rgba(255,255,255,0.2); }
.gslide-desc .btn-download { background: transparent; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.55); }
.gslide-desc .btn-download:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); }
.gslide-description { text-align: center; }
</style>

<div class="books-page">
<p class="page-sub">Click a cover to open</p>

{% assign categories = site.data.books | map: "category" | uniq %}
{% for category in categories %}
<div class="books-section">
  <div class="books-section-label">{{ category }}</div>
  <div class="books-row">
    {% assign cat_books = site.data.books | where: "category", category %}
    {% for book in cat_books %}
    <div class="book-card">
      <a href="{{ book.cover }}"
         class="glightbox"
         data-gallery="books"
         data-title="{{ book.title }}"
         data-description="<p style='color:rgba(255,255,255,0.45);font-size:13px;margin:0 0 12px'>{{ book.author }}</p><div class='book-btns'><a href='https://drive.google.com/file/d/{{ book.drive_id }}/view' target='_blank' class='btn-open'>Open PDF</a><a href='https://drive.google.com/uc?export=download&amp;id={{ book.drive_id }}' target='_blank' class='btn-download'>Download</a></div>">
        <div class="book-cover-wrap">
          <img src="{{ book.cover }}" alt="{{ book.title }}" />
          <div class="book-spine"></div>
        </div>
      </a>
      <div class="book-meta">
        <div class="book-title">{{ book.title }}</div>
        <div class="book-author">{{ book.author }}</div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
{% endfor %}
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const lightbox = GLightbox({ selector: '.glightbox' });

  lightbox.on('slide_after_load', function(data) {
    const driveId = data.slideEl.querySelector('a')?.getAttribute('data-drive-id') ||
      data.slideEl.querySelector('.gslide-image img')?.getAttribute('data-drive-id');

    const desc = document.querySelector('.gslide-desc');
    if (!desc || !driveId) return;

    if (desc.querySelector('.book-btns')) return;

    const btns = document.createElement('div');
    btns.className = 'book-btns';
    btns.innerHTML = `
      <a href="https://drive.google.com/file/d/${driveId}/view" target="_blank" class="btn-open">Open PDF</a>
      <a href="https://drive.google.com/uc?export=download&id=${driveId}" target="_blank" class="btn-download">Download</a>
    `;
    desc.appendChild(btns);
  });
});
</script>
