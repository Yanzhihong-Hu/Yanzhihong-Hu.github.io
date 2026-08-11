---
layout: page
title: "Publications"
permalink: /publications/
eyebrow: "Bibliography"
description: "Publications and preprints by Yanzhihong Hu."
---
{% assign verified_publications = site.publications | where_exp: "item", "item.sample != true" | sort: "date" | reverse %}
{% if verified_publications.size > 0 %}
  <div class="publication-catalogue reveal">
    {% assign current_year = '' %}
    {% for publication in verified_publications %}
      {% assign publication_year = publication.date | date: '%Y' %}
      {% if publication_year != current_year %}
        <h2 class="publication-catalogue__year">{{ publication_year }}</h2>
        {% assign current_year = publication_year %}
      {% endif %}
      <article class="publication-entry">
        <h3><a href="{{ publication.url | relative_url }}">{{ publication.title }}</a></h3>
        {% if publication.authors %}<p class="publication-entry__authors">{{ publication.authors }}</p>{% endif %}
        {% if publication.venue %}<p class="publication-entry__venue">{{ publication.venue }}</p>{% endif %}
        <div class="publication-entry__links">
          {% if publication.paperurl %}<a href="{{ publication.paperurl }}">PDF</a>{% endif %}
          {% if publication.doi %}<a href="{{ publication.doi }}">DOI</a>{% endif %}
          {% if publication.arxiv %}<a href="{{ publication.arxiv }}">arXiv</a>{% endif %}
          {% if publication.bibtex %}<a href="{{ publication.bibtex }}">BibTeX</a>{% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
{% endif %}
