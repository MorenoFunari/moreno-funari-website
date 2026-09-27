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
          background: "#071C2D",
          color: "#FFFFFF",
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
            background: "#B7D52A",
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
