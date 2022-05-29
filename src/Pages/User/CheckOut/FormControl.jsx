import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "Services/AuthContext";

import CommandContext from "Services/CommandContext";
import PanierContext from "Services/PanierContext";

export const useCommandFormControl = () => {
  // We'll update "values" as the form updates
  const navigate = useNavigate();
  const [values, setValues] = useState({
    client: "",
    email: "",
    nom: "",
    validated: false,
    prenom: "",
    country: "",
    state: "",
    zip: "",
    city: "",
    adresse: "",
    panier: { billets: [], pieces: [], ouvrages: [] },
  });

  const { isLoading, addCommande } = useContext(CommandContext);
  const { user } = useContext(AuthContext);
  const { panier, total } = useContext(PanierContext);
  const requiredError = "This field is required.";

  /* If the form is for updating a Billet
    We get the billet from backend and update it

*/
  useEffect(() => {
    if (user) {
      values.client = user._id;
      values.email = user.email;
      values.nom = user.nom;
      values.prenom = user.prenom;
    } else {
      navigate("/E_boutique");
    }
    setValues({ ...values, panier: panier });
  }, []);

  useEffect(() => {
    console.log(values);
    console.log(errors);
  }, [values]);

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({});

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

  // this function will be triggered by the submit event
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    addCommande(values);
  };

  // this function will check for the required form values and return a boolean value
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.nom &&
      fieldValues.email &&
      fieldValues.prenom &&
      fieldValues.client &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return {
    handleFormSubmit,
    handleInputValue,
    formIsValid,
    isLoading,
    values,
    total,
    errors,
  };
};
