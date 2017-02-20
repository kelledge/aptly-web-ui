import * as angular from 'angular';

/**
* A very simple facade around the file upload API. Its purpose is to smooth over
* some of the more awkward edges of the swagger generated aptly API.
*/
export class FileUploadHttpParams {
  private payload = new FormData();

  private progress: (event: ProgressEvent) => void;
  private load: (event: ProgressEvent) => void;
  private error: (event: ProgressEvent) => void;
  private abort: (event: ProgressEvent) => void;

  public attachFiles(files: File[]) {
    for (let f of files) {
      this.payload.append('file', f);
    }
  }

  public getHttpParams(): {} {
    let httpParams = {
      data: this.payload,
      params: undefined,
      headers: { 'Content-Type': undefined},
      transformRequest: angular.identity//,
      /*uploadEventHandlers: {
        progress: this.progress,
        load: this.load,
        error: this.error,
        abort: this.abort
      }*/
    }
    return httpParams;
  }
}

/**
* An empty file. Useful for creating directories with the aptly API.
*/
export const emptyFile = new File([""], "", {
  type: "text/plain",
  lastModified: 0
});
