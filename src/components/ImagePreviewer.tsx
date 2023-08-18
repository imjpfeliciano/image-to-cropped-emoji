import { useImage } from "../hooks/useImage";
import GridOverlay from "./GridOverlay";
interface ImagePreviewerProps {
  file: File;
  onReplace: () => void;
}

const PADDING_SIZE = 4;

// TODO: Ask if we should remove bg of the image
// TODO: Ask if we should crop the image before emoji creation
// TODO: Pre-fill emoji grid size according to proportions of the image always using square cells
const ImagePreviewer: React.FC<ImagePreviewerProps> = ({ file, onReplace }) => {
  const { imageSize, grid } = useImage();
  const { width, height } = imageSize;

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center p-4 m-auto">
      <div className="relative">
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="border-2 border-dashed border-green-400 rounded opacity-50"
          style={{
            width: width + PADDING_SIZE,
            height: height + PADDING_SIZE,
          }}
        />
        <div className="text-white text-2xl absolute top-0 left-0 w-full h-full">
          <GridOverlay columns={grid.columns} rows={grid.rows} />
        </div>
      </div>

      <button
        onClick={onReplace}
        className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950"
      >
        Replace
      </button>
    </div>
  );
};

export default ImagePreviewer;
