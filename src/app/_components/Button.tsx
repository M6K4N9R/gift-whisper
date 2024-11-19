import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center min-w-18 px-4 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap";
  const variantStyles = {
    primary:
      "bg-primary-900 text-white hover:bg-primary-500 focus:ring-primary-900",
    secondary:
      "bg-white text-dark-accent-600 border border-dark-accent-300 hover:bg-dark-accent-50 focus:ring-primary-900",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
