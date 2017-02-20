import * as angular from 'angular';

import {RepositoryListComponent} from './list';
import {RepositoryViewComponent} from './view';

import {RepositoryRoutesConfig} from './routes';

export const RepositoryModule = angular.module('repository', [
  'ui.router'
  ])
  .config(RepositoryRoutesConfig)
  .component('repositoryView', RepositoryViewComponent)
