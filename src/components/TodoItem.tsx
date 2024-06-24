"use client";

import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTodo } from "@/app/todos/todoActions";
import { useState } from "react";
import UpdateTodoForm from "./UpdateTodoForm";

export default function TodoItem({
  todo,
}: {
  todo: { id: number; task: string };
}) {
  const [isEditing, setIsEditing] = useState(false);

  async function deleteHandler() {
    await deleteTodo(todo.id);
  }

  async function editHandler() {
    setIsEditing(true);
    console.log("editing");
  }

  if(isEditing) {
    return (
      <div className="flex items-center justify-between gap-x-4">
        <UpdateTodoForm defaultValue={todo.task} setIsEditing={setIsEditing} taskId={todo.id} />
      </div>
    )
  }

  return (
    <div className="bg-muted rounded-lg p-4 w-80 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{todo.task}</h3>
          <div className="flex items-center gap-x-2">
            <Button onClick={deleteHandler} size="sm">
              <Trash2 />
            </Button>
            <Button onClick={editHandler} size="sm">
              <Edit />
            </Button>
          </div>
    </div>
  );
}
