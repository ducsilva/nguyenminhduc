import * as Yup from "yup";

const requiredFrCurrency = "From Currency is Required";
const requiredToCurrency = "To Currency is Required";
const amountPositive = "Amount must be positive";
const requiredAmount = "Amount is Required";

const swapFormSchema = Yup.object().shape({
  fromCurrency: Yup.string().required(requiredFrCurrency),
  toCurrency: Yup.string().required(requiredToCurrency),
  amount: Yup.number().positive(amountPositive).required(requiredAmount),
});

export { swapFormSchema };
