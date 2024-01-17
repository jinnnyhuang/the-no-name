import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const ProductNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Product Not Found | 還沒有名字";
  }, []);

  return (
    <main className="min-h-contentHeight text-center uppercase pt-32 [&>:not(:first-child)]:mt-2">
      <p className="text-3xl font-bold">查無此商品</p>
      <p className="font-display">Product Not Found.</p>
      <p className="mb-10">抱歉，我們找不到您要的商品</p>
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
