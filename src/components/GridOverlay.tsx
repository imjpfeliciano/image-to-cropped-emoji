interface GridOverlayProps {
  columns: number;
  rows: number;
  containerWidth: number;
  containerHeight: number;
}

const GridOverlay: React.FC<GridOverlayProps> = ({
  columns,
  rows,
  containerWidth,
  containerHeight,
}) => {
  const cellSize =
    containerWidth > 0 && containerHeight > 0
      ? Math.min(containerWidth / columns, containerHeight / rows)
      : 0;
  const gridWidth = cellSize * columns;
  const gridHeight = cellSize * rows;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="grid"
        style={{
          width: gridWidth,
          height: gridHeight,
          gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, index) => (
          <div
            key={`cell-${index + 1}`}
            className="border border-purple-400 border-dashed flex items-center justify-center"
          />
        ))}
      </div>
    </div>
  );
};

export default GridOverlay;
