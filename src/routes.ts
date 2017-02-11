import * as angular from 'angular';
import * as models from './app/aptly/model/models';
import {DefaultApi} from './app/aptly/api/DefaultApi';


export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      component: 'layout',
    })
    .state('main', {
      parent: 'index',
      url: 'repo',
      resolve: {
        repos: function(DefaultApi: DefaultApi): angular.IPromise<models.Repository[]> {
          return DefaultApi.reposGet().then((res: angular.IHttpPromiseCallbackArg<models.Repository[]>): models.Repository[] => {
            return res.data;
          });
        }
      },
      views: {
        'navigation@index': {
          component: 'navigation'
        },
        'content@index': {
          component: 'repoList'
        }
      }
    });
/*
  $stateProvider
    .state('app', {
      url: '/',
      component: 'repo',
      resolve: {
        repoList: function(DefaultApi: DefaultApi): angular.IPromise<models.Repository[]> {
          return DefaultApi.reposGet().then((res: angular.IHttpPromiseCallbackArg<models.Repository[]>): models.Repository[] => {
            return res.data;
          });
        }
      }
    });
*/
}
