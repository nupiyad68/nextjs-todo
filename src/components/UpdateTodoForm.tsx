"use client";

import { updateTodo } from "@/app/todos/todoActions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React from "react";

export default function UpdateTodoForm({
  defaultValue, setIsEditing, taskId
}: {
  defaultValue: string,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  taskId: number
}) {
  const formSchema = z.object({
    task: z
      .string()
      .min(4, {
        message: "Task length must be at least 4 characters",
      })
      .max(20, {
        message: "Task length can not be more than 20 character",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });

  console.log(defaultValue);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateTodo(values, taskId);
    setIsEditing(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between w-80 gap-x-4 p-4">
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your taskss"
                    {...field}
                    defaultValue="HEllo World"
                    className="px-8"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
  // return (
  //   <form action={createTodo}>
  //         <div className="flex items-center gap-x-4">
  //           <Input min={5} name="task" type="text" placeholder="Enter Task" />
  //           <Button type="submit">Add</Button>
  //         </div>
  //       </form>
  //       <h3 className="text-xl font-semibold">Your Todos</h3>
  //       {todos.map((todo) => {
  //         if(todo.task === '') {
  //           return;
  //         }
  //         return (
  //           <div
  //             key={todo.id}
  //             className="bg-accent p-4 rounded-md flex items-center justify-between w-80"
  //           >
  //             <h1>{todo.task}</h1>
  //             <form action={deleteTodo(todo.id, new FormData)}>
  //               <Button type="submit" variant="ghost" size="sm">
  //                 <Trash />
  //               </Button>
  //             </form>
  //           </div>
  //         );
  //       })}
  // )
}
