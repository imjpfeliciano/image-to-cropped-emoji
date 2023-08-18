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

interface ImageContextType {
  image: File | null;
  setImage: (image: File | null) => void;
  imageSize: { width: number; height: number };
  grid: { columns: number; rows: number };
  setGrid: (grid: Grid) => void;
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

  useEffect(() => {
    if (!image) return;

    fetchImage(image).then(({ width, height }) => {
      setImageSize({ width, height });
    });
  }, [image]);

  const processImage = async () => {
    if (!image) return;

    const outputFiles = await cropImage(
      image,
      grid.columns,
      grid.rows,
      "sample"
    );
    const zipFile = await zipFiles(outputFiles);

    downloadBlob(zipFile, `${image.name}.zip`);
  };

  return (
    <ImageContext.Provider
      value={{ image, setImage, imageSize, grid, setGrid, processImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};
