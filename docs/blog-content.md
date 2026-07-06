# Blog content

Il blog pubblica contenuti MDX da `content/blog/`. La pagina `/blog` e la route dinamica `/blog/[slug]` leggono i file tramite `src/lib/blog/blog-content.ts`; la sitemap usa la stessa fonte dati.

## Articoli pubblicati

Gli articoli pubblici sono cinque:

1. `quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita`
2. `responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto`
3. `dopo-un-errore-torna-all-azione-successiva`
4. `la-fiducia-arriva-dopo-il-primo-passo`
5. `ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene`

## Evidenza e ordinamento

L'articolo in evidenza è `quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita`, tramite `featured: true`.

Gli articoli sono ordinati per `publishedAt` decrescente e, a parità di data, per titolo in italiano. Gli articoli del 2026-07-07 compaiono quindi prima di quelli del 2026-06-28, con il featured mostrato nella sezione principale del Blog.

## Metadata e sitemap

Ogni file MDX definisce `title`, `description`, `publishedAt`, `updatedAt`, `category`, `tags`, `draft` e `featured`. Il campo opzionale `excerpt` viene usato nelle card del Blog quando serve distinguere estratto editoriale e meta description. La route articolo genera canonical, Open Graph, Twitter Card, robots e JSON-LD `BlogPosting` da questi campi.

La sitemap `/sitemap.xml` include automaticamente gli articoli pubblicati usando gli URL canonici del dominio `https://morenofunari.it`.
