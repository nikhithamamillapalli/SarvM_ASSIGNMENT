import { useState } from 'react';
import { Bus, Download } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { PreviewPane } from './components/PreviewPane';
import { ConfigOptions } from './components/ConfigOptions';
import { ResultsTable } from './components/ResultsTable';
import { parseCSV } from './utils/csvParser';
import { computeBoardingSequence } from './utils/boardingAlgorithm';
import { downloadSampleCSV } from './utils/sampleData';
import { Booking, ValidationError, SequenceItem, OrderStrategy, TieBreak } from './types/booking';

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fileName, setFileName] = useState<string>();
  const [sequence, setSequence] = useState<SequenceItem[]>([]);

  const [orderStrategy, setOrderStrategy] = useState<OrderStrategy>('back-to-front');
  const [tieBreak, setTieBreak] = useState<TieBreak>('booking_id');
  const [groupByBooking, setGroupByBooking] = useState(true);

  const handleFileSelect = async (file: File) => {
    setFileName(file.name);
    setSequence([]);

    const content = await file.text();
    const result = parseCSV(content);

    setBookings(result.bookings);
    setErrors(result.errors);
  };

  const handleCompute = () => {
    if (bookings.length === 0) return;

    const result = computeBoardingSequence(bookings, {
      order_strategy: orderStrategy,
      tie_break: tieBreak,
      group_by_booking: groupByBooking
    });

    setSequence(result);
  };

  const canCompute = bookings.length > 0 && errors.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Bus className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Bus Boarding Sequence Generator
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Upload booking data to generate an optimized boarding sequence that minimizes
            passenger blocking and reduces overall boarding time. The system prioritizes
            back-to-front boarding for maximum efficiency.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Upload Bookings File</h2>
                <button
                  onClick={downloadSampleCSV}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                  aria-label="Download sample CSV"
                >
                  <Download className="w-4 h-4" />
                  Sample CSV
                </button>
              </div>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>

            <PreviewPane bookings={bookings} errors={errors} fileName={fileName} />

            {canCompute && (
              <button
                onClick={handleCompute}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
              >
                Generate Boarding Sequence
              </button>
            )}

            <ResultsTable sequence={sequence} />
          </div>

          <div className="lg:col-span-1">
            <ConfigOptions
              orderStrategy={orderStrategy}
              setOrderStrategy={setOrderStrategy}
              tieBreak={tieBreak}
              setTieBreak={setTieBreak}
              groupByBooking={groupByBooking}
              setGroupByBooking={setGroupByBooking}
            />

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">How It Works</h4>
              <ul className="text-sm text-blue-800 space-y-1.5">
                <li>• Bookings with farther seats board first</li>
                <li>• Priority based on maximum seat distance</li>
                <li>• Tie-breaks ensure consistent ordering</li>
                <li>• Single front entry assumed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
