'use server';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const prisma = new PrismaClient();
  
  const user = await getKindeServerSession().getUser();
  const task = formData.get('task') as string;

  if(user) {
    await prisma.todo.create({
      data: {
        task,
        authorId: user.id,
      }
    })
    revalidatePath('/todos');
  }
}