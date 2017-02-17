import * as angular from 'angular';
import {UploadViewComponent, FileModelDirective} from './view';

export const UploadModule = angular.module('upload', [])
  .directive('fileModel', FileModelDirective.factory())
  .component('uploadView', UploadViewComponent);
