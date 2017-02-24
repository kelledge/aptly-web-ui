import * as angular from 'angular';
import {Repository} from '../aptly/gen/model/Repository';


export class RepositoryViewController implements angular.IController {

  private repositoryList: Repository[];

}


export const RepositoryViewComponent: angular.IComponentOptions = {
  template: require('./view.html'),
  controller: RepositoryViewController,
  bindings: {
    'repositoryList': '<'
  }
};
