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
 
* Crop an image into a grid of rows x columns
 * @param image
 * @param rows
 * @param columns
 * @param outputFileName
 * @returns {Promise<File[]>}
 */

// TODO: Force cropped images to have square size
// 95 x 95 so it can be used on slack
export const cropImage = async (
  image: File,
  columns: number,
  rows: number,
  outputFileName: string
): Promise<File[]> => {
  const { width, height } = await getImageSize(image);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const outputFiles: File[] = [];

  const cropWidth = width / columns;
  const cropHeight = height / rows;

  const canvasImage = new Image();
  canvasImage.src = URL.createObjectURL(image);

  try {
    return await new Promise((resolve) => {
      canvasImage.onload = async () => {
        for (let i = 0; i < rows; i++) {
          const sy = cropHeight * i;

          for (let j = 0; j < columns; j++) {
            const sx = cropWidth * j;

            const chunkImageProps = {
              sx,
              sy,
              cropWidth,
              cropHeight,
              dx: 0,
              dy: 0,
              dWidth: cropWidth,
              dHeight: cropHeight,
            };

            console.log({ chunkImageProps });
            context?.drawImage(
              canvasImage,
              sx,
              sy,
              cropWidth,
              cropHeight,
              0, // destination x
              0, // destination y
              cropWidth,
              cropHeight
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
