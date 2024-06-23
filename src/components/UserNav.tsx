import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import { PrismaClient } from "@prisma/client";

export default async function UserNav() {
  const isAuthenticated = await getKindeServerSession().isAuthenticated();
  const user = await getKindeServerSession().getUser();

  const prisma = new PrismaClient();

  
  
  
  if (isAuthenticated && user) {
      const name = user.given_name as string;
      const email = user.email as string;
      const createdAt = new Date().toISOString();
      const kindeId = user.id as string;

      const dbUser = await prisma.user.findUnique({
        where: {
          kindeId: user?.id
        },
        select: {
          kindeId: true,
        }
      });
      
      if(!dbUser) {
        await prisma.user.create({
          data: {
            kindeId,
            email,
            name,
            createdAt,
          }
        })
      }

    return (
      <div className="flex items-center gap-x-2">
        <span className="text-sm font-semibold">{user.given_name}</span>
        <LogoutLink>
          <Button>Sign Out</Button>
        </LogoutLink>
      </div>
    );
  } else {
    return (
      <LoginLink>
        <Button>Login</Button>
      </LoginLink>
    );
  }
}
