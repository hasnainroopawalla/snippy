import * as crypto from "crypto";

export class CryptoService {
  constructor() {}

  public hash(text: string): string {
    return crypto.createHash("sha256").update(text).digest("hex");
  }

  public encrypt(): string {}

  public decrypt(): string {}
}
