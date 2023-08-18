const GridColsMapper: {
  [key: number]: string;
} = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
};

interface GridOverlayProps {
  columns: number;
  rows: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({ columns, rows }) => (
  <div className={`grid ${GridColsMapper[columns]} w-full h-full`}>
    {Array.from({ length: columns * rows }).map((_, index) => (
      <div
        key={`cell-${index + 1}`}
        className="border border-purple-400 border-dashed flex items-center justify-center"
      />
    ))}
  </div>
);

export default GridOverlay;
