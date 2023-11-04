import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useAddToCart from "../utils/useAddToCart";
import Products from "../components/Products";
import Button from "../components/Button";

const Account = () => {
  useEffect(() => {
    document.title = "Account | 還沒有名字";
  }, []);

  const { modal, handleAddToCart } = useAddToCart();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const handleTab = (index) => {
    setActiveTabIndex(index);
  };
  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const collectionItems = useSelector((state) => state.collection.collectionItems);
  const wishList = collectionItems?.map((product) => {
    return <Products product={product} handleAddToCart={handleAddToCart} key={product.id} />;
  });

  const settingData = [
    { label: "Name", type: "text", value: "Jane Doe" },
    { label: "Birthday", type: "date", value: "1996-02-03" },
    { label: "Phone Number", type: "text", value: "0912345678" },
    { label: "E-mail", type: "email", value: "Jane@noname.com" },
    { label: "Password", type: "password", value: 12345678 },
  ];
  const setting = (
    <div className="flex flex-col items-center">
      <div className="w-full">
        {/* <h3 className="text-md font-medium text-neutral-700 mb-6">Personal Information</h3> */}
        <form method="put" action="" id="account-settings" name="account-settings">
          {settingData.map((input, index) => {
            return (
              <label key={index} className="block mb-5">
                <span className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">{input.label}</span>
                <input
                  type={input.type}
                  name={input.type}
                  defaultValue={input.value}
                  readOnly={!showEdit}
                  autoComplete="off"
                  className={`mt-1 px-3 py-2 border shadow-sm border-neutral-300 placeholder-neutral-400 block w-full rounded focus:outline-none
                ${showEdit ? `bg-white focus:border-sky-500 focus:ring-sky-500 focus:ring-1` : `bg-neutral-200`}`}
                />
              </label>
            );
          })}
        </form>
      </div>
      <Button primary className="text-sm rounded mt-4 w-16" onClick={() => handleEdit()}>
        {showEdit ? "Save" : "Edit"}
      </Button>
    </div>
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
        className={`cursor-pointer inline-block text-neutral-700 rounded py-1.5 px-3 ${
          index === activeTabIndex ? "font-medium text-neutral-800" : ""
        }`}
        onClick={() => handleTab(index)}
      >
        {item.label}
      </li>
    );
  });

  const content = (
    <div className="flex flex-col items-center caption-content">
      <h1 className="text-2xl tracking-wider text-center mb-14">Your Account</h1>
      <div className="flex flex-col xl:flex-row justify-between gap-x-7 min-h-[55vh] caption-content-width">
        <ul className="flex flex-row mb-2.5 xl:flex-col xl:w-[9.5rem]">{list}</ul>
        <div className="flex-1 bg-neutral-50 text-neutral-700 rounded p-7">
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
