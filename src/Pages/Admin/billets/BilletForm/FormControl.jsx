import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BilletContext from "Services/BilletContext";
import PeriodeContext from "Services/PeriodeContext";

export const useBilletFormControl = () => {
  let { id } = useParams("id");

  // We'll update "values" as the form updates
  const [values, setValues] = useState({
    libele: "",
    description: "",
    stock: 0,
    prix: 0,
    a_vendre: false,
    periode: "",
  });

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [shownFrontImage, setShownFrontImage] = useState(null);
  const [shownBackImage, setShownBackImage] = useState(null);
  const { isLoading, addBillet, updateBillet, getBillet } =
    useContext(BilletContext);
  const { historiqueBilletes } = useContext(PeriodeContext);
  const requiredError = "This field is required.";

  /* If the form is for updating a Billet
    We get the billet from backend and update it

*/
  useEffect(() => {
    if (id) {
      getBillet(id).then((res) => {
        setValues(res);
        if (res.back_image) {
          setShownBackImage(
            process.env.REACT_APP_API_URL + "billet_images/" + res.back_image
          );
        }
        if (res.front_image) {
          setShownFrontImage(
            process.env.REACT_APP_API_URL + "billet_images/" + res.front_image
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

    if ("periode" in fieldValues)
      temp.periode =
        fieldValues.periode && fieldValues.periode !== "" ? "" : requiredError;

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
    temp.stock = "";
    setErrors({
      ...temp,
    });
  };

  // this function will handle the image input
  const handleImage = (e) => {
    const reader = new FileReader();
    const { id } = e.target;
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      if (id === "front_image") {
        setFrontImage(e.target.files[0]);
        setShownFrontImage(reader.result);
      } else if (id === "back_image") {
        setBackImage(e.target.files[0]);
        setShownBackImage(reader.result);
      }
    };
  };

  // this function will be triggered by the submit event
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const f = new FormData();
    f.append("billet", JSON.stringify(values));
    if (frontImage) {
      f.append("front_image", frontImage);
    }
    if (backImage) {
      f.append("back_image", backImage);
    }
    if (id) {
      updateBillet(f, id);
    } else {
      addBillet(f);
    }
  };

  // this function will check for the required form values and return a boolean value
  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.libele &&
      fieldValues.description &&
      fieldValues.periode &&
      fieldValues.periode !== "" &&
      (fieldValues.a_vendre ? fieldValues.prix > 0 : true) &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  return {
    handleFormSubmit,
    handleInputValue,
    handleSwitch,
    handleImage,
    formIsValid,
    shownFrontImage,
    shownBackImage,
    isLoading,
    historiqueBilletes,
    values,
    errors,
    id,
  };
};
