import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HydrateFiles from "../hooks/HydrateFiles";
import FileLayout from "./FileLayout";
import FileTable from "../components/FileTable";
import FileForm from "../components/FileForm";
import FileDropZone from "../components/FileDropZone";

export default function FileView() {
  return (
    <HydrateFiles>
      <FileLayout>
        <div className="flex flex-col gap-6">
          <ErrorBoundary fallback={<div>Error loading files</div>}>
            <Suspense fallback={<div>Loading files...</div>}>
              <FileTable />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={<div>Error loading form</div>}>
            <FileForm />
          </ErrorBoundary>

          <ErrorBoundary fallback={<div>Error loading drop zone</div>}>
            <Suspense fallback={<div>Loading drop zone...</div>}>
              <FileDropZone />
            </Suspense>
          </ErrorBoundary>
        </div>
      </FileLayout>
    </HydrateFiles>
  );
}
