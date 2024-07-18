const natural = require('natural');
const stopword = require('stopword');
const fs = require('fs');
const tf = require('@tensorflow/tfjs');

// Define your categories
const categories = [
    "Artificial Intelligence",
    "Computational Modelling",
    "Cybersecurity Network",
    "IoT Infrastructure",
    "Visual Image Processing",
    "Web Development",
    "Mobile App Development",
    "Game Development",
];

// Train a simple classifier
let classifier = new natural.BayesClassifier();

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
    { title: "Economic Forecasting using Computational Models", category: "Computational Modelling" },
    // Cybersecurity Network
    { title: "Secondary Security Layer for Anti-Phishing Technique using Image Processing Algorithm", category: "Cybersecurity Network" },
    { title: "Enhancing the phishing website detection model through uniform resources locator analysis", category: "Cybersecurity Network" },
    { title: "Enhancing Pharming Attack Detection Model", category: "Cybersecurity Network" },
    { title: "Enhancing Phishing Attack Detection Model Through Data Mining and Data Analysis for Better Detection Accuracy", category: "Cybersecurity Network" },
    { title: "A Dynamic and Automated Signature Detection Framework for Malware Analysis", category: "Cybersecurity Network" },
    { title: "Scalable Rekeying Secrecy Model for D2D Group Communication in 5G Cellular Networks", category: "Cybersecurity Network" },
    { title: "Mitigating MAC Layer Attacks In 5G Cellular Networks", category: "Cybersecurity Network" },
    { title: "Quantum Cryptographic Scheme for Mobile Multihop D2D Using Deep Learning Approach", category: "Cybersecurity Network" },
    //
    { title: "Detecting or mitigating compromising indicators", category: "Cybersecurity Network" },
    { title: "Research on relevant Geopolitical Cyber security", category: "Cybersecurity Network" },
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
    // Visual Image Processing
    { title: "A New Artificial Neural Network Model to Predict Left Ventricle Remodeling for Clinical Decision and Treatment Strategies", category: "Visual Image Processing" },
    { title: "Effects of Visual Granularity in Visual Mnemonics on the learning of reactions in organic chemistry", category: "Visual Image Processing" },
    { title: "Physiotherapy movement Recognition and Classification by Deep Learning Approach", category: "Visual Image Processing" },
    { title: "Clinically Applicable Machine Learning Model for Classification of COVID-19 Abnormalities using Chest Radiographs", category: "Visual Image Processing" },
    // { title: "MyAsthma: From Axiomatization to a new Explainable-Artificial Intelligence-Based Risk Management Model with Progressive Web Application for care of Bronchial Asthma", category: "Visual Image Processing" },
    { title: "Rhizomorph Mycelium Recognition using Deep Learning during Mushroom Cultivation Process", category: "Visual Image Processing" },
    { title: "Passive Biometric Identification of Sea Turtles (Chelonia Mydas), Small Grant Scheme", category: "Visual Image Processing" },
    { title: "Image processing in autonomous vehicles", category: "Visual Image Processing" },
    { title: "Image analysis for medical diagnosis", category: "Visual Image Processing" },
    // Web Development
    { title: "Software Development in Software Engineering course - Looking into Project Planning and Estimation Using Team Software Process (TSPi) and Scrum", category: "Web Development" },
    { title: "E-commerce website development", category: "Web Development" },
    { title: "Event-B formal development approach towards verification of IoT communication protocol", category: "Web Development" },
    //Another labelled data from other sources (https://codeshoppy.com/web-development-project-ideas.html)
    { title: "Development of an inventory management system for better management of products in a retail store", category: "Web Development" },
    { title: "Managing the attendance of remote employees with an attendance management system", category: "Web Development" },
    { title: "Development of library management system", category: "Web Development" },
    { title: "Development of ambulance booking system", category: "Web Development" },
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
    text = text.toLowerCase();
    const tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(text);
    tokens = stopword.removeStopwords(tokens);
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

// Function to calculate precision, recall, and F1 score using TensorFlow.js
function calculateMetrics(trueLabels, predictedLabels) {
    const trueTensors = tf.tensor1d(trueLabels.map(label => categories.indexOf(label)), 'int32');
    const predTensors = tf.tensor1d(predictedLabels.map(label => categories.indexOf(label)), 'int32');

    const confusionMatrix = tf.math.confusionMatrix(trueTensors, predTensors, categories.length).arraySync();

    let precision = new Array(categories.length).fill(0);
    let recall = new Array(categories.length).fill(0);
    let f1 = new Array(categories.length).fill(0);

    for (let i = 0; i < categories.length; i++) {
        let tp = confusionMatrix[i][i];
        let fp = 0;
        let fn = 0;
        for (let j = 0; j < categories.length; j++) {
            if (i !== j) {
                fp += confusionMatrix[j][i];
                fn += confusionMatrix[i][j];
            }
        }

        precision[i] = tp / (tp + fp);
        recall[i] = tp / (tp + fn);
        f1[i] = 2 * (precision[i] * recall[i]) / (precision[i] + recall[i]);

        console.log(`${categories[i]} - Precision: ${(precision[i] * 100).toFixed(2)}%, Recall: ${(recall[i] * 100).toFixed(2)}%, F1 Score: ${(f1[i] * 100).toFixed(2)}%`);
    }

    trueTensors.dispose();
    predTensors.dispose();
}

// Function to evaluate metrics
function evaluateMetrics(testData) {
    const trueLabels = [];
    const predictedLabels = [];

    testData.forEach(item => {
        const preprocessedTitle = preprocessText(item.title);
        const predictedCategory = classifier.classify(preprocessedTitle);
        trueLabels.push(item.category);
        predictedLabels.push(predictedCategory);
    });

    calculateMetrics(trueLabels, predictedLabels);
}

// Function to save the model
function saveModel(filePath) {
    classifier.save(filePath, (err) => {
        if (err) {
            console.error('Error saving the model:', err);
        } else {
            console.log('Model saved successfully.');
        }
    });
}

// Function to load the model
function loadModel(filePath, callback) {
    natural.BayesClassifier.load(filePath, null, (err, loadedClassifier) => {
        if (err) {
            console.error('Error loading the model:', err);
            if (callback) callback(err);
        } else {
            console.log('Model loaded successfully.');
            classifier = loadedClassifier;
            if (callback) callback(null);
        }
    });
}

// Split data into training and testing sets
const splitIndex = Math.floor(0.8 * trainingData.length);
const trainData = trainingData.slice(0, splitIndex);
const testData = trainingData.slice(splitIndex);

// Train and evaluate the classifier
trainData.forEach(item => {
    const preprocessedTitle = preprocessText(item.title);
    classifier.addDocument(preprocessedTitle, item.category);
});
classifier.train();
evaluateAccuracy(testData);
evaluateMetrics(testData);

// Save the model
const modelFilePath = './classifierModel.json';
saveModel(modelFilePath);

// Export functions
module.exports = { classifyTitles, evaluateAccuracy, evaluateMetrics, saveModel, loadModel };
