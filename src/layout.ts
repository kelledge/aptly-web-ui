import * as angular from 'angular';

class Layout implements angular.IController {

  private currentState: string;

  constructor(private $rootScope: angular.IScope,
              private $log: angular.ILogService,
              private $transitions: any) {}

  public $onInit() {
    this.$transitions.onSuccess({}, (transition) => {
      this.$log.debug(transition.$to().name);
      this.currentState = transition.$to().name;
    });

    this.$log.info(this.currentState);
  }
}

export const LayoutComponent: angular.IComponentOptions = {
  template: require('./layout.html'),
  controller: Layout
}
