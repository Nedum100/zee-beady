'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Circle, Hexagon, Gem, Star } from "lucide-react";
import Link from "next/link";
import { CldImage } from 'next-cloudinary';

const categories = [
  {
    name: "Bags",
    icon: Circle,
    description: "Handcrafted beaded bags and purses",
    href: "/categories/bags",
    cloudinaryId: "zee_beady/bags/8_vhzrsl",
  },
  {
    name: "Bracelets",
    icon: Gem,
    description: "Beautiful handmade bracelets",
    href: "/categories/bracelets",
    cloudinaryId: "zee_beady/bracelets/1_n6kads",
  },
  {
    name: "Anklets",
    icon: Hexagon,
    description: "Elegant anklets for every occasion",
    href: "/categories/anklets",
    cloudinaryId: "zee_beady/anklets/13_ybirjp",
  },
  {
    name: "Necklaces",
    icon: Star,
    description: "Stunning beaded necklaces",
    href: "/categories/necklaces",
    cloudinaryId: "zee_beady/necklaces/16_yd1a7x",
  },
  {
    name: "Waist Beads",
    icon: Circle,
    description: "Handcrafted waist beads",
    href: "/categories/waist-beads",
    cloudinaryId: "zee_beady/waist beads/17_qyklo2",
  }
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full">
              <div className="relative h-48">
                <CldImage
                  width="800"
                  height="600"
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
        ))}
      </div>
    </div>
  );
}