"use client"

import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
}

const LogoutButton = ({ children = "Logout" }: Props) => {
  return (
    <LogoutLink>
      <Button variant='outline'>
        {children}
      </Button>
    </LogoutLink>
  );
}

export default LogoutButton;