import { User2Icon } from "lucide-react";

const SlackCardExample = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 border border-indigo-600 rounded-lg p-4 w-full">
      <h3 className="text-2xl font-bold text-white">{title}</h3>

      {/* Slack card from message example */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 bg-white p-4 rounded-lg">
          <div className="w-12 h-12 bg-gray-400 rounded-md flex justify-center items-center">
            <User2Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <h4 className="text-lg font-bold text-black">John Doe</h4>
              <p className="text-sm text-gray-500">12:00 PM</p>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Examples = () => {
  return (
    <div className="max-w-screen-2xl mx-auto p-8 flex flex-col gap-4 text-center w-full">
      <h2 className="text-4xl font-bold text-white">The "Wow" Factor</h2>
      <p className="text-secondary">
        Compare standard Slack emojis to the ones you can create with CropEmoji.
      </p>

      <div className="grid grid-cols-2 gap-4 w-full">
        <SlackCardExample title="Standard Slack emoji">
          <img
            src="/monkey.jpg"
            alt="Example of a giant emoji"
            className="w-8 h-auto block object-cover"
          />
        </SlackCardExample>

        <SlackCardExample title="With CropEmoji">
          <img
            src="/monkey.jpg"
            alt="Example of a giant emoji"
            className="w-24 h-auto block object-cover"
          />
        </SlackCardExample>
      </div>
    </div>
  );
};

export default Examples;
