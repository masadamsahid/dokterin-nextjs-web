'use client';

import GlobalApi from "@/app/_utils/GlobalApi";
import type { Category } from "@/lib/data-types";
import { useEffect, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
}

const CategoryList = ({ className, ...props }: Props) => {
  const params = useParams<{ category: string; }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const selectedCategory = params.category;
  console.log({ selectedCategory });


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
    <div className={cn("flex flex-col", className)}>
      <Command className="p-2 border border-primary rounded-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-screen h-fit overflow-auto">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categories.map((cat, i) => (
              <CommandItem key={cat.id}>
                <Link href={`/search/${cat.Slug}`} className={cn("p-2 flex gap-2 text-[12px] items-center text-primary rounded-md cursor-pointer w-full", selectedCategory === cat.Slug && "bg-primary/20")}>
                  <Image src={cat.Icon.url} alt={cat.Slug} width={25} height={25} />
                  <p>{cat.Name}</p>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

    </div>
  );
}

export default CategoryList;