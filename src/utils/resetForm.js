import generateInvoiceNumber from "./generateInvoiceNumber";
import getTodayDate from "./getTodayDate";

const resetForm = (setBillData) => {
  setBillData({
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
};

export default resetForm;
