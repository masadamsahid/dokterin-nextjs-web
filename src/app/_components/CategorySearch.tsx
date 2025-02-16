"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";

import type { Category } from "@/lib/data-types";
import Link from "next/link";

type Props = {}

const CategorySearch = (props: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategories().then(res => {
      console.log(res);
      setCategories(res.data.data);
    });
  }

  return (
    <div className="mb-10 flex flex-col items-center gap-4">
      <h2 className="font-bold text-4xl tracking-wide text-center">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <p className="text-gray-500 text-xl text-center mx-2">Seach doctor and book appointment in one click</p>

      <div className="mt-3 flex flex-col sm:flex-row w-full max-w-sm items-center gap-2 p-4">
        <Input type="text" placeholder="Search..." />
        <Button type="submit" className="w-full sm:w-fit">
          <Search className="size-4 mr-2" /> Search
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 mt-5">
        {categories.length > 0 ? categories.map((c, i) => {
          if (i + 1 > 6) return null;

          return (
            <Link key={c.documentId} href={`/search/${c.Slug}`} className="flex flex-col text-center gap-2 items-center p-5 bg-primary/10 rounded-lg hover:scale-110 transition-all ease-in-out cursor-pointer">
              <Image src={c.Icon.url} alt={c.Name} width={40} height={40} />
              <label className="text-primary text-sm">{c.Name}</label>
            </Link>
          );
        }) : ([1, 2, 3, 4, 5, 6].map((c, i) => {
          return (
            <div key={c} className="w-32 h-28 bg-primary/30 animate-pulse duration-700 rounded-lg">
            </div>
          );
        }))}
      </div>
    </div>
  );
}

export default CategorySearch;