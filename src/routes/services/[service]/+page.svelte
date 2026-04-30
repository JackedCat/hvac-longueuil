<script>
  import { site } from "$lib/data/site.config";
  import { serviceAreas } from "$lib/data/locations";

  export let data;
  const { service } = data;

  const getServiceJsonLd = () =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.titleFr,
      description: service.descriptionFr,
      areaServed: serviceAreas.map((area) => area.name),
      provider: {
        "@type": "LocalBusiness",
        name: site.brand,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "CA"
        }
      }
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
  <title>{service.titleFr} | {site.brand}</title>
  <meta name="description" content={service.descriptionFr} />
  <meta name="keywords" content={service.keywordsFr.join(", ")} />
  <meta property="og:title" content={`${service.titleFr} | ${site.brand}`} />
  <meta property="og:description" content={service.descriptionFr} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_CA" />
  <link
    rel="canonical"
    href={`https://cvaclongueuil.ca/services/${service.slug}`}
  />
  <script type="application/ld+json">
{getServiceJsonLd()}
  </script>
  <script type="application/ld+json">
{getFaqJsonLd()}
  </script>
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

  .faq-block,
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
