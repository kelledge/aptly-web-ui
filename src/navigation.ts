import * as angular from 'angular';

class Navigation implements angular.IController {
  constructor() {}
}

export const navigation: angular.IComponentOptions = {
  template: require('./navigation.html'),
  controller: Navigation
};
