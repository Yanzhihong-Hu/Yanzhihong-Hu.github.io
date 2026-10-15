# Design brief: a personal pixel world in Atlanta

Prepared on October 15, 2026. This brief records the owner's established preferences and the local repository state. It is not a fresh audit of the live website.

## Intended result

Make this personal academic website feel like a quiet, lived-in 2D pixel neighborhood around Atlanta and Georgia Tech. Preserve the current identity while improving composition, spacing, visual consistency, and mobile usability. The site should make it easy to learn who Yanzhihong is, understand his current interests, browse earlier work, and contact him.

The owner explicitly asked for stronger pixel styling wherever key information remains readable. This is an existing working design to refine, not a blank-slate redesign.

## My design vision

I want my homepage to feel like a small pixel world where I live in Atlanta and study at Georgia Tech. It should have the atmosphere of the Soft Lipa-related RPG screenshots I supplied: relaxed, personal, quietly musical, and full of everyday city life. It should still work naturally as an academic personal website.

Make the design noticeably more pixelated. The city, campus, portrait, short headings, navigation, buttons, and borders can all embrace that style. Protect the readability of my name, biography, research interests, project descriptions, and contact information. Give the page a sparse pixel background rather than a completely flat backdrop, but leave plenty of quiet space.

### Scene and composition

Build a coherent campus neighborhood with depth: Atlanta's skyline in the distance, recognizable Georgia Tech architecture such as Tech Tower in the middle, and paths, trees, benches, and lamps in the foreground. Use a consistent raised 2D town-map perspective, pixel scale, palette, and light direction. Artistic rearrangement is welcome; do not call it an exact geographic reconstruction.

Keep the main scene concentrated in the hero. Let the rest of the page continue the same colors, pixel details, and border language without putting long passages over buildings or foliage. Keep a clean, opaque reading area for my introduction. Avoid buildings, windows, or branches running through text.

### My pixel portrait

Use my existing photograph as the identity reference. Keep recognizable features such as the middle-parted black hair, thick black glasses, face shape, and expression. Simplify them into clear pixel clusters and a limited palette that matches the campus illustration.

The existing head portrait is appropriate. Do not invent clothes or a full-body appearance that the photograph does not establish. Use the portrait once in a meaningful place rather than repeating it as decoration. A static portrait is enough; any idle animation should be very subtle and optional.

### Layout

On desktop, use a simple navigation bar and a composed first section that brings together my name, role, introduction, portrait, and campus scene. Make CV, previous work, and contact links immediately discoverable. Organize later sections through clear headings, spacing, and dividers, with layouts suited to their content.

On mobile, prioritize my name, role, introduction, and main links. Give the scene its own area when needed, preserving the important buildings and portrait. Let the content determine the height instead of forcing a full-screen composition. Preserve normal scrolling and avoid fixed backgrounds or mandatory parallax.

### Typography and interaction

Use pixel lettering for my name, short headings, navigation, and selected controls. Keep long prose in a clear ordinary font, at least 16px by default, with comfortable line spacing. Maintain normal Chinese font fallbacks and use properly licensed fonts.

Use crisp square or stepped borders, restrained hard shadows, and a few pixel separators. Buttons can shift slightly or change color on hover and press. Make every link or control recognizable and keyboard-accessible, with visible focus. At most, add one or two quiet environmental motions and disable them under reduced-motion preferences.

### What to avoid

Avoid crowded decoration, strong neon, large glass panels, a mosaic filter across the whole page, flashing, bouncing text, cursor trails, autoplay music, game controls, and a click-to-enter introduction. Keep this a usable personal website with the visual character of a pixel world.

## Reference evidence

The owner supplied three screenshots from a Soft Lipa-related RPG presentation. The screenshots showed:

- An overhead or raised 2D town-map view with clear outlines and visible pixel clusters.
- Rounded, layered green tree canopies, gray brick pavement, blue-gray roads, and cream or brick buildings.
- Small character sprites and low-saturation green, blue, gray, and warm yellow accents.
- Charcoal information/dialogue panels with pale stepped borders and restrained warm emphasis.

These observed features supersede the earlier dusk fallback direction. A dark reading surface remains a website design choice; do not describe it as an exact sampled album palette.

Reference URL: https://www.instagram.com/p/DdJdhatGzlg/

The initial fetch failed. The owner later supplied screenshots directly in the earlier conversation. Those original screenshot files are not stored in this repository. If you cannot view them in your session, state that limitation and use this recorded brief plus the existing artwork. Do not pretend to have reopened the reference, and do not stop useful implementation merely because the old attachment is unavailable.

## Current design inventory

