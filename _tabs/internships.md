---
layout: page
title: Internships
icon: fas fa-briefcase
order: 5
---

<div id="internships-container">
  <p style="opacity:0.5;">Loading internships...</p>
</div>

<script>
fetch('https://internships.lockveil.workers.dev/')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('internships-container');
    if (!data.jobs || data.jobs.length === 0) {
      container.innerHTML = '<p>No internships found right now.</p>';
      return;
    }
    const updated = new Date(data.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    container.innerHTML = `
      <p style="opacity:0.5;font-size:0.85rem;margin-bottom:1.5rem;">Last updated: ${updated}</p>
      ${data.jobs.map(job => `
        <a href="${job.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
          <div style="
            background: rgba(10,10,10,0.45);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 10px;
            padding: 1rem 1.25rem;
            margin-bottom: 1rem;
            transition: border-color 0.2s, background 0.2s;
          "
          onmouseover="this.style.borderColor='rgba(255,255,255,0.2)';this.style.background='rgba(20,20,20,0.6)'"
          onmouseout="this.style.borderColor='rgba(255,255,255,0.07)';this.style.background='rgba(10,10,10,0.45)'">
            <div style="font-weight:600;font-size:1rem;margin-bottom:0.3rem;">${job.title}</div>
            <div style="opacity:0.5;font-size:0.8rem;margin-bottom:0.5rem;">${job.company} ${job.date ? '· ' + job.date : ''}</div>
            <div style="opacity:0.7;font-size:0.85rem;line-height:1.5;">${job.snippet}</div>
          </div>
        </a>
      `).join('')}
    `;
  })
  .catch(() => {
    document.getElementById('internships-container').innerHTML = '<p>Failed to load internships.</p>';
  });
</script>
