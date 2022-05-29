import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "Services/UserContext";

export const useFormControl = () => {
  let { id } = useParams("id");

  // We'll update "values" as the form updates
  const [values, setValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    mot_de_passe: "",
    mot_de_passe_confirm: "",
    active: true,
    num_tel: "",
  });

  const [Image, setImage] = useState(null);
  const [shownImage, setShownImage] = useState(null);
  const { isLoading, addUser, updateUser, getUser } = useContext(UserContext);

  //Error message for required fields
  const requiredError = "This field is required.";

  /* If the form is for updating a User
    We get the User from backend and update it

*/
  useEffect(() => {
    if (id) {
      getUser(id).then((res) => {
        setValues(res);
        if (res.photo) {
          setShownImage(process.env.REACT_APP_API_URL + "user/" + res.photo);
        }
        console.log("DATA: ", res);
      });
    }
  }, []);

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({});

  // this function will check if the form values are valid

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

  // this function will handle the switch input
  const handleSwitch = (e) => {
    const { name, checked } = e.target;

    setValues({
      ...values,
      [name]: checked,
    });
  };

  // this function will handle the image input
  const handleImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImage(e.target.files[0]);
      setShownImage(reader.result);
    };
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

    const f = new FormData();
    f.append("user", JSON.stringify(values));

    f.append("photo", Image);

    if (id) {
      updateUser(f, id);
    } else {
      addUser(values);
    }
  };

  // this function will check for the form values and return a boolean value
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.prenom &&
      fieldValues.email &&
      fieldValues.nom &&
      (id ? true : fieldValues.mot_de_passe) &&
      (id ? true : fieldValues.mot_de_passe_confirm) &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    handleSwitch,
    handleImage,
    handlePasswordConfirmation,
    shownImage,
    isLoading,
    values,
    errors,
    id,
  };
};
