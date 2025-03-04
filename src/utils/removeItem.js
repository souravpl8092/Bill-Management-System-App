import calculateTotals from "./calculateTotals";

const removeItem = (index, billData, setBillData) => {
  const newItems = billData.items.filter((_, i) => i !== index);
  setBillData((prev) => ({ ...prev, items: newItems }));
  calculateTotals(newItems, setBillData);
};

export default removeItem;
