interface ImagePreviewerProps {
  file: File;
  onReplace: () => void;
}

// TODO: Ask if we should remove bg of the image
// TODO: Ask if we should crop the image before emoji creation
const ImagePreviewer: React.FC<ImagePreviewerProps> = ({ file, onReplace }) => (
  <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded p-4">
    <img src={URL.createObjectURL(file)} alt="Preview" />
    <button
      onClick={onReplace}
      className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950"
    >
      Replace
    </button>
  </div>
);

export default ImagePreviewer;
