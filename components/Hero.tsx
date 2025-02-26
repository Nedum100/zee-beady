"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 bg-blue-900/90 dark:bg-gray-900/90 transition-colors duration-300" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Welcome to Zee_Beady         
          </h1>
          <p className="mt-6 text-xl text-blue-50 dark:text-gray-200">
            Elevate your style with our stunning collection of handcrafted beadwork! 
            From elegant waist beads and charming anklets to eye-catching bracelets and 
            unique bead bags, we offer something for everyone. 
            Discover timeless designs that celebrate beauty, creativity, and individuality.
          </p>
          <div className="mt-10 flex gap-4">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <Link href="/products">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/categories">
                Browse Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}