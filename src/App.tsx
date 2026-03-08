import Examples from "./components/Examples";
import Header from "./components/Header";
import Hero from "./components/Hero";

import ImageSplitter from "./components/ImageSplitter";
import ProductFlow from "./components/ProductFlow";

const App = () => {
  return (
    <div className="w-screen bg-slate-800 text-white flex flex-col gap-4">
      <Header />
      <Hero />
      <ProductFlow />
      <Examples />
      <ImageSplitter />
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
