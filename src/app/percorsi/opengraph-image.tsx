import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Coaching personalizzato — CONFRONTO gratuito di 30 minuti. Moreno Funari | Mental Coach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PercorsiSocialImage() {
  // Authentic repository photo, converted to JPEG for the OG renderer.
  const portrait = await readFile(join(process.cwd(), "public/images/og/percorsi-moreno.jpg"));
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#071c2d", color: "#fffdf8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720, padding: "60px 54px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 84, height: 8, background: "#b7d52a", marginBottom: 34 }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 58, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2 }}>
            <span>COACHING</span><span style={{ color: "#b7d52a" }}>PERSONALIZZATO</span>
          </div>
          <p style={{ fontSize: 32, lineHeight: 1.35, marginTop: 32, marginBottom: 0, maxWidth: 580 }}>CONFRONTO gratuito di 30 minuti. Online oppure in presenza, da concordare.</p>
        </div>
        <div style={{ display: "flex", fontSize: 25, borderTop: "1px solid #49606d", paddingTop: 24 }}>Moreno Funari | Mental Coach</div>
      </div>
      <div style={{ display: "flex", width: 480, height: 630, borderLeft: "6px solid #b7d52a" }}>
        {/* ImageResponse requires a native image with embedded bytes. */}
        <img src={`data:image/jpeg;base64,${portrait.toString("base64")}`} alt="" width={474} height={630} style={{ objectFit: "cover" }} />
      </div>
    </div>,
    size,
  );
}
