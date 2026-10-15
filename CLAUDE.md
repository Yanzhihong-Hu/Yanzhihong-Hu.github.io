# Claude Code project guide

This is Yanzhihong Hu's existing academic website. Improve the working site in place. Deliver runnable changes and a local preview, not just design advice.

## Start here

1. Start with `_handoff/DESIGN_BRIEF.md` and `_handoff/CLAUDE_PROMPT.md` for the owner's design direction. Use `README.md` and `_handoff/VERIFICATION.md` for implementation and review.
2. Inspect `git status --short` and the diff before editing. Preserve work already present, including the handoff files. Check for more specific repository instructions in directories you edit.
3. Read the actual templates, theme tokens, shared profile data, and asset provenance before proposing changes.
4. Briefly state the design direction, then implement. Make routine design decisions independently. Ask only for missing facts or evidence that materially affects correctness.

## Architecture and commands

- Keep Jekyll, Liquid templates, SCSS, Bundler, the existing npm setup, routes, and GitHub Pages deployment. Do not migrate to React, Next.js, another framework, a hosting service, or a game engine.
- The stylesheet entry point is `assets/css/main.scss`; its import order is `tokens`, `site`, then `pixel`. `_sass/_pixel.scss` overrides the existing components in `_sass/_site.scss`.
- Preserve release-versioned asset URLs in `_includes/head.html` and `_includes/scripts.html`.
- The active interaction script is `assets/js/site.js`. The npm scripts build an older theme bundle; they are not required for the current interface. Do not regenerate that bundle unnecessarily.
- Run commands from this repository root:

```sh
bundle check
bundle exec jekyll serve --config _config.yml,_config.dev.yml --host 127.0.0.1 --port 4000
```

Open `http://localhost:4000/`. Jekyll 3 rewrites the development URL to `localhost`; using `127.0.0.1` in the browser previously caused font/manifest origin mismatches. Check whether a preview server already exists before starting another one. Restart Jekyll after configuration changes.

```sh
bundle exec jekyll build
node --check assets/js/site.js
git diff --check
```

Use the existing dependency versions. Install missing dependencies only when necessary; do not run a general dependency upgrade for a visual change. `_site/` is generated output, never the source of an edit.

## Content that must remain accurate

- `_data/profile.yml` is the source of truth for the biography, education, current interests, historical projects, and contact details.
- Keep the owner's exact English biography and the four current interests: Machine Learning, LLM Reasoning, Agentic AI, Multi-Agent Systems.
- Use exploratory wording such as "interested in" and "currently exploring." Do not invent results, publications, projects, affiliations, dates, awards, or personal details.
- Do not mention an advisor or advising relationship on the homepage. Do not add Generative Models or Physical AI as primary interests. Preserve historical mathematical work and teaching records.
- Preserve existing navigation destinations, external profiles, email, document links, SEO, heading hierarchy, image alternatives, and keyboard functionality. Do not activate inherited unpublished sample content.
- `/cv/` is currently a web CV with a Print / save as PDF action. Its old PDF is explicitly outdated; do not relabel it as a current download.

## Design and implementation rules

- Continue the owner's screenshot-led 2D RPG pixel style: Atlanta and Georgia Tech, outlined trees, gray paving, muted greens/blues/cream, and dark panels with stepped pale borders.
- Keep the overall design calm and spacious. Make the pixel art and interface feel coherent; avoid a generic dashboard or a grid of identical cards.
- Use pixel typography for names, headings, navigation, and short controls. Use clear system fonts for paragraphs, at least 16px by default, with comfortable line height and Chinese fallbacks.
- Use `_sass/_tokens.scss` for shared colors, typography, spacing, and shadows. Avoid accumulating conflicting overrides; edit the appropriate existing rule.
- Keep text, links, and controls as real HTML. Reserve image dimensions, compress artwork, prioritize necessary hero assets, and lazy-load secondary photos.
- Apply `image-rendering: pixelated` only to suitable pixel assets. It does not turn a high-resolution photo into pixel art. Do not filter the whole page or assemble a complex city from hundreds of DOM nodes.
- Preserve source photos and old artwork. New raster assets need descriptive filenames and provenance/prompt records in `images/pixel/README.md`. Use a real image-generation/editing tool only if available; do not claim a placeholder is finished artwork.
- Keep the photo-based portrait recognizable. The existing photograph establishes hair, glasses, face, and neck, but not clothing; do not invent a full-body outfit.
- Keep interactive states visible beyond color alone. Preserve keyboard focus, menu Escape behavior, gallery controls, and reduced-motion support. No autoplay music, flashing, cursor trails, forced parallax, or entrance screen.
- Treat any `sources/` or explicitly read-only reference folder as read-only.

## Delivery and publication

Deliver a locally reviewable version with screenshots where tools permit, a concise change summary, commands run, and honest remaining limitations. Do not treat historical verification as a fresh test.

This handoff requests local implementation and review. It does not request a new push or deployment. Follow the owner's current instructions if they explicitly authorize publication; do not ask again for the same authorization. Never force-push or overwrite remote work as part of a visual refresh.

`CLAUDE.md` and `_handoff/` are development guidance and are excluded from the generated website.
