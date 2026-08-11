---
layout: page
permalink: /about/
title: "About"
eyebrow: "Profile · 01"
intro: "I am a Mathematics Ph.D. student at the Georgia Institute of Technology, interested in probability, random matrices, and random geometry."
description: "About Yanzhihong Hu, a Mathematics Ph.D. student at Georgia Tech."
---
<section class="content-grid reveal">
  <div class="content-grid__label"><p>Overview</p></div>
  <div class="content-grid__main prose-large">
    <p>My mathematical background is in topology, geometric group theory, geometry, and algebra. Earlier projects included work on 4-manifolds and Kirby calculus, knot-theoretic questions, integral affine manifolds, and Poisson structures.</p>
    <p>My current research interests are probability, random matrices, and random geometry. These are directions of study rather than claims of completed research.</p>
  </div>
</section>

<section class="content-grid reveal" aria-labelledby="education-title">
  <div class="content-grid__label"><p>Education</p></div>
  <div class="content-grid__main">
    <h2 id="education-title" class="visually-hidden">Education</h2>
    <div class="record-list">
      {% for item in site.data.profile.education %}
        <article class="record-list__item">
          <p class="record-list__period">{{ item.period }}</p>
          <div>
            <h3>{{ item.degree }}</h3>
            <p>{{ item.institution }}</p>
            <p class="muted">{{ item.location }}</p>
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="content-grid reveal" aria-labelledby="approach-title">
  <div class="content-grid__label"><p>Approach</p></div>
  <div class="content-grid__main prose-large">
    <h2 id="approach-title">Research interests change; standards of care should not.</h2>
    <p>I distinguish on this site between previous projects, present areas of focus, and subjects I am still learning. That distinction matters: curiosity is not the same as a finished result.</p>
    <p>My earlier mathematical work remains part of this record, while my present direction is centered on probability, random matrices, and random geometry.</p>
  </div>
</section>
