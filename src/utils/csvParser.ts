import { Booking, ValidationError } from '../types/booking';

export interface ParseResult {
  bookings: Booking[];
  errors: ValidationError[];
}

function detectDelimiter(line: string): ',' | '\t' {
  const commaCount = (line.match(/,/g) || []).length;
  const tabCount = (line.match(/\t/g) || []).length;
  return tabCount > commaCount ? '\t' : ',';
}

function parseSeatsList(seatsStr: string): string[] {
  const cleaned = seatsStr.replace(/^["']|["']$/g, '').trim();
  return cleaned.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

export function parseCSV(content: string): ParseResult {
  const lines = content.split('\n').filter(line => line.trim().length > 0);

  if (lines.length < 2) {
    return {
      bookings: [],
      errors: [{ row: 0, message: 'File is empty or contains only headers' }]
    };
  }

  const delimiter = detectDelimiter(lines[0]);
  const header = lines[0].toLowerCase().split(delimiter).map(h => h.trim());

  const bookingIdIdx = header.findIndex(h => h.includes('booking') && h.includes('id'));
  const seatsIdx = header.findIndex(h => h.includes('seat'));

  if (bookingIdIdx === -1 || seatsIdx === -1) {
    return {
      bookings: [],
      errors: [{ row: 0, message: 'Missing required columns: Booking_ID and Seats' }]
    };
  }

  const bookings: Booking[] = [];
  const errors: ValidationError[] = [];
  const seenIds = new Set<number>();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(delimiter);

    if (parts.length < Math.max(bookingIdIdx, seatsIdx) + 1) {
      errors.push({
        row: i + 1,
        message: `Insufficient columns in row ${i + 1}`
      });
      continue;
    }

    const bookingIdStr = parts[bookingIdIdx].trim();
    const seatsStr = parts[seatsIdx].trim();

    const bookingId = parseInt(bookingIdStr, 10);

    if (isNaN(bookingId)) {
      errors.push({
        row: i + 1,
        booking_id: bookingIdStr,
        message: `Invalid Booking_ID: "${bookingIdStr}"`
      });
      continue;
    }

    if (seenIds.has(bookingId)) {
      errors.push({
        row: i + 1,
        booking_id: bookingIdStr,
        message: `Duplicate Booking_ID: ${bookingId}`
      });
      continue;
    }

    const seats = parseSeatsList(seatsStr);

    if (seats.length === 0) {
      errors.push({
        row: i + 1,
        booking_id: bookingIdStr,
        message: 'No seats provided'
      });
      continue;
    }

    const invalidSeats = seats.filter(seat => !seat.match(/^[A-Z]+\d+$/));
    if (invalidSeats.length > 0) {
      errors.push({
        row: i + 1,
        booking_id: bookingIdStr,
        message: `Invalid seat tokens: ${invalidSeats.join(', ')}`
      });
      continue;
    }

    seenIds.add(bookingId);
    bookings.push({ booking_id: bookingId, seats });
  }

  return { bookings, errors };
}
