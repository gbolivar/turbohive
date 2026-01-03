export async function generateQr(data: {
  text: string;
  size?: number;
}) {
  // Ejemplo simple (mock)
  return {
    format: 'QR',
    text: data.text,
    size: data.size ?? 256,
    content: `QR(${data.text})`,
  };
}
