/*
* Convert a string to camelCase.
*
* Credit: http://stackoverflow.com/a/2970588
*/
export function toCamelCase(str: string) {
  return str
      .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

/*
* Clone nested objects and arrays and rename all properties to conform to
* camelCase. The current usage for this is to convert PascalCase aptly API
* responses to camelCase.
*
* Credit: http://stackoverflow.com/a/24648941
*/
export function cloneToCamelCase(obj) {

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Array
    if (obj instanceof Array) {
        let copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = cloneToCamelCase(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        let copy = {};
        for (let attr in obj) {
            let camelCaseAttr = toCamelCase(attr);
            if (obj.hasOwnProperty(attr)) {
              copy[camelCaseAttr] = cloneToCamelCase(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
