import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Input from "../components/Input";
import Icons from "../components/Icons";
import useAuth from "../utils/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.auth);
  const { error, setError, handleLogin, handleGoogleLogin } = useAuth();

  useEffect(() => {
    document.title = "Login | 還沒有名字";
  }, []);

  useEffect(() => {
    isLogin && navigate("/");
  }, [isLogin, navigate]);

  useEffect(() => {
    error && setPassword("");
  }, [error]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
    event.target.id === error?.field && setError(null);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    event.target.id === error?.field && setError(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  const form = (
    <form id="login-form" className="login-form flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      <Input id="email" type="email" autoComplete="email" value={email} onChange={handleEmail}>
        電子信箱
      </Input>
      <Input id="password" type="password" autoComplete="password" value={password} onChange={handlePassword}>
        密碼
      </Input>
      <Button primary className="mt-8 normal-case rounded">
        登入
      </Button>
    </form>
  );

  return (
    <main className="container m-auto">
      <div className="page-content flex flex-col items-center">
        <div className="w-[20.5rem] md:w-[32rem]">
          <h1 className="page-title">Welcome</h1>
          {form}
          <div className="register-prompt mt-7 flex flex-col items-center gap-3.5">
            {error && <p className="text-red-400">{error.message}</p>}
            <p className="text-neutral-500">
              還沒有帳號嗎？
              <Link to="/signup" className="font-medium text-primary hover:underline">
                立即註冊
              </Link>
            </p>
          </div>
          <div className="flex items-center my-10 font-light font-display text-neutral-400 overflow-hidden after:h-[1px] after:bg-neutral-300 after:inline-block after:flex-1 after:ml-3 before:h-[1px] before:bg-neutral-300 before:inline-block before:flex-1 before:mr-3">
            Or
          </div>
          <Button
            secondary
            transition
            className="w-full flex items-center justify-center gap-2 normal-case rounded tracking-normal"
            onClick={handleGoogleLogin}
          >
            <Icons.Google className="w-4" />
            使用 Google 繼續
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Login;
