import { CalendarDays, User } from "lucide-react";

import { useAppSelector } from "@/app/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { keycloak } from "@/features/auth/authSlice";

export function UserStatusHover() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <User />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user?.email}</h4>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default UserStatusHover;