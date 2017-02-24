import * as angular from 'angular';

import {DefaultApi} from '../aptly/gen/api/DefaultApi';
import {Repository} from '../aptly/gen/model/Repository';


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
            return res.data;
          });
        }
      }
    })
    .state('repoList', {
      parent: 'repositories',
      url: '/list',
      views: {
        'main@repositories': {
          component: 'repositoryList'
        }
      },
      resolve: {
        repositoryList: (DefaultApi: DefaultApi): angular.IHttpPromise<Repository[]> => {
          return DefaultApi.reposGet().then((res: angular.IHttpPromiseCallbackArg<Repository[]>) => {
            return res.data;
          });
        }
      }
    })
    .state('pkgList', {
      parent: 'repositories',
      url: '/list/{repositoryName:string}/packages',
      views: {
        'main@repositories': {
          component: 'packageList'
        }
      },
      resolve: {
        packageList: (DefaultApi: DefaultApi, $stateParams: any) => {
          return DefaultApi.reposNamePackagesGet($stateParams.repositoryName).then((res) => {
            return res.data;
          });
        },
        repositoryName: ($stateParams: any) => {
          return $stateParams.repositoryName;
        }
      }
    });
}
