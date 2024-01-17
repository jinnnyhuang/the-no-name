import Button from "../components/Button";

const ErrorLoading = ({ className, data = "產品" }) => {
  return (
    <div className={`${className ? className + " " : ""}col-span-full flex flex-col items-center font-display [&>:not(:first-child)]:mt-2`}>
      <p className="text-3xl font-bold">再試一次</p>
      <p className="mb-5">{`無法載入${data}，請稍後再試一次`}</p>
      <Button primary transition rounded className="w-[9.7rem]" onClick={() => window.location.reload()}>
        重新整理頁面
      </Button>
    </div>
  );
};

export default ErrorLoading;
