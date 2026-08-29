export interface WeddingEvent {
  id: string;
  name: string;
  date: string; // ISO format YYYY-MM-DD
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

export interface StoryMoment {
  id: string;
  caption: string;
  title: string;
  image: string;
  rotation: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

export interface AccommodationOption {
  name: string;
  category: string;
  distance: string;
  address: string;
  phone?: string;
  website?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const weddingConfig = {
  // Couple Information
  bride: {
    name: "Aparna Jayakumar",
    shortName: "Aparna",
  },
  groom: {
    name: "Rohit S Kumar",
    shortName: "Rohit",
  },
  initials: "A + R",

  // Countdown target date: Wedding Ceremony Muhurtham (Feb 11, 2027, 12:10 PM)
  countdownTargetDate: "2027-02-11T12:10:00",
  mainWeddingDate: "February 11, 2027",
  weddingLocationShort: "TRIVANDRUM, KERALA",
  rsvpDeadline: "January 26, 2027",

  // Editorial Copy
  tagline: "ARE GETTING MARRIED",
  heroSubtitle: "We invite you to join us in celebrating our wedding story",
  storyHeading: "Every chapter has led us here.",
  storyParagraph1: "From our very first quiet conversation to unforgettable journeys together, our story has been built on shared laughter, deep trust, and countless cherished moments.",
  storyParagraph2: "As we step into this beautiful new chapter, we are filled with gratitude to celebrate our union surrounded by the warmth of our beloved family and friends.",

  backgroundAudio: "/audio/background-music.mp3",

  events: [
    {
      id: "sangeeth",
      name: "Sangeeth Ceremony",
      date: "2027-02-09", // Monday (dynamic)
      time: "6:00 PM – 9:00 PM",
      location: "Bride's Home, Alalimadathil",
      addressDetails: "Alalimadathil House, Trivandrum, Kerala",
      dressCode: "Indian Ethnic Wear Only",
      image: "/images/event-sangeeth.jpg",
      iconName: "sparkles",
      description: "An evening filled with music, dance, laughter, and celebratory festive Indian ethnic attire.",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      date: "2027-02-11", // Wednesday (dynamic)
      time: "11:30 AM onwards",
      muhurthamTime: "12:10 PM – 12:34 PM",
      location: "Oryx Convention Centre",
      addressDetails: "Oryx Convention Centre, Trivandrum, Kerala",
      dressCode: "Traditional / Elegant Indian Attire",
      // TODO: add exact Google Maps link for Oryx Convention Centre
      googleMapsUrl: "https://maps.google.com/?q=Oryx+Convention+Centre+Trivandrum",
      image: "/images/event-wedding.jpg",
      iconName: "ring",
      description: "The sacred wedding ceremony and Muhurtham (12:10 PM – 12:34 PM) followed by traditional feast and blessings.",
    },
    {
      id: "reception",
      name: "Wedding Reception",
      date: "2027-02-12", // Thursday (dynamic)
      time: "6:00 PM onwards",
      location: "Al Saj Mini Comet Hall",
      addressDetails: "Kazhakootam, Trivandrum (Tvm), Kerala",
      dressCode: "Festive Formal / Ethnic Elegance",
      // TODO: add exact Google Maps link for Al Saj Mini Comet Hall
      googleMapsUrl: "https://maps.google.com/?q=Al+Saj+Mini+Comet+Hall+Kazhakootam+Trivandrum",
      image: "/images/event-reception.jpg",
      iconName: "glass",
      description: "A grand celebratory evening dinner to share joy and toast to our newly wedded journey.",
    },
  ] as WeddingEvent[],

  storyMoments: [
    {
      id: "1",
      caption: "the beginning",
      title: "Where It All Began",
      image: "/images/story-1.jpg",
      rotation: "-rotate-3",
    },
    {
      id: "2",
      caption: "adventures",
      title: "Journeys Together",
      image: "/images/story-2.jpg",
      rotation: "rotate-2",
    },
    {
      id: "3",
      caption: "memories",
      title: "Golden Sunsets",
      image: "/images/story-3.jpg",
      rotation: "-rotate-2",
    },
    {
      id: "4",
      caption: "forever",
      title: "A Lifetime Ahead",
      image: "/images/story-4.jpg",
      rotation: "rotate-3",
    },
  ] as StoryMoment[],

  galleryPhotos: [
    {
      id: "g1",
      src: "/images/gallery-1.jpg",
      alt: "Aparna & Rohit moments",
      title: "Embracing the Evening Sun",
      caption: "A quiet moment by the water as the dusk settles.",
    },
    {
      id: "g2",
      src: "/images/gallery-2.jpg",
      alt: "Wedding preparations",
      title: "Laughter & Promises",
      caption: "Spontaneous smiles during our pre-wedding shoot.",
    },
    {
      id: "g3",
      src: "/images/gallery-3.jpg",
      alt: "Romantic stroll",
      title: "Walking Hand in Hand",
      caption: "Exploring coastal paths together in Trivandrum.",
    },
    {
      id: "g4",
      src: "/images/gallery-4.jpg",
      alt: "Sunset embrace",
      title: "Under Golden Lights",
      caption: "Warm evening lights reflecting festive spirits.",
    },
    {
      id: "g5",
      src: "/images/gallery-5.jpg",
      alt: "Celebration joy",
      title: "Together Always",
      caption: "Looking forward to forever.",
    },
  ] as GalleryPhoto[],

  travel: {
    nearestAirport: {
      name: "Trivandrum International Airport (TRV)",
      distance: "Approx. 12 km from venue",
    },
    nearestRailway: {
      name: "Trivandrum Central (TVC) / Kazhakootam Station",
      distance: "Approx. 8 - 15 km",
    },
    accommodations: [
      {
        name: "The Grand Hyatt / Hilton Trivandrum",
        category: "Luxury Hotel",
        distance: "10 mins from venue",
        address: "MG Road, Trivandrum, Kerala",
      },
      {
        name: "Ginger Hotel Kazhakootam",
        category: "Boutique Stay",
        distance: "5 mins from Al Saj Hall",
        address: "Technopark Campus Road, Trivandrum",
      },
    ] as AccommodationOption[],
  },

  faqs: [
    {
      question: "What is the dress code for each event?",
      answer: "Sangeeth Ceremony requires Indian Ethnic Wear (kurta, lehenga, saree). Wedding & Reception welcome Traditional or Festive Formal Indian Attire.",
    },
    {
      question: "Is venue parking available?",
      answer: "Yes, ample valet parking and guest parking spaces are available at both Oryx Convention Centre and Al Saj Hall.",
    },
    {
      question: "By when should I submit my RSVP?",
      answer: "Kindly reply by January 26, 2027 so we can finalize seating and catering arrangements for you.",
    },
    {
      question: "Can I bring a plus one or my children?",
      answer: "Yes! Please indicate the total number of guests attending when completing the RSVP form.",
    },
  ] as FAQItem[],

  footerText: "We can't wait to celebrate with you.",
  contactEmail: "celebrate@aparna-rohit.com",
};
