import * as angular from 'angular';

class Layout implements angular.IController {

  private currentState: string;
  private watch: () => void;

  constructor(private $rootScope: angular.IScope,
              private $log: angular.ILogService,
              private $transitions: any) {}

  public $onInit() {
    var $ctrl = this;
    console.log(this.$transitions);
    this.$transitions.onSuccess({}, (transition) => {
      $ctrl.$log.info(transition.$to().name);
      $ctrl.currentState = transition.$to().name;
    });

    console.log(this.currentState);
  }

  public $onDestroy() {
    this.watch();
  }
}

export const LayoutComponent: angular.IComponentOptions = {
  template: require('./layout.html'),
  controller: Layout
}
