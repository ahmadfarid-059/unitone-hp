import { getLastPackageId } from "../../Functions";

export const initialValues = (packages) => ({
  id: `pack${getLastPackageId(packages) + 1}`,
  customerid: "",
  weight: "",
  price: "",
  shippingOrder: packages?.length
    ? packages[packages.length - 1].shippingOrder + 1
    : 1,
});

export const initErrs = {
  price: "",
  weight: "",
  customer: "",
};

export const validate = (values) => {
  for (let key in values) {
    // check empty values
    if (!values[key]) {
      return {
        [key]: `${key} is required`,
      };
    }
    // check number values
    if ((key === "price" || key === "weight") && !parseInt(values[key])) {
      return {
        [key]: `${key} should be a number`,
      };
    }
  }
  return true;
};
