// Salary formatter utility for Indian Rupee (₹)
export const formatINR = (value) => {
  if (value === null || value === undefined || value === '') return 'N/A';

  // If number primitive
  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }

  const str = String(value);

  // Clean up any dollar signs
  let cleaned = str.replace(/\$/g, '');

  // Parse numbers and format each match e.g. "130,000 - 160,000" -> "₹1,30,000 - ₹1,60,000"
  const formatted = cleaned.replace(/\b\d[\d,]*\b/g, (match) => {
    const num = parseInt(match.replace(/,/g, ''), 10);
    if (isNaN(num)) return match;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  });

  return formatted;
};
