"use client";

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

type Props = {}

const GetStartedButton = (props: Props) => {
  return (
    <LoginLink>
      <Button>
        Get Started
      </Button>
    </LoginLink>
  );
}

export default GetStartedButton;