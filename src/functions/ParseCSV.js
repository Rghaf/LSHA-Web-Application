export const parseCSV = (csvText) => {
  const lines = csvText.split("\n").filter((line) => line.trim() !== ""); // Split by line & remove empty ones
  const headers = lines[0].split(",").map((header) => header.trim()); // Get headers from first row

  const result = lines.slice(1).map((line, index) => {
    const values = line.split(",").map((value) => value.trim());
    const obj = {};

    // Map headers to values
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });

    // Ensure we have a unique ID for React keys
    if (!obj.id) obj.id = Date.now() + index;

    return obj;
  });

  return result;
};
