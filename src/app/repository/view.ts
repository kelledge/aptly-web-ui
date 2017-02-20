import * as angular from 'angular';
import {DefaultApi} from '../aptly/api/DefaultApi';
import {Repository} from '../aptly/model/Repository';

class RepositoryCreateController implements angular.IController {
  private repository: Repository;

  public constructor(private $mdDialog: angular.material.IDialogService,
                     private DefaultApi: DefaultApi) {}

  public create() {
    let create = this.DefaultApi.reposPost(this.repository);
    this.$mdDialog.hide(create);
  }
  public cancel() {
    this.$mdDialog.cancel();
  }
}

export class RepositoryViewController implements angular.IController {

  private repositoryList: Repository[];

  public constructor(private $mdDialog: angular.material.IDialogService,
                     private $state: angular.ui.IStateService,
                     private DefaultApi: DefaultApi) {}

  public $onInit() {
    console.log("RepositoryViewController.$onInit", this.repositoryList);
  }

  public $onDestroy() {
    console.log("RepositoryViewController.$onDestroy");
  }

  public createRepository(event: MouseEvent) {
    console.log(event);
    this.$mdDialog.show({
      controller: RepositoryCreateController,
      controllerAs: '$ctrl',
      template: require('./repositoryCreate.html'),
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    }).then((result) => {
      return result; // wait for upload
    })
    .then((result) => {
      this.$state.reload();
    })
    .catch((error) => {

    });
  }

  // TODO: fix-swagger-model-member-names
  public deleteRepository(repository: any) {
    console.log(repository);
    this.DefaultApi.reposNameDelete(repository.Name).then((result) => {

    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.$state.reload();
    });
  }
}

export const RepositoryViewComponent: angular.IComponentOptions = {
  template: require('./view.html'),
  controller: RepositoryViewController,
  bindings: {
    'repositoryList': '<'
  }
};
