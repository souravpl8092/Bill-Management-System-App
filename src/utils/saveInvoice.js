import validateFields from "./validateFields";
import resetForm from "./resetForm";
import { addBillAsync } from "../redux/slices/billSlice";

const saveInvoice = (billData, dispatch, setError, setBillData, setSuccess) => {
  if (!validateFields(billData, setError)) return;

  dispatch(addBillAsync(billData))
    .then(() => {
      setSuccess(true);
       resetForm(setBillData);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
      setError("Failed to save invoice!");
    });
};

export default saveInvoice;
