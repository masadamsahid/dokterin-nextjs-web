import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import GetStartedButton from "./GetStartedButton";
import LogoutButton from "./LogoutButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {}

const Header = async (props: Props) => {
  const menus = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Explore',
      path: '/search',
    },
  ];

  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
      {!user ? <GetStartedButton /> : (
        <Popover>
          <PopoverTrigger>
            <Image src={user?.picture || ""} alt="" width={30} height={30} className="rounded-full" />
          </PopoverTrigger>
          <PopoverContent className="w-44">
            <ul className="flex flex-col gap-2">
              <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">Profile</li>
              <Link href='/my-appointments'>
                <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">My Appointments</li>
              </Link>
              <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">
                <LogoutButton />
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default Header;