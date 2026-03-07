import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  WandSparklesIcon,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useImage } from "../hooks/useImage";
import Slider from "./Slider";

const ImageControls = () => {
  const {
    image,
    grid,
    setGrid,
    offset,
    setOffset,
    zoom,
    setZoom,
    imageSize,
    processImage,
    emojiName,
    setEmojiName,
  } = useImage();

  const updateGridProps = (name: string, value: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setGrid((prev) => ({ ...prev, [name]: value }));
  };

  const { width, height } = imageSize;
  const cellSize =
    width > 0 && height > 0
      ? Math.min(width / grid.columns, height / grid.rows)
      : 0;
  const gridWidth = cellSize * grid.columns;
  const gridHeight = cellSize * grid.rows;
  const maxOffsetX = Math.max(0, (width * zoom - gridWidth) / 2);
  const maxOffsetY = Math.max(0, (height * zoom - gridHeight) / 2);

  return (
    <div className="w-fit bg-slate-600 border-r-2 p-4">
      <h2 className="font-semibold text-xl mb-4">Crop settings</h2>

      <div className="flex flex-col justify-between h-[calc(100%-100px)]">
        <div className="flex flex-col justify-between gap-4">
          <label htmlFor="cols" className="font-semibold">
            Emoji Name
          </label>
          <input
            type="text"
            name="emoji_name"
            id="emoji_name"
            className="rounded text-base py-2 px-4 text-black"
            placeholder="e.g. my_custom_emoji"
            onChange={(e) => setEmojiName(e.target.value)}
            value={emojiName}
          />

          <div className="flex flex-row justify-between items-center gap-4">
            <label htmlFor="cols" className="font-semibold flex flex-col gap-2">
              Columns
              <input
                type="number"
                name="cols"
                id="cols"
                className="rounded text-base py-2 px-4 text-black"
                placeholder="e.g. 3"
                onChange={(e) =>
                  updateGridProps("columns", parseInt(e.target.value))
                }
                value={grid.columns}
              />
            </label>

            <label htmlFor="rows" className="font-semibold flex flex-col gap-2">
              Rows
              <input
                type="number"
                name="rows"
                id="rows"
                className="rounded text-base py-2 px-4 text-black"
                placeholder="e.g. 3"
                onChange={(e) =>
                  updateGridProps("rows", parseInt(e.target.value))
                }
                value={grid.rows}
              />
            </label>
          </div>

          {image && width > 0 && height > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-row justify-between items-center gap-4">
                <ZoomOut className="w-6 h-6" />
                <Slider
                  label=""
                  name="zoom"
                  value={zoom}
                  onValueChange={setZoom}
                />
                <ZoomIn className="w-6 h-6" />
              </div>

              <div className="flex flex-row justify-between items-center gap-4">
                <ArrowLeftIcon className="w-6 h-6" />
                <Slider
                  label=""
                  name="offset_x"
                  value={offset.x}
                  onValueChange={(value) =>
                    setOffset((prev) => ({ ...prev, x: value }))
                  }
                  min={-maxOffsetX}
                  max={maxOffsetX}
                  step={1}
                />
                <ArrowRightIcon className="w-6 h-6" />
              </div>

              <div className="flex flex-row justify-between items-center gap-4">
                <ArrowUpIcon className="w-6 h-6" />
                <Slider
                  label=""
                  name="offset_y"
                  value={offset.y}
                  onValueChange={(value) =>
                    setOffset((prev) => ({ ...prev, y: value }))
                  }
                  min={-maxOffsetY}
                  max={maxOffsetY}
                  step={1}
                />
                <ArrowDownIcon className="w-6 h-6" />
              </div>
            </div>
          )}
        </div>

        <button
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-950 w-full disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row justify-center items-center gap-2"
          disabled={!image || !emojiName}
          onClick={processImage}
        >
          <WandSparklesIcon className="w-6 h-6" />
          <span>Generate Grid</span>
        </button>
      </div>
    </div>
  );
};

export default ImageControls;
