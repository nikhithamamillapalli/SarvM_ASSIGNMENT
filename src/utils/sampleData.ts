export const SAMPLE_CSV = `Booking_ID,Seats
101,"A1,B1"
120,"A20,C2"
130,"B18,B19"
131,"C1,D1"
140,"A15,A16,B15"
150,"A20,B20"
160,"C10,C11"
170,"D18"`;

export function downloadSampleCSV(): void {
  const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sample_bookings.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
