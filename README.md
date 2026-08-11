# Yanzhihong Hu — Academic Website

Personal academic website for Yanzhihong Hu, built with Jekyll and deployed through GitHub Pages.

## Structure

- `index.html` — editorial home page
- `_pages/` — About, Research, Teaching, Previous Work, Life, CV, Contact, and Publications
- `_data/profile.yml` — shared factual content used across pages
- `_data/gallery.yml` and `_data/music.yml` — editable personal gallery and listening selections
- `_data/navigation.yml` — primary navigation
- `_layouts/` and `_includes/` — reusable document shell, header, footer, and SEO
- `_sass/_tokens.scss` — design tokens
- `_sass/_site.scss` — responsive component and page styles
- `assets/js/site.js` — mobile navigation, reduced-motion-aware reveals, and the accessible gallery viewer
- `_teaching/` — teaching collection
- `files/` and `images/` — preserved documents and media

The sample posts, talks, portfolio items, and publication entries inherited from Academic Pages remain in the repository for reference, but are marked `published: false` and are not presented as personal work.

## Local development

Install dependencies:

```sh
bundle install --path vendor/bundle
```

Start the local preview:

```sh
bundle exec jekyll serve --config _config.yml,_config.dev.yml --host 127.0.0.1 --port 4000
```

Open <http://127.0.0.1:4000/>.

Build with the same GitHub Pages dependency set:

```sh
bundle exec jekyll build
```

No separate JavaScript build step or npm dependency is required for the redesigned site.
