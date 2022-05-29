import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuvrageContext from "Services/OuvrageContext";

export const useOuvrageFormControl = () => {
  let { id } = useParams("id");

  // We'll update "values" as the form updates
  const [values, setValues] = useState({
    libele: "",
    description: "",
    stock: 0,
    prix: 0,
  });

  const [frontImage, setFrontImage] = useState(null);
  const [shownFrontImage, setShownFrontImage] = useState(null);
  const { isLoading, addOuvrage, updateOuvrage, getOuvrage } =
    useContext(OuvrageContext);
  const requiredError = "This field is required.";

  /* If the form is for updating a Ouvrage
    We get the Ouvrage from backend and update it

*/
  useEffect(() => {
    if (id) {
      getOuvrage(id).then((res) => {
        setValues(res);
        if (res.front_image) {
          setShownFrontImage(
            process.env.REACT_APP_API_URL + "ouvrage_images/" + res.front_image
          );
        }
        console.log("DATA: ", res);
      });
    }
  }, []);

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({});

  // this function will check if the form values are valid
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("libele" in fieldValues)
      temp.libele = fieldValues.libele ? "" : requiredError;

    if ("description" in fieldValues)
      temp.description = fieldValues.description ? "" : requiredError;

    if ("stock" in fieldValues) {
      temp.stock = fieldValues.stock ? "" : requiredError;
      if (fieldValues.stock < 0) {
        temp.stock = "Number must be positive";
      }
    }
    if ("prix" in fieldValues) {
      temp.prix = fieldValues.prix ? "" : requiredError;
      if (fieldValues.prix < 1) {
        temp.prix = "Number must be above 0";
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

  // this function will handle the image input
  const handleImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setFrontImage(e.target.files[0]);
      setShownFrontImage(reader.result);
    };
  };

  // this function will be triggered by the submit event
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const f = new FormData();
    f.append("ouvrage", JSON.stringify(values));

    f.append("front_image", frontImage);

    if (id) {
      updateOuvrage(f, id);
    } else {
      addOuvrage(f);
    }
  };

  // this function will check for the required form values and return a boolean value
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.libele &&
      fieldValues.description &&
      fieldValues.prix > 0 &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return {
    handleFormSubmit,
    handleInputValue,
    handleImage,
    formIsValid,
    shownFrontImage,
    isLoading,
    values,
    errors,
    id,
  };
};
