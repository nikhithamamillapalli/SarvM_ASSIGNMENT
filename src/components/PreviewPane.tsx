import { AlertCircle } from 'lucide-react';
import { Booking, ValidationError } from '../types/booking';

interface PreviewPaneProps {
  bookings: Booking[];
  errors: ValidationError[];
  fileName?: string;
}

export function PreviewPane({ bookings, errors, fileName }: PreviewPaneProps) {
  if (bookings.length === 0 && errors.length === 0) {
    return null;
  }

  const previewBookings = bookings.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        File Preview {fileName && <span className="text-sm font-normal text-gray-500">({fileName})</span>}
      </h3>

      {errors.length > 0 && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 mb-2">Validation Errors</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.slice(0, 5).map((error, idx) => (
                  <li key={idx}>
                    {error.row > 0 && `Row ${error.row}: `}{error.message}
                  </li>
                ))}
                {errors.length > 5 && (
                  <li className="text-red-600 font-medium">
                    ...and {errors.length - 5} more errors
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Booking ID</th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Seats</th>
              </tr>
            </thead>
            <tbody>
              {previewBookings.map((booking, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-2 px-3 text-sm text-gray-900">{booking.booking_id}</td>
                  <td className="py-2 px-3 text-sm text-gray-600">{booking.seats.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length > 10 && (
            <p className="text-sm text-gray-500 mt-3">
              Showing 10 of {bookings.length} bookings
            </p>
          )}
        </div>
      )}
    </div>
  );
}
