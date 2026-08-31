export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  muhurthamTime?: string;
  location: string;
  addressDetails?: string;
  dressCode: string;
  googleMapsUrl?: string;
  image: string;
  iconName: 'sparkles' | 'ring' | 'glass' | 'heart' | 'map-pin';
  description?: string;
}

export interface StoryMoment { id: string; caption: string; title: string; image: string; rotation: string; }
export interface GalleryPhoto { id: string; src: string; alt: string; title: string; caption?: string; }
export interface AccommodationOption { name: string; category: string; distance: string; address: string; phone?: string; website?: string; }
export interface FAQItem { question: string; answer: string; }

export const weddingConfig = {
  bride: { name: "Aparna Jayakumar", shortName: "Aparna" },
  groom: { name: "Rohit S Kumar", shortName: "Rohit" },
  initials: "A + R",
  countdownTargetDate: "2027-02-11T12:10:00",
  mainWeddingDate: "February 11, 2027",
  weddingLocationShort: "KAYAMKULAM, KERALA",
  rsvpDeadline: "January 26, 2027",
  tagline: "ARE GETTING MARRIED",
  heroSubtitle: "We invite you to join us in celebrating our wedding story",
  storyHeading: "Every chapter has led us here.",
  storyParagraph1: "What started with a quiet conversation grew into a beautiful friendship, filled with laughter, shared dreams and countless cherished moments. Somewhere along the way, friendship found its way to something even more beautiful - a love we now get to carry with us for a lifetime.",
  storyParagraph2: "As we begin our forever, we are grateful to have our beloved family and friends by our side to celebrate this beautiful chapter with us.",
  backgroundAudio: "/audio/background-music.mp3",
  events: [
    { id: "sangeeth", name: "Sangeeth Ceremony", date: "2027-02-09", time: "6:00 PM – 9:00 PM", location: "Bride's Home", addressDetails: "Alalimadathil, Puthuppally P O, Kayamkulam, Kerala", dressCode: "Indian Ethnic Wear Only", googleMapsUrl: "https://goo.gl/maps/WWByjNQwqjKxoWAs5?g_st=aw", image: "/images/event-sangeeth.jpg", iconName: "sparkles", description: "An evening filled with music, dance, laughter, and celebratory festive Indian ethnic attire." },
    { id: "wedding", name: "Wedding Ceremony", date: "2027-02-11", time: "11:30 AM onwards", muhurthamTime: "12:10 PM – 12:34 PM", location: "Oryx Convention Centre", addressDetails: "Oryx Convention Centre, Oachira, Kerala", googleMapsUrl: "https://maps.app.goo.gl/PsknWMtZVRTJen1v6", image: "/images/event-wedding.jpg", iconName: "ring", description: "The sacred wedding ceremony and Muhurtham (12:10 PM – 12:34 PM) followed by traditional feast and blessings." },
    { id: "reception", name: "Wedding Reception", date: "2027-02-12", time: "6:00 PM onwards", location: "Al Saj Mini Comet Hall", addressDetails: "Kazhakootam, Trivandrum (Tvm), Kerala", googleMapsUrl: "https://maps.app.goo.gl/4o78spCE4tUZkQZ48", image: "/images/event-reception.jpg", iconName: "glass", description: "A grand celebratory evening dinner to share joy and toast to our newly wedded journey." },
  ] as WeddingEvent[],
  storyMoments: [
    { id: "1", caption: "childhood", title: "Where It All Began", image: "/images/childhood.jpg", rotation: "-rotate-3" },
    { id: "2", caption: "together", title: "Our Favorite Moments", image: "/images/couple1.jpg", rotation: "rotate-2" },
    { id: "3", caption: "sweet moments", title: "The Little Things", image: "/images/cute.jpg", rotation: "-rotate-2" },
    { id: "4", caption: "forever", title: "Holding On Forever", image: "/images/forever.jpg", rotation: "rotate-3" },
  ] as StoryMoment[],
  galleryPhotos: [
    { id: "g1", src: "/images/couple1.jpg", alt: "Aparna and Rohit together", title: "Together", caption: "A moment we will always keep close." },
    { id: "g2", src: "/images/forever.jpg", alt: "Aparna and Rohit holding hands", title: "Holding On Forever", caption: "Two hands, one beautiful journey." },
    { id: "g3", src: "/images/cute.jpg", alt: "Aparna and Rohit sharing a sweet moment", title: "Sweet Moments", caption: "The little moments that mean everything." },
    { id: "g4", src: "/images/childhood.jpg", alt: "Childhood memory", title: "A Memory to Treasure", caption: "A glimpse into the story behind us." },
  ] as GalleryPhoto[],
  footerText: "With lots of love",
  contactEmail: "celebrate@aparna-rohit.com",
};
