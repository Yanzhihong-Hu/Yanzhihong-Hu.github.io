---
layout: page
permalink: /research/
title: "Research"
eyebrow: "Questions · 02"
intro: "My present interests center on probability, random matrices, and random geometry. I list them as directions of study, not as claims of completed results."
description: "Research interests and earlier mathematical work of Yanzhihong Hu."
---
<section class="research-status reveal" aria-labelledby="current-direction-title">
  <div class="section-heading-row">
    <h2 id="current-direction-title">Current direction</h2>
    <p>Areas that presently organize my graduate study and reading.</p>
  </div>
  <div class="research-status__grid">
    {% for item in site.data.profile.research.current %}
      <article>
        <p class="status-label">{{ item.note }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    {% endfor %}
  </div>
</section>

<section class="content-grid reveal" aria-labelledby="earlier-research-title">
  <div class="content-grid__label"><p>Previous</p></div>
  <div class="content-grid__main">
    <div class="section-heading-row">
      <h2 id="earlier-research-title">Earlier mathematical work</h2>
      <p>Recorded projects from my undergraduate mathematical training.</p>
    </div>
    <div class="compact-work-list">
      {% for item in site.data.profile.previous_mathematics %}
        <article>
          <h3>{{ item.title }}</h3>
          <p class="muted">{{ item.context }}</p>
        </article>
      {% endfor %}
    </div>
    <a class="text-link" href="{{ '/previous-work/' | relative_url }}">Project notes and context <span aria-hidden="true">→</span></a>
  </div>
</section>
