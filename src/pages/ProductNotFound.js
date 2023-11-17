import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ProductNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Product Not Found | 還沒有名字";
  }, []);

  return (
    <div className="font-display h-[65vh] text-center pt-32">
      <div className="text-3xl font-bold">Product Not Found</div>
      <div className="mt-2 mb-12">Our apologies. This item you cannot be found.</div>

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
    </div>
  );
};

export default ProductNotFound;
