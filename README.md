
# AngularD3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.
Dans le but de m'essayer à la librairie D3.js

## Exemple de genèse de projet avec Angular CLI
ng new angular-d3 && cd angular-d3\ && npm audit fix --force && npm install d3 && npm install @types/d3 --save-dev && npm install d3-svg-legend && ng g component charts/d3/arc-stack && ng g component charts/d3/bar && ng g component charts/d3/bar2 && ng g component charts/d3/multiple-series && ng g component charts/d3/pie && ng g component charts/d3/pimp-chart && ng g component charts/d3/repartition-ruban && ng g component charts/d3/repartition-ruban-stack && ng g component charts/d3/responsive-path && ng g component charts/d3/scatter && ng g component charts/d3/view-box

git init
git remote add origin https://github.com/syncrase/angular-d3.git    (repo distant fraichement créé avec README et LICENCE)
git branch --set-upstream-to=origin/master  (pour faire un pull sans préciser la branche)
git pull --allow-unrelated-histories  (pour faire le pull sans tenir compte de l'écart entre l'historique local et distant => fix du conflit)
git add .
git commit -m "init project"
git push

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Références utiles
Pour commencer https://blog.logrocket.com/data-visualization-angular-d3/
D'autres exemples plus complets https://github.com/Lemoncode/d3js-typescript-examples.git
Chargement dynamic des composants https://angular.io/guide/dynamic-component-loader

## TODO
http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
https://github.com/swimlane/ngx-charts
https://bost.ocks.org/mike/example/
https://www.datavis.fr/index.php?page=map-firststep
https://zcreativelabs.com/blog/How-to-create-pure-react-SVG-maps-with-topojson-and-d3-geo/
Blog https://www.toptal.com/javascript/a-map-to-perfection-using-d3-js-to-make-beautiful-web-maps


## Exemples d'implémentations D3.js
https://www.d3-graph-gallery.com/index.html
