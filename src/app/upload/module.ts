import * as angular from 'angular';
import 'angular-ui-router';

import {FileModule} from '../file/module';

import {UploadViewComponent} from './view';
import {UploadRoutesConfig} from './routes';
import {DirectoryListComponent} from './dirList';
import {FileListComponent} from './fileList';


export const UploadModule = angular.module('upload', [
  FileModule.name,
  'ui.router'])
  .config(UploadRoutesConfig)
  .component('uploadView', UploadViewComponent)
  .component('directoryList', DirectoryListComponent)
  .component('fileList', FileListComponent);
