import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function PeriodeImageList(props) {
  const { setItem, items } = props;
  return (
    <ImageList sx={{ width: 250, height: "400px", mt: 5 }} cols={1}>
      {items.map((item, index) => {
        return (
          <ImageListItem key={index}>
            <img
              src={item.front_image ?? "./assets/placeholder.png"}
              alt={item.libele}
              style={{ objectFit: "contain" }}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.libele}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.libele}`}
                  onClick={() => {
                    setItem(item);
                  }}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
