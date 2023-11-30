import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";

const Signup = ({ handleSignup }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register | 還沒有名字";
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await handleSignup(email, password, name, phone || "");
    console.log(result);
    if (result.status === 200) {
      // alert(result.data.message);
      // navigate("/login");
      setIsOpen(true);
    } else {
      setError({ field: result?.response?.data?.field, message: result?.response?.data?.message || result?.message });
    }
  };

  const form = (
    <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
      {/* <div className="pt-4">
        <label htmlFor="name" className="font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
          Name
        </label>
        <input
          type="text"
          id="name"
          autoComplete="name"
          className="shadow-sm appearance-none border rounded w-full py-2.5 px-4.5 mt-1 focus:outline-none focus:shadow-outline"
          onChange={handleName}
        />
      </div>
      <div className="pt-4">
        <label htmlFor="email" className="font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          className="shadow-sm appearance-none border rounded w-full py-2.5 px-4.5 mt-1 focus:outline-none focus:shadow-outline"
          onChange={handleEmail}
        />
      </div>
      <div className="pt-4">
        <label htmlFor="password" className="font-medium after:content-['*'] after:ml-0.5 after:text-red-500">
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="password"
          className="shadow-sm appearance-none border rounded w-full py-2.5 px-4.5 mt-1 focus:outline-none focus:shadow-outline"
          onChange={handlePassword}
        />
      </div>
      <div className="pt-4">
        <label htmlFor="phone" className="font-medium">
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          autoComplete="tel"
          className="shadow-sm appearance-none border rounded w-full py-2.5 px-4.5 mt-1 focus:outline-none focus:shadow-outline"
          onChange={handlePhone}
        />
      </div> */}
      <Input id="name" type="text" autoComplete="name" onChange={handleName} required>
        Name
      </Input>
      <Input id="email" type="email" autoComplete="email" onChange={handleEmail} required>
        E-mail
      </Input>
      <Input id="password" type="password" autoComplete="password" onChange={handlePassword} required>
        Password
      </Input>
      <Input id="phone" type="text" autoComplete="tel" onChange={handlePhone}>
        Phone Number
      </Input>
      <Button primary className="mt-8 normal-case rounded">
        Sign up
      </Button>
    </form>
  );

  const actionBar = (
    <div className="mt-5">
      <Button tertiary className="rounded-md px-4.5 py-1.5 w-72" onClick={() => navigate("/login")}>
        Log in
      </Button>
    </div>
  );
  const modal = isOpen && (
    <Modal onClose={() => setIsOpen(false)} actionBar={actionBar} className="min-w-fit rounded-lg px-12 py-8 bg-white">
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-xl font-medium">Sign Up Complete!</p>
        <p>Please login to access the website.</p>
      </div>
    </Modal>
  );

  return (
    <div className="container m-auto">
      <div className="flex flex-col items-center caption-content">
        <div className="w-[20.5rem] md:w-[32rem]">
          <h1 className="caption">Create Account</h1>
          {form}
          <div className="mt-7 flex flex-col items-center gap-3.5">
            {error && <p className="text-red-400">{error.message}</p>}
            <p className="text-neutral-500">
              Already have an account? &nbsp;
              <Link to="/login" className="font-medium text-primary hover:underline">
                Log in.
              </Link>
            </p>
          </div>
        </div>
      </div>
      {modal}
    </div>
  );
};

export default Signup;
