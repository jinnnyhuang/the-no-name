import className from "classnames";
import { twMerge } from "tailwind-merge";

const Button = ({ children, transition, primary, secondary, tertiary, rounded, focus, ...rest }) => {
  // const focusClass = " focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_rgb(255,255,255),0_0_0_2px_var(--color-primary)]";
  const classes = twMerge(
    // twMerge() Fix text-white Overriding Other Colors
    className(
      "uppercase leading-6 tracking-wide text-neutral-400 bg-white border border-neutral-300 py-2 px-3 shadow-sm",
      {
        "focus-visible:shadow-none": !focus && !(primary && !transition), // Button 'focus = false' 或 '只有 primary' 時取消聚焦
        "border-primary bg-primary text-white": primary,
        "transition hover:bg-white hover:text-primary focus-visible:bg-white focus-visible:text-primary": primary && transition,
        "text-neutral-600 hover:border-neutral-600 hover:text-neutral-700 focus-visible:border-neutral-600 focus-visible:text-neutral-700 transition":
          secondary,
        "text-neutral-800 hover:text-neutral-800 hover:border-[#C8C8C8] hover:bg-[#F2F2F2] focus-visible:text-neutral-800 focus-visible:border-[#C8C8C8] focus-visible:bg-[#F2F2F2]":
          secondary && transition,
        "border-[#C8C8C8] bg-neutral-200 text-primary hover:bg-neutral-300 hover:border-[#b6b6b6] hover:text-neutral-900 focus-visible:bg-neutral-300 focus-visible:border-[#b6b6b6] focus-visible:text-neutral-900 transition":
          tertiary,
        "!rounded-full": rounded,
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
