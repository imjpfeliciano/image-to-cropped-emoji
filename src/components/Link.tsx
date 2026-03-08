import clsx from "clsx";

const Link = ({
  href,
  variant = "link",
  children,
}: {
  href: string;
  variant?: "link" | "accent" | "outline";
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className={clsx("text-lg font-medium text-white py-2 px-4 rounded", {
        "bg-indigo-600 hover:bg-indigo-700": variant === "accent",
        "text-white hover:underline": variant === "link",
        "border border-indigo-600 hover:bg-indigo-600": variant === "outline",
      })}
    >
      {children}
    </a>
  );
};

export default Link;
