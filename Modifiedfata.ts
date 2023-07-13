function generateCombinations(data) {
  const keys = Object.keys(data);
  const combinations = [];

  function generateHelper(index, currentCombination) {
    if (index === keys.length) {
      combinations.push({ ...currentCombination });
      return;
    }

    const key = keys[index];
    const value = data[key];

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        currentCombination[key] = value[i];
        generateHelper(index + 1, currentCombination);
      }
    } else {
      currentCombination[key] = value;
      generateHelper(index + 1, currentCombination);
    }
  }

  generateHelper(0, {});

  return combinations;
}

const data = {
  Name: "abc",
  Section: ["a", "b", "c", "d"],
  Color: ["red", "green", "blue"],
  Size: "large",
};

const combinations = generateCombinations(data);
console.log(combinations);
