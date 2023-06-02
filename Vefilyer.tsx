import React, { useMemo } from "react";

interface OriginalObject {
  [key: string]: any;
}

function createObjectFromKeys(obj: OriginalObject, keys: string[]): OriginalObject {
  return useMemo(() => {
    return Object.entries(obj).reduce((newObj, [key, value]) => {
      if (keys.includes(key)) {
        newObj[key] = value;
      }
      return newObj;
    }, {} as OriginalObject);
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

const keysToExtract: string[] = ["name", "age", "occupation"];

const extractedObject = createObjectFromKeys(originalObject, keysToExtract);

console.log(extractedObject);
