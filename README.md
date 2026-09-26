# Yanzhihong Hu — Academic Website

Personal academic website for Yanzhihong Hu, built with Jekyll and deployed through GitHub Pages.

## Structure

- `index.html` — pixel campus home page
- `_pages/` — About, Research, Teaching, Previous Work, Life, CV, Contact, and Publications
- `_data/profile.yml` — shared factual content used across pages
- `_data/gallery.yml` and `_data/music.yml` — editable personal gallery and listening selections
- `_data/navigation.yml` — primary navigation
- `_layouts/` and `_includes/` — reusable document shell, header, footer, and SEO
- `_sass/_tokens.scss` — design tokens
- `_sass/_site.scss` — existing responsive components
- `_sass/_pixel.scss` — RPG-inspired theme, pixel frames, and responsive campus hero
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

Open <http://localhost:4000/>. Jekyll 3 rewrites the development site URL to `localhost`; use this hostname so the self-hosted font and manifest stay on the same origin.

Build with the same GitHub Pages dependency set:

```sh
bundle exec jekyll build
```

No separate JavaScript build step or npm dependency is required for the redesigned site.

## Pixel campus theme

The homepage uses an Atlanta / Georgia Tech pixel neighborhood and a portrait redrawn from the existing profile photograph. Gray-blue paving details, cream stepped frames, sage green and warm gold follow the owner's supplied RPG screenshots. Headings, navigation and buttons use the self-hosted pixel font; long-form text remains in a readable system font on opaque backgrounds. Navigation, the gallery dialog, and the CV print/save action remain available. No autoplay, game engine, tracking, or additional frontend dependencies were added.

Artwork sources, font licensing, and the built-in imagegen prompts are recorded in [`images/pixel/README.md`](images/pixel/README.md). The scene is an imagined composition, not an exact geographic reconstruction. The first version used the requested dusk fallback; the current version follows the three subsequently supplied screenshots. Original photos and earlier generated artwork remain intact.

Validation covered the home, teaching, previous work, life, CV, contact, and publications pages at 1440, 768, and 390 CSS pixels, including reduced-motion behavior, image/font loading, horizontal overflow, menu/gallery actions, and CV print dispatch. The visual redesign preserved original content. The subsequent profile update uses the owner-provided biography and machine learning / LLM reasoning / agentic AI / multi-agent interests in `_data/profile.yml`; previous mathematical projects and teaching records are retained.
