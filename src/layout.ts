import * as angular from 'angular';

class Layout {
  constructor() {}
}

export const layout: angular.IComponentOptions = {
  template: require('./layout.html'),
  controller: Layout
}
