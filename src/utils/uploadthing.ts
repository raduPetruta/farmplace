import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "~/app/api/core";

  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  export const {useUploadThing} = generateReactHelpers<OurFileRouter>();
  
  