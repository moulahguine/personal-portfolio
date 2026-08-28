import { NextRequest, NextResponse } from "next/server";

const CARTO_TILE_BASE = "https://a.basemaps.cartocdn.com";
const ALLOWED_STYLES = new Set(["light_all", "dark_all"]);

function parseTilePath(segments: string[]): string | null {
  if (segments.length !== 4) {
    return null;
  }

  const [style, z, x, yFile] = segments;

  if (!ALLOWED_STYLES.has(style)) {
    return null;
  }

  if (!/^\d+$/.test(z) || !/^\d+$/.test(x) || !/^\d+(@2x)?\.png$/.test(yFile)) {
    return null;
  }

  const zoom = Number(z);

  if (zoom < 0 || zoom > 20) {
    return null;
  }

  return segments.join("/");
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const apiKey = process.env.CARTO_API_KEY?.trim();

  if (!apiKey) {
    return new NextResponse("Map tiles are not configured.", { status: 503 });
  }

  const { path } = await params;
  const tilePath = parseTilePath(path);

  if (!tilePath) {
    return new NextResponse("Invalid tile request.", { status: 400 });
  }

  const cartoUrl = `${CARTO_TILE_BASE}/${tilePath}?key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(cartoUrl);

    if (!response.ok) {
      return new NextResponse("Failed to load map tile.", {
        status: response.status,
      });
    }

    const body = await response.arrayBuffer();

    return new NextResponse(body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "image/png",
        "Cache-Control":
          "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new NextResponse("Failed to load map tile.", { status: 502 });
  }
}
