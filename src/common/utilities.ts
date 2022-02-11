export function getMediaCapabilities(): MediaCapabilities | undefined {
  return navigator.mediaCapabilities ?? undefined;
}
