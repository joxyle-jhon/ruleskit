module.exports = {
  extends: ["./base.js", "next/core-web-vitals"],
  rules: {
    "@next/next/no-img-element": "error",
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-sync-scripts": "error",
    "@next/next/no-css-tags": "error",
    "@next/next/no-page-custom-font": "error",
    "@next/next/google-font-display": "error",
    "@next/next/no-before-interactive-script-outside-document": "error"
  }
}
