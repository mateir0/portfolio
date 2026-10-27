# Voidfolio — Fidelity Table

This document is the design-language roadmap extracted from studying the Voidfolio
template (used strictly as a *fidelity reference*, not copy). Every section below
maps Voidfolio's feel onto this portfolio's own original code, copy, tokens and
assets. Build against this table, section by section.

The reference homepage flows (single scrolling page):

> Hero ("Under the void") → horizontal mono index strip → Statement/Practice →
> Selected work index (number rows, colour plates develop at cursor) → Contact
> sheet (35 mm film strip) → Services ("Four ways in") → Odometer ("Since") →
> Lab (experiments) → Record (record log table) → Status ("Now") → Contact →
> Footer wordmark that sinks into grain.

## Shared language

| Element | Voidfolio behaviour | Fidelity target here |
|---|---|---|
| Base | Pure black void with real film grain | `#060605` void; film grain everywhere via canvas |
| Type | Large serif display + technical mono labels | Fraunces (serif display), Inter (body), JetBrains Mono (labels/specs/logs) |
| Grain | 60 fps animated monochrome film grain, idle drift, still fallback on reduced motion | Canvas engine, pauses off-screen/tab-hidden, throttles on low power, static fallback on `prefers-reduced-motion` |
| Reveal | Cursor "develops" hidden colour work out of monochrome grain, then sinks back | Canvas mask develop (not a fade/opacity swap); re-grains with amber flecks on exit |
| Spacing | Generous negative space, airy columns | Large padding fluid across viewport; mono eyebrow labels with hairline rules |

## Sections

### 1. Top index strip (02 Index)
Reference: a tight horizontal mono strip — name, role, location, "Now" status,
stack, record. Fidelity: one mono line across the header area listing
`Muhammad Hashir · Full-Stack Developer · Muscat, Oman · ● Available · Next.js TypeScript Supabase`. Scroll hides it gently.

### 2. Hero (01 — Under the void) + decoding spec sheet
Reference: apparently-empty grain field; cursor develops a hidden plate out of the
grain, then it sinks back to grain with tiny specks. A "Click to switch · 01/NN"
plate. Below/inside: decoding spec sheet rows typewriter-stagger on load.
Fidelity:
- Full-viewport hero. Cursor develops a build-in-code plate (layered amber/teal
  gradient + oversized serif "HASHIR") out of monochrome grain via a canvas mask.
- Headline: `Muhammad Hashir` (ivory serif) / `Full-Stack Developer — I build and
  ship products solo.` (amber on key words) / location.
- Decoding spec sheet (mono): NAME / DISCIPLINE / BASE / STACK / STATUS (green
  availability dot) / RESPONSE — rows appear with a decode/typewriter stagger.
- Global Lenis smooth scroll + GSAP.

### 3. Statement (03 — Practice)
Reference: message that develops word-by-word out of grain on scroll; selected
key words stay amber.
Fidelity: statement develops word-by-word on scroll; amber key words.

### 4. Work index (04 — Selected work)
Reference: large numbered rows; the cover plate develops its colour out of grain at
the cursor; title takes the project colour; year + stack in mono.
Fidelity: five rows in the exact required order, each with a per-project colour
plate (grain + colour gradient + oversized serif initials) developed at the cursor.
Mono year `2026` + stack. Row 2 and row 5 render a disabled label, no link.

### 5. Services (06 — "Four ways in")
Reference: numbered ○ list rows, each a service.
Fidelity: three services, each with a WhatsApp CTA.

### 6. Odometer (07 — "Since")
Reference: a rolling years/numbers odometer strip.
Fidelity: odometer-style counter line — `Products live: 3 · Quests published: 73 · Platforms built end-to-end: 5+`. Static text from content, subtle roll-in on scroll.

### 7. Lab (08 — experiments)
Reference: a horizontal film-strip of practice plates with mono captions.
Fidelity: horizontal lab strip — two have external links, two are development
captions. Mono captions.

### 8. Record log (09 — Record)
Reference: a technical record log with a sweeping scanline.
Fidelity: mono log rows (macro timeline + education) with a soft scanline pulse
over the list. Odometer counters sit here or adjacent.

### 9. About (11.5)
Copy: full-stack dev in Muscat (previously Lahore), ships products solo, open to
remote full-stack roles + client builds worldwide.

### 10. Contact (11 — Contact) + contact sheet strip
Reference: giant "Start a project →" link; email that develops on hover; contact
sheet frame strip.
Fidelity:
- Email `offxhashir@gmail.com` develops out of grain on hover (mailto).
- Buttons: WhatsApp, GitHub, LinkedIn (exact URLs).
- A contact-sheet style mono strip for fidelity of the reference's film strip.
- **No form element** (buttons only).

### 11. Footer
Reference: giant wordmark that sinks into amber/teal grain.
Fidelity: giant `HASHIR` wordmark sinking into amber/teal grain + `Designed &
built by Muhammad Hashir` + © year.

## Reduced-motion mode
Every animated system has a static path: no Lenis, no grain animation, no
auto-moving reveals — content shows statically. Touch devices get tap/scroll
reveals instead of cursor-driven ones (plates reveal on tap / in view).

## Verdict gates per section
- Generous negative space, large serif display type, mono labels, real grain,
  weighted/spring motion. Tight Tailwind default spacing or instant appearance =
  redo.
- Never spacing-named `max-w-*`/`min-w-*` utilities — use bracket values or
  `max-w-3xl`/`max-w-6xl`.