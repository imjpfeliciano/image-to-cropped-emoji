import { DownloadIcon, GridIcon, ImageUpIcon } from "lucide-react";

const ProductFlowStep = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4 border border-indigo-600 rounded-lg p-4 text-left">
      <h3 className="text-2xl font-bold text-white flex flex-row items-center gap-2">
        {icon && <span className="bg-indigo-600 p-2 rounded">{icon}</span>}
        {title}
      </h3>
      <p className="text-lg text-slate-300">{description}</p>
    </div>
  );
};

const ProductFlow = () => {
  return (
    <div
      id="how-it-works"
      className="max-w-screen-2xl mx-auto p-8 flex flex-col gap-4 text-center"
    >
      <h2 className="text-4xl font-bold text-white">Three simple steps</h2>
      <p>Supercharge your Slack emojis in under 30 seconds.</p>

      <div className="grid grid-cols-3 gap-4">
        <ProductFlowStep
          title="1. Upload your image"
          description="Drag and drop your image into the app or click to select it from your files."
          icon={<ImageUpIcon className="w-6 h-6" />}
        />

        <ProductFlowStep
          title="2. Grid and align"
          description="Enter the number of columns and rows you want to split your image into. Use our tools to adjust the grid and the image preview."
          icon={<GridIcon className="w-6 h-6" />}
        />

        <ProductFlowStep
          title="3. Generate"
          description="Click the generate button to split your image into a grid and download the emoji."
          icon={<DownloadIcon className="w-6 h-6" />}
        />
      </div>
    </div>
  );
};

export default ProductFlow;
