import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";

import "./App.css";

import TimeSeriesGraph from "./pages/Dashboard/TimeSeriesGraph";
import Products from "./pages/Products/Product";
import Invoices from "./pages/Invoices/Invoices";
import InvoiceCard from "./pages/Invoices/InvoiceCard";
function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <SideBar menu={sidebar_menu} />

        <div className="dashboard-body">
          <Routes>
            <Route path="*" element={<div></div>} />
            <Route exact path="/" element={<TimeSeriesGraph></TimeSeriesGraph>} />
     
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/invoices" element={<Invoices />} />
            <Route path="detail">
              <Route path=":id" element={<InvoiceCard></InvoiceCard>}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
