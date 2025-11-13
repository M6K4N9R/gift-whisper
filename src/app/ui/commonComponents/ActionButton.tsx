"use client";

import React from "react";
import Icon from "@/components/ui/AppIcon";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

const ActionButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
}: ActionButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-sm",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary shadow-sm",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive shadow-sm",
    outline:
      "border border-border bg-surface text-text-primary hover:bg-muted focus:ring-primary",
    ghost: "text-text-primary hover:bg-muted focus:ring-primary",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const isDisabled = disabled || loading;

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const renderIcon = (iconName: string, position: "left" | "right") => (
    <Icon
      name={iconName as any}
      size={iconSizes[size]}
      className={position === "left" ? "mr-2" : "ml-2"}
    />
  );

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Icon
            name="ArrowPathIcon"
            size={iconSizes[size]}
            className="mr-2 animate-spin"
          />
          {loadingText}
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === "left" && renderIcon(icon, "left")}
        {children}
        {icon && iconPosition === "right" && renderIcon(icon, "right")}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={buttonClasses}
      aria-disabled={isDisabled}
    >
      {renderContent()}
    </button>
  );
};

export default ActionButton;
