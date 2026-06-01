/**
 * Resize and compress an image using Canvas, returning a base64-encoded result.
 */
export const compressImage = (
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get Canvas 2D context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(file.type || "image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        reject(new Error("Image failed to load"));
      };
    };
    reader.onerror = () => {
      reject(new Error("File read failed"));
    };
  });
};

/**
 * Estimate the byte size of a base64-encoded image.
 * base64 encodes 3 bytes as 4 characters, so the actual size is ~3/4 of the string length.
 */
export const estimateBase64Size = (base64String: string): number => {
  const base64Data = base64String.split(",")[1] || base64String;
  return Math.round((base64Data.length * 3) / 4);
};
