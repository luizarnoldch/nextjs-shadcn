"use client";

import useDeleteTask from "../hooks/useDeleteTask";
import { Button } from "@/components/ui/button";
import { Trash2, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { format } from "date-fns";
import useSuspenseListTasks from "../hooks/useSuspenseListTasks";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useSuspenseListTasks();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-500">
        Error loading tasks. Please try again.
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyTitle>No tasks found</EmptyTitle>
          <EmptyDescription>
            Create your first task using the form above.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-blue-500/30"
        >
          <div className="flex items-center gap-4">
            <div className="text-blue-500/50 group-hover:text-blue-500">
              <Circle className="size-5" />
            </div>
            <div>
              <h3 className="font-medium text-white/90">{task.title}</h3>
              <p className="text-xs text-white/40">
                Created {format(new Date(task.createdAt), "dd/MM/yyyy, hh:mm:ss a")}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask({ id: task.id })}
            disabled={isDeleting}
            className="text-white/20 hover:text-red-500 hover:bg-red-500/10"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
