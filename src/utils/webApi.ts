export const copyToClipboard = async (value: string) =>
  navigator.clipboard.writeText(value);

export const openRawContent = (content: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  window.location.href = url;
  window.URL.revokeObjectURL(url); // Clean up the object URL after it's used
};
