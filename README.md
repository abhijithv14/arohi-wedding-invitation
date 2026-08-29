# Arohi & Partner — Modern Wedding Invitation Website

A luxury, modern, editorial wedding invitation website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

Designed with a high-end magazine aesthetic featuring cream/ivory tones, dynamic live countdowns, staggered entrance animations, custom lightbox photo gallery, interactive RSVP API, background music player, and single-file content editability.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the live invitation website.

### 3. Production Build & Test
```bash
npm run build
npm run start
```

---

## 📝 How to Edit Wedding Information

All wedding details (couple names, wedding dates, countdown target, event details, story narrative, Google Maps links, FAQs, dress codes, and social links) are centrally stored in a single configuration file:

```
/config/wedding.ts
```

### Changing Couple Names
Edit `bride` and `groom` objects in `/config/wedding.ts`:
```typescript
bride: {
  name: "Arohi",
  shortName: "Arohi",
},
groom: {
  name: "Partner Name", // Update with confirmed groom name
  shortName: "Partner",
},
initials: "A + P",
```

### Updating Event Dates & Locations
Update the `events` array in `/config/wedding.ts`:
- **Weekdays are automatically computed dynamically** from the `date` string (`YYYY-MM-DD`). You never need to hardcode weekdays!
- **Google Maps links**: Update `googleMapsUrl` for each event.

### Updating Countdown Target Date
Set the `countdownTargetDate` field in `/config/wedding.ts`:
```typescript
countdownTargetDate: "2026-02-09T18:00:00",
```

---

## 🖼️ How to Add or Replace Photographs

Place your high-resolution photographs inside `/public/images/`:

- `hero.jpg`: Hero background couple photograph
- `story-1.jpg` to `story-4.jpg`: Our Story polaroid photo collage
- `event-sangeeth.jpg`, `event-wedding.jpg`, `event-reception.jpg`: Event cards
- `gallery-1.jpg` to `gallery-5.jpg`: Cinematic photo gallery & lightbox
- `footer.jpg`: Closing banner photograph
- `og-image.jpg`: Open Graph preview thumbnail for social media sharing

---

## 🎵 How to Change Background Music

Replace the audio track at:
```
/public/audio/background-music.mp3
```
with your chosen MP3 track (ideally under 3MB for optimal mobile loading).

> **Browser Autoplay Compliance**: Modern browsers block audio autoplay with sound. The music player stays paused initially and can be toggled by guests using the floating music button at the bottom-right of the page.

---

## ✉️ RSVP Functionality

RSVP submissions hit the Next.js API route `/api/rsvp`.
- Submissions are validated server-side.
- Submissions are logged safely to server logs and written to `data/rsvps.json`.
- **Database Integration**: To connect Supabase, MongoDB, or Firebase, simply update `app/api/rsvp/route.ts` with your database client.

---

## ⚡ Vercel Deployment

This project is 100% Vercel-ready.

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel will automatically detect Next.js and build with zero extra setup.

---

## 🔒 Environment Variables

Copy `.env.example` to `.env.local` for custom deployment configurations:

```env
# Optional environment variables
NEXT_PUBLIC_SITE_URL=https://arohi-wedding.vercel.app
```
