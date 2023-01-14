import { useRouter } from "next/router";
import classes from "./ErrorPanel.module.css";

const ErrorPanel = ({ msg }) => {
  const router = useRouter();
  const handleReload = () => {
    router.reload();
  };
  return (
    <div className={classes.error_container}>
      <p>{msg}</p>
      <br />
      <p>
        Click to <button onClick={handleReload}>reload</button> the page
      </p>
    </div>
  );
};

export default ErrorPanel;
