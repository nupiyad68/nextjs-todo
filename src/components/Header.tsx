import Container from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <header>
      <Container>
        <div className="flex items-center justify-between">
          <h1>Site Logo</h1>
          <div className="flex items-center gap-x-3">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
