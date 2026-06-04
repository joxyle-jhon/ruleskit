module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order"
  ],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "declaration-property-value-disallowed-list": {
      "transition": ["/all/"],
      "animation": ["/all/"]
    },
    "plugin/no-unsupported-browser-features": [
      true,
      { severity: "warning", ignore: ["css-nesting"] }
    ],
    "color-no-invalid-hex": true,
    "unit-disallowed-list": ["px"],
    "number-max-precision": 2,
    "shorthand-property-no-redundant-values": true,
    "declaration-no-important": true
  }
}
