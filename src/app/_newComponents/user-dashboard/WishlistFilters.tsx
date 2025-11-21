"use client";

import React from "react";
import Icon from "@/app/ui/commonComponents/AppIcon";

interface WishlistFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  filterBy: string;
  onFilterChange: (filter: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const WishlistFilters = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: WishlistFiltersProps) => {
  const sortOptions = [
    { value: "updated", label: "Last Updated" },
    { value: "created", label: "Date Created" },
    { value: "name", label: "Name A-Z" },
    { value: "items", label: "Item Count" },
  ];

  const filterOptions = [
    { value: "all", label: "All Wishlists" },
    { value: "private", label: "Private Only" },
    { value: "public", label: "Public Only" },
    { value: "shared", label: "Shared with Me" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Icon
            name="MagnifyingGlassIcon"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
          <input
            type="text"
            placeholder="Search wishlists..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center space-x-3">
          {/* Filter Dropdown */}
          <select
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-border rounded-md overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 transition-colors duration-200 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-input text-text-secondary hover:text-text-primary hover:bg-muted"
              }`}
            >
              <Icon name="Squares2X2Icon" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 transition-colors duration-200 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-input text-text-secondary hover:text-text-primary hover:bg-muted"
              }`}
            >
              <Icon name="ListBulletIcon" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistFilters;
