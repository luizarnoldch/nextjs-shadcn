import { create } from "zustand";
import { FileState, FileVisibility } from "@/generated/prisma/enums";

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  presignURL?: string;
  origin: "local" | "remote";
  file?: File;
  key?: string | null;
  state?: FileState;
  visibility?: FileVisibility;
}

interface FileStore {
  localQueue: FileItem[];
  addFiles: (files: FileItem[]) => void;
  removeFile: (id: string) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  localQueue: [],
  addFiles: (newFiles) =>
    set((state) => {
      const filtered = newFiles.filter(
        (f) => !state.localQueue.some((q) => q.id === f.id),
      );
      if (filtered.length === 0) return state;
      return { localQueue: [...state.localQueue, ...filtered] };
    }),
  removeFile: (id) =>
    set((state) => ({
      localQueue: state.localQueue.filter((f) => f.id !== id),
    })),
}));

// Selectors for local queue only
export const useStoreLocalQueue = () => useFileStore((s) => s.localQueue);
export const useStoreAddFilesToQueue = () => useFileStore((s) => s.addFiles);
export const useStoreRemoveFileFromQueue = () =>
  useFileStore((s) => s.removeFile);

// Merged queue: remote files + local files (local wins on duplicate id)
export const useMergedQueue = (remoteFiles?: FileItem[]): FileItem[] => {
  const localQueue = useStoreLocalQueue();
  if (!remoteFiles || remoteFiles.length === 0) return localQueue;
  const localIds = new Set(localQueue.map((f) => f.id));
  const remoteOnly = remoteFiles.filter((r) => !localIds.has(r.id));
  return [...remoteOnly, ...localQueue];
};
