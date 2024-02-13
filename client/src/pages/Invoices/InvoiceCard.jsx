import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailInvoices, invoiceSelectors } from "../../redux/invoiceSlice";

const InvoiceCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const invoice = useSelector((state) => invoiceSelectors.selectById(state, id));

  useEffect(() => {
    dispatch(detailInvoices(id));
  }, [dispatch, id]);

  return (
    <div className="invoice-card">
      <div className="invoice-title">
        <div id="main-title">
          <h4>INVOICE</h4>
          <span id="date">{invoice.createdAt.slice(0, 10)}</span>
        </div>
        <div>
          <span id="text">Customer : {invoice.customer}</span>
        </div>
        <br />
        <div>
          <span id="text">Sales Person : {invoice.salesperson}</span>
        </div>
        <br />
        <div>
          <span id="text">notes : {invoice.notes}</span>
        </div>
      </div>
      <div className="invoice-details">
        <table className="invoice-table">
          <thead>
      
              <td>PRODUCT</td>
              <td>UNIT</td>
              <td>TOTAL PRICE</td>
           
          </thead>
          <tbody>
            {invoice.products.map((e) => (
              <>
                 <tr key={e.id}></tr>
              <td>{e.name}</td><td id="unit">{invoice.productsold}</td><td>${e.price * invoice.productsold}</td>
              <tr/>
              </>
            )

            )}
            <tr className="row-data">

            </tr>

          </tbody>
        </table>
      </div>
      <div className="invoice-footer">
        <button className="btn btn-secondary" id="later">LATER</button>
        <button className="btn btn-primary">PAY NOW</button>
      </div>
    </div>
  );
};

export default InvoiceCard;
