import React, { useMemo } from "react";

interface OriginalObject {
  [key: string]: any;
}

function createObjectFromKeys(obj: OriginalObject, keys: string[]): OriginalObject {
  return useMemo(() => {
    return keys.reduce((newObj, key) => {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key];
      }
      return newObj;
    }, {});
  }, [obj, keys]);
}

// Example usage
const originalObject: OriginalObject = {
  name: "John",
  age: 30,
  city: "New York",
  country: "USA",
  occupation: "Engineer"
};

const keysToExtract = ["name", "age", "occupation"];

const extractedObject = createObjectFromKeys(originalObject, keysToExtract);

console.log(extractedObject);
