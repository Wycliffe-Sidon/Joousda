export const seedContentBlocks = [
  {
    key: "hero",
    title: "Fountain of Hope on Campus",
    subtitle: "JOOUSDA Seventh-day Adventist Church",
    body: "A Christ-centered campus church at Jaramogi Oginga Odinga University of Science and Technology, nurturing worship, discipleship, and mission as we prepare hearts for Christ's soon return.",
    imageUrl:
      "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1600&q=80",
    ctaLabel: "Discover Our Mission",
    ctaHref: "/about",
    secondaryCtaLabel: "Plan Your Visit",
    secondaryCtaHref: "/contact",
    metadata: JSON.stringify({
      eyebrow: "Campus Worship. Scripture. Service.",
    }),
  },
  {
    key: "mission",
    title:
      "To be a transformative, dynamic, disciple-making church raising Christ-centered servant leaders.",
    subtitle: "Our Mission",
    body: "JOOUSDA exists to prepare faithful, committed, sacrificial disciples of Christ who understand the times, stand firm in Scripture, and actively prepare others for the imminent return of Jesus.",
    imageUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
    metadata: JSON.stringify({
      objectives: [
        "Provide a vibrant space for Christian fellowship and mentoring on campus.",
        "Strengthen faith commitment to Seventh-day Adventist beliefs and mission.",
        "Equip students to navigate academic and social life with biblical conviction.",
        "Promote holistic growth through worship, service, and evangelism.",
        "Offer pastoral care, prayer support, and counseling for students and staff.",
      ],
    }),
  },
  {
    key: "chaplain-message",
    title: "A Message from Our Chaplaincy",
    subtitle: "Pastoral Care",
    body: "Welcome to JOOUSDA Church. Whether you are new to the JOOUST community, exploring faith, or searching for a spiritual family, you belong here. We are committed to biblical worship, warm fellowship, practical discipleship, and compassionate pastoral care for every student and friend who walks through our doors.",
    imageUrl:
      "https://images.unsplash.com/photo-1469571486292-b53601020f36?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "Meet Our Leadership",
    ctaHref: "/leadership",
  },
  {
    key: "beliefs-intro",
    title: "Anchored in Scripture, Centered on Christ",
    subtitle: "What We Believe",
    body: "Our fellowship stands within the worldwide Seventh-day Adventist Church. We treasure salvation by grace through faith in Jesus Christ, the authority of Scripture, the Sabbath, holistic Christian living, and the blessed hope of Christ's second coming.",
  },
];

export const seedServiceTimes = [
  ["Prophecy Class", "Saturday", "6:30 AM", "8:00 AM", "Early morning prophetic Bible study."],
  ["Sabbath School", "Saturday", "8:00 AM", "9:45 AM", "Interactive lesson discussion and class fellowship."],
  ["Singing Session", "Saturday", "9:50 AM", "10:30 AM", "Congregational praise and worship through music."],
  ["Prayer Session", "Saturday", "10:30 AM", "10:45 AM", "Corporate intercession before divine service."],
  ["Divine Worship", "Saturday", "10:50 AM", "12:30 PM", "Main worship experience with sermon, praise, and giving."],
  ["Bible Study", "Saturday", "3:00 PM", "4:00 PM", "Afternoon doctrinal and practical discipleship study."],
  ["AYM Programs", "Saturday", "4:00 PM", "5:00 PM", "Youth-led fellowship, mission planning, and spiritual growth."],
];

export const seedDepartments = [
  {
    name: "Personal Ministries Department",
    description:
      "Leads evangelism, visitation, literature distribution, and outreach so every member can take part in soul-winning ministry.",
    imageUrl:
      "https://images.unsplash.com/photo-1529419412599-7bb870e11810?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Adventist Chaplaincy Ministry",
    description:
      "Offers pastoral care, prayer, counseling, hospital visitation, and spiritual support for the JOOUST community.",
    imageUrl:
      "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Adventist Youth Ministry",
    description:
      "Forms students into strong disciples through worship, leadership development, service, and mission-centered fellowship.",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sabbath School Department",
    description:
      "Builds biblical depth and relational discipleship through structured lesson study, member care, and spiritual nurture.",
    imageUrl:
      "https://images.unsplash.com/photo-1475746812396-2b5b3a2be60d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Children Ministries Department",
    description:
      "Creates safe, joyful, Christ-centered learning spaces that help children know Jesus and love His Word.",
    imageUrl:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Special Needs Department",
    description:
      "Advances accessible and inclusive worship so every person can participate fully in the life of the church.",
    imageUrl:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
  },
];

