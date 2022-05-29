import { useContext, useState } from "react";
import AuthContext from "Services/AuthContext";

export const useFormControl = () => {
  // We'll update "values" as the form updates
  const [values, setValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    mot_de_passe: "",
    mot_de_passe_confirm: "",
    num_tel: "",
  });
  const { signUp } = useContext(AuthContext);

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({});

  //Error message for required fields
  const requiredError = "This field is required.";

  // this function will check if the form values are valid
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("prenom" in fieldValues)
      temp.prenom = fieldValues.prenom ? "" : requiredError;
    if ("nom" in fieldValues) temp.nom = fieldValues.nom ? "" : requiredError;

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : requiredError;
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("mot_de_passe" in fieldValues) {
      temp.mot_de_passe = fieldValues.mot_de_passe ? "" : requiredError;
      if (fieldValues.mot_de_passe) {
        temp.mot_de_passe =
          /* Check if at least has one special character : (?=.*[!@#$%^&*]) */
          /* Check if at least has one number : (?=.*[0-9]) */
          /^[a-zA-Z0-9!@#$%^&*]{6,}$/.test(fieldValues.mot_de_passe)
            ? ""
            : "Password must be longer than 6 characters.";
        temp.mot_de_passe_confirm = fieldValues.mot_de_passe_confirm
          ? ""
          : requiredError;
      }
    }

    if ("num_tel" in fieldValues) {
      if (fieldValues.num_tel) {
        temp.num_tel = /^(\d{8}?)$/.test(fieldValues.num_tel)
          ? ""
          : "Number must be 8 digits.";
      } else {
        temp.num_tel = "";
      }
    }
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

  // this function will handle password confirmation
  const handlePasswordConfirmation = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    let temp = { ...errors };

    if (value) {
      temp.mot_de_passe_confirm =
        values.mot_de_passe === value ? "" : "Does not match password.";
    } else {
      temp.mot_de_passe_confirm = requiredError;
    }

    setErrors({
      ...temp,
    });
  };

  // this function will be triggered by the submit event
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    signUp(values);
  };
  // this function will check if the form values and return a boolean value
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.prenom &&
      fieldValues.email &&
      fieldValues.nom &&
      fieldValues.mot_de_passe &&
      fieldValues.mot_de_passe_confirm &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    handlePasswordConfirmation,
    errors,
  };
};
