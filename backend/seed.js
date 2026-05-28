const mongoose = require('mongoose');
// Check karein ki aapke models folder mein Tournament.js hai ya nahi
const Tournament = require('./models/Tournament'); 

// Apne MongoDB connection string ko check karein (Local hai toh ye chalega)
mongoose.connect('mongodb://127.0.0.1:27017/supersEsports')
  .then(() => console.log("DB Connected for Seeding"))
  .catch(err => console.log("DB Error:", err));

const seedData = async () => {
  try {
    // Purana koi empty data ho toh use saaf karne ke liye
    await Tournament.deleteMany({}); 

    const sampleTournament = new Tournament({
      title: "FREE FIRE SQUAD BATTLE",
      totalSlots: 12,
      joinedUsers: [] // Abhi slots khali hain
    });
     const sampleTournament = new Tournament({
      title: "CLASH SQUAD",
      totalSlots: 12,
      joinedUsers: [] // Abhi slots khali hain
    });
 const sampleTournament = new Tournament({
      title: "FREE FIRE SQUAD BATTLE",
      totalSlots: 12,
      joinedUsers: [] // Abhi slots khali hain
    });
     const sampleTournament = new Tournament({
      title: "FREE FIRE SQUAD BATTLE",
      totalSlots: 12,
      joinedUsers: [] // Abhi slots khali hain
    });
    await sampleTournament.save();
    console.log("Success: Pehla Tournament Database mein dal gaya hai!");
    process.exit(); // Script ko band karne ke liye
  } catch (error) {
    console.log("Seed Error:", error);
  }
};

seedData();