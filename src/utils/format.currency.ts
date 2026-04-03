const euroFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "eur",
});

export const toEuros = (price: number) => {
  return euroFormatter.format(price);
};
