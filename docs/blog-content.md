# Blog content

Il blog pubblica contenuti MDX da `content/blog/`. La pagina `/blog` e la route dinamica `/blog/[slug]` leggono i file tramite `src/lib/blog/blog-content.ts`; la sitemap usa la stessa fonte dati.

## Articoli pubblicati

Gli articoli pubblici sono otto. Lo Sprint Articoli SEO 2 ha aggiunto il contenuto nativo "Chiudere il computer non basta: come lasciare il lavoro fuori dal resto della giornata", progettato per il cluster lavoro, carico mentale e confini:

1. `come-staccare-dal-lavoro-a-fine-giornata`

Lo Sprint Articoli SEO 1 ha aggiunto due contenuti nativi progettati a partire da query e intenti di ricerca:

2. `mental-coach-e-psicologo-qual-e-la-differenza`
3. `perche-rimandi-anche-quando-sai-cosa-dovresti-fare`

Gli altri articoli pubblicati sono:

4. `quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita`
5. `responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto`
6. `dopo-un-errore-torna-all-azione-successiva`
7. `la-fiducia-arriva-dopo-il-primo-passo`
8. `ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene`

## Evidenza e ordinamento

L'articolo in evidenza è `quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita`, tramite `featured: true`.

Gli articoli sono ordinati per `publishedAt` decrescente e, a parità di data, per titolo in italiano. L'articolo dello Sprint Articoli SEO 2 è il più recente; il contenuto con `featured: true` resta mostrato nella sezione principale del Blog.

## Prossimi articoli suggeriti

- "Come smettere di controllare tutto senza sentirti irresponsabile"
- "Paura di sbagliare nello sport: come tornare all’azione successiva"

## Metadata e sitemap

Ogni file MDX definisce `title`, `description`, `publishedAt`, `updatedAt`, `category`, `tags`, `draft` e `featured`. Il campo opzionale `excerpt` viene usato nelle card del Blog quando serve distinguere estratto editoriale e meta description. La route articolo genera canonical, Open Graph, Twitter Card, robots e JSON-LD `BlogPosting` da questi campi.

La sitemap `/sitemap.xml` include automaticamente gli articoli pubblicati usando gli URL canonici del dominio `https://morenofunari.it`.
