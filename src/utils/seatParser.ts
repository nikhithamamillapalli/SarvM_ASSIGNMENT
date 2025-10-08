export function parseSeatToken(seat: string): number | null {
  const trimmed = seat.trim();
  const match = trimmed.match(/^([A-Z]+)(\d+)$/);

  if (!match) {
    return null;
  }

  const numericPart = parseInt(match[2], 10);

  if (isNaN(numericPart) || numericPart <= 0) {
    return null;
  }

  return numericPart;
}

export function calculatePriorityMetric(seats: string[]): number {
  const distances = seats
    .map(parseSeatToken)
    .filter((d): d is number => d !== null);

  if (distances.length === 0) {
    return 0;
  }

  return Math.max(...distances);
}

export function isValidSeatToken(seat: string): boolean {
  return parseSeatToken(seat) !== null;
}
