// Great-circle distance between two [lat, lng] points.

export function haversineMiles(
  a: [number, number],
  b: [number, number]
): number {
  const R = 3958.8; // Earth radius in miles
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

export function milesToKm(miles: number): number {
  return Math.round(miles * 1.60934);
}
