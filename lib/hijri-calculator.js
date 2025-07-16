const hijriMonths = [
  'Muharram', 'Safar', 'Rabi\'ul Awwal', 'Rabi\'ul Akhir',
  'Jumadil Awwal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
  'Ramadhan', 'Syawwal', 'Dzulqa\'dah', 'Dzulhijjah'
];

/**
 * A self-contained function to convert a Gregorian date to a Hijri date.
 * This uses the Kuwaiti algorithm and has no external dependencies.
 * @param {Date} gregorianDate The standard JavaScript Date object.
 * @param {number} adjustment The number of days to adjust the date by.
 * @returns {string} A formatted Hijri date string.
 */
export function getHijriDate(gregorianDate, adjustment = 0) {
  const adjustedDate = new Date(gregorianDate);
  adjustedDate.setDate(adjustedDate.getDate() + adjustment);

  const d = adjustedDate.getDate();
  const m = adjustedDate.getMonth() + 1;
  const y = adjustedDate.getFullYear();

  const jd = Math.floor((1461 * (y + 4800 + Math.floor((m - 14) / 12))) / 4) +
           Math.floor((367 * (m - 2 - 12 * (Math.floor((m - 14) / 12)))) / 12) -
           Math.floor((3 * (Math.floor((y + 4900 + Math.floor((m - 14) / 12)) / 100))) / 4) +
           d - 32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const i = l - 10631 * n + 354;
  const j = (Math.floor((10985 - i) / 5316)) * (Math.floor((50 * i) / 17719)) +
            (Math.floor(i / 5670)) * (Math.floor((43 * i) / 15238));
  const i2 = i - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
             (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;

  const month = Math.floor((24 * i2) / 709);
  const day = i2 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  
  const monthName = hijriMonths[month - 1] || '';

  return `${day} ${monthName} ${year}`;
}