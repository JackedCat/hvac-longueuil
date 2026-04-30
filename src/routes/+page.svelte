<script>
  import { onMount } from "svelte";
  import { site } from "$lib/data/site.config";
  import { serviceAreas } from "$lib/data/locations";
  import { servicePages } from "$lib/data/services";
  import mainHero from "$lib/assets/Main.png";

  let lang = $state("fr");
  let showThanks = $state(false);
  let selectedServiceFr = $state("Thermopompe");
  let selectedServiceEn = $state("Heat pump");
  const featuredServicePages = servicePages.slice(0, 10);

  const faqsFr = [
    {
      question: "Quel est le délai pour une visite?",
      answer:
        "Nous proposons des plages rapides selon la disponibilité et confirmons le délai après l’évaluation initiale.",
    },
    {
      question: "Offrez-vous un service d’urgence?",
      answer:
        "Oui, des plages d’urgence sont disponibles pour les pannes critiques, surtout en période de grand froid.",
    },
    {
      question: "Aidez-vous avec les subventions?",
      answer:
        "Nous partageons les informations utiles sur les programmes provinciaux et municipaux applicables.",
    },
    {
      question: "Quel entretien recommandez-vous?",
      answer:
        "Un entretien annuel avec nettoyage et inspection complète aide à garder de bonnes performances.",
    },
    {
      question: "Que veut dire CVAC?",
      answer:
        "CVAC signifie chauffage, ventilation et climatisation. Un système CVAC peut inclure thermopompe, climatiseur, chauffage, échangeur d'air, conduits et contrôles.",
    },
    {
      question: "Offrez-vous un contrat d'entretien annuel CVAC?",
      answer:
        "Oui, une demande peut être faite pour planifier l'entretien annuel d'un climatiseur, d'une thermopompe, d'un système de chauffage ou de ventilation.",
    },
    {
      question: "Pouvez-vous aider pour la ventilation commerciale?",
      answer:
        "Oui, les demandes de ventilation commerciale à Longueuil peuvent être évaluées selon le type de local, l'occupation et les besoins de débit d'air.",
    },
  ];

  const faqsEn = [
    {
      question: "How soon can you visit?",
      answer:
        "We offer fast time slots based on availability and confirm timing after the initial assessment.",
    },
    {
      question: "Do you offer emergency service?",
      answer:
        "Yes. Emergency availability is possible for critical breakdowns, especially during cold snaps.",
    },
    {
      question: "Can you help with rebates?",
      answer:
        "We share the relevant provincial and municipal program information that applies to your project.",
    },
    {
      question: "What maintenance do you recommend?",
      answer:
        "An annual cleaning and inspection keeps performance and efficiency on track.",
    },
    {
      question: "What does HVAC mean?",
      answer:
        "HVAC stands for heating, ventilation, and air conditioning. A system can include heat pumps, air conditioners, heating equipment, ventilation, ductwork, and controls.",
    },
    {
      question: "Do you offer annual HVAC maintenance?",
      answer:
        "Yes. You can request planned maintenance for air conditioners, heat pumps, heating systems, or ventilation equipment.",
    },
  ];

  const commitmentsFr = [
    {
      title: "Service fiable et professionnel",
      text: "Service attentif, communication claire et respect de votre espace.",
    },
    {
      title: "Prix transparents",
      text: "Options expliquées simplement pour choisir la solution la plus adaptée.",
    },
    {
      title: "Disponibilité locale",
      text: `Interventions rapides à ${site.city} et sur la Rive-Sud.`,
    },
  ];

  const commitmentsEn = [
    {
      title: "Reliable, professional service",
      text: "Attentive service, clear communication, and respect for your space.",
    },
    {
      title: "Transparent pricing",
      text: "Clear options so you can choose the right solution.",
    },
    {
      title: "Local availability",
      text: `Fast response in ${site.city} and the South Shore.`,
    },
  ];

  const getLocalBusinessJsonLd = (language) =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: site.brand,
      description:
        language === "fr"
          ? `Services ${site.serviceFr} à ${site.city} : thermopompes, climatisation, chauffage, ventilation, entretien.`
          : `${site.serviceEn} services in ${site.city}: heat pumps, air conditioning, heating, ventilation, maintenance.`,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services CVAC",
        itemListElement: servicePages.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.titleFr,
            description: service.descriptionFr,
          },
        })),
      },
      areaServed: serviceAreas.map((area) => area.name),
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: "CA",
      },
    });

  const getFaqJsonLd = (language) =>
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (language === "fr" ? faqsFr : faqsEn).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });

  const setDocumentLang = (value) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = value;
    }
  };

  const toggleLang = () => {
    lang = lang === "fr" ? "en" : "fr";
    setDocumentLang(lang === "fr" ? "fr-CA" : "en-CA");
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("lang");
    if (requested === "fr" || requested === "en") {
      lang = requested;
    }
    setDocumentLang(lang === "fr" ? "fr-CA" : "en-CA");
    const updateThanks = () => {
      showThanks =
        window.location.hash === "#merci" ||
        window.location.hash === "#thank-you";
    };
    updateThanks();
    window.addEventListener("hashchange", updateThanks);
    return () => window.removeEventListener("hashchange", updateThanks);
  });
