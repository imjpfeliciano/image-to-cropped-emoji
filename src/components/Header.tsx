import { LayoutGridIcon } from "lucide-react";
import Link from "./Link";

// TODO: Implement scroll to anchor when clicking on the links
const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center w-full gap-4 p-4 shrink-0 border-b border-indigo-300">
      <div className="flex flex-row items-center gap-2">
        <LayoutGridIcon className="w-8 h-8 bg-indigo-600 p-1 rounded" />
        <h1 className="text-2xl font-bold">CropEmoji</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Link href="#how-it-works">How it Works</Link>
        <Link href="#examples">Examples</Link>
        <Link href="#app" variant="accent">
          Start splitting
        </Link>
      </div>
    </header>
  );
};

export default Header;
