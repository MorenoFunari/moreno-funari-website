# Blog MDX

I contenuti del blog vivono in questa cartella e devono essere file `.mdx` diretti, senza sottocartelle.

## Nuovo articolo

1. Crea un file con nome slug: `quando-ti-senti-bloccato.mdx`.
2. Usa solo lettere minuscole, numeri e trattini singoli.
3. Inserisci il frontmatter YAML richiesto.
4. Nel corpo MDX parti da `##`: il titolo `h1` viene generato dalla pagina.

```mdx
---
title: "Titolo dell'articolo"
description: "Descrizione breve e concreta dell'articolo."
publishedAt: "2026-06-28"
updatedAt: "2026-06-28"
category: "consapevolezza"
tags:
  - blocco
  - fiducia
draft: true
featured: false
coverImage:
coverAlt:
---

## Primo sottotitolo

Testo dell'articolo.

<Callout title="Da ricordare">
  Un passaggio breve da mettere in evidenza.
</Callout>

<ReflectionPrompt title="Una domanda per te">
  Quale passo piccolo e sostenibile puoi osservare oggi?
</ReflectionPrompt>
```

## Campi

`draft: true` rende l'articolo visibile solo in sviluppo locale e lo esclude dalla build di produzione e dalla sitemap.

`featured` prepara un possibile uso editoriale futuro, ma non cambia ancora la pubblicazione.

Le date future restano escluse dalla produzione finche non arriva un nuovo deploy dopo quella data.

Le cover sono opzionali. Se presenti, usa immagini locali in `public/images/blog/` e valori come `/images/blog/nome-immagine.webp`; `coverImage` e `coverAlt` devono esserci insieme.

## Categorie disponibili

Ogni articolo deve avere una sola `category` e il valore deve essere lo slug, non l'etichetta visibile. Usa i `tags` per temi più specifici, sfumature o parole chiave secondarie.

| Slug | Etichetta | Uso editoriale |
| --- | --- | --- |
| `consapevolezza` | Consapevolezza | Osservare pensieri, reazioni e abitudini per capire con maggiore chiarezza ciò che sta accadendo. |
| `fiducia-e-azione` | Fiducia e azione | Fare un primo passo anche quando la sicurezza non è ancora completa. |
| `pressione-e-lavoro` | Pressione e lavoro | Responsabilità, aspettative, autocritica e lucidità nei momenti professionali più intensi. |
| `sport-e-mentalita` | Sport e mentalità | Errore, presenza, concentrazione, rispetto e capacità di tornare nell’azione successiva. |
| `vita-quotidiana` | Vita quotidiana | Cambiamenti, relazioni, stanchezza e piccoli gesti concreti nelle situazioni di ogni giorno. |

Non creare nuove categorie direttamente nei file MDX. Una nuova categoria richiede prima una modifica a `src/config/blog-categories.ts` e una revisione editoriale della tassonomia.

## Anteprima locale

Avvia `npm run dev` e visita `/blog/slug-del-file`. Le bozze e gli articoli futuri sono visibili solo in development.
