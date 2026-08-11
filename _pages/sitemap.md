---
layout: page
title: "Sitemap"
permalink: /sitemap/
eyebrow: "Index"
description: "Main pages on Yanzhihong Hu's academic website."
---
<nav class="topic-list reveal" aria-label="Sitemap">
  <ul>
    <li><span>01</span><h3><a href="{{ '/' | relative_url }}">Home</a></h3></li>
    {% for link in site.data.navigation.main %}
      <li><span>0{{ forloop.index | plus: 1 }}</span><h3><a href="{{ link.url | relative_url }}">{{ link.title }}</a></h3></li>
    {% endfor %}
  </ul>
</nav>
