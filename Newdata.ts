const data = {
  Name: "abc",
  Section: ["a", "b", "c", "d"],
  Color: ["red", "green", "blue"],
};

const keys = Object.keys(data);

const result = keys.reduce((acc, key) => {
  if (Array.isArray(data[key])) {
    if (acc.length === 0) {
      return data[key].map((value) => ({ [key]: value }));
    } else {
      return acc.flatMap((item) =>
        data[key].map((value) => ({ ...item, [key]: value }))
      );
    }
  } else {
    return acc;
  }
}, []);

console.log(result);
