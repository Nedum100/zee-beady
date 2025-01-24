import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold text-blue-900 mb-6">About Zea_Beady</h1>
          <div className="space-y-4 text-gray-600">
            <p>
              Welcome to Zee_Beady, your go-to destination for beautifully handcrafted waist beads, anklets, bracelets, and bags.
            </p>
            <p>
              At Zee_Beady, we celebrate creativity and self-expression through our unique and elegant designs. Whether you're looking to accessorize with vibrant beads or carry a statement bag, we have something for everyone.
            </p>
            <p>
              Each piece is thoughtfully designed and crafted with care, combining traditional artistry with contemporary styles to create accessories that are as versatile as they are stunning.
            </p>
          </div>
          <Button asChild className="mt-8 bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/BeadAssets/6.jpg"
            alt="Handcrafted bead accessories"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Why Choose Zea_Beady?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Authentic Designs</h3>
            <p className="text-gray-600">Our accessories blend tradition with modern trends, making each piece a timeless treasure.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Craftsmanship You Can Trust</h3>
            <p className="text-gray-600">Every item is handcrafted with precision and care, ensuring top-notch quality and durability.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Empowering Accessories</h3>
            <p className="text-gray-600">Celebrate your individuality with accessories that reflect your personality and style.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
