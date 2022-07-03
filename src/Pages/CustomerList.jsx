import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import * as Mui from "../Components/mui-components";
import { dataContext } from "../context";

export default function CustomerList() {
  const { appData, deleteCustomer, createCustomerInvoice } =
    useContext(dataContext);
  const history = useHistory();
  return (
    <Mui.Box sx={{ p: 4 }}>
      {/* Page Heading */}
      <Mui.Typography variant="h4">Customers</Mui.Typography>
      <Mui.TableContainer component={Mui.Paper}>
        <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Head */}
          <Mui.TableHead>
            <Mui.TableRow>
              <Mui.TableCell>id</Mui.TableCell>
              <Mui.TableCell>Name</Mui.TableCell>
              <Mui.TableCell></Mui.TableCell>
              <Mui.TableCell></Mui.TableCell>
            </Mui.TableRow>
          </Mui.TableHead>
          {/* Body */}
          <Mui.TableBody>
            {appData.customers.map((row, i) => {
              return (
                <Mui.TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id + i}
                >
                  {/* Info */}
                  <Mui.TableCell component="th" scope="row">
                    {row.id}
                  </Mui.TableCell>
                  <Mui.TableCell>{row.name}</Mui.TableCell>
                  {/* create invoice */}
                  <Mui.TableCell>
                    <Mui.Button
                      variant="contained"
                      onClick={() => {
                        const newInvoice = createCustomerInvoice(row);
                        if (newInvoice)
                          history.push(
                            "/invoices/invoice-info/" + newInvoice.id
                          );
                      }}
                    >
                      Create Invoice
                    </Mui.Button>
                  </Mui.TableCell>
                  {/* Delete Button */}
                  <Mui.TableCell>
                    <Mui.Button
                      variant="contained"
                      onClick={() => deleteCustomer(row.id)}
                    >
                      Delete
                    </Mui.Button>
                  </Mui.TableCell>
                </Mui.TableRow>
              );
            })}
          </Mui.TableBody>
        </Mui.Table>
      </Mui.TableContainer>
    </Mui.Box>
  );
}
