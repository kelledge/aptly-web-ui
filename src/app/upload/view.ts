import * as angular from 'angular';
import {DefaultApi} from '../aptly/api/DefaultApi';

export class UploadViewController implements angular.IController {

  private directoryList: string[];

  public $onInit() {}

  public $onDestroy() {}

}

export const UploadViewComponent: angular.IComponentOptions = {
  template: require('./view.html'),
  controller: UploadViewController
};
