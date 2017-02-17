export function StateLoggerConfig($scope: angular.IScope, $log: angular.ILogService) {
  $scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    console.log(toState);
  });
}
