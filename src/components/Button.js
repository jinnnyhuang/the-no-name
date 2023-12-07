import className from "classnames";
import { twMerge } from "tailwind-merge";

const Button = ({ children, transition, primary, primaryReverse, secondary, tertiary, rounded, ...rest }) => {
  const classes = twMerge(
    // twMerge() Fix text-white Overriding Other Colors
    className(
      "uppercase leading-6 tracking-wide text-neutral-400 bg-white border border-neutral-300 py-2 px-3 shadow-sm",
      {
        "border-primary bg-primary text-white": primary,
        "transition hover:bg-white hover:text-primary": primary && transition,
        "border-primary bg-white text-primary": primaryReverse,
        "transition hover:bg-primary hover:text-white": primaryReverse && transition,
        "text-neutral-600 hover:border-neutral-600 hover:text-neutral-700 transition": secondary,
        "text-neutral-800 hover:text-neutral-800 hover:border-[#C8C8C8] hover:bg-[#F2F2F2]": secondary && transition,
        "border-[#C8C8C8] bg-neutral-200 text-primary hover:bg-neutral-300 hover:border-[#b6b6b6] hover:text-neutral-900 transition": tertiary,
        "rounded-full": rounded,
      },
      rest.className
    )
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
