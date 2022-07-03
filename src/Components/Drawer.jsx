import { useHistory } from "react-router-dom";
import * as Mui from "./mui-components";

export default function Drawer({ open, handleClose }) {
  const history = useHistory();
  const onItemClick = (path) => {
    history.push("/" + path);
    handleClose();
  };
  return (
    <Mui.Drawer
      anchor={"left"}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 200,
          boxSizing: "border-box",
          marginTop: 8,
        },
      }}
    >
      <Mui.List style={{ width: "300px" }}>
        <Mui.ListItem button onClick={() => onItemClick("customers")}>
          <Mui.ListItemText primary={"Customers"} />
        </Mui.ListItem>
        <Mui.ListItem button onClick={() => onItemClick("packages")}>
          <Mui.ListItemText primary={"Packages"} />
        </Mui.ListItem>
        <Mui.ListItem button onClick={() => onItemClick("invoices")}>
          <Mui.ListItemText primary={"Invoices"} />
        </Mui.ListItem>
      </Mui.List>
    </Mui.Drawer>
  );
}
