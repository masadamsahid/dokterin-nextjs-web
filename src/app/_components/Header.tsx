import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {}

const Header = (props: Props) => {
  const menus = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Explore',
      path: '/explore',
    },
    {
      id: 3,
      name: 'Contact Us',
      path: '/contact',
    },
  ];
  return (
    <div className="p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-10">
        <Image src='/logo.svg' alt="logo" width={32} height={32} />

        <ul className="hidden md:flex gap-8">
          {menus.map((menu, i) => (
            <Link key={menu.id} href={menu.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {menu.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;