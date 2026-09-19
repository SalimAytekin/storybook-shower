/**
 * ─────────────────────────────────────────────────────────────
 *  INVITATION CONFIGURATION
 *  Edit this single file to personalise the invitation for
 *  each customer: names, date, venue, texts, photos, links.
 * ─────────────────────────────────────────────────────────────
 */
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";

export const invitationData = {
  parents: "Emma & James",
  babyName: "Baby Miller",

  /** ISO date-time used for the live countdown (local time of the event). */
  eventDateTime: "2026-10-17T14:00:00",
  date: {
    weekday: "Saturday",
    full: "October 17, 2026",
  },
  time: "2:00 PM",

  venue: {
    name: "The Garden House",
    address: "123 Willow Lane",
    city: "Austin, Texas",
    mapUrl: "https://maps.google.com/?q=123+Willow+Lane+Austin+Texas",
  },

  messages: {
    heroKicker: "You're invited to celebrate",
    heroTitle: "A Little Adventure Is About to Begin",
    openButton: "Open Invitation",
    storyLineOne: "Once upon a tiny heartbeat,\na beautiful new adventure began…",
    storyLineTwo:
      "Join us beneath the leaves and wildflowers as we celebrate the little one who will soon make our world a little more magical.",
    photoTitle: "Our Little Story",
    photoSubtitle: "From two hearts to one tiny miracle.",
    traditionsTitle: "Little Traditions",
    traditionsSubtitle: "Join in the story.",
    registryTitle: "A Little Something",
    registryText:
      "Your presence is the sweetest gift of all.\n\nFor those who would like to help us prepare for our little adventure, we've gathered a few things we love.",
    rsvpTitle: "Will You Join Our Story?",
    rsvpText: "We would love to celebrate this little chapter with you.",
    closingQuote: "The smallest feet\nmake the biggest footprints\nin our hearts.",
    closingLine: "We can't wait to celebrate with you.",
  },

  traditions: [
    {
      title: "Wishes for Baby",
      text: "Leave a little wish for the adventure ahead.",
      icon: "star" as const,
    },
    {
      title: "Baby Predictions",
      text: "Boy or girl? Arrival date? Hair? Eyes? Make your prediction.",
      icon: "moon" as const,
    },
    {
      title: "Advice for Parents",
      text: "Share a little wisdom, a funny story, or something worth remembering.",
      icon: "feather" as const,
    },
  ],

  registryLinks: [
    { label: "View Registry", url: "https://example.com/registry", primary: true },
    { label: "Amazon Registry", url: "https://www.amazon.com/baby-reg", primary: false },
  ],

  photos: [
    { src: photo1, alt: "Emma and James walking through the forest", caption: "Where it all began", width: 912, height: 1200 },
    { src: photo2, alt: "Hands forming a heart over the baby bump", caption: "A tiny heartbeat", width: 1008, height: 1008 },
    { src: photo3, alt: "Tiny knitted baby booties beside eucalyptus", caption: "Little things, big love", width: 1200, height: 912 },
  ],
};

export type InvitationData = typeof invitationData;
