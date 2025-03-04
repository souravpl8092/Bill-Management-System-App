import calculateTotals from "./calculateTotals";

const handleItemChange = (index, field, value, billData, setBillData) => {
  const newItems = [...billData.items];
  newItems[index][field] = value;
  newItems[index].total =
    (parseFloat(newItems[index].quantity) || 0) *
    (parseFloat(newItems[index].price) || 0);

  setBillData((prev) => ({ ...prev, items: newItems }));
  calculateTotals(newItems, setBillData);
};

export default handleItemChange;
