import * as React from "react";
import QRCode from "react-qr-code";

type SnippetQRCodeProps = {
  value: string;
};

export const SnippetQRCode: React.FC<SnippetQRCodeProps> = ({ value }) => (
  <div className="rounded-md bg-white p-4">
    <QRCode value={value} />
  </div>
);
