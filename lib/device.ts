export type DeviceType = "mobile" | "tablet" | "desktop";

export function getDeviceTypeFromWidth(width: number): DeviceType {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

