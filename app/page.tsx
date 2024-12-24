// app/page.tsx
import { cookies } from 'next/headers';
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
}


export default async function Home() {
  const token = await getToken();

  if (!token) {
    return null; // Let middleware handle the redirect
  }

  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}