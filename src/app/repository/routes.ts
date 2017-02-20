import * as angular from 'angular';

import {DefaultApi} from '../aptly/api/DefaultApi';
import {Repository} from '../aptly/model/Repository';

export function RepositoryRoutesConfig($stateProvider: angular.ui.IStateProvider) {
  $stateProvider
    .state('repositories', {
      parent: 'index',
      url: 'repositories',
      views: {
        'main@index': {
          component: 'repositoryView'
        }
      },
      resolve: {
        repositoryList: (DefaultApi: DefaultApi): angular.IHttpPromise<Repository[]> => {
          return DefaultApi.reposGet().then((res: angular.IHttpPromiseCallbackArg<Repository[]>) => {
            console.log("reposGet()",res.data);
            return res.data;
          });
        }
      }
    });
}
