import * as angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';

import apiModule from './app/aptly/api.module';

import {hello} from './app/hello';
import {repo} from './app/repo/repo';
import {repoList} from './app/repo/list';
import {layout} from './layout';

import {navigation} from './navigation';

import routesConfig from './routes';

import './index.scss';

export const app: string = 'app';

angular
  .module(app, [apiModule.name, 'ui.router', 'ngMaterial'])
  .config(routesConfig)
  .config(function ($mdThemingProvider:angular.material.IThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');
})
  .constant('basePath', 'http://localhost:8080/api')
  .component('app', hello)
  .component('layout', layout)
  .component('navigation', navigation)
  .component('repoList', repoList);
