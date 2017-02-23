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


export class RepositoryListController implements angular.IController {

  private repositoryList: Repository[];

  public constructor(private $mdDialog: angular.material.IDialogService,
                     private $state: angular.ui.IStateService,
                     private DefaultApi: DefaultApi,
                     private $log: angular.ILogService) {}

  public $onInit() {}

  public $onDestroy() {}

  public viewPackages(repository: Repository) {
    this.$state.go('pkgList', {repositoryName: repository.name});
  }

  public createRepository(event: MouseEvent) {
    this.$mdDialog.show({
      controller: RepositoryCreateController,
      controllerAs: '$ctrl',
      template: require('./repoCreate.html'),
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    }).then((result) => {
      return result; // wait for upload
    })
    .catch((error) => {
      this.$log.error(error);
    })
    .finally(() => {
      this.$state.reload();
    });
  }

  // TODO: fix-swagger-model-member-names
  public deleteRepository(repository: Repository) {
    this.DefaultApi.reposNameDelete(repository.name).then((result) => {
    })
    .catch((error) => {
      this.$log.error(error);
    })
    .finally(() => {
      this.$state.reload();
    });
  }
}


export const RepositoryListComponent: angular.IComponentOptions = {
  template: require('./repoList.html'),
  controller: RepositoryListController,
  bindings: {
    'repositoryList': '<'
  }
};
