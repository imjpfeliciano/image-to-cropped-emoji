import FileUpload from "./components/FileUpload";
import ImageControls from "./components/ImageControls";

const App = () => {
  return (
    <div className="w-screen h-screen bg-slate-700 text-white">
      <main className="flex flex-col gap-4 items-center justify-center h-full">
        <header className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Image to cropped slack emoji</h1>
          <img
            className="w-48 h-48"
            src="/cropped-emoji-logo.png"
            alt="app-icon"
          />
        </header>

        <section className="w-full max-w-screen-lg">
          <FileUpload />
        </section>

        <section className="w-full max-w-screen-lg">
          <ImageControls />
        </section>
      </main>

      <footer className="bg-slate-800 fixed flex-col gap-4 bottom-0 w-full flex justify-center items-center py-4">
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
