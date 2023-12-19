const Input = ({ children, id, type, required, ...rest }) => {
  return (
    <div className="pt-4">
      <label htmlFor={id} className={`${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}`}>
        {children}
      </label>
      <input
        id={id}
        type={type}
        className="shadow-sm appearance-none border rounded w-full py-2.5 px-4.5 mt-1 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
        {...rest}
      />
    </div>
  );
};

export default Input;

// <Input id="name" type="text" autoComplete="name" onChange={handleName} required/>
