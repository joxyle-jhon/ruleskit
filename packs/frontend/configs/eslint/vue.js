module.exports = {
  extends: ["./base.js", "plugin:vue/vue3-recommended"],
  rules: {
    "vue/no-unused-vars": "error",
    "vue/no-v-html": "warn",
    "vue/require-v-for-key": "error",
    "vue/no-use-v-if-with-v-for": "error",
    "vue/component-api-style": ["error", ["script-setup", "composition"]],
  },
};
