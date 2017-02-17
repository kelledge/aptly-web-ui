import * as angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import 'angular-sanitize';

import 'angular-material-data-table';

import apiModule from './app/aptly/api.module';
import {RepositoryModule} from './app/repository/module';
import {UploadModule} from './app/upload/module';

import {LayoutComponent} from './layout';

import {RoutesConfig} from './routes';
import {ThemeConfig} from './theme';

import './index.scss';

export const app: string = 'app';

angular
  .module(app, [
    apiModule.name,
    RepositoryModule.name,
    UploadModule.name,
    'ui.router',
    'ngMaterial',
    'md.data.table'])
  .config(RoutesConfig)
  .config(ThemeConfig)
  .constant('basePath', 'http://localhost/api')
  .component('layout', LayoutComponent)
  .filter('bytes', function() {
  	return function(bytes, precision) {
  		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
  		if (typeof precision === 'undefined') precision = 1;
  		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
  			number = Math.floor(Math.log(bytes) / Math.log(1024));
  		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
  	}
  });
