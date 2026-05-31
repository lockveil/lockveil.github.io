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
.book-cover-wrap a { pointer-events: none; }
.book-spine { position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: rgba(255,255,255,0.06); }
.book-meta { padding: 8px 2px 0; }
.book-title { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); line-height: 1.4; margin-bottom: 3px; }
.book-author { font-size: 13px; color: rgba(255,255,255,0.4); }
.books-page { min-height: 80vh; }

.book-modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  z-index: 9999;
  align-items: center;
  justify-content: center;
}
.book-modal-overlay.active { display: flex; }
.book-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  padding: 40px 20px;
}
.book-modal img {
  width: 220px;
  height: 330px;
  object-fit: fill;
  border-radius: 6px;
  display: block;
  box-shadow: 0 24px 60px rgba(0,0,0,0.7);
}
.book-modal-title {
  font-size: 17px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  text-align: center;
  line-height: 1.4;
}
.book-modal-author {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  text-align: center;
  margin-top: -14px;
}
.book-modal-buttons {
  display: flex;
  gap: 10px;
}
.book-modal-buttons a {
  padding: 10px 28px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s;
}
.btn-open {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  color: #fff;
}
.btn-open:hover { background: rgba(255,255,255,0.2); }
.btn-download {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.55);
}
.btn-download:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); }
.book-modal-close {
  position: fixed;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
  z-index: 10000;
}
.book-modal-close:hover { color: #fff; }
</style>

<div class="book-modal-overlay" id="bookModal">
  <div class="book-modal">
    <button class="book-modal-close" onclick="closeModal()">✕</button>
    <img id="modalCover" src="https://placehold.co/160x240" alt="" />
    <div class="book-modal-title" id="modalTitle"></div>
    <div class="book-modal-author" id="modalAuthor"></div>
    <div class="book-modal-buttons">
    <a id="modalOpen" href="https://drive.google.com" target="_blank" class="btn-open">Open PDF</a>
    <a id="modalDownload" href="https://drive.google.com" target="_blank" class="btn-download">Download</a>
    </div>
  </div>
</div>

<div class="books-page">
<p class="page-sub">Click a cover to preview</p>

{% assign categories = site.data.books | map: "category" | uniq %}
{% for category in categories %}
<div class="books-section">
  <div class="books-section-label">{{ category }}</div>
  <div class="books-row">
    {% assign cat_books = site.data.books | where: "category", category %}
    {% for book in cat_books %}
    <div class="book-card" onclick="openModal('{{ book.cover }}','{{ book.title }}','{{ book.author }}','{{ book.drive_id }}')">
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
</div>

<script>
function openModal(cover, title, author, driveId) {
  document.getElementById('modalCover').src = cover;
  document.getElementById('modalCover').alt = title;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalAuthor').textContent = author;
  document.getElementById('modalOpen').href = 'https://drive.google.com/file/d/' + driveId + '/view';
  document.getElementById('modalDownload').href = 'https://drive.google.com/uc?export=download&id=' + driveId;
  document.getElementById('bookModal').classList.add('active');
}

function closeModal() {
  document.getElementById('bookModal').classList.remove('active');
}

document.getElementById('bookModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
</script>
