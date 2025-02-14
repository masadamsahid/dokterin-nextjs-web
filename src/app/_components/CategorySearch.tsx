import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {}

const CategorySearch = (props: Props) => {
  return (
    <div className="mb-10 flex flex-col items-center gap-4">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <p className="text-gray-500 text-xl">Seach doctor and book appointment in one click</p>

      <div className="mt-3 flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="size-4 mr-2" /> Search
        </Button>
      </div>
    </div>
  );
}

export default CategorySearch;