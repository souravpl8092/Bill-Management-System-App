import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBills } from "../redux/slices/billSlice";
import "../styles/CustomersTable.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const CustomersTable = () => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills.bills) || [];
  const loading = useSelector((state) => state.bills.loading);
  const error = useSelector((state) => state.bills.error);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);

  const toggleExpand = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      <div className="customers-container">
        <h2 className="customers-title">Customers List</h2>
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">Error: {error}</p>}
        <div className="table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th></th>
                <th>Client Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Invoice No</th>
                <th>Billing Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bills.length > 0 ? (
                [...bills].reverse().map((bill, index) => (
                  <React.Fragment key={bill.id || index}>
                    <tr className={index % 2 === 0 ? "even" : "odd"}>
                      <td
                        onClick={() => toggleExpand(index)}
                        className="toggle-btn"
                      >
                        {expandedRows.includes(index) ? (
                          <FaAngleUp className="expand-icon" />
                        ) : (
                          <FaAngleDown className="expand-icon" />
                        )}
                      </td>
                      <td>{bill.client}</td>
                      <td>{bill.contact}</td>
                      <td>{bill.address}</td>
                      <td>{bill.number}</td>
                      <td>{bill.date}</td>
                      <td className="price">₹ {bill.total.toFixed(2)}</td>
                    </tr>
                    {expandedRows.includes(index) && (
                      <tr className="details-row">
                        <td colSpan={7}>
                          <div className="items-container">
                            <h4 className="items-header">Item Details</h4>
                            <div className="items-table">
                              <div className="items-header-row">
                                <span>Item Name</span>
                                <span>Description</span>
                                <span>Qty</span>
                                <span>Price</span>
                                <span>Total</span>
                              </div>
                              {bill.items.map((item, i) => (
                                <div key={i} className="item-box">
                                  <span>{item.item}</span>
                                  <span>{item.description}</span>
                                  <span>{item.quantity}</span>
                                  <span>₹ {item.price}</span>
                                  <span>₹ {item.total.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-bills-text">
                    No bills found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
