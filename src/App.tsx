import FileUpload from "./components/FileUpload";
import ImageControls from "./components/ImageControls";

const App = () => {
  return (
    <div className="w-screen h-screen bg-slate-700 text-white flex flex-col">
      <header className="flex flex-row items-center w-full gap-4 p-4 bg-slate-800 shrink-0">
        <img
          className="w-12 h-12"
          src="/cropped-emoji-logo.png"
          alt="app-icon"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Crop Emoji App</h1>
          <p className="text-sm text-gray-400">
            Upload an image and crop it into a grid of squares.
          </p>
        </div>
      </header>
      <main className="flex flex-row gap-4 h-[calc(100%-100px)]">
        <ImageControls />

        <div className="flex-1 min-h-0 min-w-0 flex flex-col">
          <FileUpload />
        </div>
      </main>

      <footer className="gap-4 bottom-0 w-full flex justify-center items-center py-4 shrink-0 bg-slate-800">
        <div className="flex flex-row gap-4">
          Developers
          <a
            href="https://github.com/imjpfeliciano/image-to-cropped-emoji"
            target="_blank"
            className="hover:underline"
          >
            <span className="font-bold bg-slate-600 p-2 rounded">
              Github Repo
            </span>
          </a>
        </div>
        <div>
          <span>All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
