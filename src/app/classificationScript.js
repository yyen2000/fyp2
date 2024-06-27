const natural = require('natural');
const stopword = require('stopword');

// Define your categories
const categories = [
    "Artificial Intelligence",
    "Computational Modelling",
    "Cybersecurity Network",
    "IoT Infrastructure",
    "Game Development",
    "Visual Image Processing",
    "System Development"
];

// Train a simple classifier
const classifier = new natural.BayesClassifier();

// Preprocess and add training data to the classifier
const trainingData = [
    // Artificial Intelligence
    { title: "Deep learning for AI", category: "Artificial Intelligence" },
    { title: "Dual-Stage Automated Classification for Chest X-ray Images Using Deep Learning", category: "Artificial Intelligence" },
    { title: "Using Data Mining Approach for Discovering Clinical Skills Competency of Nursing Students", category: "Artificial Intelligence" },
    { title: "Formulation of Goal Model Generation from User Stories using Natural Language Processing Techniques Framework", category: "Artificial Intelligence" },
    { title: "Skin Burn Depth Classification", category: "Artificial Intelligence" },
    { title: "Segmentation and Feature Extraction for Cervical Cancer Detection Using Machine Learning", category: "Artificial Intelligence" },
    { title: "Neural network and clustering", category: "Artificial Intelligence" },
    { title: "Deep learning and machine learning classification", category: "Artificial Intelligence" },
    { title: "A Pattern Discovery Model for Text Mining", category: "Artificial Intelligence" },
    { title: "AI in Healthcare: Diagnosis and Treatment", category: "Artificial Intelligence" },
    { title: "Autonomous Vehicles using AI", category: "Artificial Intelligence" },
    { title: "AI for Predictive Maintenance", category: "Artificial Intelligence" },
    { title: "AI-based Natural Language Processing", category: "Artificial Intelligence" },

    // Computational Modelling
    { title: "Mathematical Modelling", category: "Computational Modelling" },
    { title: "Identifying New COVID-19 Cluster As Means Of Preventive Measures", category: "Computational Modelling" },
    { title: "Decision Analytics for Disease Alerts", category: "Computational Modelling" },
    { title: "Modelling the spread of Leptospirosis disease by incorporating the behaviours of rodents and human", category: "Computational Modelling" },
    { title: "Climate Change Modelling", category: "Computational Modelling" },
    { title: "Economic Forecasting using Computational Models", category: "Computational Modelling" },
    { title: "Simulation of Traffic Flow Dynamics", category: "Computational Modelling" },
    { title: "Modelling and Simulation of Biological Systems", category: "Computational Modelling" },

    // Cybersecurity Network
    { title: "Secondary Security Layer for Anti-Phishing Technique using Image Processing Algorithm", category: "Cybersecurity Network" },
    { title: "Enhancing the phishing website detection model through uniform resources locator analysis", category: "Cybersecurity Network" },
    { title: "Enhancing Pharming Attack Detection Model", category: "Cybersecurity Network" },
    { title: "Enhancing Phishing Attack Detection Model Through Data Mining and Data Analysis for Better Detection Accuracy", category: "Cybersecurity Network" },
    { title: "A Dynamic and Automated Signature Detection Framework for Malware Analysis", category: "Cybersecurity Network" },
    { title: "Designing of Security Protocols for Mobile Multihop Relay Based WiMAX Networks", category: "Cybersecurity Network" },
    { title: "Scalable Rekeying Secrecy Model for D2D Group Communication in 5G Cellular Networks", category: "Cybersecurity Network" },
    { title: "Mitigating MAC Layer Attacks In 5G Cellular Networks", category: "Cybersecurity Network" },
    { title: "Quantum Cryptographic Scheme for Mobile Multihop D2D Using Deep Learning Approach", category: "Cybersecurity Network" },
    { title: "Blockchain-Based Multifactor Authentication for Future 6G Cellular Network", category: "Cybersecurity Network" },
    { title: "Blockchain Based Cybersecurity", category: "Cybersecurity Network" },
    { title: "Secure and Dynamic Multiple Junction Selection Routing Protocol in VANET", category: "Cybersecurity Network" },
    { title: "IoT based Energy Efficient Solar Panel Tracking and Monitoring System", category: "Cybersecurity Network" },
    { title: "Securing Internet-of-things (IoT) through Blockchain", category: "Cybersecurity Network" },
    { title: "Securing IoT Devices Through Multi-Factor Authentication Using BlockChain", category: "Cybersecurity Network" },
    { title: "Securing Deep Learning Model through DNA encoding scheme", category: "Cybersecurity Network" },
    { title: "Cybersecurity in Cloud Computing", category: "Cybersecurity Network" },
    { title: "Threat Detection using Machine Learning", category: "Cybersecurity Network" },
    { title: "Data Encryption Techniques", category: "Cybersecurity Network" },

    // IoT Infrastructure
    { title: "Smart home devices with IoT", category: "IoT Infrastructure" },
    { title: "A novel User Interface/Experience (UI/UX) for MySejahtera Usage Among Senior Users in Rural Sarawak (Samarahan, Simunjan and Betong) : Self-Monitoring Module", category: "IoT Infrastructure" },
    { title: "Data analytics dashboard of IoT-based water quality monitoring for sustainable smart farming", category: "IoT Infrastructure" },
    { title: "Designing an IoT-based Framework for JADAM Organic Farming Method", category: "IoT Infrastructure" },
    { title: "IoT based Energy Efficient Solar Panel Tracking and Monitoring System", category: "IoT Infrastructure" },
    { title: "Securing Internet-of-things (IoT) through Blockchain", category: "IoT Infrastructure" },
    { title: "IoT in Smart Cities", category: "IoT Infrastructure" },
    { title: "Industrial IoT Applications", category: "IoT Infrastructure" },
    { title: "IoT for Environmental Monitoring", category: "IoT Infrastructure" },
    { title: "IoT in Healthcare Systems", category: "IoT Infrastructure" },

    // Visual Image Processing
    { title: "Image recognition software", category: "Visual Image Processing" },
    { title: "A New Artificial Neural Network Model to Predict Left Ventricle Remodeling for Clinical Decision and Treatment Strategies", category: "Visual Image Processing" },
    { title: "Effects of Visual Granularity in Visual Mnemonics on the learning of reactions in organic chemistry", category: "Visual Image Processing" },
    { title: "Physiotherapy movement Recognition and Classification by Deep Learning Approach", category: "Visual Image Processing" },
    { title: "Clinically Applicable Machine Learning Model for Classification of COVID-19 Abnormalities using Chest Radiographs", category: "Visual Image Processing" },
    { title: "A novel User Interface/Experience (UI/UX) for MySejahtera Usage Among Senior Users in Rural Sarawak (Samarahan, Simunjan and Betong) : Self-Monitoring Module", category: "Visual Image Processing" },
    { title: "MyAsthma: From Axiomatization to a new Explainable-Artificial Intelligence-Based Risk Management Model with Progressive Web Application for care of Bronchial Asthma", category: "Visual Image Processing" },
    { title: "Decision Support Dashboard Architecture and Design for Smart Farming", category: "Visual Image Processing" },
    { title: "Rhizomorph Mycelium Recognition using Deep Learning during Mushroom Cultivation Process", category: "Visual Image Processing" },
    { title: "Comparative Analysis 3D Faces based on Expression Intensity information of Malaysian Ethnics data", category: "Visual Image Processing" },
    { title: "3D facial features tracking for 4D expression intensity estimation", category: "Visual Image Processing" },
    { title: "Evaluation of Existing 3D Facial Features Performance For 3D Facial Expression Using UPM-3DFE Database", category: "Visual Image Processing" },
    { title: "Design of A Deep Learning Model with Attention Mechanism for Biometric Re-identification of Green Sea Turtles in Long-term Tracking Scenario, Fundamental Research Grant Scheme", category: "Visual Image Processing" },
    { title: "Background Subtraction in Egocentric Videos Depicting Activities of Daily Living, Research Acculturation Collaborative Effort", category: "Visual Image Processing" },
    { title: "Passive Biometric Identification of Sea Turtles (Chelonia Mydas), Small Grant Scheme", category: "Visual Image Processing" },
    { title: "Image processing in autonomous vehicles", category: "Visual Image Processing" },
    { title: "Image analysis for medical diagnosis", category: "Visual Image Processing" },
    { title: "Face recognition systems", category: "Visual Image Processing" },


  // Web Development
    { title: "Software Development in Software Engineering course - Looking into Project Planning and Estimation Using Team Software Process (TSPi) and Scrum", category: "Web Development" },
    { title: "E-commerce website development", category: "Web Development" },
    { title: "Event-B formal development approach towards verification of IoT communication protocol", category: "Web Development" },
    {title: "An extended social force model for mobile crowd steering application simulation during fire evacuation", category: "Web Development" },
    { title: "Progressive Web Apps", category: "Web Development" },
    { title: "Web Performance Optimization", category: "Web Development" },
    { title: "The role of service learning on empowering women in digital economy", category: "Web Development" },
    { title: "A Design of Transcribing Tool for Kelabit Language", category: "Web Development" },
  
    //Another labelled data from other sources
    { title: "Development of an inventory management system for better management of products in a retail store", category: "Web Development" },
    { title: "Managing the attendance of remote employees with an attendance management system", category: "Web Development" },
    { title: "Development of library management system", category: "Web Development" },
    { title: "Development of ambulance booking system", category: "Web Development" },
    { title: "Fun learning application for children: benefits and drawbacks", category: "Web Development" },
    { title: "Exploring Online Pharmacies", category: "Web Development" },

    // Mobile App Development
    { title: "Developing Reading Skills Using Sight Word Reading Strategy using Interactive Mobile Game-based learning for Dyslexic Kids", category: "Mobile App Development" },
    { title: "Android-Based Learning Application", category: "Mobile App Development" },
    { title: "Easy Mathematics Mobile Game-based learning Applications for Deaf/Hard-of-Hearing (DHH) Children", category: "Mobile App Development" },
    { title: "Mobile App Development with Flutter", category: "Mobile App Development" },
    { title: "Cross-Platform Mobile Development", category: "Mobile App Development" },
    { title: "Mobile User Interface Design", category: "Mobile App Development" },

    // Game Development
    { title: "Character Design and Animation", category: "Game Development" },
    { title: "Modelling of Framework Focusing on Older People Interaction and Experience with Digital Games using Andragogical Perspectives", category: "Game Development" },
    { title: "Game Development with Unity", category: "Game Development" },
    { title: "Augmented Reality in Game Development", category: "Game Development" },
    { title: "Virtual Reality Game Design", category: "Game Development" },
    { title: "Gamification of Augmented Learning (GOAL): A Framework for Developing AR Board Game for STEM Education", category: "Game Development" },
    { title: "Multiplayer Game Development", category: "Game Development" },
    { title: "Creative and Participatory Transcultural Practices and Problem Solving through Game Design and Computational Thinking (CreativeCulture )", category: "Game Development" },
];


