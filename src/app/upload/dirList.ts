import {DefaultApi} from '../aptly/gen/api/DefaultApi';
import {FileUploadHttpParams, emptyFile} from '../file/upload';


/*
* Much of the functionality here belongs in a service.
* For instance: createDirectory should mostly orchestrate $mdDialog and rely on
* an external unit for actual file upload.
*/
export class DirectoryListController implements angular.IController {

  private directoryList: string[];

  public constructor(private DefaultApi: DefaultApi,
                     private $state: angular.ui.IStateService,
                     private $mdDialog: angular.material.IDialogService,
                     private $log: angular.ILogService) {}

  public $onInit() {}

  public $onDestroy() {}

  public createDirectory(event: MouseEvent) {
    let confirm = this.$mdDialog.prompt()
      .title('Create New Directory')
      .placeholder('Directory Name')
      .targetEvent(event)
      .ok('Create')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then((result) => {
      let dirName = result;
      let httpParams = new FileUploadHttpParams();
      httpParams.attachFiles([emptyFile]);
      return this.DefaultApi.filesDirPost(dirName, {}, httpParams.getHttpParams());
    })
    .catch((error) => {
      this.$log.error(error);
    })
    .finally(() => {
      this.$state.reload();
    });

  }

  public deleteDirectory(dirName: string) {
    this.DefaultApi.filesDirDelete(dirName).then((result) => {
    })
    .catch((error) => {
      this.$log.error(error);
    })
    .finally(() => {
      this.$state.reload();
    })
  }

  public viewFiles(dirName: string) {
    this.$state.go('files', {dirName: dirName});
  }
}


export const DirectoryListComponent: angular.IComponentOptions = {
  template: require('./dirList.html'),
  controller: DirectoryListController,
  bindings: {
    'directoryList': '<'
  }
};
