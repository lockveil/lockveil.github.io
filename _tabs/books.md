---
layout: page
title: Books
icon: fas fa-book
order: 6
---
<div class="books-grid">
  {% for book in site.data.books %}
<div class="book-card" onclick="openBook('{{ book.drive_id }}')" data-proofer-ignore>
  <img src="{{ book.cover }}" alt="{{ book.title }}" referrerpolicy="no-referrer">
  <div class="book-info">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }}</p>
  </div>
</div>
  {% endfor %}
</div>
<div id="book-modal" class="book-modal" onclick="closeBook(event)">
  <div class="book-modal-content">
    <button class="close-btn" onclick="closeBook()">✕</button>
    <iframe id="book-frame" src="" allowfullscreen></iframe>
  </div>
</div>
<script>
function openBook(driveId) {
  document.getElementById('book-frame').src =
    'https://drive.google.com/file/d/' + driveId + '/preview';
  document.getElementById('book-modal').classList.add('active');
}
function closeBook(e) {
  if (!e || e.target === document.getElementById('book-modal') || e.target.classList.contains('close-btn')) {
    document.getElementById('book-modal').classList.remove('active');
    document.getElementById('book-frame').src = '';
  }
}
</script>

