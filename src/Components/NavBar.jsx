import React from "react";
import * as Mui from "./mui-components";

export default function NavBar({ handleOpen }) {
  return (
    <Mui.Box sx={{ flexGrow: 1 }}>
      <Mui.AppBar position="static">
        <Mui.Toolbar>
          <Mui.IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpen}
          >
            <Mui.MenuIcon />
          </Mui.IconButton>
          <Mui.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mail Delivery Service
          </Mui.Typography>
        </Mui.Toolbar>
      </Mui.AppBar>
    </Mui.Box>
  );
}
