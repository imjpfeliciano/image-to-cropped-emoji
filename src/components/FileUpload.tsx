import { useCallback, useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import ImagePreviewer from "./ImagePreviewer";

interface FileUploadProps {
  files: File[];
  dataTransfer: DataTransfer;
  items: DataTransferItemList;
}

// TODO: Import image from URL
const FileUpload = () => {
  const [droppedFiles, setDroppedFiles] = useState<FileUploadProps | null>(
    null
  );

  const handleDrop = useCallback((acceptedFiles: FileUploadProps) => {
    console.log(acceptedFiles);
    setDroppedFiles(acceptedFiles);
  }, []);

  const handleReset = useCallback(() => {
    setDroppedFiles(null);
  }, []);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: handleDrop,
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [handleDrop]
  );

  if (droppedFiles && droppedFiles.files.length > 0) {
    return (
      <ImagePreviewer file={droppedFiles.files[0]} onReplace={handleReset} />
    );
  }

  const isActive = canDrop && isOver;
  return (
    <div
      className="border-2 p-4 flex items-center justify-center rounded border-dashed"
      ref={drop}
    >
      {isActive ? "Release to drop" : "Drag a file here"}
    </div>
  );
};

export default FileUpload;
