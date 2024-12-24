// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Menu, LogOut, Search, Settings } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Cart from "./Cart";
// import SearchDialog from "./SearchDialog";
// import { useToast } from "@/components/ui/use-toast";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const router = useRouter();
//   const { toast } = useToast();

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = document.cookie.includes("token=");
//       setIsLoggedIn(token);

//       if (token) {
//         const userInfo = localStorage.getItem("userInfo");
//         if (userInfo) {
//           const { name } = JSON.parse(userInfo);
//           setUserName(name);
//         }
//       }
//     };

//     checkAuth();
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("/api/auth/logout", {
//         method: "POST",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to logout");
//       }

//       setIsLoggedIn(false);
//       localStorage.removeItem("userInfo");
//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//       toast({
//         title: "Success",
//         description: "You have been logged out.",
//       });

//       window.location.href = "/login";
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to logout. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link href= "/" >
//               <img
//                 src="/BeadAssets/logo.png"
//                 alt="Logo"
//                 className="h-10 w-auto"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className="text-gray-700 hover:text-blue-600">
//               Home
//             </Link>
//             {isLoggedIn ? (
//               <>
//                 <Link href="/products" className="text-gray-700 hover:text-blue-600">
//                   Products
//                 </Link>
//                 <Link href="/about" className="text-gray-700 hover:text-blue-600">
//                   About
//                 </Link>
//                 <Link href="/contact" className="text-gray-700 hover:text-blue-600">
//                   Contact
//                 </Link>
//                 <Link href="/admin" className="text-gray-700 hover:text-blue-600">
//                   <Settings className="h-5 w-5" />
//                 </Link>
//                 <div className="flex items-center space-x-4">
//                   <span className="text-gray-700">Welcome, {userName}</span>
//                   <SearchDialog />
//                   <Cart />
//                   <Button
//                     variant="ghost"
//                     onClick={handleLogout}
//                     className="flex items-center"
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </Button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link href="/about" className="text-gray-700 hover:text-blue-600">
//                   About
//                 </Link>
//                 <Link href="/contact" className="text-gray-700 hover:text-blue-600">
//                   Contact
//                 </Link>
//                 <div className="flex items-center space-x-4">
//                   <Link href="/login">
//                     <Button variant="ghost">Login</Button>
//                   </Link>
//                   <Link href="/signup">
//                     <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
//                   </Link>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center space-x-2">
//             {isLoggedIn && (
//               <>
//                 <Link href="/admin">
//                   <Settings className="h-5 w-5 text-gray-700" />
//                 </Link>
//                 <SearchDialog />
//                 <Cart />
//               </>
//             )}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <Menu className="h-5 w-5 text-gray-700" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden absolute w-full bg-white border-b shadow-lg">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <Link
//               href="/"
//               className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             {isLoggedIn ? (
//               <>
//                 <Link
//                   href="/products"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Products
//                 </Link>
//                 <Link
//                   href="/about"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   About
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Contact
//                 </Link>
//                 <Link
//                   href="/admin"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Admin Dashboard
//                 </Link>
//                 <div className="px-3 py-2 text-gray-700">Welcome, {userName}</div>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsMenuOpen(false);
//                   }}
//                   className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                 >
//                   <LogOut className="inline-block mr-2 h-4 w-4" />
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/about"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   About
//                 </Link>
//                 <Link
//                   href="/contact"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Contact
//                 </Link>
//                 <Link
//                   href="/login"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/signup"
//                   className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
