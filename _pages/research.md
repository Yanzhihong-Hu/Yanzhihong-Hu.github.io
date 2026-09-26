---
layout: page
permalink: /research/
title: "Research Interests"
eyebrow: "Questions · 02"
intro: "My research interests lie broadly in machine learning, with a current focus on LLM reasoning, agentic AI, and multi-agent systems. I am currently exploring how reasoning, tool use, and collaboration among AI agents can help allocate limited computational resources to improve efficiency and reliability."
description: "Yanzhihong Hu’s research interests: machine learning, LLM reasoning, agentic AI, and multi-agent systems."
---
<section class="research-status reveal" aria-labelledby="current-direction-title">
  <div class="section-heading-row">
    <h2 id="current-direction-title">{{ site.data.profile.research.current | map: 'title' | join: ' · ' }}</h2>
    <p>Directions I am currently exploring.</p>
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