| Item | Location | Role |
| --- | --- | --- |
| Homepage | `index.html` | Biography panel, portrait, campus scene, interests, education, work, teaching, life, contact |
| Shared profile | `_data/profile.yml` | Approved biography and factual content |
| Navigation | `_data/navigation.yml` | Teaching, Previous Work, Life, CV, Contact, Publications |
| Theme tokens | `_sass/_tokens.scss` | Shared palette, fonts, spacing, shadows |
| Pixel theme | `_sass/_pixel.scss` | Pixel frames, hero, typography, responsive overrides |
| Existing components | `_sass/_site.scss` | Base layout and secondary-page components |
| Main scene | `images/pixel/atlanta-campus-rpg.webp` | 1448 × 1086, roughly 256 KiB, full scene on mobile |
| Current portrait | `images/pixel/yanzhihong-rpg-portrait.webp` | Photo-based pixel head portrait, roughly 40 KiB |
| Identity reference | `images/Profile-editorial.webp` | Original face photograph; preserve it |
| Page texture | `images/pixel/campus-tiles.svg` | Sparse paving seams and grass-like clusters |
| Pixel font | `assets/type/PixelifySans.ttf` | Self-hosted; SIL OFL license in `assets/type/OFL.txt` |
| Artwork sources | `images/pixel/README.md` | Architecture references, rights, and generation prompts |

Current palette: gray-blue `#303c49`, charcoal panels `#293334`, cream text `#f2eddc`, pale frames `#c8cbb6`, warm gold `#e8be69`, sage green `#a2bd7e`. Treat these as a coherent starting point, not six colors to scatter indiscriminately.

The scene combines a raised campus view with distant skyline depth. It is an imagined composition, not an exact location. Keep Tech Tower's recognizable brick massing, central tower and pointed roof, and Atlanta's recognizable skyline. Consult the documented architectural references before materially redrawing either.

## Improvement priorities

1. **Strengthen the pixel-world identity.** Make the artwork, headings, navigation, frames, and background details feel like parts of one quiet RPG neighborhood. Keep visible pixel structure and generous breathing room. Prioritize the overall composition over adding more decoration.
2. **Improve the hero's rhythm.** Balance the biography panel and campus scene. Reduce unnecessary spacing and overly heavy framing where it helps. On phones, keep the name, role, and main links easy to reach while retaining the complete approved biography. Do not simply shrink the desktop layout.
3. **Make the interface more cohesive.** Refine pixel headings, navigation, number markers, borders, link affordances, and sparse background details. Use a few intentional motifs instead of adding decoration everywhere.
4. **Refine the reading experience.** Keep research, education, and work sections on stable opaque surfaces with generous but purposeful spacing. Preserve differences between sections rather than turning every paragraph into a card.
5. **Check secondary pages.** Carry the same design logic through About, Research, Teaching, Previous Work, Life, CV, Contact, and Publications. Preserve gallery and print functionality.

Artwork replacement is optional. Prefer improving the current assets' placement and framing first. If a redraw materially improves the result, use an available image tool, preserve originals, and match the portrait and scene's pixel scale and palette. A photo resized with nearest-neighbor sampling must be described as a pixelated photo, not hand-drawn pixel illustration.

## Approved biography

Keep this exact text, maintained in `_data/profile.yml`:

> I am a Ph.D. student in Mathematics at the Georgia Institute of Technology. My research interests lie broadly in machine learning, with a current focus on LLM reasoning, agentic AI, and multi-agent systems. I am particularly interested in how AI agents can reason, use tools, and collaborate efficiently and reliably under limited computational resources. I received my B.S. in Mathematics from the University of Illinois Urbana-Champaign.

Research Interests:

> Machine Learning · LLM Reasoning · Agentic AI · Multi-Agent Systems

Keep the research descriptions exploratory. Do not imply completed agent research, funded projects, new publications, or advisor relationships. Existing historical mathematical work remains valid content.

## Historical state and visual evidence

- Local branch at preparation: `master`; latest commit: `48f6d45` (asset cache versioning). Earlier visual redesign: `fad00e3`.
- Git remote: `https://github.com/Yanzhihong-Hu/Yanzhihong-Hu.github.io.git`.
- Public URL: `https://yanzhihong-hu.github.io/`.
- Both commits were deployed successfully in the earlier session. Verify current remote and live state before any future release.
- `../preview/rpg-desktop-1440.png` and `../preview/rpg-mobile-390.png` are actual captures of the previous implementation, not the owner's inspiration screenshots. The mobile capture is tall and should not be mistaken for a typical phone's visible first screen.
- `../preview/VERIFICATION.md` and `../preview/visual-check-rpg.html` are historical local evidence. They live outside Git and may be absent in a fresh clone. These files document earlier iterations; use them as visual baselines, not as a current task list.
