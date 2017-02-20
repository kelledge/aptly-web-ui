import * as angular from 'angular';
import {DefaultApi} from '../aptly/api/DefaultApi';

import './panel.scss';


class PanelDialogController implements angular.IController {
  private dirName: string;
  private files: any[];
  private progress: number = 0;

  public constructor(private mdPanelRef: angular.material.IPanelRef,
                     private DefaultApi: DefaultApi) {}

  public closeDialog() {
    this.mdPanelRef.destroy();
  }

  public uploadFiles() {
    let payload = new FormData();

    for (let f of this.files) {
      console.log('file', f);
      payload.append('file', f);
    }

    let f = new File([""], "", {
      type: "text/plain",
      lastModified: 0
    });

    payload.append('file', f);

    let httpParams = {
      data: payload,
      //assign content-type as undefined, the browser
      //will assign the correct boundary for us
      params: undefined,
      headers: { 'Content-Type': undefined},
      //prevents serializing payload.  don't do it.
      transformRequest: angular.identity,
      uploadEventHandlers: {
        progress: (e: ProgressEvent) => {
          console.log(e);
          this.progress = e.loaded / e.total * 100.0;
          console.log(this.progress);
        },
        load: (e: any) => {
          console.log(e);

        },
        error: (e: any) => {
          console.log(e);
        },
        abort: (e: any) => {
          console.log(e);
        },
      }
    }

    this.DefaultApi.filesDirPost(this.dirName, {}, httpParams).then(() => {
      this.closeDialog();
    });
  }
}

export function createPanel($mdPanel: angular.material.IPanelService) {
  let position: angular.material.IPanelPosition = $mdPanel.newPanelPosition()
      .absolute()
      .center();

  var config: angular.material.IPanelConfig = {
     attachTo: angular.element(document.body),
     controller: PanelDialogController,
     controllerAs: '$ctrl',
     disableParentScroll: true,
     template: require('./panel.html'),
     hasBackdrop: true,
     panelClass: 'demo-dialog-example',
     position: position,
     trapFocus: true,
     zIndex: 150,
     clickOutsideToClose: true,
     escapeToClose: true,
     focusOnOpen: true
   };

   $mdPanel.open(config);
}
