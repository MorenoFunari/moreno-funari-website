import { ImageResponse } from "next/og";

export const alt = "Mental coaching sportivo per giovani atleti | Moreno Funari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function AthleteSocialImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: "100%", height: "100%", color: "#fffdf8", background: "#071c2d", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", color: "#b7d52a", fontSize: 28 }}>MENTAL COACHING SPORTIVO</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ fontSize: 80, lineHeight: 1.06 }}>Giovani atleti.</div><div style={{ fontSize: 46 }}>Errore, pressione e fiducia nello sport.</div><div style={{ fontSize: 30, color: "#b7d52a" }}>Online · Frascati · Castelli Romani</div></div>
    <div style={{ fontSize: 28 }}>Moreno Funari | Mental Coach</div>
  </div>, size);
}
