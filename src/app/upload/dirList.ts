import {DefaultApi} from '../aptly/api/DefaultApi';
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
                     private $mdDialog: angular.material.IDialogService) {}

  public $onInit() {
    console.log("DirectoryListController.$onInit()", this.directoryList);
  }

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
    .then((result) => {
      console.log("DefaultApi.filesDirPost()", result)
      this.$state.reload();
    })
    .catch((error) => {
      console.log('Dialog Catch', error, this);
    })
    // TODO: Handle finally(): May make sense to perform $state.reload() there.
  }

  public deleteDirectory(dirName: string) {
    this.DefaultApi.filesDirDelete(dirName).then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.$state.reload();
    })
  }

  public viewFiles(dirName: string) {
    console.log(dirName);
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
