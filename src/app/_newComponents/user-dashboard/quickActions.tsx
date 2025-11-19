"use client";

import React from "react";
import Link from "next/link";
import Icon from "@/app/ui/commonComponents/AppIcon";

interface QuickActionsProps {
  onCreateWishlist: () => void;
  onImportWishlist: () => void;
  onBrowsePublic: () => void;
}

const QuickActions = ({
  onCreateWishlist,
  onImportWishlist,
  onBrowsePublic,
}: QuickActionsProps) => {
  const actions = [
    {
      label: "Create New Wishlist",
      description: "Start a new wishlist for any occasion",
      icon: "PlusIcon",
      color: "bg-primary text-primary-foreground hover:bg-primary/90",
      onClick: onCreateWishlist,
      isPrimary: true,
    },
    {
      label: "Add Gift Item",
      description: "Add items to existing wishlists",
      icon: "GiftIcon",
      color: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      href: "/add-gift-item",
    },
    {
      label: "Import Wishlist",
      description: "Import from other platforms",
      icon: "ArrowDownTrayIcon",
      color: "border border-border bg-surface text-text-primary hover:bg-muted",
      onClick: onImportWishlist,
    },
    {
      label: "Browse Public",
      description: "Discover public wishlists",
      icon: "GlobeAltIcon",
      color: "border border-border bg-surface text-text-primary hover:bg-muted",
      onClick: onBrowsePublic,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {actions.map((action, index) => {
        const content = (
          <div
            className={`p-4 rounded-lg transition-all duration-200 cursor-pointer ${
              action.color
            } ${action.isPrimary ? "shadow-sm" : ""}`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={action.icon as any} size={24} />
              <h3 className="font-semibold text-sm">{action.label}</h3>
            </div>
            <p
              className={`text-xs ${
                action.isPrimary
                  ? "text-primary-foreground/80"
                  : "text-text-secondary"
              }`}
            >
              {action.description}
            </p>
          </div>
        );

        if (action.href) {
          return (
            <Link key={index} href={action.href}>
              {content}
            </Link>
          );
        }

        return (
          <button
            key={index}
            onClick={action.onClick}
            className="text-left w-full"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;
