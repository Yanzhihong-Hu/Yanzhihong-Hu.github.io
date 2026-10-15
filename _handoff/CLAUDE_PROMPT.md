# My website design brief — prompt for Claude Code

Please continue beautifying my existing personal website. Implement the changes in the current project and provide a working local preview, not just design suggestions.

Read `CLAUDE.md` and `_handoff/DESIGN_BRIEF.md` first. Use `README.md`, `_handoff/VERIFICATION.md`, and `images/pixel/README.md` for technical details, checks, and asset sources. Inspect existing changes and preserve my uncommitted work.

## The feeling I want

I want the website to feel like a small pixel world where I live in Atlanta and study at Georgia Tech. Follow the visual atmosphere of the Soft Lipa-related RPG screenshots I supplied: a quiet 2D town, outlined trees, gray brick paths, blue-gray roads, cream and brick buildings, and dark information panels with pale stepped borders.

Make the design more distinctly pixelated while keeping essential information easy to read. I want a relaxed, personal, lived-in city atmosphere with the thoughtful composition of a music cover. Keep the current design identity and improve its execution. Add sparse pixel texture to the background, with plenty of breathing room.

## The campus scene and my portrait

Use one coherent Atlanta / Georgia Tech scene: recognizable Atlanta skyline in the distance, Tech Tower and campus architecture in the middle, and paths, greenery, benches, and lamps in the foreground. Keep the perspective, pixel scale, colors, and lighting consistent. This can be an imagined neighborhood, not an exact geographic reconstruction.

Use the existing scene and my photo-based pixel portrait as the starting point. Preserve my recognizable hair, glasses, face shape, and expression. My photo does not establish clothing, so keep the head portrait instead of inventing an outfit. Do not replace me with a random character or repeat the portrait throughout the page.

Concentrate the detailed artwork in the homepage hero. Keep text on clean, opaque surfaces, with no building edges or foliage crossing my name or biography. Extend the same palette and pixel details into later sections without making every section an identical card.

## Layout, type, and interaction

On desktop, compose my name, role, introduction, portrait, and campus scene together. Keep navigation simple and make CV, previous work, and contact links easy to find. Give each existing content section clear hierarchy, spacing, and appropriate separators.

On mobile, prioritize my information and primary links, then give the scene an intentional place with important landmarks intact. Adapt the layout instead of shrinking the desktop page. Use natural content height and normal scrolling.

Use pixel fonts for my name, short headings, navigation, and selected controls. Keep long paragraphs in a clear ordinary font, at least 16px by default, with comfortable line height and Chinese fallbacks. Use crisp square or stepped borders, restrained hard shadows, and subtle button feedback. Keep visible keyboard focus and respect reduced-motion settings.

Avoid dense decoration, neon, large glass effects, whole-page mosaic filters, flashing, bouncing text, cursor trails, autoplay music, game systems, forced parallax, and a click-to-enter screen.

## Keep my information and website intact

Keep the exact biography in `_data/profile.yml`. My current Research Interests are:

Machine Learning · LLM Reasoning · Agentic AI · Multi-Agent Systems

Use exploratory wording such as “interested in” and “currently exploring.” Do not add unconfirmed achievements, projects, publications, or advisor relationships to the homepage. Do not add Generative Models or Physical AI as primary interests. Preserve my earlier mathematical work, education, teaching, real links, gallery, and CV print/save function.

Keep Jekyll, Liquid, SCSS, Bundler, the existing routes, and GitHub Pages deployment. Do not migrate frameworks or introduce a game engine or large dependencies. Use shared theme variables and real HTML text and controls. Preserve original images and document any new artwork. If reference screenshots or image tools are unavailable, say so honestly and continue with the existing assets.

## Carry the design through to completion

Briefly explain the visual direction, then implement it. Make routine design choices independently. Prioritize homepage composition, stronger pixel character, and consistency across the existing pages.

Run the project build and relevant checks. Review approximately 1440px desktop, 768px tablet, and 390px mobile layouts. Check readability, overflow, navigation, links, image loading, keyboard access, reduced motion, the gallery, and CV printing. Provide desktop and mobile screenshots if tools permit.

Finish with a concise English summary, the local preview URL, the checks performed, and any remaining limitations. Deliver a locally reviewable version; do not push or deploy as part of this task.
