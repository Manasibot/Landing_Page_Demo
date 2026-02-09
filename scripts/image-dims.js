const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../components/assets/Universe of Leadership');
const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

function getJpegDimensions(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return { width: 0, height: 0 };
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      return { width, height };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return { width: 0, height: 0 };
}

const results = [];
files.forEach((f) => {
  const full = path.join(dir, f);
  const buf = fs.readFileSync(full);
  const { width, height } = getJpegDimensions(buf);
  results.push({ file: f, width, height });
});

results.sort((a, b) => b.height - a.height);
console.log('All images (sorted by height, tallest first):\n');
results.forEach((r) => {
  console.log(r.file, '->', r.width + 'x' + r.height, '| height =', r.height);
});
const tallest = results[0];
console.log('\nTallest:', tallest.file, '| width =', tallest.width, '| height =', tallest.height);
