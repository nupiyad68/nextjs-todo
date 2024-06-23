import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[90vh]">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-3xl font-semibold leading-tight">Just Another TODO APP</h1>
        <p className="w-[70%] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae ex ipsum ullam! Officia nemo culpa soluta amet necessitatibus laboriosam.</p>
        <Button className=""></Button>
      </div>
    </main>
  );
}