// Function to preprocess text
function preprocessText(text) {
    // Convert to lowercase
    text = text.toLowerCase();
    // Tokenize the text
    const tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(text);
    // Remove stop words
    tokens = stopword.removeStopwords(tokens);
    // Stem the tokens
    const stemmer = natural.PorterStemmer;
    tokens = tokens.map(token => stemmer.stem(token));
    return tokens.join(' ');
}

// Add preprocessed training data to the classifier
trainingData.forEach(item => {
    const preprocessedTitle = preprocessText(item.title);
    classifier.addDocument(preprocessedTitle, item.category);
});

// Train the classifier
classifier.train();

// Function to classify titles
async function classifyTitles(titles, userInterests) {
    const results = titles.map(title => {
        const preprocessedTitle = preprocessText(title);
        const category = classifier.classify(preprocessedTitle);
        return {
            title,
            category,
            matchesUserInterest: userInterests.includes(category)
        };
    });

    // Prioritize titles that match user interests
    results.sort((a, b) => b.matchesUserInterest - a.matchesUserInterest);

    return results;
}

// Function to evaluate accuracy
function evaluateAccuracy(testData) {
    let correct = 0;
    testData.forEach(item => {
        const preprocessedTitle = preprocessText(item.title);
        const predictedCategory = classifier.classify(preprocessedTitle);
        if (predictedCategory === item.category) {
            correct++;
        }
    });
    const accuracy = (correct / testData.length) * 100;
    console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
}

// Split data into training and testing sets
const splitIndex = Math.floor(0.85 * trainingData.length);
const trainData = trainingData.slice(0, splitIndex);
const testData = trainingData.slice(splitIndex);

// Train and evaluate the classifier
trainData.forEach(item => {
    const preprocessedTitle = preprocessText(item.title);
    classifier.addDocument(preprocessedTitle, item.category);
});
classifier.train();
evaluateAccuracy(testData);

module.exports = { classifyTitles, evaluateAccuracy };
