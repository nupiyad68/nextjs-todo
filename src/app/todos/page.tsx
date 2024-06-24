import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTodo, deleteTodo } from "./todoActions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Trash } from "lucide-react";
import AddTodoForm from "@/components/AddTodoForm";
import TodoItem from "@/components/TodoItem";
import { prisma } from "@/lib/db";

export default async function Page() {
  const user = await getKindeServerSession().getUser();

  if (!user) {
    return redirect("/");
  }

  const todos = await prisma.todo.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      task: true,
      id: true,
    },
  });

  return (
    <main className="flex items-center justify-center min-h-[90vh] py-4">
      <div className="flex flex-col items-center gap-y-4 justify-center">
        <h1 className="text-3xl font-semibold">Create Todo</h1>
        <AddTodoForm />
        <div className="flex flex-col gap-y-4">
          {todos.map((todo: {id: number, task: string}) => {
            return (
              <TodoItem key={todo.id} todo={todo} />
            )
          })}
        </div>
      </div>
    </main>
  );
}
