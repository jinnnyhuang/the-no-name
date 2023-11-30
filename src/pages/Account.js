import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAddToCart from "../utils/useAddToCart";
import Products from "../components/Products";
import Button from "../components/Button";

const Account = ({ currentUser, handleLogout, handleUpdateUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Account | 還沒有名字";
  }, []);

  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser, navigate]);

  const { modal, handleAddToCart } = useAddToCart();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Edit
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const handleTab = (index) => {
    setActiveTabIndex(index);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleEdit = (event) => {
    event.preventDefault();
    handleUpdateUser(currentUser._id, { name, phone });
    setIsEditing(false);
  };

  // [Esc] Cancel Edit
  useEffect(() => {
    const handleKeydown = (event) => event.keyCode === 27 && setIsEditing(false);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isEditing]);

  const collectionItems = useSelector((state) => state.collection.collectionItems);
  const wishList = collectionItems?.map((product) => {
    return <Products product={product} handleAddToCart={handleAddToCart} key={product.id} />;
  });

  const settingData = [
    { label: "E-mail", type: "email", id: "email", value: currentUser?.email || "", readonly: true },
    { label: "Name", type: "text", id: "name", value: currentUser?.name || "", readonly: false, onChange: handleName },
    { label: "Phone Number", type: "text", id: "phone", value: currentUser?.phone || "", readonly: false, onChange: handlePhone },
  ];

  const setting = (
    <form id="account-settings" name="account-settings" autoComplete="off" onSubmit={handleEdit}>
      {settingData.map((input, index) => {
        return (
          <div key={index} className="block mb-5 last-of-type:mb-10">
            <label htmlFor={input.id} className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">
              {input.label}
            </label>
            <input
              type={input.type}
              id={input.id}
              className={`px-3 py-2 border shadow-sm border-neutral-300 placeholder-neutral-400 block w-full rounded focus:outline-none ${
                input.readonly || !isEditing ? `bg-neutral-200` : `bg-white focus:border-sky-500 focus:ring-sky-500 focus:ring-1`
              }`}
              readOnly={input.readonly || !isEditing}
              defaultValue={input.value}
              onChange={input?.onChange}
            />
          </div>
        );
      })}
      {!isEditing && (
        <Button secondary className="block mx-auto text-sm rounded" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}
      {isEditing && (
        <Button primary className="block mx-auto text-sm rounded">
          Update
        </Button>
      )}
    </form>
  );

  const tabs = [
    {
      label: "Account Settings",
      content: setting,
    },
    {
      label: "Orders",
      content: "You have placed no orders.",
    },
    {
      label: "Wish List",
      content: <div className="grid grid-cols-2 lg:grid-cols-3 gap-7">{wishList}</div>,
    },
  ];

  const list = tabs.map((item, index) => {
    return (
      <li
        key={index}
        className={`cursor-pointer inline-block rounded py-1.5 px-3 text-neutral-700 ${index === activeTabIndex ? "font-medium" : ""}`}
        onClick={() => handleTab(index)}
      >
        {item.label}
      </li>
    );
  });

  const content = (
    <div className="flex flex-col items-center caption-content">
      <h1 className="caption">Your Account</h1>
      <div className="flex flex-col xl:flex-row justify-between gap-x-7 min-h-[42vh] caption-content-width">
        <ul className="flex flex-row mb-2.5 xl:flex-col xl:w-[9.5rem]">
          {list}
          <li className="hover-none:hidden cursor-pointer inline-block rounded py-1.5 px-3 hover:underline" onClick={handleLogout}>
            Log out
          </li>
        </ul>
        <div className="flex-1 bg-neutral-50 rounded p-7">
          <div>
            <h2 className="text-xl font-medium mb-8">{tabs[activeTabIndex].label}</h2>
            <div>{tabs[activeTabIndex].content}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container m-auto">
      {content}
      {modal}
    </div>
  );
};

export default Account;
