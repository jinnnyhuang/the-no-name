import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Notfound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 Page Not Found | 還沒有名字";
  }, []);

  return (
    <div className="font-display h-[70vh] text-center pt-32">
      <div className="text-5.4 font-bold">404</div>
      <div className="uppercase mt-2 mb-12">Oops! Page Not Found.</div>

      <Button
        primary
        rounded
        className="w-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </Button>
    </div>
  );
};

export default Notfound;
