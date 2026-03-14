'use client';

import React, { useRef, useState, useEffect } from 'react';
import { type Area } from 'react-easy-crop';
import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';
import { Upload, UserRound } from 'lucide-react';
import { FileState, FileVisibility } from '@/generated/prisma/enums';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ProfileImageCropperModal } from './ProfileImageCropperModal';
import { getCroppedImgWebP } from './canvasUtils';
import useCreateFile from '../../hooks/useCreateFile';
import useUpdateFile from '../../hooks/useUpdateFile';

const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface ProfileImageCropperProps {
  onUploadSuccess?: (fileUrl: string) => void;
  currentImageUrl?: string | null;
}

export const ProfileImageCropper = ({ onUploadSuccess, currentImageUrl }: ProfileImageCropperProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: createFile } = useCreateFile();
  const { mutateAsync: updateFile } = useUpdateFile();

  // Limpiar Object URL para evitar recargas en memoria si se desmonta o cambia el componente
  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl);
      }
    };
  }, [selectedFileUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`El archivo es demasiado grande (Máximo ${MAX_FILE_SIZE_MB}MB)`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFileUrl(objectUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFileUrl(null); // Desencadena el revokeObjectURL en el useEffect
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Permite volver a seleccionar exactamente el mismo archivo si se cerró por error
    }
  };

  const processAndCompressImage = async (croppedAreaPixels: Area) => {
    if (!selectedFileUrl) return;

    try {
      setIsProcessing(true);

      // 1. Obtener el recorte visual desde el canvas como WebP a 400x400
      const webpBlob = await getCroppedImgWebP(selectedFileUrl, croppedAreaPixels);

      // 2. Correr compresión pesada asegurando un estricto máximo de 5MB
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 400, // 400px ya se forzaron en el canvas extraído, pero por seguridad
        useWebWorker: true,
        fileType: 'image/webp'
      };

      const webpFile = new File([webpBlob], 'profile.webp', { type: 'image/webp' });
      const compressedBlob = await imageCompression(webpFile, options);

      // 3. Empaquetar como archivo para enviar a la función S3
      const file = new File([compressedBlob], `profile-${Date.now()}.webp`, {
        type: 'image/webp',
      });

      setIsUploading(true);

      // 4. Crear el registro en la DB con estado PENDING para obtener presignedURL
      const createdFile = await createFile({
        name: file.name,
        type: file.type,
        size: file.size,
        state: FileState.PENDING,
        visibility: FileVisibility.PUBLIC,
      });

      if (!createdFile.presignedUrl) {
        throw new Error('No presigned URL returned from server');
      }

      // 5. Subir a S3 usando la presignedURL
      const uploadResponse = await fetch(createdFile.presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3');
      }

      // 6. Actualizar el estado a UPLOADED en la DB
      const updatedFile = await updateFile({
        id: createdFile.id,
        key: createdFile.key,
        state: FileState.UPLOADED,
        visibility: FileVisibility.PUBLIC,
      });

      onUploadSuccess?.(updatedFile.url || '');
      handleCloseModal();
    } catch (error) {
      console.error('Error al procesar la imagen de perfil:', error);
      toast.error('error al subir la imagen'); // Requisito estricto del PRD
    } finally {
      setIsProcessing(false);
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Vista previa centralizada del avatar */}
      <div className="relative w-32 h-32 rounded-full bg-muted flex items-center justify-center border border-border overflow-hidden">
        {isUploading ? (
          <Spinner className="w-8 h-8 text-primary" />
        ) : currentImageUrl ? (
          <img src={currentImageUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
        ) : (
          <UserRound className="w-12 h-12 text-muted-foreground" />
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <Button
        onClick={handleUploadClick}
        variant="outline"
        disabled={isUploading || isProcessing}
      >
        <Upload className="w-4 h-4 mr-2" />
        {currentImageUrl ? 'Cambiar Foto' : 'Subir Foto'}
      </Button>

      {selectedFileUrl && (
        <ProfileImageCropperModal
          imageSrc={selectedFileUrl}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCropComplete={processAndCompressImage}
          isLoading={isProcessing || isUploading}
        />
      )}
    </div>
  );
};
