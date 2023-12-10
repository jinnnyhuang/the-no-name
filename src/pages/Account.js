import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation, setCredentials } from "../store";
import useAddToCart from "../utils/useAddToCart";
import useCollection from "../utils/useCollection";
import Products from "../components/Products";
import Button from "../components/Button";
import Modal from "../components/Modal";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserMutation(); // updateUser(id, update)

  useEffect(() => {
    document.title = "Account | 還沒有名字";
  }, []);

  useEffect(() => {
    !userInfo && navigate("/login");
  }, [userInfo, navigate]);

  const { modal, handleAddToCart } = useAddToCart();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false); // Modal
  // Edit
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userInfo?.name || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");
  const [error, setError] = useState(null);
  const handleTab = (index) => {
    setActiveTabIndex(index);
  };
  const handleName = (event) => {
    setName(event.target.value);
    event.target.id === error?.field && setError(null);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
    event.target.id === error?.field && setError(null);
  };
  const handleUpdateUser = (id, update) => {
    updateUser({ id, update })
      .unwrap()
      .then((res) => {
        dispatch(setCredentials({ ...res }));
        setIsOpen(true);
      })
      .catch((err) => setError({ field: err.data?.field, message: err.data?.message }));
  };

  useEffect(() => {
    if (error) {
      setName(userInfo.name);
      setPhone(userInfo.phone);
    }
  }, [error, userInfo]);

  const handleEdit = (event) => {
    event.preventDefault();
    handleUpdateUser(userInfo._id, { name, phone });
    setIsEditing(false);
  };

  // [Esc] Cancel Edit
  useEffect(() => {
    const handleKeydown = (event) => event.keyCode === 27 && setIsEditing(false);
    isEditing && window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isEditing]);

  // Click Outside
  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (!formRef.current) return;
      if (!formRef.current.contains(event.target)) setIsEditing(false);
    };
    isEditing && document.addEventListener("click", handleClickOutSide, true);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [isEditing]);

  // Modal
  const updateUserModal = isOpen && (
    <Modal onClose={() => setIsOpen(false)} action className="min-w-fit rounded-lg px-12 py-8 bg-white">
      <p className="text-lg">Update Successful</p>
    </Modal>
  );

  const { collectionItems } = useCollection();
  const wishList = collectionItems?.map((product) => {
    return <Products product={product} handleAddToCart={handleAddToCart} key={product._id} />;
  });

  const settingData = [
    { label: "E-mail", type: "email", id: "email", value: userInfo?.email || "", readonly: true },
    { label: "Name", type: "text", id: "name", value: name, readonly: false, onChange: handleName },
    { label: "Phone Number", type: "text", id: "phone", value: phone, readonly: false, onChange: handlePhone },
  ];

  const setting = (
    <form id="account-settings" name="account-settings" autoComplete="off" onSubmit={handleEdit} ref={formRef}>
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
              value={input.value}
              onChange={input?.onChange}
            />
          </div>
        );
      })}
      {error && <p className="text-red-400 text-center mb-5">{error.message}</p>}
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
        <ul className="flex flex-row mb-2.5 xl:flex-col xl:w-[9.5rem]">{list}</ul>
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
      {updateUserModal}
    </div>
  );
};

export default Account;
