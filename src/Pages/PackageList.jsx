import React, { useContext, useState } from "react";
import { AddPackageForm } from "../Components";
import * as Mui from "../Components/mui-components";
import { dataContext } from "../context";
import { customerName } from "../Functions";

export default function PackageList() {
  // Data Context
  const { appData, reorderPacks, deletePackage } = useContext(dataContext);

  // Add Package Modal State
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Mui.Box sx={{ p: 4 }}>
      {/* Page Heading */}
      <Mui.Typography variant="h4">Packages</Mui.Typography>
      <Mui.TableContainer component={Mui.Paper}>
        <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Table Head */}
          <Mui.TableHead>
            <Mui.TableRow>
              <Mui.TableCell>id</Mui.TableCell>
              <Mui.TableCell>Customer Name</Mui.TableCell>
              <Mui.TableCell>Weight</Mui.TableCell>
              <Mui.TableCell>Price</Mui.TableCell>

              {/* Add Package Button */}
              <Mui.TableCell>
                <Mui.IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleOpen}
                >
                  <Mui.AddIcon />
                </Mui.IconButton>
              </Mui.TableCell>
            </Mui.TableRow>
          </Mui.TableHead>
          {/* Table Body */}
          <Mui.TableBody>
            {appData.packages.map((row, i, arr) => {
              return (
                <Mui.TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id + i}
                >
                  <Mui.TableCell component="th" scope="row">
                    {row.id}
                  </Mui.TableCell>
                  <Mui.TableCell>
                    {customerName(appData, row.customerid).name}
                  </Mui.TableCell>
                  <Mui.TableCell>{row.weight}</Mui.TableCell>

                  <Mui.TableCell>{row.price}</Mui.TableCell>
                  <Mui.TableCell sx={{ display: "flex", alignItems: "center" }}>
                    {/* delete button */}
                    <Mui.Button
                      variant="contained"
                      onClick={() => deletePackage(row.id)}
                    >
                      Delete
                    </Mui.Button>
                    {/* Reorder Buttons */}
                    <Mui.Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Mui.IconButton
                        onClick={() => reorderPacks("up", row.id)}
                        disabled={i === 0}
                      >
                        <Mui.ArrowDropUpIcon />
                      </Mui.IconButton>
                      <Mui.IconButton
                        onClick={() => reorderPacks("down", row.id)}
                        disabled={i === arr.length - 1}
                      >
                        <Mui.ArrowDropDownIcon />
                      </Mui.IconButton>
                    </Mui.Box>
                  </Mui.TableCell>
                </Mui.TableRow>
              );
            })}
          </Mui.TableBody>
        </Mui.Table>
        <Mui.Modal
          open={open}
          onClose={handleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddPackageForm handleClose={handleOpen} />
        </Mui.Modal>
      </Mui.TableContainer>
    </Mui.Box>
  );
}
