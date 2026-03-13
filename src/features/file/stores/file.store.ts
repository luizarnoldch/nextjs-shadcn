import { create } from 'zustand';
import { FileType } from '../schema/file.schema';
import { FileState, FileVisibility } from '@/generated/prisma/enums';

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  presignURL?: string;
  origin: 'local' | 'remote';
  file?: File;
  key?: string | null;
  state?: FileState;
  visibility?: FileVisibility;
}

interface FileStateStore {
  queue: FileItem[];

  addFilesToQueue: (files?: (FileItem | FileType)[]) => void;
  removeFileFromQueue: (id: string) => void;
}

const useFileStore = create<FileStateStore>()((set, get) => ({
  queue: [],

  addFilesToQueue: (files) => {
    if (!files || files.length === 0) return;

    set((state) => {
      const newQueue = [...state.queue];
      let hasChanges = false;
      files.forEach((file) => {
        if (!newQueue.some(q => q.id === file.id)) {
          const isRemote = 'url' in file && !!file.url;
          newQueue.push({
            id: file.id || crypto.randomUUID(),
            name: file.name,
            type: file.type,
            size: file.size,
            key: file.key,
            url: file.url ? file.url : ('file' in file && file.file ? URL.createObjectURL(file.file) : undefined),
            file: 'file' in file ? file.file : undefined,
            origin: ('origin' in file && file.origin) ? file.origin : (isRemote ? 'remote' as const : 'local' as const),
            state: 'state' in file ? file.state : undefined,
            presignURL: 'presignURL' in file ? file.presignURL : undefined
          } as FileItem);
          hasChanges = true;
        }
      });
      return hasChanges ? { queue: newQueue } : state;
    });
  },

  removeFileFromQueue: (id) => {
    set((state) => ({
      queue: state.queue.filter(i => i.id !== id)
    }));
  }
}));

export const useStoreFileQueue = () => useFileStore(state => state.queue);
export const useStoreAddFilesToQueue = () => useFileStore(state => state.addFilesToQueue);
export const useStoreRemoveFileFromQueue = () => useFileStore(state => state.removeFileFromQueue);