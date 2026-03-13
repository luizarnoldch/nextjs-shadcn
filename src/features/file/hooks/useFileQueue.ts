// "use client";

// import { useStoreLocalQueue, useStoreRemoveLocalFile, FileItem } from "../stores/file.store";
// import { useListFiles } from "./useListFiles";
// import useDeleteFile from "./useDeleteFile";
// import { useMemo } from "react";
// import { FileType } from "../schema/file.schema";

// export function useFileQueue() {
//   const { data: remoteFiles = [], isLoading: isLoadingRemote } = useListFiles();
//   const localQueue = useStoreLocalQueue();
//   const removeLocalFile = useStoreRemoveLocalFile();
//   const deleteRemoteFile = useDeleteFile();

//   const combinedFiles = useMemo(() => {
//     const remoteIds = new Set(remoteFiles.map(f => f.id));

//     const formattedRemote: FileItem[] = remoteFiles.map((file: FileType) => ({
//       ...file,
//       url: file.url ?? undefined, // Convert null to undefined for FileItem compatibility
//       origin: 'remote' as const,
//     }));

//     const filteredLocal = localQueue.filter(file => !remoteIds.has(file.id));

//     return [...formattedRemote, ...filteredLocal];
//   }, [remoteFiles, localQueue]);

//   const removeFile = async (id: string, origin: 'local' | 'remote') => {
//     if (origin === 'local') {
//       removeLocalFile(id);
//     } else {
//       if (confirm("Are you sure you want to delete this file?")) {
//         await deleteRemoteFile.mutateAsync({ id });
//       }
//     }
//   };

//   return {
//     files: combinedFiles,
//     isLoading: isLoadingRemote,
//     removeFile,
//     isDeleting: deleteRemoteFile.isPending,
//   };
// }
