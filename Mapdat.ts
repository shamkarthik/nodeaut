const data = [
  {
    Name: "abc",
    Section: ["a", "b", "c", "d"],
    Color: ["red", "green", "blue"],
  },
  {
    Name: "xyz",
    Section: ["e", "f"],
    Color: ["yellow"],
  },
];

const result = data.flatMap((item) =>
  Object.keys(item).flatMap((key) => {
    if (Array.isArray(item[key])) {
      return item[key].map((value) => ({
        ...item,
        [key]: value,
      }));
    } else {
      return { ...item };
    }
  })
);

console.log(result);
