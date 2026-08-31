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
  bride: {
    name: "Aparna Jayakumar",
    shortName: "Aparna",
  },
  groom: {
    name: "Rohit S Kumar",
    shortName: "Rohit",
  },
  initials: "A + R",

  countdownTargetDate: "2027-02-11T12:10:00",
  mainWeddingDate: "February 11, 2027",
  weddingLocationShort: "KAYAMKULAM, KERALA",
  rsvpDeadline: "January 26, 2027",

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
      date: "2027-02-09",
      time: "6:00 PM – 9:00 PM",
      location: "Bride's Home, Alalimadathil",
      addressDetails: "Alalimadathil House, Trivandrum, Kerala",
      dressCode: "Indian Ethnic Wear Only",
      googleMapsUrl: "https://goo.gl/maps/WWByjNQwqjKxoWAs5?g_st=aw",
      image: "/images/event-sangeeth.jpg",
      iconName: "sparkles",
      description: "An evening filled with music, dance, laughter, and celebratory festive Indian ethnic attire.",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      date: "2027-02-11",
      time: "11:30 AM onwards",
      muhurthamTime: "12:10 PM – 12:34 PM",
      location: "Oryx Convention Centre",
      addressDetails: "Oryx Convention Centre, Kayamkulam, Kerala",
      googleMapsUrl: "https://maps.app.goo.gl/PsknWMtZVRTJen1v6",
      image: "/images/event-wedding.jpg",
      iconName: "ring",
      description: "The sacred wedding ceremony and Muhurtham (12:10 PM – 12:34 PM) followed by traditional feast and blessings.",
    },
    {
      id: "reception",
      name: "Wedding Reception",
      date: "2027-02-12",
      time: "6:00 PM onwards",
      location: "Al Saj Mini Comet Hall",
      addressDetails: "Kazhakootam, Trivandrum (Tvm), Kerala",
      googleMapsUrl: "https://maps.app.goo.gl/4o78spCE4tUZkQZ48",
      image: "/images/event-reception.jpg",
      iconName: "glass",
      description: "A grand celebratory evening dinner to share joy and toast to our newly wedded journey.",
    },
  ] as WeddingEvent[],

  storyMoments: [
    {
      id: "1",
      caption: "childhood",
      title: "Where It All Began",
      image: "/images/childhood.jpg",
      rotation: "-rotate-3",
    },
    {
      id: "2",
      caption: "together",
      title: "Our Favorite Moments",
      image: "/images/couple1.jpg",
      rotation: "rotate-2",
    },
    {
      id: "3",
      caption: "sweet moments",
      title: "The Little Things",
      image: "/images/cute.jpg",
      rotation: "-rotate-2",
    },
    {
      id: "4",
      caption: "forever",
      title: "Holding On Forever",
      image: "/images/forever.jpg",
      rotation: "rotate-3",
    },
  ] as StoryMoment[],

  galleryPhotos: [
    {
      id: "g1",
      src: "/images/couple1.jpg",
      alt: "Aparna and Rohit together",
      title: "Together",
      caption: "A moment we will always keep close.",
    },
    {
      id: "g2",
      src: "/images/forever.jpg",
      alt: "Aparna and Rohit holding hands",
      title: "Holding On Forever",
      caption: "Two hands, one beautiful journey.",
    },
    {
      id: "g3",
      src: "/images/cute.jpg",
      alt: "Aparna and Rohit sharing a sweet moment",
      title: "Sweet Moments",
      caption: "The little moments that mean everything.",
    },
    {
      id: "g4",
      src: "/images/childhood.jpg",
      alt: "Childhood memory",
      title: "A Memory to Treasure",
      caption: "A glimpse into the story behind us.",
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
