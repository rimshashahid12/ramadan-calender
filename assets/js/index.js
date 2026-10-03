const data = [
  { year: "2025", date: "Mar 1", highlight: true },
  { year: "2026", date: "Feb 18" },
  { year: "2027", date: "Feb 8" },
  { year: "2028", date: "Jan 28" },
  { year: "2029", date: "Jan 16" },
  { year: "2030", date: "Jan 5" },
  { year: "2030", date: "Dec 26", dotted: true },
  { year: "2031", date: "Dec 15", highlight: true },
  { year: "2032", date: "Dec 4" },
  { year: "2033", date: "Nov 23" },
  { year: "2034", date: "Nov 12" },
  { year: "2035", date: "Nov 1" },
  { year: "2036", date: "Oct 20" },
  { year: "2037", date: "Oct 10" },
  { year: "2038", date: "Sep 30" },
  { year: "2039", date: "Sep 19" },
  { year: "2040", date: "Sep 7" },
  { year: "2041", date: "Aug 28" },
  { year: "2042", date: "Aug 17" },
  { year: "2043", date: "Aug 6" },
  { year: "2044", date: "Jul 26" },
  { year: "2045", date: "Jul 15" },
  { year: "2046", date: "Jul 5" },
  { year: "2047", date: "Jun 24", highlight: true },
  { year: "2048", date: "Jun 12" },
  { year: "2049", date: "Jun 2" },
  { year: "2050", date: "May 22" },
  { year: "2051", date: "May 11" },
  { year: "2052", date: "Apr 30" },
  { year: "2053", date: "Apr 20" },
  { year: "2054", date: "Apr 9" },
  { year: "2055", date: "Mar 29" },
  { year: "2056", date: "Mar 17" }
];

const canvas = document.getElementById('ramadanWheel');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const outerRadius = 320;
const innerRadius = 200;

const totalSlices = data.length;
const anglePerSlice = (2 * Math.PI) / totalSlices;

const startAngleOffset = -Math.PI / 2;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Slices
  data.forEach((item, index) => {
    const startAngle = startAngleOffset + index * anglePerSlice;
    const endAngle = startAngle + anglePerSlice;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();

    if (item.highlight) {
      ctx.fillStyle = '#114a43';
    } else {
      ctx.fillStyle = '#a1b8b1'; 
    }
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.save();
    ctx.translate(centerX, centerY);
    const midAngle = startAngle + anglePerSlice / 2;
    ctx.rotate(midAngle);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(item.date, outerRadius - 15, 5);
    ctx.restore();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(midAngle);

    const yearRadius = outerRadius + 25;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#111111';

    if (item.highlight) {
      ctx.font = 'bold 22px sans-serif';
    } else {
      ctx.font = 'bold 16px sans-serif';
    }

    ctx.fillText(item.year, yearRadius, 6);
    ctx.restore();
  });

  drawKaaba();

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Start of', centerX, centerY - 80);
  ctx.fillText('Ramadan 2025*', centerX, centerY - 60);

  ctx.beginPath();
  ctx.moveTo(centerX - 10, centerY - 50);
  ctx.lineTo(centerX + 10, centerY - 50);
  ctx.lineTo(centerX, centerY - 38);
  ctx.closePath();
  ctx.fillStyle = '#114a43';
  ctx.fill();

  drawDashedLine(centerX + 260, centerY - 140, centerX + 320, centerY - 140); // 2030
  drawDashedLine(centerX - 270, centerY + 180, centerX - 330, centerY + 180); // 2047
  drawDashedLine(centerX + 270, centerY + 180, centerX + 330, centerY + 180); // 2036
}

function drawKaaba() {
  const width = 120;
  const height = 110;
  const x = centerX - width / 2;
  const y = centerY - height / 2 + 30;

  ctx.fillStyle = '#1f1a24';
  ctx.fillRect(x, y, width, height);

  ctx.fillStyle = '#e5b138';
  ctx.fillRect(x, y + 20, width, 10);

  ctx.fillRect(x + 15, y + 45, 25, 45);
}

function drawDashedLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]); 
}

drawWheel();
