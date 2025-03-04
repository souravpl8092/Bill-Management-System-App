const generateInvoiceNumber = () => {
  const storedBills = JSON.parse(localStorage.getItem("bills")) || [];
  const invoiceCount = storedBills.length + 1;
  return `BMS-2025-${String(invoiceCount).padStart(3, "0")}`;
};

export default generateInvoiceNumber;
