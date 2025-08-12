const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("curanews");

const articles = [
  {
    title: "Bangladesh Signs New Trade Deal with Malaysia",
    publisher: "The Daily Bulletin",
    description:
      "A landmark trade agreement aimed at boosting economic ties and reducing tariffs between the two countries.",
    imageURL:
      "https://images.unsplash.com/photo-1520452112805-c6692c840af0?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["politics", "economy"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: false,
    status: "approved",
    viewCount: 145,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Artificial Intelligence Reshaping the Workforce",
    publisher: "Global Times",
    description:
      "AI is rapidly automating tasks across various industries, prompting concerns and opportunities alike.",
    imageURL:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["tech", "ai"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: true,
    status: "approved",
    viewCount: 390,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Political Tensions Rise in South Asia",
    publisher: "Global Times",
    description:
      "New diplomatic conflicts are emerging in the South Asian region, raising global concerns.",
    imageURL:
      "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["politics", "diplomacy"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: false,
    status: "declined",
    viewCount: 70,
    declinedReason: "Lacks credible sources.",
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Climate Change Threatens Bangladesh Coastline",
    publisher: "World Watch",
    description:
      "Rising sea levels are displacing communities and affecting agriculture in coastal regions.",
    imageURL:
      "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["environment", "climate"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: true,
    status: "approved",
    viewCount: 280,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Digital Education on the Rise in Bangladesh",
    publisher: "The Daily Bulletin",
    description:
      "Online learning platforms are becoming more popular post-pandemic, especially in rural areas.",
    imageURL:
      "https://images.unsplash.com/photo-1465311041514-598f1a16ada0?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["education", "tech"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: false,
    status: "pending",
    viewCount: 65,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Startup Ecosystem Flourishing in Dhaka",
    publisher: "The Seventh Hater",
    description:
      "Young entrepreneurs are taking the tech world by storm in Bangladesh’s capital.",
    imageURL:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["business", "tech"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: true,
    status: "approved",
    viewCount: 175,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Food Inflation Hits Record High",
    publisher: "The Economic Daily",
    description:
      "Prices of daily essentials are soaring, impacting millions of low-income families.",
    imageURL:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["economy", "food"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: false,
    status: "approved",
    viewCount: 210,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Breakthrough in Renewable Energy Tech",
    publisher: "Tech Innovators",
    description:
      "Solar energy panels can now work 30% more efficiently thanks to nanotech.",
    imageURL:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["tech", "energy"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: true,
    status: "approved",
    viewCount: 310,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Local Artists Bring History to Life",
    publisher: "Art Daily",
    description:
      "New mural projects around Dhaka depict historic events in bold colors.",
    imageURL:
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["art", "culture"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: false,
    status: "pending",
    viewCount: 44,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
  {
    title: "Healthcare Reforms Aim to Expand Rural Access",
    publisher: "Health Review",
    description:
      "The government is launching new mobile clinics to improve healthcare in remote areas.",
    imageURL:
      "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["health", "government"],
    authorName: "Ahnaf Mottaki",
    authorEmail: "ahnafmuttauque71@gmail.com",
    authorImg: "https://i.ibb.co/230LDYRB/me.jpg",
    isPremium: true,
    status: "approved",
    viewCount: 133,
    declinedReason: null,
    createdAt: Date.now(),
    authorUid: "cFl0oJARhoS3NoE2O4SpMJOtjVI3",
  },
];

const mappedArticles = articles.map((article) => {
  return {
    ...article,
    authorName: "Md Fuad Hasan Shishir",
  };
});

db.collection("articles").insertMany(mappedArticles);

module.exports = db;
