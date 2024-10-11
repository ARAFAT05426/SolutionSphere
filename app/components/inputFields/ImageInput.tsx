import React, { useState } from 'react';
import Image from 'next/image';
import { CiImageOn, CiTrash } from 'react-icons/ci';

type ImageInputProps = {
    id?: string;
    name: string;
    className?: string;
    required?: boolean;
    defaultImage?: string | null;
    onChange?: (files: FileList) => void;
};

function ImageInput({
    id,
    name,
    onChange,
    className = '',
    required = true,
    defaultImage = null,
}: ImageInputProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);
    const [fileInfo, setFileInfo] = useState<{ name: string; type: string } | null>(null);

    // Handle file selection
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            const newPreviewUrl = URL.createObjectURL(selectedFile);

            setPreviewUrl(newPreviewUrl);
            setFileInfo({ name: selectedFile.name, type: selectedFile.type });

            if (onChange) {
                onChange(files);
            }
        }
    }

    // Handle removing the image preview
    function handleRemoveImage() {
        setPreviewUrl(null);
        setFileInfo(null);
    }

    // Helper to truncate file names that are too long
    function truncateFileName(fileName: string, maxLength: number) {
        if (fileName.length <= maxLength) return fileName;

        const extension = fileName.slice(fileName.lastIndexOf('.'));
        const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
        const truncatedName =
            nameWithoutExtension.slice(0, maxLength / 2) +
            '...' +
            nameWithoutExtension.slice(-maxLength / 2);

        return truncatedName + extension;
    }

    return (
        <div className={`flex flex-col gap-2.5 ${className}`}>
            {/* Image Preview */}
            <div className="flex flex-wrap justify-center gap-2.5">
                {previewUrl && (
                    <div className="relative">
                        <Image
                            src={previewUrl}
                            alt="Selected image preview"
                            className="w-20 h-20 object-cover rounded-sm"
                            width={80}
                            height={80}
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-sm p-1"
                            aria-label="Remove selected image"
                        >
                            <CiTrash />
                        </button>
                    </div>
                )}
            </div>

            {/* File Input */}
            <label
                htmlFor={id}
                className="w-full h-full min-h-10 max-h-10 bg-white flex items-center justify-center gap-1.5 opacity-75 cursor-pointer border"
            >
                <input
                    id={id}
                    type="file"
                    name={name}
                    accept="image/*"
                    required={required}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <span>{fileInfo ? truncateFileName(fileInfo.name, 25) : 'Choose Image'}</span>
                <CiImageOn />
            </label>
        </div>
    );
}

export default ImageInput;
