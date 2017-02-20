/*
*
*/
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
