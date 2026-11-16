// Quebec Law 25: Google Analytics loads ONLY after the visitor accepts.
// The choice is stored in this browser (localStorage) and can be changed at any time.
export const GA_MEASUREMENT_ID = "G-YDLMCS7D0F";
const KEY = "cvac_consent_v1";

export function getConsent() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function store(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* private mode: the choice just applies to this page view */
  }
}

let gaLoaded = false;

function loadAnalytics() {
  if (gaLoaded || typeof document === "undefined") return;
  gaLoaded = true;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

function stopAnalytics() {
  if (typeof document === "undefined") return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  // remove Google Analytics cookies (_ga, _ga_<id>) set on this site
  const host = location.hostname;
  const domains = [host, "." + host, "." + host.replace(/^www\./, "")];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

export function setConsent(value) {
  store(value);
  if (value === "granted") loadAnalytics();
  else stopAnalytics();
}

// Call once on page load: re-applies an earlier "granted" choice. Nothing loads without it.
export function initConsent() {
  if (getConsent() === "granted") loadAnalytics();
}
