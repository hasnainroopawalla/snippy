export const copyToClipboard = async (value: string) =>
  navigator.clipboard.writeText(value);
