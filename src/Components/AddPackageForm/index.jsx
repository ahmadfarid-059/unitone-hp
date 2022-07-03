import React, { useContext, useState } from "react";
import { dataContext } from "../../context";
import * as Mui from "../mui-components";
import { initialValues, initErrs, validate } from "./utils";
import styles from "./style";

export default function AddPackageForm({ handleClose }) {
  // get state
  const {
    appData: { customers, packages },
    addPackage,
  } = useContext(dataContext);

  const [values, setValues] = useState(initialValues(packages));
  // error message
  const [errMessage, setErrMessage] = useState(initErrs);

  //handle select change
  const handleSelect = (e) => {
    setErrMessage({ ...errMessage, customerid: "" });
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // handle Input
  const handleInput = (e) => {
    setErrMessage({
      ...errMessage,
      [e.target.name]: "",
    });
    // check invalid values
    if (e.target.value?.includes("-") || !parseInt(e.target.value)) {
      setErrMessage({
        ...errMessage,
        [e.target.name]: "You should enter only positive numbers",
      });
      setValues({
        ...values,
        [e.target.name]: "",
      });
      return;
    }

    // store new value
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const validated = validate(values);
    console.log(validated);
    if (validated !== true) {
      setErrMessage({
        ...errMessage,
        ...validated,
      });
      return;
    }
    // add package
    addPackage({
      ...values,
      price: parseInt(values?.price),
      weight: values?.weight + "kg",
    });
    handleClose();
  };
  return (
    <Mui.Box sx={styles.container}>
      <Mui.Typography variant="h5" align="center">
        Add Package
      </Mui.Typography>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Customer Select */}
        <Mui.FormControl>
          <Mui.InputLabel id="select-label">Customer</Mui.InputLabel>
          <Mui.Select
            labelId="select-label"
            id="select"
            value={values.customerid}
            label="Customer"
            name="customerid"
            onChange={handleSelect}
            renderValue={(selected) => {
              if (!selected) {
                return <em style={{ color: "#757575" }}>Choose Customer</em>;
              }
              return customers.find((ele) => ele.id === selected)?.name;
            }}
            sx={styles.select}
            error={errMessage?.customerid ? true : false}
          >
            {customers?.map((ele) => {
              return (
                <Mui.MenuItem key={ele.id} value={ele.id}>
                  {ele.name}
                </Mui.MenuItem>
              );
            })}
          </Mui.Select>
        </Mui.FormControl>
        {/* Weight input */}
        <Mui.FormControl>
          <Mui.TextField
            id="outlined-basic"
            label="Weight"
            variant="outlined"
            name="weight"
            InputProps={{
              startAdornment: (
                <Mui.InputAdornment position="start">kg</Mui.InputAdornment>
              ),
            }}
            type="number"
            sx={styles.select}
            value={values.weight}
            onChange={handleInput}
            error={errMessage?.weight ? true : false}
            helperText={errMessage?.weight}
          />
        </Mui.FormControl>
        {/* Price Input */}
        <Mui.FormControl>
          <Mui.TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            name="price"
            InputProps={{
              startAdornment: (
                <Mui.InputAdornment position="start">$</Mui.InputAdornment>
              ),
              min: 0,
              max: 2,
            }}
            sx={styles.select}
            type="number"
            value={values.price}
            onChange={handleInput}
            error={errMessage?.price ? true : false}
            helperText={errMessage?.price}
          />
        </Mui.FormControl>
        {/* Buttons */}
        <Mui.Box sx={styles.btnsContainer}>
          <Mui.Button variant="outlined" color="warning" onClick={handleClose}>
            Cancel
          </Mui.Button>
          <Mui.Button variant="contained" color="primary" type="submit">
            Submit
          </Mui.Button>
        </Mui.Box>
      </form>
    </Mui.Box>
  );
}
