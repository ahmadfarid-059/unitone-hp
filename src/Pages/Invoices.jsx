import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import * as Mui from "../Components/mui-components";
import { dataContext } from "../context";

export default function Invoices() {
  const { invoices } = useContext(dataContext);
  const history = useHistory();
  const navigateToInvoice = (id) =>
    history.push("/invoices/invoice-info/" + id);
  return (
    <Mui.Box sx={{ p: 4 }}>
      {/* Page Heading */}
      <Mui.Typography variant="h4">Invoices</Mui.Typography>
      <Mui.TableContainer component={Mui.Paper}>
        <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Table Head */}
          <Mui.TableHead>
            <Mui.TableRow>
              <Mui.TableCell>Customer Name</Mui.TableCell>
              <Mui.TableCell>Total Weight</Mui.TableCell>
              <Mui.TableCell>Total Price</Mui.TableCell>
            </Mui.TableRow>
          </Mui.TableHead>
          {invoices?.length ? (
            <Mui.TableBody>
              {invoices.map((row) => {
                return (
                  <Mui.TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => navigateToInvoice(row.id)}
                    key={row.id}
                  >
                    <Mui.TableCell>{row.customer.name}</Mui.TableCell>
                    <Mui.TableCell>{row.totalWeight}</Mui.TableCell>
                    <Mui.TableCell>{row.totalPrice}</Mui.TableCell>
                  </Mui.TableRow>
                );
              })}
            </Mui.TableBody>
          ) : (
            <Mui.TableBody>
              <Mui.TableRow>
                <Mui.TableCell
                  align="right"
                  sx={{ p: 4, fontWeight: "bold", fontSize: 18 }}
                >
                  There is no created invoices yet
                </Mui.TableCell>
              </Mui.TableRow>
            </Mui.TableBody>
          )}
        </Mui.Table>
      </Mui.TableContainer>
    </Mui.Box>
  );
}
