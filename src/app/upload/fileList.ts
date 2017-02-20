import * as angular from 'angular';
import {DefaultApi} from '../aptly/api/DefaultApi';
import {Repository} from '../aptly/model/Repository';
import {FileUploadHttpParams} from '../file/upload';

/*
*
*/
class FileUploadController implements angular.IController {

  private fileList: any;

  public constructor(private $mdDialog: angular.material.IDialogService,
                     private DefaultApi: DefaultApi,
                     private dirName: string) {}

  public upload() {
    let httpParams = new FileUploadHttpParams()
    httpParams.attachFiles(this.fileList);

    let upload = this.DefaultApi.filesDirPost(this.dirName, {}, httpParams.getHttpParams());
    this.$mdDialog.hide(upload);
  }

  public cancel() {
    this.$mdDialog.cancel();
  }
}

/*
*
*/
class FileImportController implements angular.IController {

  private repositoryTarget: Repository;
  private repositoryList: Repository[];

  public constructor(private $mdDialog: angular.material.IDialogService,
                     private DefaultApi: DefaultApi,
                     private dirName: string,
                     private fileName: string) {
    DefaultApi.reposGet().then((result) => {
      this.repositoryList = result.data;
      console.log(this.repositoryList, this.dirName, this.fileName);
    });
  }

  public import() {
    let importPromise = this.DefaultApi.reposNameFileDirFilePost(
      this.repositoryTarget.name,
      this.dirName,
      this.fileName);

    return importPromise;
  }

  public cancel() {
    this.$mdDialog.cancel();
  }
}

/*
*
*/
export class FileListController implements angular.IController {

  private fileList: string[];
  private dirName: string;

  public constructor(private DefaultApi: DefaultApi,
                     private $state: angular.ui.IStateService,
                     private $mdDialog: angular.material.IDialogService) {}

  public $onInit() {
    console.log("FileListController.$onInit()", this.fileList, this.dirName);
  }

  public $onDestroy() {}

  public importFile(event: MouseEvent, fileName: string) {
    this.$mdDialog.show({
      controller: FileImportController,
      controllerAs: '$ctrl',
      template: require('./import.html'),
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: true, // Only for -xs, -sm breakpoints.
      locals: {
        dirName: this.dirName,
        fileName: fileName
      }
    }).then((result) => {
      return result; // wait for upload
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.$state.reload();
    });
  }

  public uploadFiles(event: MouseEvent) {
    console.log(event);
    this.$mdDialog.show({
      controller: FileUploadController,
      controllerAs: '$ctrl',
      template: require('./fileUpload.html'),
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: true, // Only for -xs, -sm breakpoints.
      locals: {
        dirName: this.dirName
      }
    }).then((result) => {
      return result; // wait for upload
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.$state.reload();
    });
  }

  public deleteFile(fileName: string) {
    this.DefaultApi.filesDirFileDelete(this.dirName, fileName).then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.$state.reload();
    })
  }

}

export const FileListComponent: angular.IComponentOptions = {
  template: require('./fileList.html'),
  controller: FileListController,
  bindings: {
    'fileList': '<',
    'dirName': '<'
  }
};
