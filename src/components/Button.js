import className from "classnames";
import { twMerge } from "tailwind-merge";

const Button = ({ children, primary, secondary, tertiary, rounded, ...rest }) => {
  const classes = twMerge(
    // twMerge() Fix text-white Overriding Other Colors
    className(
      "uppercase leading-6 tracking-wide text-neutral-400 bg-white border border-neutral-300 py-2 px-3",
      {
        "border-black bg-black text-white transition hover:bg-white hover:text-black": primary,
        "text-neutral-600 border-neutral-300 hover:border-neutral-600 hover:text-black transition": secondary,
        "border-neutral-100 bg-neutral-100 text-neutral-600": tertiary,
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
