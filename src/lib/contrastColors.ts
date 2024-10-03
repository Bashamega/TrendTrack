export function getBestContrastColor(hex?: string): "black" | "white" {
  if (!hex) return "black";
  // Ensure the hex string starts with a '#' and is 6 characters long
  if (hex.charAt(0) === "#") {
    hex = hex.substring(1);
  }
  if (hex.length !== 6) {
    throw new Error(
      "Invalid hex color format. Please provide a 6-digit hex color.",
    );
  }

  // Convert hex to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance using the formula:
  // Luminance = 0.299*R + 0.587*G + 0.114*B
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // If luminance is greater than 186, return 'black', otherwise return 'white'
  return luminance > 186 ? "black" : "white";
}
