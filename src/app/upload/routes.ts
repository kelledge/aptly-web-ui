import {DefaultApi} from '../aptly/gen/api/DefaultApi';


/** @ngInject */
export function UploadRoutesConfig($stateProvider: angular.ui.IStateProvider) {
  $stateProvider
    .state('uploads', {
      parent: 'index',
      url: 'uploads',
      views: {
        'main@index': {
          component: 'uploadView'
        }
      }
    })
    .state('directories', {
      parent: 'uploads',
      url: '/directories',
      views: {
        'main@uploads': {
          component: 'directoryList'
        }
      },
      resolve: {
        directoryList: (DefaultApi: DefaultApi) => {
          return DefaultApi.filesGet().then((res: any) => {
            return res.data;
          })
        }
      }
    })
    .state('files', {
      parent: 'uploads',
      url: '/directories/{dirName:string}/files',
      views: {
        'main@uploads': {
          component: 'fileList'
        }
      },
      resolve: {
        fileList: (DefaultApi: DefaultApi, $stateParams: any) => {
          return DefaultApi.filesDirGet($stateParams.dirName).then((res: any) => {
            return res.data;
          })
        },
        dirName: ($stateParams: any) => {
          return $stateParams.dirName;
        }
      }
    });
}
