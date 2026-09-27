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
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg viewBox="0 0 64 64" width="27" height="27">
          <path
            d="M11 50V14L27 36L43 14V50M43 14H55M43 32H52"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 14H55"
            fill="none"
            stroke="#B7D52A"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
