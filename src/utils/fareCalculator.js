// ── FARE CALCULATOR ──────────────────────────────────────────
// Edit your rates here anytime.

const BASE_FARES = { standard: 35, business: 45, van: 55 };
const PARCEL_BASE = { envelope: 15, small: 20, medium: 25, large: 35 };
const PARCEL_KM   = { envelope: 0.95, small: 1.10, medium: 1.25, large: 1.50 };

function taxiKmRate(km) {
  if (km <= 50) return 1.40;
  if (km <= 100) return 1.30;
  return 1.20;
}

function nightMultiplier(time) {
  if (!time) return 1;
  const [h] = time.split(":").map(Number);
  return h >= 22 || h < 6 ? 1.20 : 1;
}

const VEHICLE_MULTIPLIER = { standard: 1.0, business: 1.15, van: 1.25 };

export function calculateTaxiFare(km, vehicle, time, returnTrip) {
  if (!km || km <= 0) return null;
  const base = BASE_FARES[vehicle] || 35;
  const rate = taxiKmRate(km) * (VEHICLE_MULTIPLIER[vehicle] || 1);
  const distanceCost = km * rate;
  let total = Math.max(base, base + distanceCost);
  if (returnTrip) total = total * 1.9;
  return {
    base,
    distanceCost: parseFloat(distanceCost.toFixed(2)),
    nightSurcharge: false,
    returnTrip,
    total: parseFloat(total.toFixed(2)),
  };
}

export function calculateParcelFare(km, size) {
  if (!km || km <= 0 || !size) return null;
  const base = PARCEL_BASE[size] || 20;
  const rate = PARCEL_KM[size] || 1.10;
  const distanceCost = km * rate;
  return {
    base,
    distanceCost: parseFloat(distanceCost.toFixed(2)),
    total: parseFloat((base + distanceCost).toFixed(2)),
  };
}

export async function getDrivingDistance(origin, destination) {
  // Wait for Google Maps to be ready
  await new Promise((res) => {
    if (window.google?.maps) return res();
    const interval = setInterval(() => {
      if (window.google?.maps) { clearInterval(interval); res(); }
    }, 200);
    setTimeout(() => { clearInterval(interval); res(); }, 8000);
  });

  if (!window.google?.maps) throw new Error("Google Maps not loaded");

  return new Promise((resolve, reject) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        region: "BE",
      },
      (response, status) => {
        if (status !== "OK") {
          return reject(new Error("Distance Matrix error: " + status));
        }
        const element = response.rows[0]?.elements[0];
        if (!element || element.status !== "OK") {
          return reject(new Error("No route found between these addresses"));
        }
        resolve({
          km: parseFloat((element.distance.value / 1000).toFixed(1)),
          duration: element.duration.text,
        });
      }
    );
  });
}