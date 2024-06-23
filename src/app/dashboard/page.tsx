import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

export default async function Page() {
  const isAuthenticated = await getKindeServerSession().isAuthenticated();
  if(!isAuthenticated) {
    return redirect("/");
  }
  return (
    <main>
      Dashboard
    </main>
  )
}