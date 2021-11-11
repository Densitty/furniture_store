export const formatPrice = (number) => {
  // format the currency (from its lowest value)
  const newNumber = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number / 100);

  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => {
    return item[type];
  });

  // console.log(unique);

  if (type === "colors") {
    unique = unique.flat();
  }

  /* to get the unique properties of a category of all data in an arr, use the new Set() to get each specific/unique value  */
  return ["all", ...new Set(unique)];
};
