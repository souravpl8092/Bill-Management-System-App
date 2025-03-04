import { showError } from "../utils/messageUtils";

const validateFields = (billData, setError) => {
  if (!billData.client.trim())
    return showError("Client Name cannot be empty.", setError);
  if (!billData.contact.trim())
    return showError("Contact Number cannot be empty.", setError);
  if (!/^\d{10}$/.test(billData.contact.trim()))
    return showError("Contact Number must be exactly 10 digits.", setError);
  if (!billData.address.trim())
    return showError("Address cannot be empty.", setError);
  if (!billData.number.trim())
    return showError("Invoice Number cannot be empty.", setError);
  if (!billData.date.trim())
    return showError("Date cannot be empty.", setError);

  for (let i = 0; i < billData.items.length; i++) {
    const item = billData.items[i];
    if (!item.item.trim())
      return showError(`Item ${i + 1}: Name cannot be empty.`, setError);
    if (!item.description.trim())
      return showError(`Item ${i + 1}: Description cannot be empty.`, setError);
    if (!item.quantity || item.quantity <= 0)
      return showError(
        `Item ${i + 1}: Quantity must be greater than 0.`,
        setError
      );
    if (!item.price || item.price <= 0)
      return showError(
        `Item ${i + 1}: Price must be greater than 0.`,
        setError
      );
  }

  return true;
};

export default validateFields;
