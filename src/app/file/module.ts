/*
* Tools for working with files and file uploads.
*/
import * as angular from 'angular';

import {BytesFilter} from './bytes.filter';
import {FileModelDirective} from './input.directive';

export const FileModule = angular.module('file', [])
  .directive('fileModel', FileModelDirective.factory())
  .filter('bytes', BytesFilter);
