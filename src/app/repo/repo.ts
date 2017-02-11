import * as angular from 'angular';
import * as models from '../aptly/model/models';

class RepoController implements angular.IController {
  /** @ngInject */
  constructor() {
    console.log("constructor", this);
  }

  public $onInit(): void {
    console.log("$onInit", this);
  }
}

export const repo: angular.IComponentOptions = {
  template: require('./repo.html'),
  bindings: {
    repoList: '<'
  },
  controller: RepoController
};
