const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const audioDir = path.join(__dirname, '..', 'public', 'audio');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

function createSvgPlaceholder(title, subtitle, bgGrad1, bgGrad2, textColor = "#F9F6F0", width = 1200, height = 800) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGrad1}" />
        <stop offset="100%" stop-color="${bgGrad2}" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.5"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)" />
    
    <!-- Subtle artistic grid/grain lines -->
    <circle cx="${width * 0.5}" cy="${height * 0.5}" r="${Math.min(width, height) * 0.35}" fill="none" stroke="${textColor}" stroke-opacity="0.08" stroke-width="1.5" />
    <circle cx="${width * 0.5}" cy="${height * 0.5}" r="${Math.min(width, height) * 0.25}" fill="none" stroke="${textColor}" stroke-opacity="0.05" stroke-width="1" />

    <!-- Overlay dark vignette -->
    <rect width="100%" height="100%" fill="#000" fill-opacity="0.25" />

    <g filter="url(#shadow)" text-anchor="middle">
      <text x="50%" y="45%" font-family="Georgia, 'Times New Roman', serif" font-size="${width * 0.045}px" font-weight="bold" fill="${textColor}" letter-spacing="2">
        ${title}
      </text>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="${width * 0.02}px" fill="${textColor}" fill-opacity="0.8" letter-spacing="4">
        ${subtitle.toUpperCase()}
      </text>
      <path d="M ${width*0.5 - 20} ${height*0.62} Q ${width*0.5} ${height*0.64} ${width*0.5 + 20} ${height*0.62}" stroke="${textColor}" stroke-opacity="0.6" stroke-width="1.5" fill="none"/>
    </g>
  </svg>`;
}

const placeholders = [
  { name: 'hero.jpg', title: 'Arohi &amp; Partner', subtitle: 'Modern Editorial Wedding', g1: '#1A1815', g2: '#3A332B' },
  { name: 'story-1.jpg', title: 'The Beginning', subtitle: 'Trivandrum Memories', g1: '#26221D', g2: '#4A4136' },
  { name: 'story-2.jpg', title: 'Adventures', subtitle: 'Journeys Together', g1: '#1E2328', g2: '#3D444D' },
  { name: 'story-3.jpg', title: 'Memories', subtitle: 'Golden Evenings', g1: '#2D2520', g2: '#52433B' },
  { name: 'story-4.jpg', title: 'Forever', subtitle: 'A Lifetime Ahead', g1: '#1D211F', g2: '#373F3B' },
  { name: 'event-sangeeth.jpg', title: 'Sangeeth Ceremony', subtitle: 'February 9, 2026 • Music &amp; Ethnic Wear', g1: '#36221A', g2: '#5E3A2D' },
  { name: 'event-wedding.jpg', title: 'Wedding Ceremony', subtitle: 'February 11, 2026 • Oryx Convention Centre', g1: '#261F2A', g2: '#463A4D' },
  { name: 'event-reception.jpg', title: 'Grand Reception', subtitle: 'February 12, 2026 • Al Saj Mini Comet Hall', g1: '#1B2624', g2: '#344744' },
  { name: 'gallery-1.jpg', title: 'Evening Embrace', subtitle: 'Arohi &amp; Partner', g1: '#201C19', g2: '#423B35' },
  { name: 'gallery-2.jpg', title: 'Laughter &amp; Promises', subtitle: 'Pre-Wedding Shoot', g1: '#2A2421', g2: '#4E433E' },
  { name: 'gallery-3.jpg', title: 'Coastal Walk', subtitle: 'Trivandrum Coast', g1: '#1A2126', g2: '#36434C' },
  { name: 'gallery-4.jpg', title: 'Golden Lights', subtitle: 'Celebration Joy', g1: '#2B231A', g2: '#544636' },
  { name: 'gallery-5.jpg', title: 'Together Always', subtitle: 'Looking to the Future', g1: '#222226', g2: '#43434A' },
  { name: 'footer.jpg', title: 'We Can\'t Wait To Celebrate', subtitle: 'February 2026 • Trivandrum', g1: '#141312', g2: '#2B2825' },
  { name: 'og-image.jpg', title: 'Arohi &amp; Partner Wedding Invitation', subtitle: 'Join us on February 11, 2026', g1: '#1A1815', g2: '#3A332B' },
];

placeholders.forEach(item => {
  const svgContent = createSvgPlaceholder(item.title, item.subtitle, item.g1, item.g2);
  fs.writeFileSync(path.join(imagesDir, item.name), svgContent);
});

const dummyMp3Header = Buffer.from([
  0xFF, 0xFB, 0x90, 0x64, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
]);
const mp3Path = path.join(audioDir, 'background-music.mp3');
fs.writeFileSync(mp3Path, Buffer.concat([dummyMp3Header, Buffer.alloc(10000, 0)]));

console.log('Successfully generated placeholder images and audio track!');
