import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  variant = 'elevated',
  className = '',
  padding = 'medium',
  interactive = false,
  ...props
}, ref) => {
  const baseStyles = `
    relative overflow-hidden rounded-lg
    bg-surface-1 text-md-on-surface-dark
    transition-shadow duration-md-medium
  `;

  const paddingStyles = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  const variantStyles = {
    elevated: 'shadow-md-1',
    filled: '',
    outlined: 'border border-md-outline-dark',
    'outlined-interactive': 'border border-md-outline-dark hover:border-md-primary-dark',
  };

  const interactiveStyles = interactive
    ? `
      cursor-pointer
      hover:shadow-md-3
      active:shadow-md-1
      state-layer
    `
    : '';

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
      {interactive && (
        <div className="state-layer bg-current opacity-0" />
      )}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
