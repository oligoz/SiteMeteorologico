import { Oval } from "react-loader-spinner";

function LoaderSpinner({ size = 25 }) {
  return (
    <Oval
      height={size}
      width={size}
      color="var(--primary-foreground)"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="var(--primary-foreground)"
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  );
}

export default LoaderSpinner;
