import * as angular from 'angular';
import {DefaultApi} from '../aptly/api/DefaultApi';
import {Repository} from '../aptly/model/Repository';


export class RepositoryListElementController implements angular.IController {

  // private repository: Repository;

  /*
  * TODO: Figure out how to instruct swagger to generate models that honor the
  * case given in definitions. This is currently focing a redefinition for many
  * types.
  */
  private repository: {
    Name: string,
    Comment: string,
    DefaultComponent: string,
    DefaultDistribution: string
  };

  public constructor(private DefaultApi: DefaultApi, private $state: any) {}

  public $onInit() {
    console.log("RepositoryListElementController.$onInit");
    console.log(this.repository.Name);
  }

  public $onDestroy() {
    console.log("RepositoryListElementController.$onDestroy");
  }

  public deleteRepo() {
    var $ctrl = this;
    this.DefaultApi.reposNamePackagesGet
    console.log(this.repository);
    this.DefaultApi.reposNameDelete(this.repository.Name, 1).then((result) => {
      console.log(result);
      console.log($ctrl.$state);
      $ctrl.$state.reload();
    });
  }
}

export const RepositoryListElementComponent: angular.IComponentOptions = {
  template: require('./list-element.html'),
  controller: RepositoryListElementController,
  bindings: {
    'repository': '<'
  }
};
