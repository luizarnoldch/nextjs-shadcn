import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HydrateFiles from "../hooks/HydrateFiles";
import FileLayout from "./FileLayout";
import FileTable from "../components/FileTable";
import FileDropZone from "../components/FileDropZone";
import FileCompression from "../components/FileCompression";

export default async function FileView() {
  return (
    <HydrateFiles>
      <FileLayout>
        <div className="flex flex-col gap-6">
          <ErrorBoundary fallback={<div>Error loading files</div>}>
            <Suspense fallback={<div>Loading files...</div>}>
              <FileTable />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={<div>Error loading drop zone</div>}>
            <Suspense fallback={<div>Loading drop zone...</div>}>
              <FileDropZone />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={<div>Error loading image compression</div>}>
            <Suspense fallback={<div>Loading image compression...</div>}>
              <FileCompression />
            </Suspense>
          </ErrorBoundary>
        </div>
      </FileLayout>
    </HydrateFiles>
  );
}
