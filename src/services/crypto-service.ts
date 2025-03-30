import * as crypto from "crypto";

export class CryptoService {
  private readonly encryptionAlgorithm = "aes-256-gcm";
  private readonly encryptionKeyDigestAlgorithm = "sha256";
  private readonly encryptionIvLength: number;

  constructor() {
    // Initialization vector length in bytes
    this.encryptionIvLength = 16;
  }

  public hash(text: string): string {
    return crypto.createHash("sha256").update(text).digest("hex");
  }

  public encrypt(content: string, key: string): string {
    const keyDigest = this.createKeyDigest(key);

    const iv = crypto.randomBytes(this.encryptionIvLength);
    const cipher = crypto.createCipheriv(
      this.encryptionAlgorithm,
      keyDigest,
      iv,
    );

    const encryptedContent = Buffer.concat([
      cipher.update(content, "utf8"),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    // Combine IV, encrypted content, and auth tag
    const combinedBuffer = Buffer.concat([iv, encryptedContent, authTag]);
    return combinedBuffer.toString("base64"); // Encode as base64 for storage/transmission
  }

  /**
   * Decrypts the encrypted data using the provided key
   * @param encryptedData - The encrypted content as a base64 string
   * @param key - A cryptographic key (32 bytes)
   * @returns Decrypted plain text
   */
  public decrypt(encryptedData: string, key: string): string {
    const keyDigest = this.createKeyDigest(key);

    const encryptedBuffer = Buffer.from(encryptedData, "base64");

    const iv = encryptedBuffer.subarray(0, this.encryptionIvLength);
    const authTag = encryptedBuffer.subarray(-16); // Auth tag is 16 bytes
    const encryptedContent = encryptedBuffer.subarray(
      this.encryptionIvLength,
      -16,
    );

    const decipher = crypto.createDecipheriv(
      this.encryptionAlgorithm,
      keyDigest,
      iv,
    );
    decipher.setAuthTag(authTag);

    return Buffer.concat([
      decipher.update(encryptedContent),
      decipher.final(),
    ]).toString("utf8");
  }

  public comparePasswordHash(
    snippetPasswordHash: string,
    inputPasswordHash: string,
  ): boolean {
    return snippetPasswordHash === this.hash(inputPasswordHash);
  }

  private createKeyDigest(key: string): Buffer {
    return crypto
      .createHash(this.encryptionKeyDigestAlgorithm)
      .update(key)
      .digest();
  }
}
