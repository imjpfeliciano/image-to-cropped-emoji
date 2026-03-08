import Link from "./Link";

const ExampleImageWithGrid = () => {
  const cols = 2;
  const rows = 3;
  const cells = cols * rows;

  const getCornerClass = (i: number) => {
    const topLeft = 0;
    const topRight = cols - 1;
    const bottomLeft = (rows - 1) * cols;
    const bottomRight = rows * cols - 1;
    const classes: string[] = [];
    if (i === topLeft) classes.push("rounded-tl-lg");
    if (i === topRight) classes.push("rounded-tr-lg");
    if (i === bottomLeft) classes.push("rounded-bl-lg");
    if (i === bottomRight) classes.push("rounded-br-lg");
    return classes.join(" ");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-[400px] rounded-lg overflow-hidden">
        <img
          src="/monkey.jpg"
          alt="Example of a giant emoji"
          className="w-full h-auto block object-cover"
        />
        <div
          className="absolute inset-0 grid pointer-events-none"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: cells }).map((_, i) => (
            <div
              key={i}
              className={`border border-purple-500 ${getCornerClass(i)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mx-auto p-8 justify-center items-center max-w-screen-2xl">
      <div className="flex flex-col gap-4">
        <h2 className="text-6xl font-bold text-white">
          Create <span className="text-indigo-600">Giant</span> Slack Emojis in
          Seconds
        </h2>
        <p className="text-xl text-slate-300">
          Standard Slack emojis are tiny. Split your images into a grid to make
          them look massive in your workspace and stand out.
        </p>

        <div className="flex flex-row gap-4">
          <Link href="#app" variant="accent">
            Get started
          </Link>
          <Link href="#app" variant="outline">
            View Examples
          </Link>
        </div>
      </div>
      <ExampleImageWithGrid />
    </div>
  );
};

export default Hero;
