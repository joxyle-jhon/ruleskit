module.exports = {
  "*.{js,jsx,ts,tsx,vue,svelte}": ["eslint --fix --max-warnings=0", "prettier --write"],
  "*.{css,scss}": ["stylelint --fix", "prettier --write"],
  "*.{json,md,yaml,yml}": ["prettier --write"],
  "*.{jpg,jpeg,png,gif,webp}": ["imagemin-lint-staged"],
};
