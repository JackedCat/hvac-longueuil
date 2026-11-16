<script>
  import { onMount } from "svelte";
  import { site } from "$lib/data/site.config";

  const info = {
    legalName: "Joshua Navas",
    addressFr: "à Longueuil (Québec)",
    addressEn: "in Longueuil, Quebec",
    responsible: "Joshua Navas",
    retentionFr:
      "pendant 2 ans après notre dernier contact avec vous (ou plus longtemps si la loi l’exige, par exemple pour les documents comptables)",
    retentionEn:
      "for 2 years after our last contact with you (or longer if the law requires it, for example for accounting records)",
  };
  const updatedFr = "16 novembre 2026";
  const updatedEn = "November 16, 2026";

  let lang = $state("fr");
  onMount(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "fr" || requested === "en") lang = requested;
    else if ((document.documentElement.lang || "").toLowerCase().startsWith("en")) lang = "en";
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
  });
  const toggle = () => {
    lang = lang === "fr" ? "en" : "fr";
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
  };
</script>

<svelte:head>
  <title>Politique de confidentialité | {site.brand}</title>
  <meta
    name="description"
    content="Comment {site.brand} recueille, utilise et protège vos renseignements personnels. Privacy policy of {site.brand}."
  />
  <link rel="canonical" href={`${site.url}/confidentialite`} />
</svelte:head>

