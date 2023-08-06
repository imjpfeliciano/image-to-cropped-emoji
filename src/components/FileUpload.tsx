import { useState } from "react";
import { useDropzone } from "react-dropzone";
import ImagePreviewer from "./ImagePreviewer";

const FileUpload = () => {
  const [acceptedFile, setAcceptedFile] = useState<File | null>();

  const handleFileUpload = (acceptedFiles: File[]) => {
    setAcceptedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    multiple: false,
    onDropRejected: (rejectedFiles) => {
      // TODO: Implement an alert that the file format is not valid
      console.log({ rejectedFiles });
    },
    onDropAccepted: handleFileUpload,
  });

  if (acceptedFile) {
    return (
      <ImagePreviewer
        file={acceptedFile}
        onReplace={() => setAcceptedFile(null)}
      />
    );
  }

  return (
    <section className="rounded border-2 border-dashed p-4 border-blue-400 cursor-pointer text-2xl">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-center">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
    </section>
  );
};

export default FileUpload;
