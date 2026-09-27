import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
} as const;

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0f3f46",
          color: "#fff8e7",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 68,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <span
          style={{
            background: "#b8d66d",
            bottom: 34,
            display: "block",
            height: 8,
            position: "absolute",
            width: 76,
          }}
        />
        MF
      </div>
    ),
    size,
  );
}
