<script>
  import { site } from "$lib/data/site.config";

  export let data;
  const { area } = data;
</script>

<svelte:head>
  <title>{site.serviceFr} {area.name} | Service local</title>
  <meta
    name="description"
    content={`Service ${site.serviceFr} à ${area.name} : thermopompes, chauffage, climatisation, ventilation et entretien.`}
  />
  <meta property="og:title" content={`${site.serviceFr} ${area.name}`} />
  <meta
    property="og:description"
    content={`Interventions ${site.serviceFr} à ${area.name} avec des solutions claires et adaptées.`}
  />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_CA" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Urbanist:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="area-page">
  <header class="area-hero">
    <a class="back-link" href="/">← Retour à {site.city}</a>
    <p class="eyebrow">Service local {site.serviceFr}</p>
    <h1>{site.serviceFr} à {area.name}</h1>
    <p class="lead">{area.descriptionFr}</p>
    <div class="cta-row">
      <a class="btn primary" href={site.phoneHref}>Appeler maintenant</a>
      <a class="btn secondary" href="/#contact">Obtenir une soumission</a>
    </div>
  </header>

  <section class="area-section">
    <h2>Points clés pour {area.name}</h2>
    <ul>
      {#each area.focusFr as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section class="area-section">
    <h2>English summary</h2>
    <p>{area.descriptionEn}</p>
    <ul>
      {#each area.focusEn as item}
        <li>{item}</li>
      {/each}
    </ul>
  </section>

  <section class="area-section contact-block">
    <h2>Contact rapide</h2>
    <p>Appelez-nous pour planifier une visite dans {area.name}.</p>
    <a class="btn primary" href={site.phoneHref}>{site.phone}</a>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: "Urbanist", sans-serif;
    background: #f6f4ef;
    color: #1b2a3a;
  }

  .area-page {
    padding: 2.5rem 8vw 4rem;
    display: grid;
    gap: 2.5rem;
  }

  .area-hero {
    background: #fff;
    border-radius: 28px;
    padding: 2.5rem;
    box-shadow: 0 18px 40px rgba(18, 34, 52, 0.12);
  }

  .back-link {
    color: #5e6c7a;
    text-decoration: none;
    font-size: 0.95rem;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.75rem;
    color: #4bb3d4;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h1,
  h2 {
    font-family: "Fraunces", serif;
    margin: 0 0 1rem;
  }

  .lead {
    color: #5e6c7a;
    line-height: 1.7;
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    font-weight: 600;
    border: none;
    text-decoration: none;
    cursor: pointer;
  }

  .btn.primary {
    background: #f3b43f;
    color: #1b2a3a;
    box-shadow: 0 12px 24px rgba(243, 180, 63, 0.3);
  }

  .btn.secondary {
    background: #fff;
    border: 1px solid rgba(27, 42, 58, 0.15);
    color: #1b2a3a;
  }

  .area-section {
    background: #fff;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 18px 40px rgba(18, 34, 52, 0.12);
  }

  .area-section ul {
    margin: 0;
    padding-left: 1.2rem;
    color: #5e6c7a;
    display: grid;
    gap: 0.4rem;
  }

  .contact-block {
    text-align: center;
  }

  @media (max-width: 700px) {
    .area-page {
      padding: 2rem 6vw 3rem;
    }

    .area-hero {
      padding: 2rem;
    }
  }
</style>
