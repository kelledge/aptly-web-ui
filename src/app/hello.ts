import {DefaultApi} from './aptly/api/DefaultApi';
import * as models from './aptly/model/models';
import * as angular from 'angular';

class HelloController {

  /** @ngInject */
  constructor(private $q: angular.IQService, private DefaultApi: DefaultApi) {

    let p: angular.IHttpPromise<Array<models.Repository>>;

    p = DefaultApi.reposGet();

    p.then((response: angular.IHttpPromiseCallbackArg<Array<models.Repository>>): void => {
      let repos: models.Repository[] = response.data;
      console.log(repos);
    })
    .catch((err: any) => {
      console.log(err);
    });
  }

}

export const hello: angular.IComponentOptions = {
  template: require('./hello.html'),
  controller: HelloController
};
