export const siteConfig = {
  name: "JOOUSDA SDA Church",
  shortName: "JOOUSDA",
  description:
    "Jaramogi Oginga Odinga University of Science and Technology Seventh-day Adventist Church - a Christ-centered campus family for worship, discipleship, service, and mission.",
  url: "http://localhost:3000",
  phone: "+254 712 458 103",
  email: "hello@joousda.org",
  location: "JOOUST Main Campus, Bondo, Siaya County, Kenya",
};

export type NavigationChild = {
  href: string;
  label: string;
  description: string;
};

export type NavigationItem = {
  href: string;
  label: string;
  description?: string;
  children?: NavigationChild[];
};

export const navigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    description: "Know us better",
    children: [
      { href: "/about#mission", label: "Our Mission", description: "Our purpose and calling" },
      { href: "/about#history", label: "Our History", description: "How God has led this family" },
      { href: "/beliefs", label: "What We Believe", description: "Biblical truths we cherish" },
      { href: "/leadership", label: "Leadership", description: "Meet our spiritual guides" },
    ],
  },
  {
    href: "/about#departments",
    label: "Ministries",
    description: "Church ministries",
    children: [
      { href: "/#departments", label: "Departments", description: "Serving through specialized ministries" },
      { href: "/#music-choirs", label: "Music & Choirs", description: "Voices lifted in worship" },
      { href: "/contact", label: "Youth Ministry", description: "Growing disciples on campus" },
      { href: "/#worship-schedule", label: "Sabbath School", description: "Study, fellowship, and mission" },
    ],
  },
  {
    href: "/resources",
    label: "Media",
    description: "Spiritual resources",
    children: [
      { href: "/sermons", label: "Sermons", description: "Watch and listen to messages" },
      { href: "/contact", label: "Live Stream", description: "Join worship from anywhere" },
      { href: "/resources", label: "Resources", description: "Study materials and guides" },
      { href: "/resources#downloads", label: "Downloads", description: "Documents and media files" },
    ],
  },
  {
    href: "/contact",
    label: "Get Involved",
    description: "Take your next step",
    children: [
      { href: "/contact", label: "Visit Us", description: "Plan your Sabbath with us" },
      { href: "/contact#prayer-request", label: "Prayer Request", description: "Let us pray with you" },
      { href: "/#departments", label: "Join a Ministry", description: "Serve with your gifts" },
      { href: "/contact", label: "Volunteer", description: "Support outreach and worship" },
    ],
  },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export const leadershipGroups = [
  "Chaplaincy",
  "Elders",
  "Deacons",
  "Treasury",
  "Coordinators",
  "Year Representatives",
];
