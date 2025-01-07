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
    imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525347/zee_beady/waist%20beads/17_qyklo2.jpg"
  },
  {
    name: "bracelets",
    icon: Circle,
    description: "Handcrafted Bracelets in various colors and sizes",
    href: "/categories/bracelets",
    imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525349/zee_beady/bracelets/1_n6kads.jpg"
  },
  {
    name: "necklace",
    icon: Gem,
    description: "Premium necklaces for elegant jewelry pieces",
    href: "/categories/necklace",
    imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525354/zee_beady/necklaces/16_yd1a7x.jpg"
  },
  {
    name: "anklet",
    icon: Hexagon,
    description: "Natural anklets for your legs",
    href: "/categories/anklet",
    imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525354/zee_beady/anklets/13_ybirjp.jpg"
  },
  {
    name: "bags",
    icon: Star,
    description: "Bags for contemporary jewelry",
    href: "/categories/bags",
    imageUrl: "https://res.cloudinary.com/dqn3vjswi/image/upload/v1732525352/zee_beady/bags/8_vhzrsl.jpg"
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
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CldImage
                      width="400"
                      height="300"
                      src=""
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  )}
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