import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaSave, FaDownload } from "react-icons/fa";
import generateInvoiceNumber from "../utils/generateInvoiceNumber";
import getTodayDate from "../utils/getTodayDate";
import handleItemChange from "../utils/handleItemChange";
import addItem from "../utils/addItem";
import removeItem from "../utils/removeItem";
import generatePDF from "../utils/generatePDF";
import saveInvoice from "../utils/saveInvoice";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/BillGenerator.css";

const Bills = () => {
  const dispatch = useDispatch();
  const [billData, setBillData] = useState({
    client: "",
    contact: "",
    address: "",
    number: generateInvoiceNumber(),
    date: getTodayDate(),
    note: "",
    items: [{ item: "", description: "", quantity: "", price: "", total: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="bill-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {error && (
        <div className="error-modal">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="success-modal">
          <p>
            {" "}
            <FaCheckCircle size={20} />
            Invoice saved successfully!
          </p>
        </div>
      )}

      <h2 className="bill-title">Invoice Generator</h2>

      <div className="bill-grid">
        {[
          {
            name: "client",
            placeholder: "Client Name",
            label: "Client Name",
            type: "text",
          },
          {
            name: "contact",
            placeholder: "Contact Number",
            label: "Contact Number",
            type: "phone",
          },
          {
            name: "address",
            placeholder: "Address",
            label: "Address",
            type: "text",
          },
          {
            name: "number",
            placeholder: "Invoice Number",
            label: "Invoice Number",
            type: "text",
          },
          { name: "date", placeholder: "Date", label: "Date", type: "date" },
        ].map((field, idx) => (
          <div key={idx} className="input-wrapper">
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={billData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              className="bill-input"
            />
          </div>
        ))}
      </div>
      <div className="items-container">
        <h3>Items</h3>
        {billData.items.map((item, index) => (
          <motion.div key={index} className="item-row">
            {["item", "description", "quantity", "price", "total"].map(
              (field, idx) => (
                <div key={idx}>
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    key={idx}
                    type={
                      field === "quantity" || field === "price"
                        ? "number"
                        : "text"
                    }
                    value={
                      field === "total"
                        ? `₹ ${parseFloat(item[field] || 0).toFixed(2)}`
                        : item[field]
                    }
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        field,
                        e.target.value,
                        billData,
                        setBillData
                      )
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="item-input"
                    disabled={field === "total"}
                  />
                </div>
              )
            )}
            {billData.items.length > 1 && (
              <button
                onClick={() => removeItem(index, billData, setBillData)}
                className="remove-btn"
              >
                <FaTrash />
              </button>
            )}
          </motion.div>
        ))}
        <button onClick={() => addItem(setBillData)} className="add-item-btn">
          <FaPlus /> Add Item
        </button>
      </div>
      <div className="totals-container">
        <p>Subtotal: ₹ {billData.subtotal.toFixed(2)}</p>
        <p>Tax (18%): ₹ {billData.tax.toFixed(2)}</p>
        <p className="total">Total: ₹ {billData.total.toFixed(2)}</p>
      </div>
      <div className="buttons-container">
        <button
          onClick={() => {
            saveInvoice(billData, dispatch, setError, setBillData, setSuccess);
          }}
          className="save-btn"
        >
          <FaSave /> Save Invoice
        </button>
        <button
          onClick={() => generatePDF(billData, setError)}
          className="download-btn"
        >
          <FaDownload /> Download PDF
        </button>
      </div>
    </motion.div>
  );
};

export default Bills;
