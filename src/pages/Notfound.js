import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Notfound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 Page Not Found | 還沒有名字";
  }, []);

  return (
    <main className="font-display min-h-contentHeight text-center pt-32">
      <p className="text-5.4 font-bold">404</p>
      <p className="uppercase mt-2">Oops! Page Not Found.</p>
      <p className="uppercase mt-2 mb-12 font-noto">抱歉，我們找不到您指定的頁面</p>
      <Button
        primary
        transition
        rounded
        className="w-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </Button>
    </main>
  );
};

export default Notfound;
