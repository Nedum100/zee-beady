"use client"

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Circle, Hexagon, Gem, Star } from "lucide-react";
import { CldImage } from 'next-cloudinary';

const categories = [
  {
    name: "waist Beads",
    icon: Circle,
    description: "Waist Beads for contemporary jewelry",
    href: "/categories/waist-beads",
    cloudinaryId: "zee_beady/17_qyklo2"
  },
  {
    name: "bracelets",
    icon: Circle,
    description: "Handcrafted Bracelets in various colors and sizes",
    href: "/categories/bracelets",
    cloudinaryId: "zee_beady/1_n6kads"
  },
  {
    name: "necklace",
    icon: Gem,
    description: "Premium necklaces for elegant jewelry pieces",
    href: "/categories/necklace",
    cloudinaryId: "zee_beady/16_yd1a7x"
  },
  {
    name: "anklet",
    icon: Hexagon,
    description: "Natural anklets for your legs",
    href: "/categories/anklet",
    cloudinaryId: "zee_beady/13_ybirjp"
  },
  {
    name: "bags",
    icon: Star,
    description: "Bags for contemporary jewelry",
    href: "/categories/bags",
    cloudinaryId: "zee_beady/15_bx576g"
  },
];

export default function Categories() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.name} href={category.href}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative h-48">
                  <CldImage
                    width="400"
                    height="300"
                    src={category.cloudinaryId}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}