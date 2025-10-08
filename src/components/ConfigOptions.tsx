import { OrderStrategy, TieBreak } from '../types/booking';

interface ConfigOptionsProps {
  orderStrategy: OrderStrategy;
  setOrderStrategy: (strategy: OrderStrategy) => void;
  tieBreak: TieBreak;
  setTieBreak: (tieBreak: TieBreak) => void;
  groupByBooking: boolean;
  setGroupByBooking: (value: boolean) => void;
}

export function ConfigOptions({
  orderStrategy,
  setOrderStrategy,
  tieBreak,
  setTieBreak,
  groupByBooking,
  setGroupByBooking
}: ConfigOptionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Options</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Ordering Strategy
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="orderStrategy"
                value="back-to-front"
                checked={orderStrategy === 'back-to-front'}
                onChange={(e) => setOrderStrategy(e.target.value as OrderStrategy)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Back-to-Front (recommended)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="orderStrategy"
                value="front-to-back"
                checked={orderStrategy === 'front-to-back'}
                onChange={(e) => setOrderStrategy(e.target.value as OrderStrategy)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Front-to-Back</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tie-Break Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="tieBreak"
                value="booking_id"
                checked={tieBreak === 'booking_id'}
                onChange={(e) => setTieBreak(e.target.value as TieBreak)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Booking ID (lowest first)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tieBreak"
                value="seats_count"
                checked={tieBreak === 'seats_count'}
                onChange={(e) => setTieBreak(e.target.value as TieBreak)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Seats Count (most seats first)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tieBreak"
                value="random"
                checked={tieBreak === 'random'}
                onChange={(e) => setTieBreak(e.target.value as TieBreak)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Random</span>
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={groupByBooking}
              onChange={(e) => setGroupByBooking(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Group seats by booking
            </span>
          </label>
          <p className="mt-1 ml-6 text-xs text-gray-500">
            All seats in a booking board together
          </p>
        </div>
      </div>
    </div>
  );
}
