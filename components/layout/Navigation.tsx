'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, Settings, ShoppingCart, Search } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Cart from "@/components/Cart";
import { useCart } from "@/lib/cart";
import { useRouter } from 'next/navigation';
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session, status } = useSession();
  const { items } = useCart();
  const router = useRouter();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const isAdmin = session?.user?.role === 'admin';
  const isAuthenticated = status === 'authenticated';

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-50 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dqn3vjswi/image/upload/v1736165143/zee_beady/logo/logo_oxenv8.jpg"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/products" className="text-gray-700 hover:text-blue-600">
                  Products
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                  Contact
                </Link>
                {isAdmin && (
                  <>
                    <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                      Dashboard
                    </Link>
                    <Link href="/admin" className="text-gray-700 hover:text-blue-600">
                      <Settings className="h-5 w-5" />
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    className="relative bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                  <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center bg-red-600 text-white hover:bg-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                  Contact
                </Link>
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                  </Link>
                </div>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/search')}
              className="text-gray-700 hover:text-blue-600"
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <>
                {isAdmin && (
                  <Link href="/dashboard">
                    <Settings className="h-5 w-5 text-gray-700" />
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="relative bg-background text-foreground hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
                <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/products"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <div className="px-3 py-2 text-gray-700">
                  Welcome, {session?.user?.name || session?.user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center"
                >
                  <LogOut className="inline-block mr-2 h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;

