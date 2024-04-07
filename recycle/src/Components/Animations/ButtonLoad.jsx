import ClipLoader from "react-spinners/ClipLoader";

const ButtonLoad = () => {
  return (
    <ClipLoader
      color="white"
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default ButtonLoad;
