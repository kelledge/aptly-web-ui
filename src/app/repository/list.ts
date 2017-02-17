import * as angular from 'angular';
import {Repository} from '../aptly/model/Repository';


function onPaginate(page, limit) {
  console.log(this, page, limit)
}

export class RepositoryListController implements angular.IController {

  private repositoryList: Repository[];
  private renderList: Repository[];
  private selected: Array<any> = [];

  private tableOptions = {

  };

  private paginateOptions = {
    limit: 5,
    limitOptions: [5, 10, 15],
    page: 1,
    total: 10,
    pageSelect: true,
    boundaryLinks: true
  }

  private page: number = 1;

  private f: any;

  public constructor() {
    this.f = RepositoryListController.onPaginate.bind(this);
  }

  public $onInit() {
    console.log("RepositoryListController.$onInit");
    console.log(this.repositoryList);
  }

  public $onDestroy() {
    console.log("RepositoryListController.$onDestroy");
  }

  static onPaginate(page, limit) {
    console.log(this, page, limit)
  }

}

export const RepositoryListComponent: angular.IComponentOptions = {
  template: require('./list.html'),
  controller: RepositoryListController,
  bindings: {
    'repositoryList': '<'
  }
};
