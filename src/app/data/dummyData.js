export const DUMMY_USER = {
  _id: "USR_001_DEMO",
  isEmailVerified: true,
  isPhoneVerified: false,

  profile: {
    nickname: "DemoUser",
    age: 26,
    gender: "male",
    height: 178,
    jobTitle: "Frontend Developer",
    company: "OpenAI Labs",
    about: "Coffee lover ☕ | Traveler ✈️ | Building cool stuff",
    totalCompletion: 82,
  },

  account: {
    status: "active",
    email: "demo@example.com",
    phone: "+91 9876543210",
    authMethod: "email",
    isPremium: true,
    createdAt: "2024-05-12T10:00:00Z",
    banDetails: { isBanned: false },
  },

  attributes: {
    zodiac: "Gemini",
    education: "Masters",
    religion: "Hindu",
    smoking: "No",
    drinking: "Occasional",
    dietary: "Veg",
    workout: "Regular",
    sleeping: "Night Owl",
    pets: "Dog",

    socialMedia: "instagram",

    interests: ["Travel", "Coding", "Gym"],
    music: ["EDM", "Lo-fi"],
    movies: ["Sci-fi", "Action"],
    books: ["Atomic Habits", "Deep Work"],
  },

  discovery: {
    relationshipGoal: "Long Term",
    distanceRange: 50,
    ageRange: { min: 22, max: 32 },
    showMeGender: ["female"],
    globalVisibility: "Visible",
  },

  location: {
    city: "Indore",
    country: "India",
    full_address: "Vijay Nagar, Indore, MP",
    coordinates: [75.8577, 22.7196],
  },

  photos: [
    { url: "https://picsum.photos/400?1" },
    { url: "https://picsum.photos/400?2" },
    { url: "https://picsum.photos/400?3" },
    { url: "https://picsum.photos/400?4" },
  ],

  verification: {
    status: "pending",
    selfieUrl: "https://picsum.photos/300?selfie",
    docUrl: "https://picsum.photos/300?idcard",
    rejectionReason: null,
  },
};
