import Container from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header>
      <Container>
        <div className="flex items-center justify-between">
          <h1>Site Logo</h1>
          <div>
            <ThemeToggle />
            <Button>Login</Button>
          </div>
        </div>
      </Container>
    </header>
  )
}