import { useEffect, useState, createContext } from "react";
import { createInvoice, fetchData, sortPacks } from "../Functions";

// creating context
export const dataContext = createContext();

export const DataProvider = ({ children }) => {
  // initial state
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [invoices, setInvoices] = useState([]);

  // fetching data
  useEffect(() => {
    fetchData().then((data) => {
      sortPacks(data.packages);
      setAppData(data);
    });
  }, []);

  // update packages
  const updatePacks = (newPacks) => {
    setAppData({
      ...appData,
      packages: newPacks,
    });
  };

  // delete customer
  const deleteCustomer = (id) => {
    const newCustomers = appData.customers?.filter((ele) => ele.id !== id);
    // removing packages and invoices related to deleted customer
    const newPacks = appData.packages?.filter((ele) => ele.customerid !== id);
    const newInvoices = invoices?.filter((ele) => ele.customer.id !== id);
    setAppData({
      customers: newCustomers,
      packages: newPacks,
    });
    setInvoices(newInvoices);
  };

  // create invoice
  const createCustomerInvoice = (customer) => {
    const newInvoice = createInvoice(appData.packages, customer, invoices);
    const existsInvoice = invoices?.findIndex(
      (ele) => ele.customer.id === customer.id
    );
    if (newInvoice) {
      // check if invoice exists
      if (existsInvoice >= 0) {
        let invoicesCopy = invoices;
        invoicesCopy[existsInvoice] = newInvoice;
        setInvoices(invoicesCopy);
        return newInvoice;
      }
      setInvoices((prev) => [...prev, newInvoice]);
      return newInvoice;
    }
  };

  // Add package
  const addPackage = (pack) => {
    if (!pack) return;
    else
      setAppData({
        ...appData,
        packages: [...appData.packages, pack],
      });
  };

  // delete package
  const deletePackage = (id) => {
    const newPacks = appData.packages?.filter((ele) => ele.id !== id);
    setAppData({
      ...appData,
      packages: newPacks,
    });
  };

  // reorder packages
  const reorderPacks = (direction, id) => {
    const index = appData.packages?.findIndex((ele) => ele.id === id);
    const packs = appData.packages;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= packs.length || newIndex < 0 || index < 0) {
      return;
    }
    if (direction === "up") {
      packs[index].shippingOrder -= 1;
      packs[index - 1].shippingOrder += 1;
    } else {
      packs[index].shippingOrder += 1;
      packs[index + 1].shippingOrder -= 1;
    }
    sortPacks(packs);
    setAppData((prev) => ({ ...prev, packages: packs }));
  };

  return (
    <dataContext.Provider
      value={{
        appData,
        invoices,
        deleteCustomer,
        createCustomerInvoice,
        reorderPacks,
        deletePackage,
        updatePacks,
        addPackage,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
