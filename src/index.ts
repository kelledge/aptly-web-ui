import * as angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import 'angular-material-data-table';

// NOTE: probably un-needed as a top-level module dep
import apiModule from './app/aptly/api.module';

import {RepositoryModule} from './app/repository/module';
import {UploadModule} from './app/upload/module';
import {FileModule} from './app/file/module';

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
    FileModule.name,
    'ui.router',
    'ngMaterial',
    'md.data.table'])
  .config(RoutesConfig)
  .config(ThemeConfig)
  .constant('basePath', 'http://localhost/api')
  .component('layout', LayoutComponent);
