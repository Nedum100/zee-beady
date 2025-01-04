import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";

const categories = {
  "waist-beads": {
    title: "Waist Beads",
    description: "Beautiful waist beads collection"
  },
  "bracelets": {
    title: "Bracelets",
    description: "Handcrafted bracelets"
  },
  "necklaces": {
    title: "Necklaces",
    description: "Elegant necklaces collection"
  },
  "anklets": {
    title: "Anklets",
    description: "Beautiful anklets collection"
  },
  "bags": {
    title: "Bags",
    description: "Handcrafted bags"
  }
} as const;

export default async function CategoryPage({
  params
}: {
  params: { category: string }
}) {
  // Normalize category names
  const categoryMappings: { [key: string]: string } = {
      "necklace": 'necklaces',
    "anklet": 'anklets',
    "bracelet": 'bracelets',
    'waist-bead': 'waist-beads'
  };

  // Get the normalized category name
  const normalizedCategory = categoryMappings[params.category] || params.category;

  console.log('Original category:', params.category);
  console.log('Normalized category:', normalizedCategory);
  console.log('Available categories:', Object.keys(categories));

  if (!categories[normalizedCategory as keyof typeof categories]) {
    console.log('Category not found:', normalizedCategory);
    notFound();
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${normalizedCategory}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Products found:', data.products);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          {categories[normalizedCategory as keyof typeof categories].title}
        </h1>
        <p className="text-gray-600 mb-8">
          {categories[normalizedCategory as keyof typeof categories].description}
        </p>
        {data.products.length > 0 ? (
          <ProductGrid products={data.products} />
        ) : (
          <p className="text-center text-gray-500">No products found in this category.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          {categories[normalizedCategory as keyof typeof categories].title}
        </h1>
        <p className="text-red-500">Error loading products. Please try again later.</p>
      </div>
    );
  }
}