<main class="policy">
  <p class="back"><a href="/">← {site.brand}</a> · <button type="button" onclick={toggle}>{lang === "fr" ? "English" : "Français"}</button></p>

  {#if lang === "fr"}
    <h1>Politique de confidentialité</h1>
    <p class="updated">Dernière mise à jour : {updatedFr}</p>

    <h2>1. Qui nous sommes</h2>
    <p>
      Ce site est exploité par {info.legalName}, qui fait affaire sous le nom {site.brand}, {info.addressFr}.
      Vous pouvez nous joindre au {site.phone} ou à {site.email}.
    </p>

    <h2>2. Responsable de la protection des renseignements personnels</h2>
    <p>
      {info.responsible} est responsable de la protection des renseignements personnels. Pour toute question,
      toute demande d’accès ou de correction, ou pour retirer votre consentement, écrivez à {site.email}.
    </p>

    <h2>3. Renseignements que nous recueillons</h2>
    <ul>
      <li>
        <strong>Formulaire de soumission :</strong> votre nom, votre numéro de téléphone, votre courriel, votre
        adresse ou secteur, le service demandé et votre message.
      </li>
      <li>
        <strong>Communications directes :</strong> les renseignements que vous nous transmettez par courriel ou par
        téléphone.
      </li>
      <li>
        <strong>Statistiques du site (seulement si vous acceptez) :</strong> pages visitées, type d’appareil et de
        navigateur, provenance approximative et durée de la visite, au moyen de Google Analytics et de témoins (cookies).
      </li>
    </ul>

    <h2>4. Pourquoi nous les utilisons</h2>
    <p>
      Pour répondre à votre demande de soumission, vous offrir nos services et assurer le suivi avec vous. Les
      statistiques servent uniquement à comprendre l’utilisation du site et à l’améliorer. Nous ne vendons pas vos
      renseignements.
    </p>

    <h2>5. Témoins (cookies) et votre consentement</h2>
    <p>
      Les témoins de Google Analytics ne sont installés qu’après votre accord, au moyen de la bannière qui s’affiche à
      votre première visite. Refuser est aussi simple qu’accepter. Vous pouvez changer d’avis en tout temps avec le lien
      « Témoins / Cookies » au bas de chaque page. Si vous refusez, le site fonctionne de la même façon.
    </p>

    <h2>6. Qui reçoit vos renseignements</h2>
    <ul>
      <li>Formspree (traitement du formulaire de soumission) ;</li>
      <li>Google (courriel Gmail, polices de caractères Google Fonts, qui reçoivent votre adresse IP lorsque la page s’affiche, et, avec votre accord, Google Analytics) ;</li>
      <li>Cloudflare (hébergement et sécurité du site, qui peut traiter votre adresse IP).</li>
    </ul>
    <p>
      Ces fournisseurs peuvent traiter les renseignements à l’extérieur du Québec, notamment aux États-Unis. Nous ne
      communiquons vos renseignements à personne d’autre, sauf si la loi l’exige.
    </p>

    <h2>7. Durée de conservation</h2>
    <p>
      Nous conservons vos renseignements {info.retentionFr}, puis nous les détruisons ou les anonymisons.
    </p>

    <h2>8. Vos droits</h2>
    <p>
      Vous pouvez demander d’accéder à vos renseignements, de les faire corriger ou de les faire supprimer, et retirer
      votre consentement en tout temps. Écrivez-nous à {site.email}. Vous pouvez aussi déposer une plainte auprès de la
      Commission d’accès à l’information du Québec.
    </p>

    <h2>9. Sécurité</h2>
    <p>
      Nous prenons des mesures raisonnables pour protéger vos renseignements : site servi en HTTPS, accès limité aux
      courriels de soumission et fournisseurs reconnus.
    </p>

    <h2>10. Modifications</h2>
    <p>Nous pouvons mettre cette politique à jour. La date de la dernière mise à jour figure en haut de cette page.</p>
  {:else}
    <h1>Privacy policy</h1>
    <p class="updated">Last updated: {updatedEn}</p>

    <h2>1. Who we are</h2>
    <p>
      This site is operated by {info.legalName}, doing business as {site.brand}, {info.addressEn}. You can reach us at
      {site.phone} or {site.email}.
    </p>

    <h2>2. Person responsible for protecting personal information</h2>
    <p>
      {info.responsible} is responsible for the protection of personal information. For any question, any request to
      access or correct your information, or to withdraw your consent, write to {site.email}.
    </p>

    <h2>3. Information we collect</h2>
    <ul>
      <li>
        <strong>Quote form:</strong> your name, phone number, email, address or area, the service requested and your
        message.
      </li>
      <li><strong>Direct communications:</strong> what you send us by email or phone.</li>
      <li>
        <strong>Site statistics (only if you accept):</strong> pages visited, device and browser type, approximate
        origin and visit length, using Google Analytics and cookies.
      </li>
    </ul>

    <h2>4. Why we use it</h2>
    <p>
      To answer your quote request, provide our services and follow up with you. Statistics are used only to understand
      how the site is used and to improve it. We do not sell your information.
    </p>

    <h2>5. Cookies and your consent</h2>
    <p>
      Google Analytics cookies are installed only after you agree, using the banner shown on your first visit.
      Declining is as easy as accepting. You can change your mind at any time with the “Témoins / Cookies” link at the
      bottom of every page. If you decline, the site works the same way.
    </p>

    <h2>6. Who receives your information</h2>
    <ul>
      <li>Formspree (processes the quote form);</li>
      <li>Google (Gmail email, Google Fonts typefaces, which receive your IP address when a page loads, and, with your consent, Google Analytics);</li>
      <li>Cloudflare (site hosting and security, which may process your IP address).</li>
    </ul>
    <p>
      These providers may process information outside Quebec, including in the United States. We share your information
      with no one else, unless the law requires it.
    </p>

    <h2>7. How long we keep it</h2>
    <p>We keep your information {info.retentionEn}, then destroy or anonymize it.</p>

    <h2>8. Your rights</h2>
    <p>
      You may ask to access, correct or delete your information, and withdraw your consent at any time. Write to us at
      {site.email}. You may also file a complaint with the Commission d’accès à l’information du Québec.
    </p>

    <h2>9. Security</h2>
    <p>
      We take reasonable steps to protect your information: the site is served over HTTPS, access to quote emails is
      limited, and we use established providers.
    </p>

    <h2>10. Changes</h2>
    <p>We may update this policy. The date of the latest update is shown at the top of this page.</p>
  {/if}
</main>

<style>
  .policy {
    max-width: 780px;
    margin: 0 auto;
    padding: 28px 18px 40px;
    font-family: "Urbanist", sans-serif;
    color: #1b2a3a;
    line-height: 1.6;
  }
  h1 {
    margin: 12px 0 4px;
  }
  h2 {
    margin: 26px 0 6px;
    font-size: 1.15rem;
  }
  .updated {
    color: #5e6c7a;
    margin-top: 0;
  }
  .back a,
  .back button {
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
  ul {
    padding-left: 20px;
  }
</style>
