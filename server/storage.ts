/**
 * storage.ts — REMOVED (Manus storage proxy not available in standalone app).
 * File storage is not used by the Chinese Reader app features.
 */
export async function storagePut(
  _relKey: string,
  _data: Buffer | Uint8Array | string,
  _contentType?: string
): Promise<{ key: string; url: string }> {
  throw new Error("File storage is not configured in standalone mode.");
}

export async function storageGet(
  _relKey: string
): Promise<{ key: string; url: string }> {
  throw new Error("File storage is not configured in standalone mode.");
}
