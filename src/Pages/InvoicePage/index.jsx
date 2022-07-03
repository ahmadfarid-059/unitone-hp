import React from "react";
import { useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import * as Mui from "../../Components/mui-components";
import { dataContext } from "../../context";
import styles from "./style";

export default function InvoicePage() {
  const { invoices } = useContext(dataContext);
  const { id } = useParams();
  const invoice = invoices?.find((ele) => ele.id === Number(id));
  console.log("invoicePage", id);
  if (!invoice) {
    return <Redirect to="/customers" />;
  }
  return (
    <Mui.Box sx={styles.pageContainer}>
      <Mui.Box sx={styles.header}>
        <Mui.Box sx={styles.headerInfo}>
          <Mui.Typography sx={styles.paragraph}>{invoice.date}</Mui.Typography>
          <Mui.Typography sx={styles.paragraph}>
            {invoice.customer.name}
          </Mui.Typography>
        </Mui.Box>
        <Mui.Box sx={styles.invoiceIdCont}>
          <Mui.Typography variant="h4">Invoice</Mui.Typography>
          <Mui.Typography sx={styles.paragraph}>
            No. {invoice.id}
          </Mui.Typography>
        </Mui.Box>
      </Mui.Box>
      <Mui.TableContainer sx={styles.tableContainer}>
        <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
          <Mui.TableHead>
            <Mui.TableRow>
              <Mui.TableCell sx={styles.tabelCell}>ID</Mui.TableCell>
              <Mui.TableCell sx={styles.tabelCell}>Weight</Mui.TableCell>
              <Mui.TableCell sx={styles.tabelCell}>Price</Mui.TableCell>
            </Mui.TableRow>
          </Mui.TableHead>
          <Mui.TableBody>
            {invoice?.customersPackages?.map((row, i) => {
              return (
                <Mui.TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  key={row.id + i}
                >
                  <Mui.TableCell sx={styles.tabelCell}>{row.id}</Mui.TableCell>
                  <Mui.TableCell sx={styles.tabelCell}>
                    {row.weight}
                  </Mui.TableCell>
                  <Mui.TableCell sx={styles.tabelCell}>
                    {row.price}
                  </Mui.TableCell>
                </Mui.TableRow>
              );
            })}
            <Mui.TableRow>
              <Mui.TableCell sx={styles.tabelCell}></Mui.TableCell>
              <Mui.TableCell sx={styles.tabelCell}>
                {invoice?.totalWeight}
              </Mui.TableCell>
              <Mui.TableCell sx={styles.tabelCell}>
                total price: {invoice?.totalPrice}
              </Mui.TableCell>
            </Mui.TableRow>
          </Mui.TableBody>
        </Mui.Table>
      </Mui.TableContainer>
      <Mui.Box sx={styles.footer}>
        <Mui.Typography>
          You received <b>{invoice?.customersPackages?.length || 0}</b> packages
        </Mui.Typography>
        <Mui.Typography>Thank you for using our services</Mui.Typography>
      </Mui.Box>
    </Mui.Box>
  );
}
