import { FileAttachment } from '../types';

export class FileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileValidationError';
  }
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function validateFile(file: File): void {
  if (file.size > MAX_FILE_SIZE) {
    throw new FileValidationError('File size exceeds 50MB limit');
  }
}

export async function processFile(file: File): Promise<FileAttachment> {
  validateFile(file);

  const attachment: FileAttachment = {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type,
    size: file.size,
    createdAt: new Date(),
  };

  // Create a URL for the file
  attachment.url = URL.createObjectURL(file);

  return attachment;
}

export function cleanupFileUrl(attachment: FileAttachment): void {
  if (attachment.url) {
    URL.revokeObjectURL(attachment.url);
  }
}

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
} 