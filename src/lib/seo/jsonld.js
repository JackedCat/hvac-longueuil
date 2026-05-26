export const jsonLdScript = (json) =>
  `<script type="application/ld+json">${json.replace(/</g, "\\u003c")}</script>`;
