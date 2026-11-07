# FK Dev Labs – byråsajt

Sajten som presenterar byrån och tar emot beställningar. Astro 7 + Decap CMS, deployas på Netlify.

## Utveckling

```bash
npm install
npm run dev      # http://localhost:4321
npm run cms      # i en andra terminal – lokal Decap-backend, redigera på http://localhost:4321/admin/
npm run build    # bygger till dist/
```

## Struktur

| Vad | Var |
| --- | --- |
| Företagsuppgifter, startsidans texter, tjänster, steg, tillval, FAQ, om oss | `src/data/settings.json` |
| Paket & priser | `src/content/paket/*.md` |
| Kundcase | `src/content/arbeten/*.md` (skärmdumpar i `public/images/arbeten/`) |
| Beställningsformulär (Netlify Forms) | `src/components/OrderForm.astro` |
| CMS-konfiguration | `public/admin/config.yml` |
| Design / färger / typsnitt | `src/styles/global.css` (variabler i `:root`) |

Allt i tabellen utom formuläret och stilarna kan redigeras i adminverktyget på `/admin/`.

## Beställningar

Formuläret `bestallning` på `/bestall/` hanteras av Netlify Forms. Länka till ett förvalt paket med
`/bestall/?paket=<filnamn>`, t.ex. `/bestall/?paket=foretag`.

## Sätta upp på Netlify

1. Pusha repot till GitHub och skapa en ny sajt i Netlify från repot (bygginställningar läses från `netlify.toml`).
2. **Forms:** Site configuration → Forms → *Enable form detection*. Deploya igen. Ställ in e-postnotis under
   Forms → Form notifications så att beställningar hamnar i inkorgen.
3. **Identity:** Site configuration → Identity → *Enable*. Sätt *Registration* till *Invite only*.
4. **Git Gateway:** Identity → Services → *Enable Git Gateway*.
5. Bjud in er själva under Identity → *Invite users*, och logga sedan in på `/admin/`.
6. Byt `site` i `astro.config.mjs` och `site_url`/`display_url` i `public/admin/config.yml` till den riktiga domänen.

Ändringar från CMS:et går via *editorial workflow* (utkast → granskning → publicera) och committas till `main`.