export const seedMusicGroups = [
  {
    name: "Great Hope Choir",
    description:
      "A vibrant choir ministry leading campus worship with rich harmony, mission songs, and Sabbath praise.",
    memberCount: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Present Truth Ministers",
    description:
      "A student-led ensemble committed to worship, evangelistic concerts, and doctrinal music ministry.",
    memberCount: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Christ Ambassadors Ministry",
    description:
      "An energetic praise team and mission choir shaping worship and outreach across campus fellowships.",
    memberCount: 140,
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "White Doves Ensemble",
    description:
      "A graceful worship collective serving special Sabbaths, prayer weeks, and student revival gatherings.",
    memberCount: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
  },
];

export const seedLeadership = [
  ["Pastor David Ochieng", "Campus Chaplain", "Chaplaincy"],
  ["Mary Akinyi", "First Elder", "Elders"],
  ["Kevin Otieno", "Elder", "Elders"],
  ["Lydia Atieno", "Head Deaconess", "Deacons"],
  ["Brian Okoth", "Head Deacon", "Deacons"],
  ["Sharon Adhiambo", "Treasurer", "Treasury"],
  ["Mark Ouma", "Associate Treasurer", "Treasury"],
  ["Faith Naliaka", "AYM Coordinator", "Coordinators"],
  ["Caleb Omondi", "Sabbath School Coordinator", "Coordinators"],
  ["Mercy Awuor", "First Year Representative", "Year Representatives"],
  ["Dennis Onyango", "Second Year Representative", "Year Representatives"],
  ["Esther Akinyi", "Third Year Representative", "Year Representatives"],
  ["Collins Oduor", "Fourth Year Representative", "Year Representatives"],
];

export const seedSermons = [
  {
    title: "Faith That Endures Finals, Pressure, and Waiting",
    preacher: "Pastor David Ochieng",
    preachedAt: "2026-04-18",
    summary:
      "A campus-focused message on trusting God through academic pressure, unanswered questions, and delayed breakthroughs.",
    videoUrl: "https://www.youtube.com/watch?v=4O7GQ7K2C9M",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80",
    tags: "Faith,Students,Endurance",
    featured: true,
  },
  {
    title: "Created for Mission in the Lecture Hall",
    preacher: "Mary Akinyi",
    preachedAt: "2026-04-11",
    summary:
      "How Christian witness can flourish in classrooms, hostels, group discussions, and student leadership spaces.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    tags: "Mission,Campus,Discipleship",
    featured: false,
  },
];

export const seedResources = [
  {
    title: "Sabbath Bulletin Template",
    description: "A printable weekly bulletin template for worship leaders and church clerks.",
    fileUrl: "/uploads/resources/sample-bulletin.pdf",
    category: "Bulletins",
  },
  {
    title: "Student Bible Study Guide",
    description: "A practical Bible study outline for campus fellowship groups and one-on-one discipleship.",
    fileUrl: "/uploads/resources/student-bible-study-guide.pdf",
    category: "Bible Studies",
  },
];

export const seedEvents = [
  {
    title: "Holy Communion, Prayer and Fasting Sabbath",
    slug: "holy-communion-prayer-and-fasting-sabbath",
    summary:
      "A sacred Sabbath of prayer, revival, communion reflection, and congregational renewal.",
    body: "Join us for a prayer-filled Sabbath focused on repentance, restoration, and wholehearted surrender to Christ.",
    imageUrl:
      "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1200&q=80",
    location: "JOOUSDA Main Sanctuary",
    startDate: "2026-05-02",
    endDate: "2026-05-02",
    category: "This Week",
    featured: true,
    published: true,
  },
  {
    title: "Campus Evangelism Week",
    slug: "campus-evangelism-week",
    summary:
      "A week of open-air meetings, hostel Bible studies, and prayer walks across JOOUST.",
    body: "Students and friends will gather daily for preaching, music, testimony, and small-group discipleship across campus.",
    imageUrl:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80",
    location: "JOOUST Student Centre Grounds",
    startDate: "2026-05-17",
    endDate: "2026-05-23",
    category: "Evangelism",
    featured: true,
    published: true,
  },
  {
    title: "Leaders Prayer Breakfast",
    slug: "leaders-prayer-breakfast",
    summary:
      "A fellowship morning for departmental leaders, year representatives, and ministry teams.",
    body: "We will pray, plan, and align our ministries for the semester ahead in a spirit of unity and mission.",
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    location: "JOOUSDA Fellowship Hall",
    startDate: "2026-05-10",
    endDate: "2026-05-10",
    category: "Leadership",
    featured: false,
    published: true,
  },
];
