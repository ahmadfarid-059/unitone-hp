// fetching data
export const fetchData = async () => {
  try {
    const res = await fetch("/data.json");
    const jsonData = await res.json();
    return jsonData;
  } catch (err) {
    return [];
  }
};

// get customer name
export const customerName = (data, id) => {
  const customer = data.customers.filter((ele) => ele.id === id)[0];
  if (customer) return customer;
  else return;
};

// create invoice
export const createInvoice = (data, customer, invoices) => {
  const customersPackages = data.filter(
    (ele) => ele.customerid === customer.id
  );
  let totalPrice = 0;
  let totalWeight = 0;
  // calculate prices and inputs
  customersPackages.forEach((item) => {
    totalPrice += item.price;
    const weight = item.weight.split("kg")[0];
    totalWeight += Number(weight);
  });
  if (totalPrice === 0 || totalWeight === 0) {
    return null;
  }
  // return the new invoice
  return {
    id: invoices.length ? invoices[invoices.length - 1].id + 1 : 1,
    totalPrice,
    totalWeight: `${totalWeight}kg`,
    customer,
    customersPackages,
    date: new Date(Date.now()).toLocaleDateString("en-US"),
  };
};

// sort packages
export const sortPacks = (packs) => {
  packs.sort((a, b) => a.shippingOrder - b.shippingOrder);
};

// get last package id
export const getLastPackageId = (packages) => {
  const ids = packages.map((ele) => {
    return parseInt(ele.id.split("k")[1]);
  });
  return Math.max(...ids);
};
