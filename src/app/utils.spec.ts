import {cloneToCamelCase, toCamelCase} from './utils';
import {} from 'jasmine';

describe('cloneToCamelCase', () => {
  it('should convert all keys to camelCase', () => {
    let input = [
      {
        KeyInObjectInArray: "value",
      },
      {
        KeyInObjectInArray: "value",
      }
    ];
    let expected = [
      {
        keyInObjectInArray: "value",
      },
      {
        keyInObjectInArray: "value",
      }
    ];
    let actual = cloneToCamelCase(input);
    expect(actual).toEqual(expected);
  });

});

describe('toCamelCase', () => {
  it('should convert PascalCase', () => {
    let testCases: { [s: string]: string; } = {
      "Single": "single",
      "TwoWords": "twoWords",
      " with single white space ": "withSingleWhiteSpace"
    };

    for (let input in testCases) {
      let actual = toCamelCase(input);
      let expected = testCases[input];
      expect(actual).toBe(expected);
    }
  });
});
