
# AngularD3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.
Dans le but de m'essayer à la librairie D3.js

## Genèse du projet
ng new angular-d3
cd angular-d3\
npm audit fix --force (parcequ'il y avait 2 vulnérabilité mineure -> toutes deux résolues par le fix)
npm install d3 && npm install @types/d3 --save-dev
ng g component charts/bar && ng g component charts/pie && ng g component charts/scatter && ng g component charts/responsive-path

git init
git remote add origin https://github.com/syncrase/angular-d3.git    (repo distant fraichement créé avec README et LICENCE)
git branch --set-upstream-to=origin/master  (pour faire un pull sans préciser la branche)
git pull --allow-unrelated-histories  (pour faire le pull sans tenir compte de l'écart entre l'historique local et distant => fix du conflit)
git add .
git commit -m "init project"
git push

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Référence qui m'ont été utiles
Pour commencer https://blog.logrocket.com/data-visualization-angular-d3/

## Exemples d'implémentations D3.js
https://www.d3-graph-gallery.com/index.html
