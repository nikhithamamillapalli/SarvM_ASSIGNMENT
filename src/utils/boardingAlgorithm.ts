import { Booking, ParsedBooking, SequenceItem, ComputeOptions } from '../types/booking';
import { calculatePriorityMetric } from './seatParser';

export function computeBoardingSequence(
  bookings: Booking[],
  options: ComputeOptions
): SequenceItem[] {
  const parsed: ParsedBooking[] = bookings.map(b => ({
    ...b,
    priority_metric: calculatePriorityMetric(b.seats)
  }));

  const sorted = [...parsed].sort((a, b) => {
    let priorityA = a.priority_metric;
    let priorityB = b.priority_metric;

    if (options.order_strategy === 'front-to-back') {
      [priorityA, priorityB] = [priorityB, priorityA];
    }

    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }

    if (options.tie_break === 'booking_id') {
      return a.booking_id - b.booking_id;
    } else if (options.tie_break === 'seats_count') {
      return b.seats.length - a.seats.length;
    } else {
      return Math.random() - 0.5;
    }
  });

  return sorted.map((b, idx) => ({
    seq: idx + 1,
    booking_id: b.booking_id,
    seats: b.seats,
    priority: b.priority_metric
  }));
}
