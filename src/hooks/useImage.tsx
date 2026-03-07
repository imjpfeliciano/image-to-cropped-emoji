import { createContext, useContext, useEffect, useState } from "react";
import {
  cropImage,
  downloadBlob,
  getImageSize,
  zipFiles,
} from "../helpers/Image";

export interface Grid {
  columns: number;
  rows: number;
}

export interface Offset {
  x: number;
  y: number;
}

interface ImageContextType {
  image: File | null;
  setImage: (image: File | null) => void;
  imageSize: { width: number; height: number };
  grid: { columns: number; rows: number };
  setGrid: (grid: Grid) => void;
  offset: Offset;
  setOffset: (offset: Offset | ((prev: Offset) => Offset)) => void;
  zoom: number;
  setZoom: (zoom: number | ((prev: number) => number)) => void;
  processImage: () => Promise<void> | void;
}

const ImageContext = createContext<ImageContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within ImageProvider");
  }

  return context;
};

const fetchImage = async (file: File) => {
  const { width, height } = await getImageSize(file);

  return { width, height };
};

const initialSize = { width: 0, height: 0 };

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    initialSize
  );
  const [grid, setGrid] = useState<{ columns: number; rows: number }>({
    columns: 1,
    rows: 1,
  });
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!image) return;

    fetchImage(image).then(({ width, height }) => {
      setImageSize({ width, height });
    });
  }, [image]);

  useEffect(() => {
    if (!image) {
      setOffset({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [image]);

  useEffect(() => {
    const { width, height } = imageSize;
    if (width <= 0 || height <= 0) return;
    const cellSize = Math.min(width / grid.columns, height / grid.rows);
    const gridWidth = cellSize * grid.columns;
    const gridHeight = cellSize * grid.rows;
    const maxX = Math.max(0, (width * zoom - gridWidth) / 2);
    const maxY = Math.max(0, (height * zoom - gridHeight) / 2);
    setOffset((prev) => ({
      x: Math.max(-maxX, Math.min(maxX, prev.x)),
      y: Math.max(-maxY, Math.min(maxY, prev.y)),
    }));
  }, [imageSize, grid, zoom]);

  const processImage = async () => {
    if (!image) return;

    const outputFiles = await cropImage(
      image,
      grid.columns,
      grid.rows,
      "sample",
      offset.x,
      offset.y,
      zoom
    );
    const zipFile = await zipFiles(outputFiles);

    downloadBlob(zipFile, `${image.name}.zip`);
  };

  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
        imageSize,
        grid,
        setGrid,
        offset,
        setOffset,
        zoom,
        setZoom,
        processImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
