import * as angular from 'angular';
import {Repository} from '../aptly/model/Repository';

export class RepositoryViewController implements angular.IController {

  private repositoryList: Repository[];

  public $onInit() {
    console.log("RepositoryViewController.$onInit");
    console.log(this.repositoryList);
  }

  public $onDestroy() {
    console.log("RepositoryViewController.$onDestroy");
  }
}

export const RepositoryViewComponent: angular.IComponentOptions = {
  template: require('./view.html'),
  controller: RepositoryViewController,
  bindings: {
    'repositoryList': '<'
  }
};
