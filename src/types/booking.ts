export interface Booking {
  booking_id: number;
  seats: string[];
}

export interface ParsedBooking extends Booking {
  priority_metric: number;
}

export interface SequenceItem {
  seq: number;
  booking_id: number;
  seats: string[];
  priority: number;
}

export interface BoardingSequenceResponse {
  sequence: SequenceItem[];
  stats: {
    total_bookings: number;
    file_name: string;
  };
}

export interface ValidationError {
  row: number;
  booking_id?: string;
  message: string;
}

export type OrderStrategy = 'back-to-front' | 'front-to-back' | 'custom';
export type TieBreak = 'booking_id' | 'seats_count' | 'random';

export interface ComputeOptions {
  order_strategy: OrderStrategy;
  tie_break: TieBreak;
  group_by_booking: boolean;
}
