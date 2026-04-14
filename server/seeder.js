import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './db.js';
import User from './models/User.js';
import Job from './models/Job.js';
import Event from './models/Event.js';
import DonationCause from './models/DonationCause.js';
import Student from './models/Student.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear all existing data
    await User.deleteMany();
    await Job.deleteMany();
    await Event.deleteMany();
    await DonationCause.deleteMany();
    await Student.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('admin123', salt);

    // ──────────────────────────────────────────────
    // 1. ADMIN USER
    // ──────────────────────────────────────────────
    const adminUser = await User.create({
      name: 'Dr. Sanjay Kumar Panda',
      email: 'admin@gec.edu.in',
      password,
      role: 'Admin',
      isApproved: true,
      dept: 'Administration',
      year: 2000,
      bio: 'Principal & Administrator at Gandhi Engineering College',
      about: 'Dedicated to fostering an active alumni network for GEC Bhubaneswar.',
    });

    // ──────────────────────────────────────────────
    // 2. ALUMNI (Approved & Pending)
    // ──────────────────────────────────────────────
    await User.insertMany([
      // ── APPROVED ALUMNI ──
      { name: "Rahul Sharma", email: "rahul.sharma@gmail.com", password, role: 'Alumni', company: "TCS", dept: "Computer Science and Engineering", year: 2018, location: "Bengaluru", industry: "Technology", skills: ["React", "Node.js", "MongoDB", "AWS"], color: "navy", isApproved: true, roll: "1801292001", bio: "Full-Stack Developer at TCS Digital", about: "Passionate about building scalable web applications. GEC CSE 2018 alumnus.", story: "From a small-town student to a software engineer at India's largest IT company — GEC shaped my career." },
      { name: "Priya Dash", email: "priya.dash@gov.in", password, role: 'Alumni', company: "Govt of Odisha", dept: "Civil Engineering", year: 2015, location: "Bhubaneswar", industry: "Government", skills: ["AutoCAD", "STAAD Pro", "Project Management"], color: "maroon", isApproved: true, roll: "1501292002", bio: "Executive Engineer, Odisha PWD", about: "Working on major infrastructure projects in Odisha. Proud GECian.", story: "GEC gave me the practical knowledge I needed. Today I contribute to building Odisha's infrastructure." },
      { name: "Amit Kumar Patra", email: "amit.patra@infosys.com", password, role: 'Alumni', company: "Infosys", dept: "Computer Science and Engineering", year: 2017, location: "Pune", industry: "Technology", skills: ["Java", "Spring Boot", "Microservices", "Docker"], color: "teal", isApproved: true, roll: "1701292003", bio: "Senior Software Engineer at Infosys", about: "Backend specialist with 7+ years of experience in enterprise systems." },
      { name: "Sneha Mohanty", email: "sneha.mohanty@wipro.com", password, role: 'Alumni', company: "Wipro", dept: "Information Technology", year: 2019, location: "Hyderabad", industry: "Technology", skills: ["Python", "Django", "Machine Learning", "TensorFlow"], color: "sapphire", isApproved: true, roll: "1901292004", bio: "Data Engineer at Wipro", about: "Leveraging AI/ML to solve real-world business problems." },
      { name: "Rajesh Behera", email: "rajesh.behera@tata.com", password, role: 'Alumni', company: "Tata Steel", dept: "Mechanical Engineering", year: 2016, location: "Jamshedpur", industry: "Manufacturing", skills: ["SolidWorks", "CATIA", "Six Sigma", "Lean Manufacturing"], color: "indigo", isApproved: true, roll: "1601292005", bio: "Production Manager at Tata Steel", about: "10+ years in manufacturing and process optimization." },
      { name: "Swati Mishra", email: "swati.mishra@accenture.com", password, role: 'Alumni', company: "Accenture", dept: "Electronics and Communication", year: 2020, location: "Chennai", industry: "Consulting", skills: ["VLSI", "Embedded Systems", "IoT", "MATLAB"], color: "navy", isApproved: true, roll: "2001292006", bio: "Technology Consultant at Accenture", about: "Bridging hardware and software with IoT solutions." },
      { name: "Deepak Nayak", email: "deepak.nayak@amazon.com", password, role: 'Alumni', company: "Amazon", dept: "Computer Science and Engineering", year: 2016, location: "Bengaluru", industry: "Technology", skills: ["AWS", "System Design", "Go", "Kubernetes"], color: "slate", isApproved: true, roll: "1601292007", bio: "SDE-II at Amazon India", about: "Building distributed systems at scale. Ex-Flipkart.", story: "Campus placement at GEC was my stepping stone. Now at Amazon, I mentor junior GECians." },
      { name: "Lipika Sahoo", email: "lipika.sahoo@hcl.com", password, role: 'Alumni', company: "HCL Technologies", dept: "Information Technology", year: 2018, location: "Noida", industry: "Technology", skills: ["SAP ABAP", "HANA", "Fiori", "UI5"], color: "teal", isApproved: true, roll: "1801292008", bio: "SAP Consultant at HCL", about: "Enterprise SAP consultant specializing in S/4HANA migrations." },
      { name: "Bikash Jena", email: "bikash.jena@larsentoubro.com", password, role: 'Alumni', company: "L&T Construction", dept: "Civil Engineering", year: 2014, location: "Mumbai", industry: "Infrastructure", skills: ["Primavera", "Revit BIM", "Structural Analysis", "Site Management"], color: "maroon", isApproved: true, roll: "1401292009", bio: "Project Manager at L&T", about: "Leading mega civil infrastructure projects across India." },
      { name: "Smruti Ranjan Swain", email: "smruti.swain@microsoft.com", password, role: 'Alumni', company: "Microsoft", dept: "Computer Science and Engineering", year: 2015, location: "Hyderabad", industry: "Technology", skills: ["C#", ".NET", "Azure", "TypeScript", "React"], color: "sapphire", isApproved: true, roll: "1501292010", bio: "Senior SDE at Microsoft India", about: "Working on Azure cloud platform. Open source contributor.", story: "GEC's coding culture and supportive faculty launched my career in Big Tech." },
      { name: "Ritu Patel", email: "ritu.patel@bosch.com", password, role: 'Alumni', company: "Bosch", dept: "Electrical Engineering", year: 2017, location: "Bengaluru", industry: "Automotive", skills: ["Embedded C", "AUTOSAR", "CAN Protocol", "ARM Cortex"], color: "indigo", isApproved: true, roll: "1701292011", bio: "Embedded Systems Engineer at Bosch", about: "Designing next-gen automotive electronics." },
      { name: "Manish Kumar Das", email: "manish.das@cognizant.com", password, role: 'Alumni', company: "Cognizant", dept: "Information Technology", year: 2020, location: "Kolkata", industry: "Technology", skills: ["Angular", "RxJS", "NestJS", "PostgreSQL"], color: "navy", isApproved: true, roll: "2001292012", bio: "Frontend Lead at Cognizant", about: "Crafting responsive web experiences for enterprise clients." },
      { name: "Subhashree Pradhan", email: "subhashree.p@deloitte.com", password, role: 'Alumni', company: "Deloitte", dept: "Computer Science and Engineering", year: 2019, location: "Gurgaon", industry: "Consulting", skills: ["Salesforce", "Apex", "LWC", "Integration"], color: "teal", isApproved: true, roll: "1901292013", bio: "Salesforce Developer at Deloitte", about: "CRM platform specialist with multiple Salesforce certifications." },
      { name: "Prakash Mohanty", email: "prakash.m@ongc.co.in", password, role: 'Alumni', company: "ONGC", dept: "Mechanical Engineering", year: 2013, location: "Dehradun", industry: "Oil & Gas", skills: ["Piping Design", "ASME Standards", "Process Engineering"], color: "slate", isApproved: true, roll: "1301292014", bio: "Senior Engineer at ONGC", about: "12 years in upstream oil & gas sector." },
      { name: "Itishree Barik", email: "itishree.barik@ibm.com", password, role: 'Alumni', company: "IBM", dept: "Data Science", year: 2021, location: "Bengaluru", industry: "Technology", skills: ["Python", "NLP", "Deep Learning", "PyTorch", "Spark"], color: "sapphire", isApproved: true, roll: "2101292015", bio: "AI Research Engineer at IBM", about: "Working on NLP models for enterprise AI solutions." },
      { name: "Satyajit Lenka", email: "satyajit.lenka@capgemini.com", password, role: 'Alumni', company: "Capgemini", dept: "Electronics and Communication", year: 2018, location: "Mumbai", industry: "Technology", skills: ["5G", "Network Engineering", "FPGA", "Verilog"], color: "indigo", isApproved: true, roll: "1801292016", bio: "Network Architect at Capgemini", about: "Designing 5G infrastructure solutions." },
      { name: "Pallavi Singh", email: "pallavi.singh@oracle.com", password, role: 'Alumni', company: "Oracle", dept: "Computer Science and Engineering", year: 2017, location: "Bengaluru", industry: "Technology", skills: ["PL/SQL", "Oracle Cloud", "Java EE", "Kubernetes"], color: "maroon", isApproved: true, roll: "1701292017", bio: "Cloud Solutions Architect at Oracle", about: "Helping enterprises migrate to Oracle Cloud Infrastructure." },
      { name: "Debasis Mahanta", email: "debasis.m@nhpc.nic.in", password, role: 'Alumni', company: "NHPC Ltd", dept: "Electrical Engineering", year: 2014, location: "Faridabad", industry: "Power & Energy", skills: ["Power Systems", "SCADA", "Transmission Design", "Grid Management"], color: "navy", isApproved: true, roll: "1401292018", bio: "Deputy Manager at NHPC", about: "Working on hydroelectric power projects across India." },
      { name: "Ananya Nanda", email: "ananya.nanda@google.com", password, role: 'Alumni', company: "Google", dept: "Artificial Intelligence", year: 2022, location: "Bengaluru", industry: "Technology", skills: ["TensorFlow", "JAX", "Transformer Models", "MLOps", "Python"], color: "teal", isApproved: true, roll: "2201292019", bio: "ML Engineer at Google India", about: "Building production ML pipelines for Google Search.", story: "GEC's AI department gave me the foundation. Interning at startups during college helped me land Google." },
      { name: "Chandan Sahu", email: "chandan.sahu@jsw.in", password, role: 'Alumni', company: "JSW Steel", dept: "Mechanical Engineering", year: 2016, location: "Bellary", industry: "Steel & Mining", skills: ["Metallurgy", "Quality Control", "Process Automation", "PLC"], color: "slate", isApproved: true, roll: "1601292020", bio: "Quality Head at JSW Steel", about: "Ensuring world-class steel quality standards." },

      // ── PENDING ALUMNI (not yet approved) ──
      { name: "Suresh Patel", email: "suresh.patel@wipro.com", password, role: 'Alumni', company: "Wipro", dept: "Information Technology", year: 2021, location: "Hyderabad", industry: "Technology", skills: ["Java", "Spring Boot", "REST APIs"], color: "saffron", isApproved: false, roll: "2101292021" },
      { name: "Anita Mahapatra", email: "anita.m@lnt.com", password, role: 'Alumni', company: "L&T", dept: "Mechanical Engineering", year: 2019, location: "Pune", industry: "Manufacturing", skills: ["SolidWorks", "3D Printing", "FEA"], color: "teal", isApproved: false, roll: "1901292022" },
      { name: "Vikram Panda", email: "vikram.panda@mindtree.com", password, role: 'Alumni', company: "Mindtree", dept: "Computer Science and Engineering", year: 2022, location: "Bengaluru", industry: "Technology", skills: ["React Native", "Flutter", "Firebase"], color: "navy", isApproved: false, roll: "2201292023" },
      { name: "Monalisa Sethi", email: "monalisa.s@tech.com", password, role: 'Alumni', company: "Tech Mahindra", dept: "Electronics and Communication", year: 2020, location: "Pune", industry: "Telecom", skills: ["Embedded Linux", "RTOS", "IoT"], color: "sapphire", isApproved: false, roll: "2001292024" },
      { name: "Ashutosh Tripathy", email: "ashutosh.t@gmail.com", password, role: 'Alumni', company: "Freshworks", dept: "Data Science", year: 2023, location: "Chennai", industry: "SaaS", skills: ["Python", "Pandas", "Power BI", "SQL"], color: "indigo", isApproved: false, roll: "2301292025" },
    ]);

    // ──────────────────────────────────────────────
    // 3. JOBS
    // ──────────────────────────────────────────────
    await Job.insertMany([
      { title: "Frontend Developer", company: "Infosys", type: "Full-time", location: "Bhubaneswar", salary: "₹6-8 LPA", field: "Technology", desc: "We are looking for skilled React developers to join our Digital Experience team. Must have experience with modern JavaScript, state management, and responsive design. GEC alumni preferred.", postedBy: adminUser._id, status: "Active" },
      { title: "Civil Site Engineer", company: "L&T Construction", type: "Full-time", location: "Odisha", salary: "₹5-7 LPA", field: "Infrastructure", desc: "Site engineer role for ongoing highway project in Odisha. Must have knowledge of RCC structures, site supervision, and quality testing. AutoCAD proficiency required.", postedBy: adminUser._id, status: "Active" },
      { title: "Data Scientist", company: "TCS Research", type: "Full-time", location: "Pune", salary: "₹10-14 LPA", field: "Technology", desc: "Looking for data scientists with hands-on experience in Python, ML frameworks, and statistical analysis. PhD/M.Tech candidates preferred.", postedBy: adminUser._id, status: "Active" },
      { title: "Embedded Systems Intern", company: "Bosch India", type: "Internship", location: "Bengaluru", salary: "₹25K/month", field: "Electronics", desc: "6-month internship for ECE/EEE graduates. Work on automotive embedded systems using ARM Cortex-M controllers. Familiarity with C/C++ and RTOS is a plus.", postedBy: adminUser._id, status: "Active" },
      { title: "Junior Java Developer", company: "Cognizant", type: "Full-time", location: "Kolkata", salary: "₹4.5-6 LPA", field: "Technology", desc: "Freshers welcome! Join our Java development team working on banking and financial applications. Good understanding of OOP, SQL, and Spring framework required.", postedBy: adminUser._id, status: "Active" },
      { title: "Mechanical Design Engineer", company: "Tata Motors", type: "Full-time", location: "Jamshedpur", salary: "₹7-9 LPA", field: "Automotive", desc: "Design and develop automotive components using CATIA V5/SolidWorks. Experience with GD&T, tolerance analysis, and DFM/DFA principles preferred.", postedBy: adminUser._id, status: "Active" },
      { title: "Cloud Solutions Architect", company: "Amazon Web Services", type: "Full-time", location: "Hyderabad", salary: "₹22-30 LPA", field: "Technology", desc: "Help enterprise customers design and deploy solutions on AWS. Must have AWS certifications and 5+ years of cloud architecture experience.", postedBy: adminUser._id, status: "Active" },
      { title: "Campus Placement Coordinator", company: "GEC Bhubaneswar", type: "Part-time", location: "Bhubaneswar", salary: "₹15K/month", field: "Education", desc: "Help coordinate campus recruitment drives for current students. Alumni with industry HR connections preferred. Flexible hours.", postedBy: adminUser._id, status: "Active" },
      { title: "Power Systems Engineer", company: "NTPC Ltd", type: "Full-time", location: "Delhi NCR", salary: "₹8-12 LPA", field: "Power & Energy", desc: "Work on power generation and distribution systems. EEE graduates with knowledge of SCADA, protection systems, and grid management are ideal.", postedBy: adminUser._id, status: "Active" },
      { title: "UI/UX Design Intern", company: "Flipkart", type: "Internship", location: "Bengaluru (Remote)", salary: "₹30K/month", field: "Design", desc: "3-month remote internship for creative minds. Proficiency in Figma, user research, and design systems expected. Portfolio required.", postedBy: adminUser._id, status: "Active" },
    ]);

    // ──────────────────────────────────────────────
    // 4. EVENTS
    // ──────────────────────────────────────────────
    await Event.insertMany([
      { title: "Grand Campus Reunion 2026", type: "reunion", date: "2026-10-15", time: "10:00 AM - 5:00 PM", location: "GEC Main Auditorium, Bhubaneswar", desc: "Annual grand reunion for all batches! Join us for a day of nostalgia, networking, and celebration. Cultural performances, batch-wise meet-ups, and gala dinner included.", capacity: 500, tags: ["reunion", "networking", "annual"] },
      { title: "Tech Webinar: AI in 2026", type: "webinar", date: "2026-05-20", time: "06:00 PM - 08:00 PM", location: "Zoom (Online)", desc: "Expert panel discussion on the latest AI/ML trends, featuring GEC alumni working at Google, Microsoft, and IBM. Q&A session included.", capacity: 300, tags: ["webinar", "AI", "technology"] },
      { title: "GEC Career Fair 2026", type: "career_fair", date: "2026-07-10", time: "09:00 AM - 04:00 PM", location: "GEC Campus Ground", desc: "Annual career fair with 30+ companies. On-the-spot interviews, resume review booths, and industry mentorship sessions. Open to all GEC students and recent graduates.", capacity: 1000, tags: ["career", "placement", "hiring"] },
      { title: "Alumni Cricket Tournament", type: "sports", date: "2026-08-25", time: "07:00 AM - 06:00 PM", location: "GEC Sports Ground", desc: "Batch vs batch T20 cricket tournament! Register your team of 11 players. Trophies, medals, and refreshments provided. Families welcome.", capacity: 200, tags: ["sports", "cricket", "fun"] },
      { title: "Workshop: Startup Essentials", type: "workshop", date: "2026-06-05", time: "02:00 PM - 05:00 PM", location: "GEC Seminar Hall - Block A", desc: "Learn the fundamentals of starting your own venture. Topics: ideation, funding, MVP development, pitching to investors. Led by alumni entrepreneurs.", capacity: 100, tags: ["workshop", "startup", "entrepreneurship"] },
      { title: "Batch of 2016 — 10 Year Reunion", type: "reunion", date: "2026-12-20", time: "11:00 AM - 08:00 PM", location: "Hotel Mayfair, Bhubaneswar", desc: "Exclusive reunion for the Class of 2016. Dinner, DJ night, and a trip down memory lane. Partners and families are welcome!", capacity: 150, tags: ["reunion", "batch2016", "dinner"] },
      { title: "Guest Lecture: Space Technology", type: "lecture", date: "2026-09-12", time: "03:00 PM - 05:00 PM", location: "GEC Auditorium", desc: "Special guest lecture by ISRO scientist Dr. Ananya Nanda on India's space missions and career opportunities in aerospace engineering.", capacity: 400, tags: ["lecture", "ISRO", "space"] },
      { title: "Annual Alumni Meet & Award Night", type: "ceremony", date: "2026-11-30", time: "06:00 PM - 10:00 PM", location: "GEC Convention Centre", desc: "Recognizing outstanding alumni contributions. Categories: Distinguished Alumni, Young Achiever, Best Entrepreneur, and Social Impact Award. Nominations open.", capacity: 350, tags: ["awards", "ceremony", "annual"] },
    ]);

    // ──────────────────────────────────────────────
    // 5. DONATION CAUSES
    // ──────────────────────────────────────────────
    await DonationCause.insertMany([
      { id: "scholarship", name: "Merit Scholarship Fund", description: "Support bright but economically underprivileged students with scholarships covering tuition fees, hostel charges, and book expenses.", goal: 500000, raised: 287500, donors: 142, icon: "🎓" },
      { id: "lab", name: "Smart Classroom Project", description: "Digitize all GEC classrooms with projectors, smart boards, high-speed WiFi, and modern AV equipment.", goal: 800000, raised: 612000, donors: 98, icon: "💻" },
      { id: "library", name: "Central Library Upgrade", description: "Expand the library with 5,000 new books, digital journals, e-library terminals, and comfortable reading zones.", goal: 600000, raised: 195000, donors: 67, icon: "📚" },
      { id: "sports", name: "Sports Complex Renovation", description: "Upgrade the sports complex with a new synthetic track, basketball court, gym equipment, and flood lights for evening play.", goal: 1200000, raised: 340000, donors: 53, icon: "🏆" },
      { id: "innovation", name: "Innovation & Incubation Lab", description: "Set up a state-of-the-art innovation lab with 3D printers, IoT kits, robotics equipment, and co-working space for student startups.", goal: 1500000, raised: 875000, donors: 210, icon: "🚀" },
    ]);

    // ──────────────────────────────────────────────
    // 6. STUDENTS (for Roll Number Verification)
    // ──────────────────────────────────────────────
    await Student.insertMany([
      { rollNumber: "1801292001", first: "Rahul", last: "Sharma", email: "rahul.sharma@gec.edu.in", year: "2018", dept: "Computer Science and Engineering" },
      { rollNumber: "1501292002", first: "Priya", last: "Dash", email: "priya.dash@gec.edu.in", year: "2015", dept: "Civil Engineering" },
      { rollNumber: "1701292003", first: "Amit Kumar", last: "Patra", email: "amit.patra@gec.edu.in", year: "2017", dept: "Computer Science and Engineering" },
      { rollNumber: "1901292004", first: "Sneha", last: "Mohanty", email: "sneha.mohanty@gec.edu.in", year: "2019", dept: "Information Technology" },
      { rollNumber: "1601292005", first: "Rajesh", last: "Behera", email: "rajesh.behera@gec.edu.in", year: "2016", dept: "Mechanical Engineering" },
      { rollNumber: "2001292006", first: "Swati", last: "Mishra", email: "swati.mishra@gec.edu.in", year: "2020", dept: "Electronics and Communication" },
      { rollNumber: "1601292007", first: "Deepak", last: "Nayak", email: "deepak.nayak@gec.edu.in", year: "2016", dept: "Computer Science and Engineering" },
      { rollNumber: "1801292008", first: "Lipika", last: "Sahoo", email: "lipika.sahoo@gec.edu.in", year: "2018", dept: "Information Technology" },
      { rollNumber: "1401292009", first: "Bikash", last: "Jena", email: "bikash.jena@gec.edu.in", year: "2014", dept: "Civil Engineering" },
      { rollNumber: "1501292010", first: "Smruti Ranjan", last: "Swain", email: "smruti.swain@gec.edu.in", year: "2015", dept: "Computer Science and Engineering" },
      { rollNumber: "1701292011", first: "Ritu", last: "Patel", email: "ritu.patel@gec.edu.in", year: "2017", dept: "Electrical Engineering" },
      { rollNumber: "2001292012", first: "Manish Kumar", last: "Das", email: "manish.das@gec.edu.in", year: "2020", dept: "Information Technology" },
      { rollNumber: "1901292013", first: "Subhashree", last: "Pradhan", email: "subhashree.p@gec.edu.in", year: "2019", dept: "Computer Science and Engineering" },
      { rollNumber: "1301292014", first: "Prakash", last: "Mohanty", email: "prakash.m@gec.edu.in", year: "2013", dept: "Mechanical Engineering" },
      { rollNumber: "2101292015", first: "Itishree", last: "Barik", email: "itishree.barik@gec.edu.in", year: "2021", dept: "Data Science" },
      { rollNumber: "1801292016", first: "Satyajit", last: "Lenka", email: "satyajit.lenka@gec.edu.in", year: "2018", dept: "Electronics and Communication" },
      { rollNumber: "1701292017", first: "Pallavi", last: "Singh", email: "pallavi.singh@gec.edu.in", year: "2017", dept: "Computer Science and Engineering" },
      { rollNumber: "1401292018", first: "Debasis", last: "Mahanta", email: "debasis.m@gec.edu.in", year: "2014", dept: "Electrical Engineering" },
      { rollNumber: "2201292019", first: "Ananya", last: "Nanda", email: "ananya.nanda@gec.edu.in", year: "2022", dept: "Artificial Intelligence" },
      { rollNumber: "1601292020", first: "Chandan", last: "Sahu", email: "chandan.sahu@gec.edu.in", year: "2016", dept: "Mechanical Engineering" },
    ]);

    console.log('✅ Database Seeded Successfully!');
    console.log('────────────────────────────────────');
    console.log('   Admin  : admin@gec.edu.in / admin123');
    console.log('   Alumni : 20 approved + 5 pending');
    console.log('   Jobs   : 10');
    console.log('   Events : 8');
    console.log('   Causes : 5');
    console.log('   Students: 20');
    console.log('────────────────────────────────────');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedData();
