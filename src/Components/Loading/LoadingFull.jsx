const { Loading } = require("./Loading");

export default function LoadingFull() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Loading />
    </div>
  );
}
