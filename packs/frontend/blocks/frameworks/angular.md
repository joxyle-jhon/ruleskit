## Angular Specific Rules

- Use OnPush change detection on all components by default
- Lazy load all feature modules via loadChildren in the router config
- Use @defer blocks (Angular 17+) for below-the-fold components
- Avoid subscribing in templates — use the async pipe instead
- Use trackBy in all *ngFor loops to prevent full list re-renders
- Enable NgOptimizedImage for all images
- Use signals (Angular 16+) over RxJS for local component state
- Analyze bundles with ng build --stats-json + webpack-bundle-analyzer
