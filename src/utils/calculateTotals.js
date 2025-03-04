const calculateTotals = (items, setBillData) => {
  const subtotal = items.reduce((acc, item) => acc + (item.total || 0), 0);
  const tax = subtotal * 0.18; // Assuming 18% GST
  const total = subtotal + tax;

  setBillData((prev) => ({ ...prev, subtotal, tax, total }));
};

export default calculateTotals;
