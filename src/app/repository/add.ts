import * as angular from 'angular';
import {DefaultApi} from '../aptly/api/DefaultApi';
import {Repository} from '../aptly/model/Repository';

export class RepositoryAddController implements angular.IController {

  private repository: Repository;

  public constructor(private DefaultApi: DefaultApi, private $state: any) {}

  public $onInit() {
    console.log("RepositoryAddController.$onInit", this.$state);
  }

  public $onDestroy() {
    console.log("RepositoryAddController.$onDestroy");
  }

  public addRepo() {
    var $ctrl = this;
    this.DefaultApi.reposPost(this.repository).then((result) => {
      console.log("ADD", result, $ctrl.$state);
      $ctrl.$state.reload();
    })
    .catch((error) => {
      console.log("FAIL", error);
    });
  }
}

export const RepositoryAddComponent: angular.IComponentOptions = {
  template: require('./add.html'),
  controller: RepositoryAddController
};
