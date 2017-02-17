import * as angular from 'angular';
import {DefaultApi} from '../aptly/api/DefaultApi';
import {createPanel} from './panel';

export class FileModelDirective implements angular.IDirective {
  restrict = 'A';
       //(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, ctrl: any)
  link = (scope: angular.IScope, element: any, attrs: any, ctrl: any) => {
      var model = this.$parse(attrs.fileModel);
      var modelSetter = model.assign;
      element.bind('change', function(){
        scope.$apply(function(){
              if (attrs.multiple) {
                modelSetter(scope, element[0].files);
              }
              else {
                modelSetter(scope, element[0].files[0]);
              }
            });
      });
    }

  public constructor(private $parse) {}

  static factory(): angular.IDirectiveFactory {
    const directive = ($parse) => new FileModelDirective($parse);
    directive.$inject = ['$parse'];
    return directive;
  }
}

export class UploadViewController implements angular.IController {

  private file: any;

  public constructor(private $q: angular.IQService,
                     private $http: angular.IHttpService,
                     private DefaultApi: DefaultApi,
                     private $mdPanel: angular.material.IPanelService) {}

  public $onInit() {
    console.log("UploadViewController.$onInit");
  }

  public $onDestroy() {
    console.log("UploadViewController.$onDestroy");
  }

  public openUploadPanel() {
    createPanel(this.$mdPanel);
    console.log(this.file);

    angular.forEach(this.file, (f) => {
      console.log(f);
    });
  }
}

export const UploadViewComponent: angular.IComponentOptions = {
  template: require('./view.html'),
  controller: UploadViewController,
  bindings: {}
};
