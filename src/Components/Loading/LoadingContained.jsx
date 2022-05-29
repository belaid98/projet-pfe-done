const { Loading } = require("./Loading");

export default function LoadingContained() {
  return (
    <div
      style={{
        height: " 200px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Loading />
    </div>
  );
}
