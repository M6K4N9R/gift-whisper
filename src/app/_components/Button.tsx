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
    "inline-flex items-center justify-center min-w-18 px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-colors duration-200 ease-in-out";

  const variantStyles = {
    primary:
      "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    secondary:
      "bg-white text-dark-accent-600 border border-dark-accent-300 hover:text-primary-800 hover:border-primary-800 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
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
