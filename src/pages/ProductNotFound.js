import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ProductNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Product Not Found | 還沒有名字";
  }, []);

  return (
    <main className="min-h-contentHeight text-center pt-32">
      <p className="text-3xl font-bold">查無此商品</p>
      <p className="uppercase mt-2 font-display">Product Not Found.</p>
      <p className="uppercase mt-2 mb-12">抱歉，我們找不到您要的商品</p>
      <Button
        primary
        transition
        rounded
        className="w-button font-display"
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Home
      </Button>
    </main>
  );
};

export default ProductNotFound;
