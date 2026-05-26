<script>
  import { site } from "$lib/data/site.config";
  import { serviceAreas } from "$lib/data/locations";
  import { servicePages } from "$lib/data/services";
  import { jsonLdScript } from "$lib/seo/jsonld";

  export let data;
  const { service } = data;
  const pageUrl = `${site.url}/services/${service.slug}`;
  const relatedServices = (service.relatedServiceSlugs ?? [])
    .map((slug) => servicePages.find((item) => item.slug === slug))
    .filter(Boolean);

  const getServiceJsonLd = () =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.titleFr,
      serviceType: service.titleFr,
      description: service.metaDescriptionFr ?? service.descriptionFr,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      areaServed: serviceAreas.map((area) => area.name),
      provider: {
        "@type": "LocalBusiness",
        name: site.brand,
        url: site.url,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "CA"
        }
      }
    });

  const getBreadcrumbJsonLd = () =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: site.url
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service.titleFr,
          item: pageUrl
        }
      ]
    });

  const getFaqJsonLd = () =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqFr.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    });
</script>

<svelte:head>
  <title>{service.metaTitleFr ?? `${service.titleFr} | ${site.brand}`}</title>
  <meta
    name="description"
    content={service.metaDescriptionFr ?? service.descriptionFr}
  />
  <meta name="keywords" content={service.keywordsFr.join(", ")} />
  <meta
    property="og:title"
    content={service.metaTitleFr ?? `${service.titleFr} | ${site.brand}`}
  />
  <meta
    property="og:description"
    content={service.metaDescriptionFr ?? service.descriptionFr}
  />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_CA" />
  <link rel="canonical" href={pageUrl} />
  {@html jsonLdScript(getServiceJsonLd())}
  {@html jsonLdScript(getBreadcrumbJsonLd())}
  {@html jsonLdScript(getFaqJsonLd())}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Urbanist:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="service-page">
  <header class="service-hero">
    <a class="back-link" href="/">Retour à l'accueil</a>
    <p class="eyebrow">Service CVAC local</p>
    <h1>{service.h1Fr}</h1>
    <p class="lead">{service.introFr}</p>
    <div class="cta-row">
      <a class="btn primary" href={site.phoneHref}>Appeler maintenant</a>
      <a class="btn secondary" href="/#contact">Obtenir une soumission</a>
    </div>
  </header>

  {#if service.contentSectionsFr}
    <section class="service-section content-block">
      <div>
        <p class="eyebrow">Information locale</p>
        <h2>{service.titleFr} : comprendre les options</h2>
        <p>
          Une page de service claire aide à choisir la bonne intervention :
          diagnostic, réparation, entretien, remplacement ou amélioration du
          confort.
        </p>
      </div>
      <div class="content-stack">
        {#each service.contentSectionsFr as section}
          <article>
            <p class="eyebrow">{section.eyebrow}</p>
            <h3>{section.title}</h3>
            <p>{section.text}</p>
          </article>
        {/each}
      </div>
    </section>
  {/if}

  <section class="service-section">
    <div>
      <p class="eyebrow">Ce qui est évalué</p>
      <h2>Une approche claire avant les travaux</h2>
      <p>
        Chaque demande est orientée selon le type d'équipement, l'état du
        système, les contraintes du bâtiment et l'urgence de la situation.
      </p>
    </div>
    <ul>
      {#each service.pointsFr as point}
        <li>{point}</li>
      {/each}
    </ul>
  </section>

  {#if service.checklistFr}
    <section class="service-section">
      <div>
        <p class="eyebrow">Besoins courants</p>
        <h2>{service.checklistTitleFr}</h2>
        <p>
          Les symptômes et objectifs ci-dessous aident à préciser la demande au
          moment de l'appel ou de la soumission.
        </p>
      </div>
      <ul class="check-list">
        {#each service.checklistFr as item}
          <li>{item}</li>
        {/each}
      </ul>
    </section>
  {/if}

  <section class="service-section service-areas">
    <div>
      <p class="eyebrow">Zones desservies</p>
      <h2>{site.city} et secteurs voisins</h2>
      <p>
        Les demandes sont prises pour Longueuil et les secteurs proches selon la
        disponibilité et le type d'intervention.
      </p>
    </div>
    <div class="area-links">
      {#each serviceAreas as area}
        <a href={`/areas/${area.slug}`}>{area.name}</a>
      {/each}
    </div>
  </section>

  {#if relatedServices.length}
    <section class="service-section related-services">
      <div>
        <p class="eyebrow">Services reliés</p>
        <h2>Pages utiles pour comparer les solutions</h2>
        <p>
          Consultez les pages complémentaires pour préciser le type de service
          CVAC recherché à {site.city}.
        </p>
      </div>
      <div class="related-grid">
        {#each relatedServices as related}
          <a href={`/services/${related.slug}`}>{related.titleFr}</a>
        {/each}
      </div>
    </section>
  {/if}

  <section class="service-section faq-block">
    <div>
      <p class="eyebrow">FAQ</p>
      <h2>Questions fréquentes</h2>
    </div>
    <div class="faq-grid">
      {#each service.faqFr as faq}
        <details>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      {/each}
    </div>
  </section>

  <section class="service-section contact-block">
    <p class="eyebrow">Soumission rapide</p>
    <h2>Parlez de votre besoin CVAC à {site.city}</h2>
    <p>
      Appelez directement ou envoyez une demande de soumission pour être
      rappelé.
    </p>
    <div class="cta-row centered">
      <a class="btn primary" href={site.phoneHref}>{site.phone}</a>
      <a class="btn secondary" href="/#contact">Formulaire de soumission</a>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Urbanist", sans-serif;
    background: #f6f4ef;
    color: #1b2a3a;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  .service-page {
    padding: 2.5rem 8vw 4rem;
    display: grid;
    gap: 2rem;
  }

  .service-hero,
  .service-section {
    background: #fff;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 18px 40px rgba(18, 34, 52, 0.12);
  }

  .service-hero {
    padding: 2.5rem;
  }

  .back-link {
    color: #5e6c7a;
    display: inline-block;
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  .eyebrow {
    color: #4bb3d4;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0 0 1rem;
    text-transform: uppercase;
  }

  h1,
  h2 {
    font-family: "Fraunces", serif;
    margin: 0 0 1rem;
  }

  h1 {
    font-size: clamp(2.4rem, 6vw, 4.6rem);
    line-height: 1;
  }

  h2 {
    font-size: clamp(1.7rem, 3vw, 2.4rem);
  }

  p,
  li {
    color: #5e6c7a;
    line-height: 1.7;
  }

  .lead {
    max-width: 760px;
    font-size: 1.1rem;
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .centered {
    justify-content: center;
  }

  .btn {
    align-items: center;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    display: inline-flex;
    font-weight: 700;
    justify-content: center;
    padding: 0.85rem 1.4rem;
  }

  .btn.primary {
    background: #f3b43f;
    box-shadow: 0 12px 24px rgba(243, 180, 63, 0.3);
    color: #1b2a3a;
  }

  .btn.secondary {
    background: #fff;
    border: 1px solid rgba(27, 42, 58, 0.15);
    color: #1b2a3a;
  }

  .service-section {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  }

  .service-section ul {
    display: grid;
    gap: 0.8rem;
    margin: 0;
    padding-left: 1.2rem;
  }

  .content-block {
    align-items: start;
  }

  .content-stack {
    display: grid;
    gap: 1rem;
  }

  .content-stack article {
    background: #f6f4ef;
    border: 1px solid rgba(27, 42, 58, 0.08);
    border-radius: 18px;
    padding: 1.2rem;
  }

  .content-stack h3 {
    font-family: "Fraunces", serif;
    margin: 0 0 0.6rem;
  }

  .content-stack p {
    margin-top: 0;
  }

  .check-list {
    list-style: none;
    padding-left: 0;
  }

  .check-list li {
    background: #f6f4ef;
    border: 1px solid rgba(27, 42, 58, 0.08);
    border-radius: 14px;
    padding: 0.85rem 1rem;
  }

  .area-links {
    align-content: start;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .area-links a {
    background: #f6f4ef;
    border: 1px solid rgba(27, 42, 58, 0.1);
    border-radius: 999px;
    color: #1b2a3a;
    font-weight: 600;
    padding: 0.65rem 0.9rem;
  }

  .related-grid {
    align-content: start;
    display: grid;
    gap: 0.75rem;
  }

  .related-grid a {
    background: #f6f4ef;
    border: 1px solid rgba(27, 42, 58, 0.1);
    border-radius: 16px;
    color: #1b2a3a;
    font-weight: 700;
    padding: 0.9rem 1rem;
  }

  .faq-block,
  .related-services,
  .contact-block {
    grid-template-columns: 1fr;
  }

  .faq-grid {
    display: grid;
    gap: 1rem;
  }

  details {
    border: 1px solid rgba(27, 42, 58, 0.1);
    border-radius: 16px;
    padding: 1rem 1.2rem;
  }

  summary {
    cursor: pointer;
    font-weight: 700;
  }

  .contact-block {
    text-align: center;
  }

  @media (max-width: 800px) {
    .service-page {
      padding: 2rem 6vw 3rem;
    }

    .service-hero,
    .service-section {
      padding: 1.5rem;
    }

    .service-section {
      grid-template-columns: 1fr;
    }
  }
</style>
