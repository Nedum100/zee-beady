
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { FcGoogle } from "react-icons/fc";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Error",
          description: result.error === "CredentialsSignin" ? "Invalid credentials" : result.error,
          className: "bg-destructive text-destructive-foreground"
        });
      } else {
        // Successful login
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
        router.refresh(); // Refresh to update session
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        className: "bg-destructive text-destructive-foreground"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <Link 
            href="/forgot-password" 
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:text-blue-500">
          Create an account
        </Link>
      </p>
    </div>
  );
}
