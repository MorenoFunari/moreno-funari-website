import { ImageResponse } from "next/og";

export const socialImageAlt = "Moreno Funari | Mental Coach";

export const socialImageSize = {
  width: 1200,
  height: 630,
} as const;

export const socialImageContentType = "image/png";

export function createDefaultSocialImageResponse(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#0f3f46",
          color: "#fff8e7",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            gap: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              background: "#b8d66d",
              borderRadius: 999,
              display: "block",
              height: 18,
              width: 18,
            }}
          />
          MORENO FUNARI | MENTAL COACH
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              background: "#b8d66d",
              display: "block",
              height: 8,
              width: 140,
            }}
          />
          <h1
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.04,
              margin: 0,
            }}
          >
            Piccoli passi concreti per fare chiarezza.
          </h1>
        </div>
        <div
          style={{
            color: "#d7e6df",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          morenofunari.it
        </div>
      </div>
    ),
    socialImageSize,
  );
}
