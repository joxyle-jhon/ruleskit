module.exports = {
  extends: ["./base.js"],
  plugins: ["@angular-eslint"],
  rules: {
    "@angular-eslint/prefer-on-push-component-change-detection": "error",
    "@angular-eslint/no-empty-lifecycle-method": "error",
    "@angular-eslint/use-lifecycle-interface": "error",
    "@angular-eslint/component-selector": [
      "error",
      { type: "element", prefix: "app", style: "kebab-case" },
    ],
  },
};
