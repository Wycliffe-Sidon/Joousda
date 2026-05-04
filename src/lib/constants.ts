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
    href: "/#mission",
    label: "About Us",
    description: "Know us better",
    children: [
      { href: "/#mission", label: "Our Mission", description: "Our purpose and calling" },
      { href: "/#leadership", label: "Leadership", description: "Meet our spiritual guides" },
      { href: "/#beliefs", label: "What We Believe", description: "Biblical truths we cherish" },
      { href: "/#history", label: "History", description: "How God has led this family" },
    ],
  },
  {
    href: "/#departments",
    label: "Ministries",
    description: "Church ministries",
    children: [
      { href: "/#departments", label: "Departments", description: "Serving through specialized ministries" },
      { href: "/#music-choirs", label: "Music & Choirs", description: "Voices lifted in worship" },
      { href: "/#year-on-duty", label: "Youth Ministry", description: "Student discipleship and campus mission" },
      { href: "/#worship-schedule", label: "Sabbath School", description: "Study, fellowship, and mission" },
    ],
  },
  {
    href: "/#live-stream",
    label: "Worship",
    description: "Join us in worship",
    children: [
      { href: "/#worship-schedule", label: "Service Times", description: "Plan your Sabbath with us" },
      { href: "/#live-stream", label: "Live Stream", description: "Connect with worship online" },
      { href: "/#sermons", label: "Sermons", description: "Recent messages and teachings" },
    ],
  },
  {
    href: "/#resources",
    label: "Media",
    description: "Spiritual resources",
    children: [
      { href: "/#sermons", label: "Sermons", description: "Watch and listen to messages" },
      { href: "/#resources", label: "Resources", description: "Study materials and guides" },
      { href: "/#gallery", label: "Gallery", description: "Moments in worship and ministry" },
      { href: "/#resources", label: "Downloads", description: "PDFs, guides, and ministry files" },
    ],
  },
  {
    href: "/#next-steps",
    label: "Get Involved",
    description: "Take your next step",
    children: [
      { href: "/#next-steps", label: "Visit Us", description: "Plan your Sabbath with us" },
      { href: "/#chaplain-message", label: "Prayer Request", description: "Let us pray with you" },
      { href: "/#departments", label: "Join a Ministry", description: "Serve with your gifts" },
    ],
  },
  { href: "/#next-steps", label: "Contact" },
];

export const leadershipGroups = [
  "Chaplaincy",
  "Elders",
  "Deacons",
  "Treasury",
  "Coordinators",
  "Year Representatives",
];
