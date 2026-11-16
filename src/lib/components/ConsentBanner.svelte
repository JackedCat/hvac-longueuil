<script>
  import { onMount } from "svelte";
  import { getConsent, setConsent, initConsent } from "$lib/consent";

  let visible = $state(false);
  let lang = $state("fr");

  const readLang = () => {
    lang = (document.documentElement.lang || "fr").toLowerCase().startsWith("en") ? "en" : "fr";
  };

  const choose = (value) => {
    setConsent(value);
    visible = false;
  };

  onMount(() => {
    readLang();
    initConsent();
    visible = getConsent() === null;
    // the home page switches language by changing <html lang>: follow it
    const observer = new MutationObserver(readLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    const reopen = () => (visible = true);
    window.addEventListener("cvac-open-consent", reopen);
    return () => {
      observer.disconnect();
      window.removeEventListener("cvac-open-consent", reopen);
    };
  });

  const t = {
    fr: {
      title: "Votre vie privée",
      text: "Nous aimerions utiliser Google Analytics (des témoins) pour comprendre comment le site est utilisé et l’améliorer. Rien n’est activé sans votre accord.",
      accept: "Accepter",
      refuse: "Refuser",
      more: "Politique de confidentialité",
    },
    en: {
      title: "Your privacy",
      text: "We would like to use Google Analytics (cookies) to understand how the site is used and improve it. Nothing is turned on without your consent.",
      accept: "Accept",
      refuse: "Decline",
      more: "Privacy policy",
    },
  };
</script>

{#if visible}
  <div class="consent" role="dialog" aria-live="polite" aria-label={t[lang].title}>
    <div class="consent-text">
      <strong>{t[lang].title}</strong>
      <p>{t[lang].text} <a href="/confidentialite">{t[lang].more}</a></p>
    </div>
    <div class="consent-actions">
      <button type="button" class="consent-btn" onclick={() => choose("denied")}>{t[lang].refuse}</button>
      <button type="button" class="consent-btn" onclick={() => choose("granted")}>{t[lang].accept}</button>
    </div>
  </div>
{/if}

<style>
  .consent {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: 12px;
    z-index: 2000;
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 14px 16px;
    background: #ffffff;
    color: #1b2a3a;
    border: 1px solid #d5dbe1;
    border-radius: 12px;
    box-shadow: 0 12px 34px rgba(18, 34, 52, 0.22);
    font-family: "Urbanist", sans-serif;
    font-size: 0.95rem;
  }
  .consent-text {
    flex: 1 1 320px;
  }
  .consent-text p {
    margin: 4px 0 0;
    line-height: 1.4;
  }
  .consent-text a {
    color: #1b2a3a;
    text-decoration: underline;
  }
  .consent-actions {
    display: flex;
    gap: 10px;
  }
  /* Accept and Decline look identical on purpose: declining must be as easy as accepting. */
  .consent-btn {
    min-width: 108px;
    padding: 10px 16px;
    border: 2px solid #1b2a3a;
    border-radius: 999px;
    background: #ffffff;
    color: #1b2a3a;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }
  .consent-btn:hover,
  .consent-btn:focus-visible {
    background: #1b2a3a;
    color: #ffffff;
  }
</style>
