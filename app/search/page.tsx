import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { SearchX } from "lucide-react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Search Products</h1>
        <p className="text-gray-600">Please enter a search term to find products.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        Search Results for "{query}"
      </h1>
      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        }
      >
        <ProductGrid searchQuery={query} />
      </Suspense>
    </div>
  );
}