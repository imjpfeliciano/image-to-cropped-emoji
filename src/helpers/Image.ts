import JSZip from "jszip";

interface InputImage {
  width: number;
  height: number;
}

export const getImageSize = async (image: File): Promise<InputImage> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(image);
  });
};

/**
 * Crop an image into a grid of rows x columns using square cells.
 * Uses the same logic as the preview: centered grid, offset, and zoom.
 * With zoom > 1, each cell samples a smaller region of the image (zoomed in).
 *
 * @param offsetX - horizontal offset (positive = image moved right in preview)
 * @param offsetY - vertical offset (positive = image moved down in preview)
 * @param zoom - zoom level (1 = full image in view; >1 = zoomed in)
 */
export const cropImage = async (
  image: File,
  columns: number,
  rows: number,
  outputFileName: string,
  offsetX = 0,
  offsetY = 0,
  zoom = 1
): Promise<File[]> => {
  const { width, height } = await getImageSize(image);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const outputFiles: File[] = [];

  const cellSize = Math.min(width / columns, height / rows);
  const gridWidth = cellSize * columns;
  const gridHeight = cellSize * rows;
  const cropCellSize = cellSize / zoom;
  const startX = width / 2 - gridWidth / (2 * zoom) - offsetX / zoom;
  const startY = height / 2 - gridHeight / (2 * zoom) - offsetY / zoom;

  const outputSize = Math.max(1, Math.round(cropCellSize));

  const canvasImage = new Image();
  canvasImage.src = URL.createObjectURL(image);

  try {
    return await new Promise((resolve) => {
      canvasImage.onload = async () => {
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            const sx = startX + j * cropCellSize;
            const sy = startY + i * cropCellSize;

            canvas.width = outputSize;
            canvas.height = outputSize;

            context?.drawImage(
              canvasImage,
              sx,
              sy,
              cropCellSize,
              cropCellSize,
              0,
              0,
              outputSize,
              outputSize
            );
            const blob = await new Promise<Blob | null>((resolve) =>
              canvas.toBlob(resolve)
            );
            if (blob) {
              outputFiles.push(
                new File([blob], `${outputFileName}_${i}_${j}.png`)
              );
            }
          }
        }
        resolve(outputFiles);
      };
    });
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return [];
  }
};

export const zipFiles = async (files: File[]) => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file);
  });
  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
};

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};
