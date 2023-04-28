import { useState } from "react";
import { formValidations } from "../utils/formValidations";

export const useForm = (initialValues, onSubmitHandler) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onValidateForm = (e) => {
    const error = formValidations(e);
    setErrors(error);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (onSubmitHandler) {
      if (Object.values(values).every((v) => v.trim() !== ``)) {
        // console.log(">>> From useForm hook", values);
        onSubmitHandler(values);
        //   setValues(initialValues);
      } else {
        alert("All fields are required!");
      }
    }
  };

  return {
    values,
    errors,
    onChangeHandler,
    onSubmit,
    onValidateForm,
  };
};
