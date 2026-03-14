import z from "zod";

export const taskSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "Title is required"),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional().nullable(),
});

export const createEmptyTaskSchema = taskSchema.pick({
  title: true,
});

export const createTaskSchema = taskSchema.pick({
  title: true,
});

export const updateTaskSchema = taskSchema.pick({
  id: true,
  title: true,
});

export const deleteTaskSchema = taskSchema.pick({
  id: true,
});

export const getTaskSchema = taskSchema.pick({
  id: true,
});

export type TaskType = z.infer<typeof taskSchema>;
export type CreateTaskType = z.infer<typeof createTaskSchema>;
export type UpdateTaskType = z.infer<typeof updateTaskSchema>;
export type DeleteTaskType = z.infer<typeof deleteTaskSchema>;
export type GetTaskType = z.infer<typeof getTaskSchema>;
