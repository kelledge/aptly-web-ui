import {DefaultApi} from '../aptly/gen/api/DefaultApi';
import {PackageKeys} from '../aptly/gen/model/PackageKeys'


export class PackageListController implements angular.IController {
  private packageList: PackageKeys;
  private repositoryName: string;

  public constructor(private DefaultApi: DefaultApi,
                     private $state: angular.ui.IStateService,
                     private $log: angular.ILogService) {}

  public deletePackageRef(packageKey: string) {
    let p: PackageKeys = {
      PackageRefs: [packageKey]
    };

    // TODO: Find out why this must be set manually.
    let httpParams = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    this.DefaultApi.reposNamePackagesDelete(this.repositoryName, p, httpParams).catch((error) => {
      this.$log.error(error);
    })
    .finally(() => {
      this.$state.reload();
    });
  }
}


export const PackageListComponent: angular.IComponentOptions = {
  template: require('./pkgList.html'),
  controller: PackageListController,
  bindings: {
    'packageList': '<',
    'repositoryName': '<'
  }
};
