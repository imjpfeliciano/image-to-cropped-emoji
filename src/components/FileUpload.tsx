import { useDropzone } from "react-dropzone";
import { useImage } from "../hooks/useImage";
import ImagePreviewer from "./ImagePreviewer";

// TODO: Add max size of the image
const FileUpload = () => {
  const { image, setImage } = useImage();

  const handleFileUpload = (acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
      "image/avif": [".avif"],
    },
    maxFiles: 1,
    multiple: false,
    onDropRejected: (rejectedFiles) => {
      // TODO: Implement an alert that the file format is not valid
      console.log({ rejectedFiles });
    },
    onDropAccepted: handleFileUpload,
  });

  if (image) {
    return <ImagePreviewer file={image} onReplace={() => setImage(null)} />;
  }

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="rounded border-2 border-dashed p-4 border-blue-400 cursor-pointer text-2xl w-[calc(100%-100px)] h-[calc(100%-100px)] m-auto"
    >
      <input {...getInputProps()} />
      <p className="text-center">
        Drag 'n' drop some files here, or click to select files
      </p>
    </div>
  );
};

export default FileUpload;
