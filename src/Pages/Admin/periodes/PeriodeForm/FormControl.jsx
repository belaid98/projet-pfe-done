import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeriodeContext from "Services/PeriodeContext";

export const usePeriodeFormControl = () => {
  let { id } = useParams("id");

  // We'll update "values" as the form updates
  const [values, setValues] = useState({
    title: "",
    details: "",
    order: 0,
    piece: false,
    date: "",
  });

  const { isLoading, addPeriode, updatePeriode, getPeriode } =
    useContext(PeriodeContext);
  const { periodes } = useContext(PeriodeContext);
  const requiredError = "This field is required.";

  /* If the form is for updating a Periode
    We get the Periode from backend and update it

*/
  useEffect(() => {
    if (id) {
      getPeriode(id).then((res) => {
        setValues(res);
        console.log("DATA: ", res);
      });
    }
  }, []);

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({});

  // this function will check if the form values are valid
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : requiredError;

    if ("details" in fieldValues)
      temp.details = fieldValues.details ? "" : requiredError;

    if ("order" in fieldValues) {
      temp.order = fieldValues.order ? "" : requiredError;
      if (fieldValues.order < 0) {
        temp.order = "Number must be positive";
      }
    }

    if ("date" in fieldValues)
      temp.date =
        fieldValues.date && fieldValues.date !== "" ? "" : requiredError;

    setErrors({
      ...temp,
    });
  };

  // this function will handle the input
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  // this function will handle the input
  const handleSwitch = (e) => {
    const { name, checked } = e.target;

    if (!checked) {
      setValues({
        ...values,
        [name]: checked,
      });
    } else {
      setValues({
        ...values,
        [name]: checked,
      });
    }

    let temp = { ...errors };
    temp.order = "";
    setErrors({
      ...temp,
    });
  };

  // this function will be triggered by the submit event
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      updatePeriode(values, id);
    } else {
      addPeriode(values);
    }
  };

  // this function will check for the required form values and return a boolean value
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.title &&
      fieldValues.details &&
      fieldValues.date &&
      fieldValues.order &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return {
    handleFormSubmit,
    handleInputValue,
    handleSwitch,
    formIsValid,
    isLoading,
    values,
    errors,
    id,
  };
};
