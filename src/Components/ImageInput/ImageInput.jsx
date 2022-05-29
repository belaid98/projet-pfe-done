import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

import "./ImageInput.css";

const Input = styled("input")({
  display: "none",
});

const ImageInput = (props) => {
  return (
    <div className="image-input">
      <label>{props.label}</label>
      <label htmlFor={props.name} style={{ width: "40px", margin: "auto" }}>
        <Input
          accept="image/png,image/jpeg"
          name={props.name}
          id={props.name}
          type="file"
          onChange={props.handleChange}
        />
        <IconButton aria-label={props.label} component="span">
          <PhotoCameraOutlinedIcon />
        </IconButton>
      </label>
      {props.value !== null ? (
        <img
          alt={props.name}
          className="image-uploaded"
          src={props.value}
          id={props.photoId}
        />
      ) : (
        ""
      )}
    </div>
  );
};
ImageInput.defaultProps = {
  classes: "",
};
export default ImageInput;
