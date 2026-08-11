---
layout: page
title: "Curriculum Vitae"
permalink: /cv/
redirect_from:
  - /resume
eyebrow: "Record · 06"
intro: "A current web record of education, research interests, teaching, and earlier mathematical work."
description: "Curriculum vitae of Yanzhihong Hu."
---
<section class="cv-panel reveal" aria-labelledby="cv-file-title">
  <div>
    <p class="eyebrow">Web record · Current</p>
    <h2 id="cv-file-title">Academic record</h2>
    <p>This page replaces the outdated PDF while the full document is being revised.</p>
  </div>
  <div class="cv-panel__actions">
    <button class="button button--quiet" type="button" data-print-page>Print / save as PDF <span aria-hidden="true">↓</span></button>
  </div>
</section>

<section class="content-grid reveal">
  <div class="content-grid__label"><p>Education</p></div>
  <div class="content-grid__main">
    <div class="record-list">
      {% for item in site.data.profile.education %}
        <article class="record-list__item">
          <p class="record-list__period">{{ item.period }}</p>
          <div><h3>{{ item.degree }}</h3><p>{{ item.institution }}</p></div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="content-grid reveal" aria-labelledby="cv-interests-title">
  <div class="content-grid__label"><p>Interests</p></div>
  <div class="content-grid__main">
    <h2 id="cv-interests-title" class="visually-hidden">Research interests</h2>
    <ul class="topic-list">
      {% for item in site.data.profile.research.current %}
        <li><span>0{{ forloop.index }}</span><h3>{{ item.title }}</h3><p>{{ item.note }}</p></li>
      {% endfor %}
    </ul>
  </div>
</section>

<section class="content-grid reveal" aria-labelledby="cv-teaching-title">
  <div class="content-grid__label"><p>Teaching</p></div>
  <div class="content-grid__main">
    <h2 id="cv-teaching-title" class="visually-hidden">Teaching</h2>
    {% assign teaching_sorted = site.teaching | sort: 'date' | reverse %}
    <div class="compact-work-list">
      {% for course in teaching_sorted %}
        <article>
          <h3>{{ course.title }}</h3>
          <p class="muted">{{ course.term }} · {{ course.venue }}</p>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="content-grid reveal" aria-labelledby="cv-previous-title">
  <div class="content-grid__label"><p>Previous work</p></div>
  <div class="content-grid__main">
    <h2 id="cv-previous-title" class="visually-hidden">Previous mathematical work</h2>
    <div class="compact-work-list">
      {% for item in site.data.profile.previous_mathematics %}
        <article><h3>{{ item.title }}</h3><p class="muted">{{ item.context }}</p></article>
      {% endfor %}
    </div>
  </div>
</section>
