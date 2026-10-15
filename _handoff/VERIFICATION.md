# Visual and functional verification

## Handoff preparation checks — October 15, 2026

`bundle check`, `bundle exec jekyll build --destination /tmp/personal-site-claude-handoff-build`, `node --check assets/js/site.js`, and `git diff --check` passed during preparation. The generated output contained the main pages and pixel assets and excluded `CLAUDE.md` and `_handoff/`. No visual source files were changed, no new device test was performed, and nothing was pushed or deployed. These checks validate the handoff package; repeat relevant checks after making design changes.

## Interface refinement checks — October 15, 2026

After the dialogue-box hero, map legend, interest status bar, pixel separators and interior-page refinements: `bundle check`, `bundle exec jekyll build` (to a scratch destination), `node --check assets/js/site.js` and `git diff --check` passed; `CLAUDE.md` and `_handoff/` were absent from the output. Browser checks used headless Microsoft Edge through puppeteer-core (emulated viewports, not physical devices): 1440, 1200, 1024, 768, 430, 390 and 360 px had no horizontal overflow. Pages checked: `/`, `/about/`, `/research/`, `/teaching/`, `/previous-work/`, `/life/`, `/cv/`, `/contact/` and `/publications/`, with no console errors or failed requests, the pixel font loading, and all 12 internal URLs returning success. Long paragraphs render at 16px or larger in the system font. Mobile menu open/Escape/focus return, gallery dialog open/Escape/focus return, visible keyboard focus, reduced-motion (transitions 0s) and CV print media (header and print button hidden) were exercised. External links and `mailto:` were not opened. Screenshots: `../preview/2026-10-15/`.

## Before editing

- Read `CLAUDE.md` and the design brief. Inspect the current Git diff and preserve existing changes.
- Review the actual homepage and representative secondary pages before changing them.
- Start or reuse a local Jekyll preview. Do not assume a server from the September session still runs.
- Record what you can reproduce. Keep confirmed defects separate from design improvements and hypotheses.

## Required review after visual changes

| View | Main checks |
| --- | --- |
| 1440px desktop | Navigation fits; hero balanced; text/image boundaries do not overlap |
| 768px tablet | Stacked layout is intentional; controls and section hierarchy remain clear |
| 390px mobile | Readable name/biography; usable links; full important scene details; no sideways scrolling |
| 360px and 430px spot checks | Narrow/wide phone edge cases, long labels, and font fallback |

Review `/`, `/about/`, `/research/`, `/teaching/`, `/previous-work/`, `/life/`, `/cv/`, `/contact/`, and `/publications/` where shared styles affect them.

- Confirm images and the pixel font load; inspect image alternatives and reserved dimensions.
- Exercise mobile menu open/close, Escape, keyboard focus, gallery open/close, and CV print/save behavior. Check email `mailto:` without sending a message.
- Check internal destinations and preserve existing external URLs. Do not claim every external service was tested merely because href values are unchanged.
- Check `prefers-reduced-motion: reduce` and visible focus states. Keep paragraph text at least 16px by default.
- Compare biography and interest labels with `_data/profile.yml`. Verify no original work/history was silently removed and no sample content was published.
- Inspect console and network failures; distinguish site failures from browser extension messages.
- Save desktop and phone screenshots in `../preview/` or another non-published local review directory. Record viewport, browser, and whether it is emulation or a physical device.

## Build checks

Run from the repository root:

```sh
bundle exec jekyll build
node --check assets/js/site.js
git diff --check
```

No `npm test` suite is declared in the existing package. Do not invent passing tests or install a large testing framework for a small visual change. Use focused checks proportionate to the implementation.

Jekyll's watcher may remove temporary files copied into `_site/`. Keep the authoritative test harness outside that generated folder. Do not publish local QA pages.

## Delivery

Report what changed, how to open the local preview, the exact checks run and their results, any missing artwork, and anything not reproduced or tested.

For an explicitly authorized release, inspect remote changes, build, commit the intended files, push normally, wait for the matching GitHub Pages deployment to succeed, and verify the public HTML and assets. Do not report "live" based only on a successful Git push.
