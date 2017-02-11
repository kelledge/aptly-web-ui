import * as angular from 'angular';

class RepoList implements angular.IController {
  constructor(private $mdPanel: angular.material.IPanelService) {
    console.log("constructor", this);
  }
  $onInit() {
    console.log("$onInit", this);
  }
  addRepo() {
    console.log("addRepo", this);
    let position = this.$mdPanel.newPanelPosition();
    let config = {
      attachTo: angular.element(document.body),
      //controller: PanelDialogCtrl,
      controllerAs: 'ctrl',
      template: '<div role="dialog" aria-label="Eat me!" layout="column" layout-align="center center">ASDF</div>',
      panelClass: 'demo-dialog-example',
      position: position,
      hasBackdrop: true,
      trapFocus: true,
      zIndex: 150,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
    };

    this.$mdPanel.open(config);
  }
}

export const repoList: angular.IComponentOptions = {
  bindings: {
    repos: '<'
  },
  template: require('./list.html'),
  controller: RepoList
}
