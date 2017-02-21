import * as angular from 'angular';
import 'angular-ui-router';

import {RepositoryListComponent} from './repoList';
import {PackageListComponent} from './pkgList';
import {RepositoryViewComponent} from './view';

import {RepositoryRoutesConfig} from './routes';


export const RepositoryModule = angular.module('repository', [
  'ui.router'])
  .config(RepositoryRoutesConfig)
  .component('repositoryView', RepositoryViewComponent)
  .component('repositoryList', RepositoryListComponent)
  .component('packageList', PackageListComponent)
