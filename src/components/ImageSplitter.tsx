import FileUpload from "./FileUpload";
import ImageControls from "./ImageControls";

const ImageSplitter = () => {
  return (
    <div
      className="max-w-screen-2xl mx-auto p-8 flex flex-col gap-4 text-center w-full min-h-[500px]"
      id="app"
    >
      <h2 className="text-4xl font-bold text-white">Try it Now</h2>
      <p className="text-secondary">
        Split your image into a grid of squares and download the cropped images.
        The more squares you have, the larger the emoji will look in your Slack
        workspace.
      </p>

      <main className="grid grid-cols-5 gap-4 min-h-[500px] mx-auto w-full">
        <div className="col-span-2">
          <ImageControls />
        </div>

        <div className="col-span-3">
          <FileUpload />
        </div>
      </main>
    </div>
  );
};

export default ImageSplitter;
