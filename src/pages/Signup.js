import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreateUserMutation, openModal } from "../store";
import Button from "../components/Button";
import Input from "../components/Input";

const Signup = () => {
  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation(); // createUser(email, password, name, phone)

  useEffect(() => {
    document.title = "Register | 還沒有名字";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
    error && event.target.id === error?.field && setError(null);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    error && event.target.id === error?.field && setError(null);
  };
  const handleName = (event) => {
    setName(event.target.value);
    error && event.target.id === error?.field && setError(null);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
    error && event.target.id === error?.field && setError(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({ email, password, name, phone: phone || "" })
      .unwrap()
      .then((res) => {
        dispatch(openModal({ title: "註冊成功", description: res?.message, actionButton: "Login" }));
        setError(null);

        // 清除註冊資料
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");
      })
      .catch((err) => setError({ field: err.data?.field, message: err.data?.message }));
  };

  const form = (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      <Input id="name" type="text" autoComplete="name" value={name} onChange={handleName} required>
        姓名
      </Input>
      <Input id="email" type="email" autoComplete="email" value={email} onChange={handleEmail} required>
        電子信箱
      </Input>
      <Input id="password" type="password" autoComplete="password" value={password} onChange={handlePassword} required>
        密碼
      </Input>
      <Input id="phone" type="text" autoComplete="tel" value={phone} onChange={handlePhone}>
        電話號碼
      </Input>
      <Button primary className="mt-8 normal-case rounded">
        註冊
      </Button>
    </form>
  );

  return (
    <div className="container m-auto">
      <div className="flex flex-col items-center caption-content">
        <div className="w-[20.5rem] md:w-[32rem]">
          <h1 className="caption">建立帳號</h1>
          {form}
          <div className="mt-7 flex flex-col items-center gap-3.5">
            {error && <p className="text-red-400">{error.message}</p>}
            <p className="text-neutral-500">
              已經有帳號了嗎？
              <Link to="/login" className="font-medium text-primary hover:underline">
                登入
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
