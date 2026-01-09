import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'filled',
  size = 'medium',
  className = '',
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  ...props
}, ref) => {
  const baseStyles = `
    relative overflow-hidden inline-flex items-center justify-center
    font-google font-medium tracking-md-label
    rounded-full transition-all duration-md-standard
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-md-background-dark
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const sizeStyles = {
    small: 'h-9 px-4 text-sm gap-1.5',
    medium: 'h-10 px-6 text-sm gap-2',
    large: 'h-12 px-8 text-base gap-2',
    icon: 'h-10 w-10 p-0',
  };

  const variantStyles = {
    filled: `
      bg-md-primary-dark text-md-on-primary-dark
      hover:bg-opacity-90
      shadow-md-1 hover:shadow-md-2
    `,
    filledTonal: `
      bg-md-surface-variant-dark text-md-on-surface-dark
      hover:bg-opacity-90
      shadow-none
    `,
    outlined: `
      bg-transparent border border-md-outline
      text-md-primary-dark
      hover:bg-md-surface-variant-dark
      shadow-none
    `,
    text: `
      bg-transparent
      text-md-primary-dark
      hover:bg-md-surface-variant-dark
      shadow-none
    `,
    elevated: `
      bg-md-surface-dark text-md-on-surface-dark
      shadow-md-1 hover:shadow-md-3
    `,
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
