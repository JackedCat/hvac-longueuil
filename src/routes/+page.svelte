<script>
  import { onMount } from "svelte";

  let lang = $state("fr");
  let showThanks = $state(false);

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
    <title>CVAC Longueuil | Thermopompes, Climatisation & Chauffage</title>
    <meta
      name="description"
      content="Service CVAC à Longueuil : thermopompes, climatisation, chauffage, entretien et réparation. Soumission gratuite, intervention rapide et équipes certifiées."
    />
    <meta
      name="keywords"
      content="CVAC Longueuil, thermopompe Longueuil, climatisation Longueuil, chauffage Longueuil"
    />
    <meta
      property="og:title"
      content="CVAC Longueuil | Confort résidentiel et commercial"
    />
    <meta
      property="og:description"
      content="Thermopompes, climatisation, chauffage et entretien à Longueuil. Appel rapide pour une soumission gratuite."
    />
    <meta property="og:locale" content="fr_CA" />
  {:else}
    <title>HVAC Longueuil | Heat Pumps, AC & Heating</title>
    <meta
      name="description"
      content="HVAC service in Longueuil: heat pumps, air conditioning, heating, maintenance and repairs. Free quotes and fast local response."
    />
    <meta
      name="keywords"
      content="HVAC Longueuil, heat pump Longueuil, air conditioning Longueuil, heating Longueuil"
    />
    <meta
      property="og:title"
      content="HVAC Longueuil | Residential and commercial comfort"
    />
    <meta
      property="og:description"
      content="Heat pumps, air conditioning, heating, and maintenance in Longueuil. Call for a fast free quote."
    />
    <meta property="og:locale" content="en_CA" />
  {/if}
  <meta property="og:type" content="website" />
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
          ? "Service CVAC local à Longueuil • Intervention rapide 7j/7"
          : "Local HVAC service in Longueuil • Fast response 7 days a week"}
      </p>
      <a class="topbar-phone" href="tel:+14388153412">
        <span class="icon">📞</span>
        {lang === "fr" ? "Appel direct" : "Direct line"} · +1 438-815-3412
      </a>
    </div>
    <nav class="nav">
      <div class="brand">
        <div class="brand-mark">CVAC</div>
        <div>
          <p class="brand-name">CVAC Longueuil</p>
          <p class="brand-tag">
            {lang === "fr"
              ? "Confort résidentiel & commercial"
              : "Residential & commercial comfort"}
          </p>
        </div>
      </div>
      <div class="nav-links">
        <a href="#services">{lang === "fr" ? "Services" : "Services"}</a>
        <a href="#processus">{lang === "fr" ? "Processus" : "Process"}</a>
        <a href="#avis">{lang === "fr" ? "Avis" : "Reviews"}</a>
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
        <a class="btn primary cta-call" href="tel:+14388153412">
          <span class="icon">📞</span>
          <span class="cta-label">
            {lang === "fr"
              ? "Appeler pour une soumission"
              : "Call for a free quote"}
          </span>
          <span class="cta-number">+1 438-815-3412</span>
        </a>
      </div>
    </nav>
  </header>

  <main>
    {#if lang === "fr"}
      <section class="hero">
        <div class="hero-content reveal">
          <p class="eyebrow">Thermopompes • Climatisation • Chauffage</p>
          <h1>Redécouvrez le confort à Longueuil.</h1>
          <p class="lead">
            Installation, réparation et entretien CVAC par une équipe certifiée.
            Devis transparents, délais rapides et solutions adaptées aux maisons
            et commerces de Longueuil.
          </p>
          <div class="cta-row">
            <a class="btn primary" href="tel:+14388153412">Appeler maintenant</a
            >
            <a class="btn secondary" href="#contact"
              >Obtenir une soumission gratuite</a
            >
          </div>
          <div class="hero-points">
            <div>
              <span>✓</span>
              <p>Diagnostic rapide et prix clairs</p>
            </div>
            <div>
              <span>✓</span>
              <p>Techniciens certifiés CVAC</p>
            </div>
            <div>
              <span>✓</span>
              <p>Garantie sur les travaux</p>
            </div>
          </div>
          <div class="trust-row">
            <div class="pill">+350 installations locales</div>
            <div class="pill">Intervention 24/7</div>
            <div class="pill">Soumission gratuite</div>
          </div>
        </div>
        <div class="hero-visual reveal delay-1">
          <div class="visual-card">
            <svg viewBox="0 0 420 300" aria-hidden="true">
              <rect
                x="28"
                y="60"
                width="180"
                height="180"
                rx="20"
                fill="#e7f1ff"
              />
              <rect
                x="220"
                y="40"
                width="170"
                height="210"
                rx="24"
                fill="#f7f4ea"
              />
              <circle cx="308" cy="144" r="56" fill="#1c2b3a" />
              <circle cx="308" cy="144" r="40" fill="#f4b83f" />
              <circle cx="308" cy="144" r="10" fill="#1c2b3a" />
              <rect
                x="58"
                y="90"
                width="120"
                height="20"
                rx="8"
                fill="#1c2b3a"
              />
              <rect
                x="58"
                y="130"
                width="120"
                height="20"
                rx="8"
                fill="#8aa2b4"
              />
              <rect
                x="58"
                y="170"
                width="120"
                height="20"
                rx="8"
                fill="#8aa2b4"
              />
            </svg>
            <div class="visual-caption">
              <p>Équipements performants</p>
              <span>Rendement énergétique optimisé</span>
            </div>
          </div>
          <div class="visual-note">
            <p>
              Économisez jusqu’à 30% sur vos coûts d’énergie grâce à une
              thermopompe bien dimensionnée.
            </p>
          </div>
        </div>
      </section>

      <section class="section services reveal" id="services">
        <div class="section-header">
          <p class="eyebrow">Solutions CVAC complètes</p>
          <h2>Des services pensés pour le climat de la Rive-Sud.</h2>
        </div>
        <div class="cards">
          <article class="card">
            <h3>Thermopompes</h3>
            <p>
              Installation et remplacement de thermopompes murales et centrales
              adaptées à Longueuil.
            </p>
            <a href="#contact">Demander une évaluation</a>
          </article>
          <article class="card">
            <h3>Climatisation</h3>
            <p>
              Refroidissement silencieux et efficace pour les journées chaudes.
              Entretien et réparation rapide.
            </p>
            <a href="#contact">Soumission gratuite</a>
          </article>
          <article class="card">
            <h3>Chauffage</h3>
            <p>
              Optimisation des systèmes électriques, gaz ou mazout. Diagnostics
              précis et sécuritaires.
            </p>
            <a href="#contact">Parler à un expert</a>
          </article>
          <article class="card">
            <h3>Ventilation</h3>
            <p>
              Qualité de l’air, échangeurs d’air et équilibrage des conduits
              pour un confort durable.
            </p>
            <a href="#contact">Planifier une visite</a>
          </article>
          <article class="card">
            <h3>Entretien CVAC</h3>
            <p>
              Contrats d’entretien préventif pour réduire les pannes et
              prolonger la durée de vie.
            </p>
            <a href="#contact">Voir les forfaits</a>
          </article>
        </div>
      </section>

      <section class="section highlight reveal delay-1" id="processus">
        <div class="highlight-content">
          <h2>Un processus simple, rapide et sans surprise.</h2>
          <p>
            Notre équipe locale prend tout en charge : évaluation,
            recommandations, installation et suivi. Nous vous proposons des
            solutions claires avec un calendrier précis.
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
              <p>Installation soignée et garantie</p>
            </div>
          </div>
          <div class="cta-row">
            <a class="btn primary" href="tel:+14388153412"
              >Appeler pour une soumission</a
            >
            <a class="btn ghost" href="#contact">Planifier une visite</a>
          </div>
        </div>
        <div class="highlight-card">
          <h3>Zones desservies</h3>
          <p>Longueuil, Saint-Hubert, Greenfield Park, Brossard et environs.</p>
          <ul>
            <li>Service résidentiel et commercial</li>
            <li>Interventions urgentes disponibles</li>
            <li>Conseils sur les subventions locales</li>
          </ul>
          <div class="phone-box">
            <span>📞</span>
            <div>
              <p>Appel direct</p>
              <a href="tel:+14388153412">+1 438-815-3412</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section stats reveal" id="chiffres">
        <div class="stat">
          <h3>15+</h3>
          <p>années d’expérience combinée</p>
        </div>
        <div class="stat">
          <h3>4.9/5</h3>
          <p>moyenne de satisfaction locale</p>
        </div>
        <div class="stat">
          <h3>48h</h3>
          <p>délai moyen pour une installation</p>
        </div>
      </section>

      <section class="section reviews reveal" id="avis">
        <div class="section-header">
          <p class="eyebrow">Avis clients</p>
          <h2>Un service exemplaire, à chaque fois.</h2>
        </div>
        <div class="cards">
          <article class="card review">
            <p>
              “Soumission claire, installation rapide et équipe vraiment
              respectueuse. Notre thermopompe est silencieuse et performante.”
            </p>
            <span>— Mélanie, Longueuil</span>
          </article>
          <article class="card review">
            <p>
              “Service d’urgence un samedi soir, réparé en moins de 2 heures.
              Très professionnel et transparent.”
            </p>
            <span>— Karim, Saint-Hubert</span>
          </article>
          <article class="card review">
            <p>
              “On a économisé sur nos factures dès le premier mois. Le suivi
              après installation est top.”
            </p>
            <span>— Sophie, Greenfield Park</span>
          </article>
        </div>
      </section>

      <section class="section faq reveal" id="faq">
        <div class="section-header">
          <p class="eyebrow">Questions fréquentes</p>
          <h2>Tout ce qu’il faut savoir avant de choisir.</h2>
        </div>
        <div class="faq-grid">
          <details>
            <summary>Quel est le délai moyen pour une installation?</summary>
            <p>
              La majorité des installations sont planifiées en 24 à 48 heures
              selon la disponibilité du matériel.
            </p>
          </details>
          <details>
            <summary>Offrez-vous un service d’urgence?</summary>
            <p>
              Oui, nous avons des plages d’urgence pour les pannes critiques,
              surtout en période de grand froid.
            </p>
          </details>
          <details>
            <summary>Pouvez-vous m’aider avec les subventions?</summary>
            <p>
              Absolument. Nous vous guidons sur les programmes provinciaux et
              municipaux disponibles.
            </p>
          </details>
          <details>
            <summary>Quel entretien recommandez-vous?</summary>
            <p>
              Un entretien annuel avec nettoyage et inspection complète pour
              garder les performances optimales.
            </p>
          </details>
        </div>
      </section>

      <section class="section contact reveal delay-1" id="contact">
        <div class="contact-card">
          <div>
            <p class="eyebrow">Soumission rapide</p>
            <h2>Parlez-nous de votre projet CVAC.</h2>
            <p>
              Laissez vos informations et un spécialiste vous rappelle
              rapidement. Nous intervenons à Longueuil et sur la Rive-Sud.
            </p>
            <div class="contact-info">
              <div>
                <span>📞</span>
                <div>
                  <p>Téléphone</p>
                  <a href="tel:+14388153412">+1 438-815-3412</a>
                </div>
              </div>
              <div>
                <span>📍</span>
                <div>
                  <p>Zone</p>
                  <span>Longueuil, QC</span>
                </div>
              </div>
            </div>
          </div>
          <form
            class="form"
            action="https://formspree.io/f/xdaowvln"
            method="post"
          >
            <input type="hidden" name="redirect" value="/?lang=fr#merci" />
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
              Adresse
              <input type="text" name="address" placeholder="Rue, secteur" />
            </label>
            <label>
              Service recherché
              <select name="service">
                <option>Thermopompe</option>
                <option>Climatisation</option>
                <option>Chauffage</option>
                <option>Ventilation</option>
                <option>Entretien</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                placeholder="Dites-nous ce dont vous avez besoin"
              ></textarea>
            </label>
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
            <a class="btn secondary" href="tel:+14388153412"
              >Appeler maintenant</a
            >
          </div>
        </section>
      {/if}
    {:else}
      <section class="hero">
        <div class="hero-content reveal">
          <p class="eyebrow">Heat Pumps • Air Conditioning • Heating</p>
          <h1>Rediscover comfort in Longueuil.</h1>
          <p class="lead">
            Installation, repair, and HVAC maintenance by a certified team.
            Clear pricing, fast timelines, and solutions for homes and
            businesses in Longueuil.
          </p>
          <div class="cta-row">
            <a class="btn primary" href="tel:+14388153412">Call now</a>
            <a class="btn secondary" href="#contact">Get a free quote</a>
          </div>
          <div class="hero-points">
            <div>
              <span>✓</span>
              <p>Fast diagnostics and clear pricing</p>
            </div>
            <div>
              <span>✓</span>
              <p>Certified HVAC technicians</p>
            </div>
            <div>
              <span>✓</span>
              <p>Work guaranteed</p>
            </div>
          </div>
          <div class="trust-row">
            <div class="pill">350+ local installations</div>
            <div class="pill">24/7 response</div>
            <div class="pill">Free quote</div>
          </div>
        </div>
        <div class="hero-visual reveal delay-1">
          <div class="visual-card">
            <svg viewBox="0 0 420 300" aria-hidden="true">
              <rect
                x="28"
                y="60"
                width="180"
                height="180"
                rx="20"
                fill="#e7f1ff"
              />
              <rect
                x="220"
                y="40"
                width="170"
                height="210"
                rx="24"
                fill="#f7f4ea"
              />
              <circle cx="308" cy="144" r="56" fill="#1c2b3a" />
              <circle cx="308" cy="144" r="40" fill="#f4b83f" />
              <circle cx="308" cy="144" r="10" fill="#1c2b3a" />
              <rect
                x="58"
                y="90"
                width="120"
                height="20"
                rx="8"
                fill="#1c2b3a"
              />
              <rect
                x="58"
                y="130"
                width="120"
                height="20"
                rx="8"
                fill="#8aa2b4"
              />
              <rect
                x="58"
                y="170"
                width="120"
                height="20"
                rx="8"
                fill="#8aa2b4"
              />
            </svg>
            <div class="visual-caption">
              <p>High-efficiency equipment</p>
              <span>Optimized energy performance</span>
            </div>
          </div>
          <div class="visual-note">
            <p>
              Save up to 30% on energy costs with a properly sized heat pump.
            </p>
          </div>
        </div>
      </section>

      <section class="section services reveal" id="services">
        <div class="section-header">
          <p class="eyebrow">Complete HVAC solutions</p>
          <h2>Services designed for the South Shore climate.</h2>
        </div>
        <div class="cards">
          <article class="card">
            <h3>Heat pumps</h3>
            <p>
              Installation and replacement of wall-mounted and central heat
              pumps tailored to Longueuil.
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
            <h3>HVAC maintenance</h3>
            <p>
              Preventive maintenance plans to reduce breakdowns and extend
              equipment life.
            </p>
            <a href="#contact">View plans</a>
          </article>
        </div>
      </section>

      <section class="section highlight reveal delay-1" id="processus">
        <div class="highlight-content">
          <h2>A simple, fast, no-surprise process.</h2>
          <p>
            Our local team handles everything: evaluation, recommendations,
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
              <p>Clean installation with warranty</p>
            </div>
          </div>
          <div class="cta-row">
            <a class="btn primary" href="tel:+14388153412"
              >Call for a free quote</a
            >
            <a class="btn ghost" href="#contact">Schedule a visit</a>
          </div>
        </div>
        <div class="highlight-card">
          <h3>Service areas</h3>
          <p>Longueuil, Saint-Hubert, Greenfield Park, Brossard, and nearby.</p>
          <ul>
            <li>Residential and commercial service</li>
            <li>Emergency slots available</li>
            <li>Advice on local rebates</li>
          </ul>
          <div class="phone-box">
            <span>📞</span>
            <div>
              <p>Direct line</p>
              <a href="tel:+14388153412">+1 438-815-3412</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section stats reveal" id="chiffres">
        <div class="stat">
          <h3>15+</h3>
          <p>years of combined experience</p>
        </div>
        <div class="stat">
          <h3>4.9/5</h3>
          <p>average local satisfaction</p>
        </div>
        <div class="stat">
          <h3>48h</h3>
          <p>average installation timeline</p>
        </div>
      </section>

      <section class="section reviews reveal" id="avis">
        <div class="section-header">
          <p class="eyebrow">Client reviews</p>
          <h2>Excellent service, every time.</h2>
        </div>
        <div class="cards">
          <article class="card review">
            <p>
              “Clear quote, fast installation, and a respectful team. Our heat
              pump is quiet and powerful.”
            </p>
            <span>— Melanie, Longueuil</span>
          </article>
          <article class="card review">
            <p>
              “Emergency service on a Saturday night, fixed in under two hours.
              Very professional.”
            </p>
            <span>— Karim, Saint-Hubert</span>
          </article>
          <article class="card review">
            <p>
              “We saved on our bills right away. The follow-up after
              installation was great.”
            </p>
            <span>— Sophie, Greenfield Park</span>
          </article>
        </div>
      </section>

      <section class="section faq reveal" id="faq">
        <div class="section-header">
          <p class="eyebrow">Frequently asked questions</p>
          <h2>Everything you need before choosing a system.</h2>
        </div>
        <div class="faq-grid">
          <details>
            <summary>What is the typical installation timeline?</summary>
            <p>
              Most installations are scheduled within 24 to 48 hours depending
              on equipment availability.
            </p>
          </details>
          <details>
            <summary>Do you offer emergency service?</summary>
            <p>
              Yes. We reserve emergency slots for critical breakdowns,
              especially during cold snaps.
            </p>
          </details>
          <details>
            <summary>Can you help with rebates?</summary>
            <p>
              Absolutely. We guide you through provincial and municipal programs
              currently available.
            </p>
          </details>
          <details>
            <summary>What maintenance do you recommend?</summary>
            <p>
              An annual cleaning and inspection keeps performance and efficiency
              at their best.
            </p>
          </details>
        </div>
      </section>

      <section class="section contact reveal delay-1" id="contact">
        <div class="contact-card">
          <div>
            <p class="eyebrow">Fast quote</p>
            <h2>Tell us about your HVAC project.</h2>
            <p>
              Leave your details and a specialist will call you back quickly. We
              serve Longueuil and the South Shore.
            </p>
            <div class="contact-info">
              <div>
                <span>📞</span>
                <div>
                  <p>Phone</p>
                  <a href="tel:+14388153412">+1 438-815-3412</a>
                </div>
              </div>
              <div>
                <span>📍</span>
                <div>
                  <p>Area</p>
                  <span>Longueuil, QC</span>
                </div>
              </div>
            </div>
          </div>
          <form
            class="form"
            action="https://formspree.io/f/xdaowvln"
            method="post"
          >
            <input type="hidden" name="redirect" value="/?lang=en#thank-you" />
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
              Address
              <input type="text" name="address" placeholder="Street, area" />
            </label>
            <label>
              Service needed
              <select name="service">
                <option>Heat pump</option>
                <option>Air conditioning</option>
                <option>Heating</option>
                <option>Ventilation</option>
                <option>Maintenance</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us what you need"
              ></textarea>
            </label>
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
            <a class="btn secondary" href="tel:+14388153412">Call now</a>
          </div>
        </section>
      {/if}
    {/if}
  </main>

  <footer class="footer">
    {#if lang === "fr"}
      <div>
        <p class="brand-name">CVAC Longueuil</p>
        <p>Service local • Installation • Réparation • Entretien</p>
        <p>📞 +1 438-815-3412</p>
      </div>
      <div class="footer-links">
        <a href="#services">Services</a>
        <a href="#processus">Processus</a>
        <a href="#avis">Avis</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="footer-cta">
        <p>Besoin d’un rappel rapide?</p>
        <a class="btn secondary" href="tel:+14388153412">Appeler maintenant</a>
      </div>
    {:else}
      <div>
        <p class="brand-name">HVAC Longueuil</p>
        <p>Local service • Installation • Repair • Maintenance</p>
        <p>📞 +1 438-815-3412</p>
      </div>
      <div class="footer-links">
        <a href="#services">Services</a>
        <a href="#processus">Process</a>
        <a href="#avis">Reviews</a>
        <a href="#faq">FAQ</a>
      </div>
      <div class="footer-cta">
        <p>Need a quick callback?</p>
        <a class="btn secondary" href="tel:+14388153412">Call now</a>
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

  .phone-inline {
    white-space: nowrap;
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
    padding: 1.8rem;
    box-shadow: var(--shadow);
    display: grid;
    gap: 1rem;
  }

  .visual-card svg {
    width: 100%;
    height: auto;
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

  .card a {
    color: var(--sea);
    font-weight: 600;
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

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    text-align: center;
  }

  .stat h3 {
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
  }

  .reviews .card {
    background: #f9f7f2;
  }

  .review span {
    color: var(--muted);
    font-weight: 600;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
  }

  details {
    background: #fff;
    border-radius: 16px;
    padding: 1rem 1.2rem;
    box-shadow: var(--shadow);
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
