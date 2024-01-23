import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation, openModal, useFetchUserQuery } from "../store";
import useAddToCart from "../utils/useAddToCart";
import useCollection from "../utils/useCollection";
import Products from "../components/Products";
import Button from "../components/Button";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const [updateUser, results] = useUpdateUserMutation(); // updateUser(id, update)

  const { data, error, isFetching, isLoading } = useFetchUserQuery(undefined, { skip: !isLogin });
  const userData = isLogin && !error && !isFetching ? data?.response : undefined;

  useEffect(() => {
    document.title = "Account | 還沒有名字";
  }, []);

  useEffect(() => {
    !isLogin && navigate("/login");
  }, [isLogin, navigate]);

  const { handleAddToCart } = useAddToCart();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Edit
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const handleTab = (index) => {
    setActiveTabIndex(index);
  };
  const handleName = (event) => {
    setName(event.target.value);
    event.target.id === updateError?.field && setUpdateError(null);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
    event.target.id === updateError?.field && setUpdateError(null);
  };
  const handleUpdateUser = (id, update) => {
    updateUser({ id, update })
      .unwrap()
      .then(() => dispatch(openModal({ title: "修改成功" })))
      .catch((err) => setUpdateError({ field: err.data?.field, message: err.data?.message }));
  };

  useEffect(() => {
    if (userData) {
      setName(userData?.name || "");
      setPhone(userData?.phone || "");
    }
  }, [updateError, userData]);

  useEffect(() => {
    isLogin && !isLoading && !error && setEmail(data?.response?.email || "");
  }, [isLogin, isLoading, error, data]);

  const handleEdit = (event) => {
    event.preventDefault();
    handleUpdateUser(userData._id, { name, phone });
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

  const { collectionItems } = useCollection();
  const wishList = collectionItems?.map((product) => {
    return <Products product={product} onAddToCart={handleAddToCart} key={product._id} />;
  });

  const settingData = [
    { label: "帳號", type: "email", id: "email", value: email, readonly: true },
    { label: "姓名", type: "text", id: "name", value: name, readonly: false, onChange: handleName },
    { label: "電話號碼", type: "text", id: "phone", value: phone, readonly: false, onChange: handlePhone },
  ];

  const setting = (
    <form id="account-form" autoComplete="off" onSubmit={handleEdit} ref={formRef}>
      {settingData.map((input, index) => {
        return (
          <div key={index} className="block mb-5 last-of-type:mb-10">
            <label htmlFor={input.id} className="block text-sm font-medium text-neutral-500 mb-1 uppercase tracking-wider">
              {input.label}
            </label>
            <input
              type={input.type}
              id={input.id}
              className={`px-3 py-2 border shadow-sm border-neutral-300 placeholder-neutral-400 block w-full rounded focus:outline-none${
                input.readonly || !isEditing ? ` bg-neutral-200` : ` bg-white focus:border-primary focus:ring-primary focus:ring-1`
              }${isLoading || results.isLoading ? " animate-pulse" : ""}`}
              readOnly={input.readonly || !isEditing}
              value={input.value}
              onChange={input?.onChange}
              tabIndex={input.readonly || !isEditing ? "-1" : "0"}
            />
          </div>
        );
      })}
      {updateError && <p className="text-red-400 text-center mb-5">{updateError.message}</p>}
      {!isEditing && (
        <Button secondary className="block mx-auto text-sm !rounded" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}
      {isEditing && (
        <Button primary className="block mx-auto text-sm !rounded">
          Update
        </Button>
      )}
    </form>
  );

  const tabs = [
    {
      label: ["帳戶設定", "Account Settings"],
      content: setting,
    },
    {
      label: ["訂單查詢", "Orders"],
      content: <p>尚無訂單</p>,
    },
    {
      label: ["願望清單", "Wish List"],
      content: <div className="grid grid-cols-2 lg:grid-cols-3 gap-7">{wishList}</div>,
    },
  ];

  const list = tabs.map((item, index) => {
    return (
      <button
        key={index}
        className={`cursor-pointer inline-block py-1.5 px-3 text-neutral-700${index === activeTabIndex ? " font-medium" : ""}`}
        onClick={() => handleTab(index)}
      >
        {item.label[0]}
      </button>
    );
  });

  const content = (
    <div className="page-content flex flex-col items-center">
      <h1 className="page-title">會員專區</h1>
      <div className="page-content-width flex flex-col xl:flex-row justify-between gap-x-7 min-h-[42vh]">
        <div className="account-buttons flex flex-row mb-2.5 xl:flex-col xl:w-[9.5rem]">{list}</div>
        <div className={`${tabs[activeTabIndex].label[1].replace(" ", "-").toLowerCase()} flex-1 bg-neutral-50 rounded p-7`}>
          <h2 className="content-heading text-xl mb-8">{tabs[activeTabIndex].label[1]}</h2>
          {tabs[activeTabIndex].content}
        </div>
      </div>
    </div>
  );

  return <main className="container m-auto">{content}</main>;
};

export default Account;
