"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  task: z.string().min(4, {
    message: "Task length must be at least 4 characters"
  }).max(20, {
    message: "Task length can not be more than 20 character"
  })
})

export async function createTodo(values: z.infer<typeof formSchema>) {
  const prisma = new PrismaClient();
  const user = await getKindeServerSession().getUser();
  const task = values.task;
console.log(task);
  if (user) {
    await prisma.todo.create({
      data: {
        task,
        authorId: user.id,
      },
    });
    revalidatePath("/todos");
  }
}

export async function deleteTodo(taskId: number) {
  const prisma = new PrismaClient();
  await prisma.todo.delete({
    where: {
      id: taskId,
    },
  });
  revalidatePath("/todos");
}

export async function updateTodo(values: z.infer<typeof formSchema>, taskId: number) {
  const prisma = new PrismaClient();
  await prisma.todo.update({
    where: {
      id: taskId
    },
    data: {
      task: values.task
    }
  })
  revalidatePath('/todos');
}