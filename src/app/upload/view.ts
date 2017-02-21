import * as angular from 'angular';


export class UploadViewController implements angular.IController {

  private directoryList: string[];

  public $onInit() {}
  public $onDestroy() {}

}


export const UploadViewComponent: angular.IComponentOptions = {
  template: require('./view.html'),
  controller: UploadViewController
};
