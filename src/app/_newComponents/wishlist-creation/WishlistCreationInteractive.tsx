"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WishlistForm from "./WishlistForm";
import CreationSuccess from "./CreationSuccess";
import Header from "@/components/common/Header";
import AuthenticationGuard from "@/components/common/AuthenticationGuard";

interface WishlistFormData {
  title: string;
  description: string;
  category: string;
  privacy: "public" | "private";
  coverImage: string | null;
  template: string;
  currency: string;
  notifications: boolean;
  allowCollaboration: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const WishlistCreationInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [createdWishlist, setCreatedWishlist] = useState<{
    id: string;
    title: string;
    shareUrl: string;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);

    // Get user data from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/user-login");
  };

  const handleFormSubmit = async (formData: WishlistFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful creation
      const wishlistId = `wishlist_${Date.now()}`;
      const shareUrl = `${window.location.origin}/wishlist/${wishlistId}`;

      setCreatedWishlist({
        id: wishlistId,
        title: formData.title,
        shareUrl,
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating wishlist:", error);
      // In a real app, you'd show an error message here
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-muted"></div>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-8 w-2/3"></div>
            <div className="space-y-6">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthenticationGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Header
          isAuthenticated={true}
          userName={user?.name}
          onLogout={handleLogout}
        />

        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!isSuccess ? (
              <>
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-text-primary mb-4">
                    Create New Wishlist
                  </h1>
                  <p className="text-lg text-text-secondary">
                    Set up your personalized gift wishlist and share it with
                    friends and family.
                  </p>
                </div>

                {/* Form */}
                <WishlistForm
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />
              </>
            ) : (
              <>
                {/* Success Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-text-primary mb-4">
                    Wishlist Created!
                  </h1>
                  <p className="text-lg text-text-secondary">
                    Your wishlist is ready to share with others.
                  </p>
                </div>

                {/* Success Component */}
                {createdWishlist && (
                  <CreationSuccess
                    wishlistId={createdWishlist.id}
                    wishlistTitle={createdWishlist.title}
                    shareUrl={createdWishlist.shareUrl}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </AuthenticationGuard>
  );
};

export default WishlistCreationInteractive;
