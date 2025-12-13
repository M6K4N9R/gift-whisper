'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';


interface AuthenticationGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const AuthenticationGuard = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/user-login' 
}: AuthenticationGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('userData');
        
        const authenticated = !!(token && user);
        setIsAuthenticated(authenticated);

        if (requireAuth && !authenticated && pathname !== redirectTo) {
          localStorage.setItem('intendedDestination', pathname);
          router.push(redirectTo);
          return;
        }

        if (!requireAuth && authenticated && pathname === '/user-login') {
          const intendedDestination = localStorage.getItem('intendedDestination');
          if (intendedDestination) {
            localStorage.removeItem('intendedDestination');
            router.push(intendedDestination);
          } else {
            router.push('/user-dashboard');
          }
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
        
        if (requireAuth) {
          router.push(redirectTo);
        }
      }
    };

    checkAuthentication();
  }, [requireAuth, redirectTo, router, pathname]);

  const handleAuthStateChange = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      const intendedDestination = localStorage.getItem('intendedDestination');
      if (intendedDestination) {
        localStorage.removeItem('intendedDestination');
        router.push(intendedDestination);
      } else {
        router.push('/user-dashboard');
      }
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      router.push(redirectTo);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingIndicator 
          message="Checking authentication..." 
          size="large" 
        />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return (
    <div className="auth-guard-wrapper">
      {React.cloneElement(children as React.ReactElement, {
        isAuthenticated,
        onAuthStateChange: handleAuthStateChange,
      })}
    </div>
  );
};

export default AuthenticationGuard;