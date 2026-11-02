const UPSTREAM =
    'https://github.com/biocompute-inc/BioCompute_Website_Revamp_Demo/releases/download/assets-2026-11-01/og-home.jpg';

export const revalidate = 86400;

export async function GET() {
    const res = await fetch(UPSTREAM);
    if (!res.ok) {
        return new Response('preview image unavailable', { status: 502 });
    }
    const buf = await res.arrayBuffer();
    return new Response(buf, {
        headers: {
            'Content-Type': 'image/jpeg',
            'Content-Length': String(buf.byteLength),
            'Cache-Control': 'public, max-age=86400',
        },
    });
}
