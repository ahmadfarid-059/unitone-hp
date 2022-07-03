import { CustomerList, PackageList, Invoices, InvoicePage } from "./Pages";

export const routes = [
  {
    path: "/customers",
    children: <CustomerList />,
    exact: true,
  },
  {
    path: "/packages",
    children: <PackageList />,
    exact: true,
  },
  {
    path: "/invoices",
    children: <Invoices />,
    exact: true,
  },
  {
    path: "/invoices/invoice-info/:id",
    children: <InvoicePage />,
    exact: true,
  },
];
