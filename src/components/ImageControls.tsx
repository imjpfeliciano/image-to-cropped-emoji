import { useState } from "react";
import { useImage } from "../hooks/useImage";
import Slider from "./Slider";

const ImageControls = () => {
  const [emojiName, setEmojiName] = useState<string>("");
  const { image, grid, setGrid, processImage } = useImage();

  const updateGridProps = (name: string, value: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setGrid((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h2 className="font-semibold text-xl mb-4">Emoji generation settings</h2>
      <div className="grid grid-cols-2 items-center gap-4">
        <div className="flex flex-col gap-4">
          <div className="font-bold flex flex-row gap-2">
            <Slider
              label="Columns"
              name="cols"
              onValueChange={(value) => updateGridProps("columns", value)}
              defaultValue={grid.columns}
            />
          </div>
          <div className="font-bold flex flex-row gap-2">
            <Slider
              label="Rows"
              name="cols"
              onValueChange={(value) => updateGridProps("rows", value)}
              defaultValue={grid.rows}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2 w-full">
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
          </div>
          <button
            className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!image || !emojiName}
            onClick={processImage}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageControls;
