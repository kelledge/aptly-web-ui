import * as angular from 'angular';

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
    });
}
