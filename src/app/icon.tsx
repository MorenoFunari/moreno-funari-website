import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
} as const;

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0f3f46",
          color: "#fff8e7",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
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
            bottom: 4,
            display: "block",
            height: 3,
            position: "absolute",
            width: 14,
          }}
        />
        MF
      </div>
    ),
    size,
  );
}
