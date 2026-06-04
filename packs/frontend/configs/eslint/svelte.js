module.exports = {
  extends: ["./base.js", "plugin:svelte/recommended"],
  rules: {
    "svelte/no-unused-svelte-ignore": "error",
    "svelte/valid-compile": "error",
    "svelte/no-at-html-tags": "warn",
  },
};
