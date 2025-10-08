import { Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { SequenceItem } from '../types/booking';

interface ResultsTableProps {
  sequence: SequenceItem[];
}

export function ResultsTable({ sequence }: ResultsTableProps) {
  const [copied, setCopied] = useState(false);

  if (sequence.length === 0) {
    return null;
  }

  const handleDownloadCSV = () => {
    const headers = ['Seq', 'Booking_ID', 'Seats', 'Priority_Metric'];
    const rows = sequence.map(item => [
      item.seq,
      item.booking_id,
      `"${item.seats.join(', ')}"`,
      item.priority
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'boarding_sequence.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    const text = sequence
      .map(item => `${item.seq}\t${item.booking_id}\t${item.seats.join(', ')}\t${item.priority}`)
      .join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Boarding Sequence ({sequence.length} bookings)
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Download as CSV"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Seq</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Booking ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Seats</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Priority Metric</th>
            </tr>
          </thead>
          <tbody>
            {sequence.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.seq}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{item.booking_id}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{item.seats.join(', ')}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{item.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
