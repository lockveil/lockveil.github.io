---
layout: page
title: Internships
icon: fas fa-briefcase
order: 4
---

<div id="internships-container">
  <p style="opacity:0.5;">Loading internships...</p>
</div>

<script>
const AGGREGATORS = ['jooble.org', 'glassdoor.com', 'indeed.com', 'bayt.com'];

function getSourceBadge(company) {
  if (company.includes('wuzzuf')) return { label: 'Wuzzuf', color: '#e8432d' };
  if (company.includes('linkedin')) return { label: 'LinkedIn', color: '#0a66c2' };
  if (company.includes('forasna')) return { label: 'Forasna', color: '#2ecc71' };
  if (company.includes('zinad')) return { label: 'Zinad', color: '#8b5cf6' };
  if (company.includes('itida') || company.includes('itida.gov')) return { label: 'ITIDA', color: '#f59e0b' };
  if (company.includes('egyincs')) return { label: 'EgyInCS', color: '#06b6d4' };
  return { label: 'Web', color: '#6b7280' };
}

function isAggregator(url) {
  return AGGREGATORS.some(a => url.includes(a));
}

fetch('https://internships.lockveil.workers.dev')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('internships-container');
    if (!data.jobs || data.jobs.length === 0) {
      container.innerHTML = '<p>No internships found right now.</p>';
      return;
    }

    const jobs = data.jobs.filter(j => !isAggregator(j.url));
    const updated = new Date(data.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    container.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <span style="opacity:0.4;font-size:0.8rem;">Last updated: ${updated}</span>
        <span style="opacity:0.5;font-size:0.8rem;">${jobs.length} opportunities</span>
      </div>
      ${jobs.map(job => {
        const badge = getSourceBadge(job.company);
        return `
        <a href="${job.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;display:block;margin-bottom:0.85rem;">
          <div style="
            background: rgba(10,10,10,0.35);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 10px;
            padding: 1rem 1.25rem;
            transition: border-color 0.2s, background 0.2s;
            display:flex;
            flex-direction:column;
            gap:0.4rem;
          "
          onmouseover="this.style.borderColor='rgba(255,255,255,0.18)';this.style.background='rgba(20,20,20,0.55)'"
          onmouseout="this.style.borderColor='rgba(255,255,255,0.07)';this.style.background='rgba(10,10,10,0.35)'">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;">
              <div style="font-weight:600;font-size:0.95rem;line-height:1.4;">${job.title}</div>
              <span style="
                font-size:0.7rem;
                font-weight:600;
                padding:2px 8px;
                border-radius:999px;
                background:${badge.color}22;
                color:${badge.color};
                border:1px solid ${badge.color}44;
                white-space:nowrap;
                flex-shrink:0;
              ">${badge.label}</span>
            </div>
            <div style="opacity:0.45;font-size:0.78rem;">${job.company} ${job.date ? '· ' + job.date : ''}</div>
            <div style="opacity:0.65;font-size:0.83rem;line-height:1.55;">${job.snippet}</div>
          </div>
        </a>
        `;
      }).join('')}
    `;
  })
  .catch(() => {
    document.getElementById('internships-container').innerHTML = '<p>Failed to load internships.</p>';
  });
</script>
