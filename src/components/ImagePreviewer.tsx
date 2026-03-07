import { RefreshCcwIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useImage } from "../hooks/useImage";
import GridOverlay from "./GridOverlay";

interface ImagePreviewerProps {
  file: File;
  onReplace: () => void;
}

const PADDING_SIZE = 4;

const ImagePreviewer: React.FC<ImagePreviewerProps> = ({ file, onReplace }) => {
  const { imageSize, grid, offset, zoom } = useImage();
  const { width, height } = imageSize;
  const containerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  const contentWidth = width + PADDING_SIZE;
  const contentHeight = height + PADDING_SIZE;

  useEffect(() => {
    if (contentWidth <= 0 || contentHeight <= 0) return;

    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      if (!el) return;
      const { clientWidth, clientHeight } = el;
      if (clientWidth <= 0 || clientHeight <= 0) return;
      const scale = Math.min(
        clientWidth / contentWidth,
        clientHeight / contentHeight,
      );
      setFitScale(scale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [contentWidth, contentHeight]);

  const scale = Math.min(1, fitScale);
  const scaledWidth = contentWidth * scale;
  const scaledHeight = contentHeight * scale;

  return (
    <div className="w-full h-full flex flex-col gap-4 min-h-0 p-4">
      <p className="text-sm text-slate-300 text-center max-w-md shrink-0">
        <span className="text-purple-400 font-medium">Purple grid</span> — Each
        cell is one image in the result.{" "}
        <span className="text-green-400 font-medium">Green area</span> —
        Anything outside the grid is cropped out and will not appear in the
        output.
      </p>
      <div
        ref={containerRef}
        className="flex-1 min-h-0 flex items-center justify-center"
      >
        {contentWidth > 0 && contentHeight > 0 && (
          <div
            style={{
              width: scaledWidth,
              height: scaledHeight,
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: contentWidth,
                height: contentHeight,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="border-2 border-dashed border-green-400 rounded opacity-50 origin-center"
                style={{
                  width: contentWidth,
                  height: contentHeight,
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginLeft: -(contentWidth / 2),
                  marginTop: -(contentHeight / 2),
                }}
              />
              <div className="text-white text-2xl absolute top-0 left-0 w-full h-full pointer-events-none">
                <GridOverlay
                  columns={grid.columns}
                  rows={grid.rows}
                  containerWidth={contentWidth}
                  containerHeight={contentHeight}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onReplace}
        className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-950 shrink-0 w-fit mx-auto flex flex-row justify-center items-center gap-2"
      >
        <RefreshCcwIcon className="w-6 h-6" />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default ImagePreviewer;