</script>

<svelte:head>
  {#if lang === "fr"}
    <title
      >{site.serviceFr}
      {site.city} | Thermopompe, Climatisation, Chauffage & Ventilation</title
    >
    <meta
      name="description"
      content={`Service ${site.serviceFr} à ${site.city} : installation et réparation de thermopompe, climatisation, chauffage, ventilation, entretien annuel et échangeur d'air.`}
    />
    <meta
      name="keywords"
      content={`${site.serviceFr} ${site.city}, thermopompe ${site.city}, climatisation ${site.city}, chauffage ${site.city}, ventilation ${site.city}, réparation thermopompe ${site.city}, installation climatisation ${site.city}, contrat d entretien annuel cvac`}
    />
    <meta
      property="og:title"
      content={`${site.serviceFr} ${site.city} | Thermopompe, climatisation, chauffage et ventilation`}
    />
    <meta
      property="og:description"
      content={`Installation, réparation et entretien CVAC à ${site.city}. Thermopompe, climatisation, chauffage, ventilation et échangeur d'air.`}
    />
    <meta property="og:locale" content="fr_CA" />
  {:else}
    <title>{site.serviceEn} {site.city} | Heating & Cooling Services</title>
    <meta
      name="description"
      content={`${site.serviceEn} service in ${site.city}: heat pumps, air conditioning, heating, ventilation, maintenance, and repairs. Free quotes and fast local response.`}
    />
    <meta
      name="keywords"
      content={`${site.serviceEn} ${site.city}, heat pump ${site.city}, air conditioning ${site.city}, heating ${site.city}`}
    />
    <meta
      property="og:title"
      content={`${site.serviceEn} ${site.city} | Residential and commercial comfort`}
    />
    <meta
      property="og:description"
      content={`Heat pumps, air conditioning, heating, and maintenance in ${site.city}. Call for a fast free quote.`}
    />
    <meta property="og:locale" content="en_CA" />
  {/if}
  <link rel="canonical" href="https://cvaclongueuil.ca/" />
  <meta property="og:type" content="website" />
  <script type="application/ld+json">
{getLocalBusinessJsonLd(lang)}
  </script>
  <script type="application/ld+json">
{getFaqJsonLd(lang)}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Urbanist:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="page">
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>

  <header class="site-header">
    <div class="topbar">
      <p>
        {lang === "fr"
          ? `Service ${site.serviceFr} local à ${site.city} • Plages d'urgence disponibles`
          : `Local ${site.serviceEn} service in ${site.city} • Emergency availability`}
      </p>
      <a class="topbar-phone" href={site.phoneHref}>
        <span class="icon">📞</span>
        {lang === "fr" ? "Appel direct" : "Direct line"} · {site.phone}
      </a>
    </div>
    <nav class="nav">
      <div class="brand">
        <div class="brand-mark">{site.shortBrand}</div>
        <div>
          <p class="brand-name">{site.brand}</p>
          <p class="brand-tag">
            {lang === "fr" ? site.taglineFr : site.taglineEn}
          </p>
        </div>
      </div>
      <div class="nav-links">
        <a href="#services">{lang === "fr" ? "Services" : "Services"}</a>
        <a href="#recherches">{lang === "fr" ? "Recherches" : "Searches"}</a>
        <a href="#processus">{lang === "fr" ? "Processus" : "Process"}</a>
        <a href="#engagements"
          >{lang === "fr" ? "Engagements" : "Commitments"}</a
        >
        <a href="#faq">FAQ</a>
        <a class="nav-soft" href="#contact"
          >{lang === "fr" ? "Soumission" : "Quote"}</a
        >
      </div>
      <button
        class="lang-toggle"
        type="button"
        onclick={toggleLang}
        aria-label={lang === "fr" ? "Switch to English" : "Passer au français"}
      >
        {lang === "fr" ? "EN" : "FR"}
      </button>
      <div class="nav-cta">
        <a class="btn primary cta-call" href={site.phoneHref}>
          <span class="icon">📞</span>
          <span class="cta-label">
            {lang === "fr"
              ? "Appeler pour une soumission"
              : "Call for a free quote"}
          </span>
          <span class="cta-number">{site.phone}</span>
        </a>
      </div>
    </nav>
  </header>

  <main>
    {#if lang === "fr"}
      <section class="hero">
        <div class="hero-content reveal">
          <p class="eyebrow">Thermopompes • Climatisation • Chauffage</p>
          <h1>
            {site.serviceFr} à {site.city} : thermopompe, climatisation,
            chauffage et ventilation
          </h1>
          <p class="lead">
            Installation, réparation et entretien {site.serviceFr} par des
            professionnels qualifiés. Devis transparents pour thermopompe,
            climatiseur, système de chauffage, ventilation et échangeur d'air.
          </p>
          <div class="cta-row">
            <a class="btn primary" href={site.phoneHref}>Appeler maintenant</a>
            <a class="btn secondary" href="#contact"
              >Obtenir une soumission gratuite</a
            >
          </div>
          <div class="hero-points">
            <div>
              <span>✓</span>
              <p>Diagnostic clair et recommandations simples</p>
            </div>
            <div>
              <span>✓</span>
              <p>Techniciens qualifiés et assurés</p>
            </div>
            <div>
              <span>✓</span>
              <p>Service local et suivi attentionné</p>
            </div>
          </div>
          <div class="trust-row">
            <div class="pill">Soumission gratuite</div>
            <div class="pill">Options claires</div>
            <div class="pill">Service local</div>
          </div>
        </div>
        <div class="hero-visual reveal delay-1">
          <div class="visual-card">
            <img
              class="hero-image"
              src={mainHero}
              alt="Technicien CVAC près d'une unité de thermopompe"
              decoding="async"
              fetchpriority="high"
            />
            <div class="visual-caption">
              <p>Équipements performants</p>
              <span>Rendement énergétique optimisé</span>
            </div>
          </div>
          <div class="visual-note">
            <p>
              Optimisez votre confort et l’efficacité énergétique avec un
              système bien adapté.
            </p>
          </div>
        </div>
      </section>

      <section class="section services reveal" id="services">
        <div class="section-header">
          <p class="eyebrow">Solutions {site.serviceFr} complètes</p>
          <h2>Des services pensés pour le climat de la Rive-Sud.</h2>
        </div>
        <div class="cards">
          <article class="card">
            <h3>Thermopompes</h3>
            <p>
              Installation, remplacement et réparation de thermopompes murales
              et centrales adaptées à {site.city}.
            </p>
            <a href="/services/installation-thermopompe-longueuil"
              >Installation thermopompe</a
            >
          </article>
          <article class="card">
            <h3>Climatisation</h3>
            <p>
              Installation de climatisation, entretien de climatiseur et
              réparation rapide lorsque le refroidissement devient irrégulier.
            </p>
            <a href="/services/climatisation-longueuil"
              >Climatisation Longueuil</a
            >
          </article>
          <article class="card">
            <h3>Chauffage</h3>
            <p>
              Installation, optimisation et réparation de chauffage pour un
              système fiable pendant les périodes froides.
            </p>
            <a href="/services/chauffage-longueuil">Chauffage Longueuil</a>
          </article>
          <article class="card">
            <h3>Ventilation</h3>
            <p>
              Ventilation résidentielle et commerciale, qualité de l'air,
              échangeurs d'air et équilibrage des conduits.
            </p>
            <a href="/services/ventilation-longueuil">Ventilation Longueuil</a>
          </article>
          <article class="card">
            <h3>Entretien {site.serviceFr}</h3>
            <p>
              Contrat d'entretien annuel CVAC, maintenance de thermopompe,
              entretien de climatiseur et inspection saisonnière.
            </p>
            <a href="/services/entretien-cvac-longueuil">Entretien annuel</a>
          </article>
        </div>
      </section>

      <section class="section popular-searches reveal" id="recherches">
        <div class="section-header">
          <p class="eyebrow">Recherches locales fréquentes</p>
          <h2>Des pages ciblées pour les besoins CVAC les plus demandés.</h2>
        </div>
        <div class="keyword-cards">
          {#each featuredServicePages as service}
            <article class="keyword-card">
              <h3>{service.titleFr}</h3>
              <p>{service.descriptionFr}</p>
              <a href={`/services/${service.slug}`}>Voir le service</a>
            </article>
          {/each}
        </div>
      </section>

      <section class="section commitments reveal" id="engagements">
        <div class="section-header">
          <p class="eyebrow">Engagements locaux</p>
          <h2>Un service neutre, fiable et centré sur vos besoins.</h2>
        </div>
        <div class="cards">
          {#each commitmentsFr as item}
            <article class="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          {/each}
        </div>
      </section>

      <section class="section visuals reveal" id="visuels">
        <div class="section-header">
          <p class="eyebrow">Aperçu de solutions</p>
          <h2>Des équipements modernes, intégrés avec soin.</h2>
        </div>
        <div class="visual-grid">
          <figure>
            <img
              src="/images/kettenreaktion-l_Vn4HlFQVw-unsplash.jpg"
              alt="Thermopompe extérieure installée dans une cour résidentielle"
              loading="lazy"
            />
            <figcaption>
              Thermopompes adaptées au climat de {site.city}.
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/maxwell-odonkor-32sdOfMXRC8-unsplash.jpg"
              alt="Technicien en service CVAC en intervention sur un système de climatisation"
              loading="lazy"
            />
            <figcaption>
              Interventions propres et respectueuses des lieux.
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/pexels-kathleen-austin-kuhn-2152973960-32497161.jpg"
              alt="Détail d'un équipement de ventilation intérieur moderne"
              loading="lazy"
            />
            <figcaption>Qualité de l’air et confort durable.</figcaption>
          </figure>
        </div>
      </section>

      <section class="section highlight reveal delay-1" id="processus">
        <div class="highlight-content">
          <h2>Un processus simple, rapide et sans surprise.</h2>
          <p>
            Des professionnels locaux prennent tout en charge : évaluation,
            recommandations, installation et suivi. Des solutions claires sont
            proposées avec un calendrier précis.
          </p>
          <div class="steps">
            <div>
              <span>1</span>
              <p>Appel rapide et prise d’informations</p>
            </div>
            <div>
              <span>2</span>
              <p>Visite sur place et soumission détaillée</p>
            </div>
            <div>
              <span>3</span>
              <p>Installation soignée et suivi</p>
            </div>
          </div>
          <div class="cta-row">
            <a class="btn primary" href={site.phoneHref}
              >Appeler pour une soumission</a
            >
            <a class="btn ghost" href="#contact">Planifier une visite</a>
          </div>
        </div>
        <div class="highlight-card">
          <h3>Zones desservies</h3>
          <p>{site.city} et les secteurs voisins.</p>
          <ul class="area-links">
            {#each serviceAreas as area}
              <li><a href={`/areas/${area.slug}`}>{area.name}</a></li>
            {/each}
          </ul>
          <ul>
            <li>Service résidentiel et commercial</li>
            <li>Interventions urgentes disponibles</li>
            <li>Conseils sur les subventions locales</li>
          </ul>
          <div class="phone-box">
            <span>📞</span>
            <div>
              <p>Appel direct</p>
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section faq reveal" id="faq">
        <div class="section-header">
          <p class="eyebrow">Questions fréquentes</p>
          <h2>Tout ce qu’il faut savoir avant de choisir.</h2>
        </div>
        <div class="faq-grid">
          {#each faqsFr as faq}
            <details>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          {/each}
        </div>
      </section>

      <section class="section contact reveal delay-1" id="contact">
        <div class="contact-card">
          <div>
            <p class="eyebrow">Soumission rapide</p>
            <h2>Parlez-nous de votre projet {site.serviceFr}.</h2>
            <p>
              Laissez vos informations et un spécialiste vous rappelle
              rapidement. Service disponible à {site.city} et sur la Rive-Sud.
            </p>
            <div class="contact-info">
              <div>
                <span>📞</span>
                <div>
                  <p>Téléphone</p>
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
              </div>
              <div>
                <span>✉️</span>
                <div>
                  <p>Courriel</p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
              <div>
                <span>📍</span>
                <div>
                  <p>Zone</p>
                  <span>{site.city}, {site.region}</span>
                </div>
              </div>
            </div>
          </div>
          <form class="form" action={site.formEndpoint} method="post">
            <input type="hidden" name="redirect" value="/?lang=fr#merci" />
            <input
              type="text"
              name="_gotcha"
              class="hp-field"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
            />
            <label>
              Nom complet
              <input type="text" name="name" placeholder="Votre nom" required />
            </label>
            <label>
              Téléphone
              <input
                type="tel"
                name="phone"
                placeholder="Votre numéro"
                required
              />
            </label>
            <label>
              Courriel
              <input
                type="email"
                name="email"
                placeholder="Votre courriel"
                required
              />
            </label>
            <label>
              Adresse
              <input type="text" name="address" placeholder="Rue, secteur" />
            </label>
            <label>
              Service recherché
              <select name="service" bind:value={selectedServiceFr}>
                <option>Thermopompe</option>
                <option>Climatisation</option>
                <option>Chauffage</option>
                <option>Ventilation</option>
                <option>Entretien</option>
                <option>Autre</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                placeholder="Dites-nous ce dont vous avez besoin"
                required={selectedServiceFr === "Autre"}
              ></textarea>
            </label>
            {#if selectedServiceFr === "Autre"}
              <p class="form-note required-note">
                Précisez le service recherché dans le message.
              </p>
            {/if}
            <button class="btn primary" type="submit"
              >Obtenir une soumission gratuite</button
            >
            <p class="form-note">
              En soumettant, vous acceptez d’être contacté par téléphone ou
              texto.
            </p>
          </form>
        </div>
      </section>

      {#if showThanks}
        <section class="section thanks reveal" id="merci">
          <div class="thanks-card">
            <h2>Merci! Votre demande a été envoyée.</h2>
            <p>
              Un spécialiste vous contacte rapidement pour confirmer les
              prochaines étapes.
            </p>
            <a class="btn secondary" href={site.phoneHref}>Appeler maintenant</a
            >
          </div>
        </section>
      {/if}
    {:else}
      <section class="hero">
        <div class="hero-content reveal">
          <p class="eyebrow">Heat Pumps • Air Conditioning • Heating</p>
          <h1>Rediscover comfort in {site.city}.</h1>
          <p class="lead">
            Installation, repair, and {site.serviceEn} maintenance by qualified professionals.
            Clear pricing and solutions for homes and businesses in {site.city}.
          </p>
          <div class="cta-row">
            <a class="btn primary" href={site.phoneHref}>Call now</a>
            <a class="btn secondary" href="#contact">Get a free quote</a>
          </div>
          <div class="hero-points">
            <div>
              <span>✓</span>
              <p>Clear diagnostics and simple recommendations</p>
            </div>
            <div>
              <span>✓</span>
              <p>Qualified, insured technicians</p>
            </div>
            <div>
              <span>✓</span>
              <p>Local service with attentive follow-up</p>
            </div>
          </div>
          <div class="trust-row">
            <div class="pill">Free quote</div>
            <div class="pill">Clear options</div>
            <div class="pill">Local service</div>
          </div>
        </div>
        <div class="hero-visual reveal delay-1">
          <div class="visual-card">
            <img
              class="hero-image"
              src={mainHero}
              alt="HVAC technician beside a heat pump unit"
              decoding="async"
              fetchpriority="high"
            />
            <div class="visual-caption">
              <p>High-efficiency equipment</p>
              <span>Optimized energy performance</span>
            </div>
          </div>
          <div class="visual-note">
            <p>
              Improve comfort and energy efficiency with a properly sized
              system.
            </p>
          </div>
        </div>
      </section>

      <section class="section services reveal" id="services">
        <div class="section-header">
          <p class="eyebrow">Complete {site.serviceEn} solutions</p>
          <h2>Services designed for the South Shore climate.</h2>
        </div>
        <div class="cards">
          <article class="card">
            <h3>Heat pumps</h3>
            <p>
              Installation and replacement of wall-mounted and central heat
              pumps tailored to {site.city}.
            </p>
            <a href="#contact">Request an assessment</a>
          </article>
          <article class="card">
            <h3>Air conditioning</h3>
            <p>
              Quiet, efficient cooling for hot days. Fast maintenance and
              repairs.
            </p>
            <a href="#contact">Free quote</a>
          </article>
          <article class="card">
            <h3>Heating</h3>
            <p>
              Optimize electric, gas, or oil systems. Precise, safe diagnostics.
            </p>
            <a href="#contact">Talk to an expert</a>
          </article>
          <article class="card">
            <h3>Ventilation</h3>
            <p>
              Air quality, HRV systems, and duct balancing for lasting comfort.
            </p>
            <a href="#contact">Schedule a visit</a>
          </article>
          <article class="card">
            <h3>{site.serviceEn} maintenance</h3>
            <p>
              Preventive maintenance plans to reduce breakdowns and extend
              equipment life.
            </p>
            <a href="#contact">View plans</a>
          </article>
        </div>
      </section>

      <section class="section commitments reveal" id="engagements">
        <div class="section-header">
          <p class="eyebrow">Local commitments</p>
          <h2>Neutral, reliable service focused on your needs.</h2>
        </div>
        <div class="cards">
          {#each commitmentsEn as item}
            <article class="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          {/each}
        </div>
      </section>

      <section class="section visuals reveal" id="visuals">
        <div class="section-header">
          <p class="eyebrow">Solution snapshots</p>
          <h2>Modern equipment integrated with care.</h2>
        </div>
        <div class="visual-grid">
          <figure>
            <img
              src="/images/kettenreaktion-l_Vn4HlFQVw-unsplash.jpg"
              alt="Outdoor heat pump unit installed at a residential property"
              loading="lazy"
            />
            <figcaption>
              Heat pump options suited for {site.city} homes.
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/maxwell-odonkor-32sdOfMXRC8-unsplash.jpg"
              alt="HVAC technician servicing an air conditioning system"
              loading="lazy"
            />
            <figcaption>Careful, tidy interventions on every visit.</figcaption>
          </figure>
          <figure>
            <img
              src="/images/pexels-kathleen-austin-kuhn-2152973960-32497161.jpg"
              alt="Modern indoor ventilation equipment detail"
              loading="lazy"
            />
            <figcaption>
              Air quality and comfort, tuned for your space.
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="section highlight reveal delay-1" id="processus">
        <div class="highlight-content">
          <h2>A simple, fast, no-surprise process.</h2>
          <p>
            Local professionals handle everything: evaluation, recommendations,
            installation, and follow-up. You get clear options and a precise
            schedule.
          </p>
          <div class="steps">
            <div>
              <span>1</span>
              <p>Quick call and intake</p>
            </div>
            <div>
              <span>2</span>
              <p>On-site visit and detailed quote</p>
            </div>
            <div>
              <span>3</span>
              <p>Clean installation with clear follow-up</p>
            </div>
          </div>
          <div class="cta-row">
            <a class="btn primary" href={site.phoneHref}
              >Call for a free quote</a
            >
            <a class="btn ghost" href="#contact">Schedule a visit</a>
          </div>
        </div>
        <div class="highlight-card">
          <h3>Service areas</h3>
          <p>{site.city} and nearby neighborhoods.</p>
          <ul class="area-links">
            {#each serviceAreas as area}
              <li><a href={`/areas/${area.slug}`}>{area.name}</a></li>
            {/each}
          </ul>
          <ul>
            <li>Residential and commercial service</li>
            <li>Emergency slots available</li>
            <li>Advice on local rebates</li>
          </ul>
          <div class="phone-box">
            <span>📞</span>
            <div>
              <p>Direct line</p>
              <a href={site.phoneHref}>{site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section faq reveal" id="faq">
        <div class="section-header">
          <p class="eyebrow">Frequently asked questions</p>
          <h2>Everything you need before choosing a system.</h2>
        </div>
        <div class="faq-grid">
          {#each faqsEn as faq}
            <details>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          {/each}
        </div>
      </section>

      <section class="section contact reveal delay-1" id="contact">
        <div class="contact-card">
          <div>
            <p class="eyebrow">Fast quote</p>
            <h2>Tell us about your {site.serviceEn} project.</h2>
            <p>
              Leave your details and a specialist will call you back quickly.
              Service is available in {site.city} and the South Shore.
            </p>
            <div class="contact-info">
              <div>
                <span>📞</span>
                <div>
                  <p>Phone</p>
                  <a href={site.phoneHref}>{site.phone}</a>
                </div>
              </div>
              <div>
                <span>✉️</span>
                <div>
                  <p>Email</p>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </div>
              <div>
                <span>📍</span>
                <div>
                  <p>Area</p>
                  <span>{site.city}, {site.region}</span>
                </div>
              </div>
            </div>
          </div>
          <form class="form" action={site.formEndpoint} method="post">
            <input type="hidden" name="redirect" value="/?lang=en#thank-you" />
            <input
              type="text"
              name="_gotcha"
              class="hp-field"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
            />
            <label>
              Full name
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label>
              Phone
              <input
                type="tel"
                name="phone"
                placeholder="Your number"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
              />
            </label>
            <label>
              Address
              <input type="text" name="address" placeholder="Street, area" />
            </label>
            <label>
              Service needed
              <select name="service" bind:value={selectedServiceEn}>
                <option>Heat pump</option>
                <option>Air conditioning</option>
                <option>Heating</option>
                <option>Ventilation</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us what you need"
                required={selectedServiceEn === "Other"}
              ></textarea>
            </label>
            {#if selectedServiceEn === "Other"}
              <p class="form-note required-note">
                Please describe the service needed in the message.
              </p>
            {/if}
            <button class="btn primary" type="submit">Get a free quote</button>
            <p class="form-note">
              By submitting, you agree to be contacted by phone or text.
            </p>
          </form>
        </div>
      </section>

      {#if showThanks}
        <section class="section thanks reveal" id="thank-you">
          <div class="thanks-card">
            <h2>Thanks! Your request has been sent.</h2>
            <p>A specialist will contact you shortly to confirm next steps.</p>
            <a class="btn secondary" href={site.phoneHref}>Call now</a>
          </div>
        </section>
      {/if}
    {/if}
  </main>

  <footer class="footer">
    {#if lang === "fr"}
      <div>
        <p class="brand-name">{site.brand}</p>
        <p>Service local • Installation • Réparation • Entretien</p>
        <p>📞 {site.phone}</p>
      </div>
      <div class="footer-links">
        <a href="#services">Services</a>
        <a href="#processus">Processus</a>
        <a href="#engagements">Engagements</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="footer-cta">
        <p>Besoin d’un rappel rapide?</p>
        <a class="btn secondary" href={site.phoneHref}>Appeler maintenant</a>
      </div>
    {:else}
      <div>
        <p class="brand-name">{site.brand}</p>
        <p>Local service • Installation • Repair • Maintenance</p>
        <p>📞 {site.phone}</p>
      </div>
      <div class="footer-links">
        <a href="#services">Services</a>
        <a href="#processus">Process</a>
        <a href="#engagements">Commitments</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="footer-cta">
        <p>Need a quick callback?</p>
        <a class="btn secondary" href={site.phoneHref}>Call now</a>
      </div>
    {/if}
  </footer>
</div>

<style>
  :global(:root) {
    --bg: #f6f4ef;
    --ink: #1b2a3a;
    --muted: #5e6c7a;
    --accent: #f3b43f;
    --accent-dark: #d3972b;
    --sea: #4bb3d4;
    --paper: #ffffff;
    --shadow: 0 18px 40px rgba(18, 34, 52, 0.12);
  }

  :global(body) {
    margin: 0;
    font-family: "Urbanist", sans-serif;
    background: var(--bg);
    color: var(--ink);
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  .page {
    position: relative;
    overflow: hidden;
  }

  .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(0);
    opacity: 0.5;
    pointer-events: none;
  }

  .glow-1 {
    width: 420px;
    height: 420px;
    background: radial-gradient(
      circle,
      rgba(75, 179, 212, 0.5),
      transparent 70%
    );
    top: -120px;
    right: -120px;
  }

  .glow-2 {
    width: 460px;
    height: 460px;
    background: radial-gradient(
      circle,
      rgba(243, 180, 63, 0.45),
      transparent 70%
    );
    bottom: 120px;
    left: -180px;
  }

  .reveal {
    animation: fadeUp 0.8s ease both;
  }

  .delay-1 {
    animation-delay: 0.15s;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .site-header {
    position: sticky;
    top: 0;
    background: rgba(246, 244, 239, 0.95);
    backdrop-filter: blur(10px);
    z-index: 5;
    box-shadow: 0 8px 24px rgba(27, 42, 58, 0.08);
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.65rem 6vw;
    font-size: 0.9rem;
    background: #1b2a3a;
    color: #f2f6f9;
    gap: 1rem;
  }

  .topbar-phone {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: #f2f6f9;
    font-weight: 600;
  }

  .nav {
    display: grid;
    grid-template-columns: auto minmax(420px, 1fr) auto 360px;
    align-items: center;
    padding: 1rem 6vw;
    gap: 1.5rem;
  }

  .brand {
    display: flex;
    gap: 0.9rem;
    align-items: center;
  }

  .brand-mark {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background: linear-gradient(135deg, #1b2a3a, #35516b);
    color: #fff;
    display: grid;
    place-items: center;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .brand-name {
    font-family: "Fraunces", serif;
    font-size: 1.2rem;
    margin: 0;
  }

  .brand-tag {
    margin: 0;
    color: var(--muted);
    font-size: 0.85rem;
  }

  .nav-links {
    display: flex;
    gap: 1.2rem;
    font-size: 0.95rem;
    color: var(--muted);
    justify-content: center;
    min-width: 420px;
  }

  .nav-links a:hover {
    color: var(--ink);
  }

  .nav-soft {
    font-weight: 600;
  }

  .nav-cta {
    display: flex;
    justify-self: end;
    min-width: 360px;
  }

  .lang-toggle {
    border: 1px solid rgba(27, 42, 58, 0.2);
    background: #fff;
    border-radius: 999px;
    padding: 0.45rem 0.9rem;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .lang-toggle:hover {
    transform: translateY(-1px);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .icon {
    font-size: 1rem;
    line-height: 1;
  }

  .btn.primary {
    background: var(--accent);
    color: var(--ink);
    box-shadow: 0 12px 24px rgba(243, 180, 63, 0.3);
  }

  .cta-call {
    padding: 0.9rem 1.4rem;
    gap: 0.75rem;
    min-height: 58px;
    box-shadow: 0 16px 28px rgba(243, 180, 63, 0.35);
    width: 100%;
  }

  .cta-call .icon {
    font-size: 1.1rem;
  }

  .cta-label {
    font-weight: 700;
    line-height: 1.2;
  }

  .cta-number {
    white-space: nowrap;
    font-weight: 700;
    font-size: 0.98rem;
    background: rgba(255, 255, 255, 0.6);
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
  }

  .btn.secondary {
    background: #fff;
    border: 1px solid rgba(27, 42, 58, 0.15);
    color: var(--ink);
  }

  .btn.ghost {
    background: transparent;
    border: 1px dashed rgba(27, 42, 58, 0.3);
    color: var(--ink);
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  main {
    padding: 2rem 6vw 4rem;
  }

  .hero {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
    align-items: center;
    padding: 2rem 0 4rem;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.75rem;
    color: var(--sea);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3 {
    font-family: "Fraunces", serif;
    margin: 0 0 1rem;
  }

  h1 {
    font-size: clamp(2.4rem, 3vw, 3.4rem);
  }

  .lead {
    font-size: 1.05rem;
    color: var(--muted);
    line-height: 1.7;
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1.6rem 0;
  }

  .hero-points {
    display: grid;
    gap: 0.8rem;
    margin-bottom: 1.6rem;
    color: var(--muted);
  }

  .hero-points div {
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }

  .hero-points span {
    color: var(--accent-dark);
    font-weight: 700;
  }

  .trust-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .pill {
    background: #fff;
    border-radius: 999px;
    padding: 0.5rem 1rem;
    box-shadow: var(--shadow);
    font-size: 0.9rem;
  }

  .hero-visual {
    display: grid;
    gap: 1.5rem;
  }

  .visual-card {
    background: #fff;
    border-radius: 28px;
    padding: 1rem;
    box-shadow: var(--shadow);
    display: grid;
    gap: 1rem;
    overflow: hidden;
  }

  .hero-image {
    aspect-ratio: 3 / 2;
    background: #e9f4fb;
    border-radius: 20px;
    display: block;
    object-fit: contain;
    object-position: center;
    width: 100%;
  }

  .visual-caption p {
    margin: 0;
    font-weight: 600;
  }

  .visual-caption span {
    color: var(--muted);
    font-size: 0.9rem;
  }

  .visual-note {
    padding: 1rem 1.4rem;
    border-radius: 20px;
    background: rgba(75, 179, 212, 0.12);
    color: var(--muted);
  }

  .section {
    padding: 4rem 0;
  }

  .section-header {
    max-width: 620px;
    margin-bottom: 2.5rem;
  }

  .services {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(231, 241, 255, 0.58));
    border: 1px solid rgba(27, 42, 58, 0.08);
    border-radius: 32px;
    margin: 2rem 0;
    padding: 3rem;
  }

  .services .section-header {
    display: grid;
    gap: 0.4rem;
    margin-bottom: 2rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: #fff;
    padding: 1.6rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
    display: grid;
    gap: 0.8rem;
  }

  .services .cards {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .services .card {
    border: 1px solid rgba(27, 42, 58, 0.08);
    grid-template-rows: auto 1fr auto;
    min-height: 245px;
    padding: 1.4rem;
    position: relative;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .services .card::before {
    background: linear-gradient(135deg, rgba(75, 179, 212, 0.16), rgba(243, 180, 63, 0.16));
    border-radius: 14px;
    color: var(--ink);
    content: "";
    height: 42px;
    margin-bottom: 0.3rem;
    width: 42px;
  }

  .services .card:nth-child(1)::before {
    content: "TP";
  }

  .services .card:nth-child(2)::before {
    content: "AC";
  }

  .services .card:nth-child(3)::before {
    content: "CH";
  }

  .services .card:nth-child(4)::before {
    content: "VT";
  }

  .services .card:nth-child(5)::before {
    content: "EN";
  }

  .services .card::before {
    align-items: center;
    display: flex;
    font-family: "Urbanist", sans-serif;
    font-size: 0.82rem;
    font-weight: 800;
    justify-content: center;
    letter-spacing: 0.04em;
  }

  .services .card:hover {
    border-color: rgba(75, 179, 212, 0.35);
    box-shadow: 0 22px 42px rgba(18, 34, 52, 0.14);
    transform: translateY(-3px);
  }

  .services .card h3 {
    font-size: 1.25rem;
    margin-bottom: 0;
  }

  .services .card p {
    color: var(--muted);
    line-height: 1.65;
    margin: 0;
  }

  .card a {
    color: var(--sea);
    font-weight: 600;
  }

  .services .card a {
    align-items: center;
    border-top: 1px solid rgba(27, 42, 58, 0.08);
    display: flex;
    justify-content: space-between;
    padding-top: 0.9rem;
  }

  .services .card a::after {
    content: "→";
    font-family: "Urbanist", sans-serif;
  }

  .popular-searches {
    padding-top: 3rem;
  }

  .keyword-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  .keyword-card {
    background: #fff;
    border: 1px solid rgba(27, 42, 58, 0.08);
    border-radius: 20px;
    box-shadow: var(--shadow);
    display: grid;
    gap: 0.7rem;
    grid-template-rows: auto 1fr auto;
    padding: 1.3rem;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .keyword-card:hover {
    border-color: rgba(75, 179, 212, 0.34);
    transform: translateY(-2px);
  }

  .keyword-card h3 {
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }

  .keyword-card p {
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
  }

  .keyword-card a {
    color: var(--sea);
    font-weight: 700;
  }

  .highlight {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    align-items: center;
    background: #fff;
    border-radius: 32px;
    padding: 3rem;
    box-shadow: var(--shadow);
  }

  .steps {
    display: grid;
    gap: 1rem;
    margin-top: 1.6rem;
  }

  .steps div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .steps span {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--accent);
    display: grid;
    place-items: center;
    font-weight: 700;
  }

  .highlight-card {
    background: #1b2a3a;
    color: #fff;
    padding: 2rem;
    border-radius: 24px;
    display: grid;
    gap: 1rem;
  }

  .highlight-card ul {
    margin: 0;
    padding-left: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .phone-box {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    background: rgba(255, 255, 255, 0.12);
    padding: 0.8rem 1rem;
    border-radius: 16px;
  }

  .phone-box a {
    color: #fff;
    font-weight: 600;
  }

  .visual-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .visual-grid figure {
    margin: 0;
    background: #fff;
    border-radius: 20px;
    box-shadow: var(--shadow);
    overflow: hidden;
    display: grid;
  }

  .visual-grid img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }

  .visual-grid figcaption {
    padding: 0.9rem 1.1rem;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .highlight-card .area-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .highlight-card .area-links a {
    color: #fff;
    background: rgba(255, 255, 255, 0.18);
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    font-size: 0.85rem;
  }

  .faq-grid {
    align-items: start;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
  }

  details {
    background: #fff;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    box-shadow: var(--shadow);
    align-self: start;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
  }

  .contact-card {
    background: #1b2a3a;
    color: #fff;
    border-radius: 32px;
    padding: 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2.5rem;
    box-shadow: var(--shadow);
  }

  .contact-info {
    display: grid;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .contact-info div {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }

  .form {
    display: grid;
    gap: 1rem;
    background: #fff;
    color: var(--ink);
    padding: 1.6rem;
    border-radius: 24px;
  }

  label {
    display: grid;
    gap: 0.4rem;
    font-size: 0.9rem;
  }

  input,
  select,
  textarea {
    border-radius: 12px;
    border: 1px solid rgba(27, 42, 58, 0.2);
    padding: 0.7rem 0.8rem;
    font-family: "Urbanist", sans-serif;
  }

  .form-note {
    font-size: 0.8rem;
    color: var(--muted);
    margin: 0;
  }

  .required-note {
    color: #d3972b;
    font-weight: 700;
  }

  .hp-field {
    display: none;
  }

  .thanks {
    padding-top: 2rem;
  }

  .thanks-card {
    background: #fff;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: var(--shadow);
    display: grid;
    gap: 1rem;
    max-width: 720px;
  }

  .footer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 3rem 6vw 4rem;
    background: #111c28;
    color: #dfe7ef;
  }

  .footer-links {
    display: grid;
    gap: 0.6rem;
  }

  .footer-cta {
    display: grid;
    gap: 1rem;
  }

  .footer .btn.secondary {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
  }

  @media (max-width: 900px) {
    .topbar {
      flex-direction: column;
      text-align: center;
    }

    .nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .nav-links {
      flex-wrap: wrap;
    }

    .nav-cta {
      width: 100%;
    }

    .nav-cta .btn {
      width: 100%;
    }

    .lang-toggle {
      width: 100%;
    }

    .cta-call {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  @media (max-width: 600px) {
    main {
      padding: 1.5rem 5vw 3rem;
    }

    .topbar {
      padding: 0.8rem 5vw;
    }

    .hero {
      padding-bottom: 2rem;
    }

    .contact-card {
      padding: 2rem;
    }
  }
</style>
