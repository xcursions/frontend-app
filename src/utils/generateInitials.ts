const getInitials = (name: string): string => {
  const names = name.trim().split(/\s+/); // Split on one or more whitespace characters

  if (names.length === 1) {
    return `${name.charAt(0).toUpperCase()}`;
  }
  return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
};

/**
 * Generate a data URI for a base64-encoded image with initials based on the provided name.
 *
 * @param {string} name - The name for which initials are used.
 * @param {number} [width] - The width of the canvas.
 * @param {number} [height] - The height of the canvas.
 * @param {number} [fontSize] - The fontSize of the canvas.
 * @param {string} [bgColor="#f6f5f5"] - The background color of the image.
 * @param {string} [textColor="#4a3041"] - The text color of the initials.
 * @param {number} [pixelRatio=2] - The device pixel ratio.
 * @returns {string} - The data URI for the generated image.
 */
export const generateInitialsImageURI = (
  name: string,
  width: number = 100,
  height: number = 100,
  fontSize: number = 32,
  bgColor: string = "#f6f5f5",
  textColor: string = "#4a3041",
  pixelRatio: number = 6
): string => {
  // Create a canvas element with higher pixel density
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  // Scale the canvas back down with CSS
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // Get the 2D rendering context
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context is not supported.");
  }

  // Adjust for the higher pixel density
  ctx.scale(pixelRatio, pixelRatio);

  // Set background color
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Set text properties
  ctx.font = `500 ${fontSize}px inter`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = textColor;

  // Get initials from the name
  const initials = getInitials(name);

  // Draw initials on the canvas
  ctx.fillText(initials, width / 2, height / 2, width);

  // Convert the canvas to a data URI
  const dataURI: string = canvas.toDataURL();

  return dataURI;
};
