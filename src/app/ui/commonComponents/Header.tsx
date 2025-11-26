'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/app/ui/commonComponents/AppIcon';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  userName?: string;
}

const Header = ({ isAuthenticated = false, onLogout, userName }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { label: 'Dashboard', path: '/user-dashboard', icon: 'HomeIcon' },
    { label: 'Create Wishlist', path: '/wishlist-creation', icon: 'PlusIcon' },
    { label: 'Add Item', path: '/add-gift-item', icon: 'GiftIcon' },
  ];

  const isActivePath = (path: string) => pathname === path;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isAuthenticated ? '/user-dashboard' : '/'} className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GiftIcon" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-text-primary">Gift Whisper</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">
                  Welcome, {userName || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-colors duration-200"
                >
                  <Icon name="ArrowRightOnRectangleIcon" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/user-login"
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border">
          <div className="px-4 py-2 space-y-1">
            {isAuthenticated && (
              <>
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActivePath(item.path)
                        ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={item.icon as any} size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="border-t border-border pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-text-secondary">
                    Welcome, {userName || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-3 w-full text-left rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="ArrowRightOnRectangleIcon" size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <Link
                href="/user-login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;