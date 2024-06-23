import Link from "next/link";
import Container from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <header className="py-2 h-[10vh] border-b shadow-md">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold text-emerald-500 text-3xl">JAT</Link>
          <div className="flex items-center gap-x-3">
            <UserNav />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
