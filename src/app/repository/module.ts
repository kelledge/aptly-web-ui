import * as angular from 'angular';

import {RepositoryListComponent} from './list';
import {RepositoryListElementComponent} from './list-element';
import {RepositoryViewComponent} from './view';
import {RepositoryAddComponent} from './add';

export const RepositoryModule = angular.module('repository', [])
  .component('repositoryList', RepositoryListComponent)
  .component('repositoryListElement', RepositoryListElementComponent)
  .component('repositoryView', RepositoryViewComponent)
  .component('repositoryAdd', RepositoryAddComponent);
