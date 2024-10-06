"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const uploadedImages: any = []; 

const useUploadThingInputProps = (...args: Input) => {

  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    uploadedImages.length = 0;
    uploadedImages.push(result);
    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function getImagesUrls() {
  return uploadedImages;
} 

export function SimpleUploadButton() {
    const router = useRouter()
    const { inputProps } = useUploadThingInputProps("imageUploader");

    return (
        <div className="">
            <label htmlFor="upload-button">Upload</label>
            <input id="upload-button" type="file" className="sr-only" {...inputProps} />
        </div>
    )
}