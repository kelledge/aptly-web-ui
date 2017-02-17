import * as angular from 'angular';
import {DefaultApi} from './app/aptly/api/DefaultApi';
import {Repository} from './app/aptly/model/Repository';

/** @ngInject */
export function RoutesConfig($stateProvider: angular.ui.IStateProvider,
                      $urlRouterProvider: angular.ui.IUrlRouterProvider,
                      $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      views: {
        '@': {
          component: 'layout'
        }
      }
    })
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
            console.log("repositoryList",res);
            return res.data;
          });
        }
      }
    })
    .state('uploads', {
      parent: 'index',
      url: 'uploads',
      views: {
        'main@index': {
          component: 'uploadView'
        }
      },
      resolve: {
        directoryList: (DefaultApi: DefaultApi) => {
          DefaultApi.filesGet().then((res: any) => {
            console.log("directoryList", res);
            return res.data;
          })
        }
      }
    });
}
