import { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      className = "",
      disabled = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
    relative overflow-hidden inline-flex items-center justify-center
    font-sans font-medium tracking-tight
    rounded-lg transition-colors duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary-text
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const sizeStyles = {
      small: "h-8 px-3 text-xs gap-1.5",
      medium: "h-10 px-4 text-sm gap-2",
      large: "h-12 px-6 text-base gap-2",
      icon: "h-10 w-10 p-0",
    };

    const variantStyles = {
      primary: `
      bg-primary-text text-black
      hover:bg-white
      border border-transparent
    `,
      secondary: `
      bg-surface-highlight text-primary-text
      border border-border-subtle
      hover:border-border-hover hover:bg-surface-highlight/80
    `,
      ghost: `
      bg-transparent
      text-primary-muted hover:text-primary-text
      hover:bg-surface-highlight
    `,
      danger: `
      bg-red-500/10 text-red-400
      border border-red-500/20
      hover:bg-red-500/20 hover:border-red-500/30
    `,
    };

    // Map old variants to new ones if passed
    const normalizedVariant =
      {
        filled: "primary",
        filledTonal: "secondary",
        outlined: "secondary",
        text: "ghost",
        elevated: "secondary",
      }[variant] || variant;

    const isIcon = size === "icon";

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[normalizedVariant]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leadingIcon && (
          <span className="flex-shrink-0">{leadingIcon}</span>
        )}
        <span>{children}</span>
        {!loading && trailingIcon && (
          <span className="flex-shrink-0">{trailingIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
