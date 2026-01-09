import { forwardRef } from "react";
import { motion } from "framer-motion";

const Card = forwardRef(
  (
    {
      children,
      variant = "default",
      className = "",
      padding = "medium",
      interactive = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
    relative overflow-hidden
    bg-surface rounded-3xl border border-border-subtle
    text-primary-text
    transition-all duration-300 ease-out
  `;

    const paddingStyles = {
      none: "",
      small: "p-4",
      medium: "p-6",
      large: "p-8",
    };

    const interactiveStyles = interactive
      ? "hover:border-white/20 hover:-translate-y-[1px] cursor-pointer"
      : "";

    // Variants can be simple now as "Bento" is the main style
    const variantStyles = {
      default: "",
      highlight: "bg-surface-highlight",
      ghost: "bg-transparent border-transparent",
    };

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }} // smooth ease
        whileTap={interactive ? { scale: 0.99 } : {}}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
