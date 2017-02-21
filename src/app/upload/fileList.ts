import * as angular from 'angular';

import {DefaultApi} from '../aptly/api/DefaultApi';
import {Repository} from '../aptly/model/Repository';
import {ImportResult} from '../aptly/model/ImportResult';

import {FileUploadHttpParams} from '../file/upload';


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


class FileImportController implements angular.IController {

  private repositoryTarget: any;
  private repositoryList: Repository[];
  private noRemove: boolean;
  private forceReplace: boolean;

  public constructor(private $mdDialog: angular.material.IDialogService,
                     private DefaultApi: DefaultApi,
                     private dirName: string,
                     private fileName: string) {
    DefaultApi.reposGet().then((result) => {
      this.repositoryList = result.data;
    });
  }

  public import() {
    let noRemove = this.noRemove ? 1 : 0;
    let forceReplace = this.forceReplace ? 1 : 0;

    let importPromise = this.DefaultApi.reposNameFileDirFilePost(
      this.repositoryTarget.Name,
      this.dirName,
      this.fileName,
      noRemove,
      forceReplace);

    this.$mdDialog.hide(importPromise);
  }

  public cancel() {
    this.$mdDialog.cancel();
  }
}


export class FileListController implements angular.IController {

  private fileList: string[];
  private dirName: string;

  public constructor(private DefaultApi: DefaultApi,
                     private $state: angular.ui.IStateService,
                     private $mdDialog: angular.material.IDialogService,
                     private $q: angular.IQService,
                     private $log: angular.ILogService) {}

  public $onInit() {}

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
      return result; // wait for import
    })
    .then((result) => {
      let importResults = result.data;
      if (importResults.FailedFiles.length !== 0) { // reject if there are failed files
        return this.$q.reject(importResults);
      }
    })
    .catch((error) => {
      this.$log.error(error);
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
      this.$log.error(error);
    })
    .finally(() => {
      this.$state.reload();
    });
  }

  public deleteFile(fileName: string) {
    this.DefaultApi.filesDirFileDelete(this.dirName, fileName).catch((error) => {
      this.$log.error(error);
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
