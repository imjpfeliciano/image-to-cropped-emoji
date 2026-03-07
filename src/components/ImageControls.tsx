import { useState } from "react";
import { useImage } from "../hooks/useImage";
import Slider from "./Slider";

const ImageControls = () => {
  const [emojiName, setEmojiName] = useState<string>("");
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
    <div className="w-full">
      <h2 className="font-semibold text-xl mb-4">Emoji generation settings</h2>
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="flex flex-col gap-4">
          <Slider
            label="Columns"
            name="cols"
            onValueChange={(value) => updateGridProps("columns", value)}
            defaultValue={grid.columns}
          />

          <Slider
            label="Rows"
            name="rows"
            onValueChange={(value) => updateGridProps("rows", value)}
            defaultValue={grid.rows}
          />

          {image && width > 0 && height > 0 && (
            <>
              <Slider
                label={`Zoom (${Math.round(zoom * 100)}%)`}
                name="zoom"
                value={zoom}
                onValueChange={setZoom}
                min={0.5}
                max={3}
                step={0.1}
              />

              <Slider
                label="Offset X"
                name="offset_x"
                value={offset.x}
                onValueChange={(value) =>
                  setOffset((prev) => ({ ...prev, x: value }))
                }
                min={-maxOffsetX}
                max={maxOffsetX}
                step={1}
              />

              <Slider
                label="Offset Y"
                name="offset_y"
                value={offset.y}
                onValueChange={(value) =>
                  setOffset((prev) => ({ ...prev, y: value }))
                }
                min={-maxOffsetY}
                max={maxOffsetY}
                step={1}
              />
            </>
          )}

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
          />

          <button
            className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!image || !emojiName}
            onClick={processImage}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageControls;
