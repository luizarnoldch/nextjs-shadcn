import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HydrateTasks from "@/features/task/hooks/HydrateTasks";
import TaskFormLayout from "./TaskFormLayout";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default async function TaskFormView() {
  return (
    <HydrateTasks>
      <TaskFormLayout>
        <ErrorBoundary fallback={<div>Error loading form</div>}>
          <Suspense fallback={<div>Loading form...</div>}>
            <TaskForm />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading tasks</div>}>
          <Suspense fallback={<div>Loading tasks...</div>}>
            <TaskList />
          </Suspense>
        </ErrorBoundary>
      </TaskFormLayout>
    </HydrateTasks>
  );
}
