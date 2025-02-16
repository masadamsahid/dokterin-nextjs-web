import { ReactNode } from "react";
import CategoryList from "./_components/CategoryList";

type Props = {
  children: ReactNode;
}

const SearchLayout = ({ children }: Readonly<Props>) => {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-5 gap-4 py-10 px-2 md:px-0 mx-auto">
      <div className="hidden md:block">
        <CategoryList />
      </div>
      <div className="col-span-4 md:col-span-3 lg:col-span-4">
        {children}
      </div>
    </div>
  );
}

export default SearchLayout;