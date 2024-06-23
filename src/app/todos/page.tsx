import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTodo } from "./todoActions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export default async function Page() {
  const user = await getKindeServerSession().getUser();

  if(!user) {
    return redirect("/");
  }

  const prisma = new PrismaClient();

  const todos = await prisma.todo.findMany({
    where: {
      authorId: user.id
    }, select: {
      task: true,
      id: true
    }
  })
  console.log(todos)
  
  return (
    <main className="flex items-center justify-center min-h-[90vh]">
      <div className="flex flex-col items-center gap-y-4 justify-center">
        <h1 className="text-3xl font-semibold">Create Todo</h1>
        <form action={createTodo}>
          <div className="flex items-center gap-x-4">
          <Input min={5} name="task" type="text" placeholder="Enter Task" />
          <Button type="submit" >Add</Button> 
          </div>
        </form>
        <h3 className="text-xl font-semibold">Your Todos</h3>
        {todos.map(todo => (
          <div key={todo.id} className="bg-accent p-4 rounded-md">
            <h1>{todo.task}</h1>
          </div>
        ))}
      </div>
    </main>
  )
}