const natural = require('natural');
const fs = require('fs');
const tf = require('@tensorflow/tfjs');
const stopword = require('stopword');

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
    }

    const accuracy = trueLabels.reduce((acc, trueLabel, idx) => acc + (trueLabel === predictedLabels[idx] ? 1 : 0), 0) / trueLabels.length;

    const metrics = {
        accuracy: accuracy,
        precision: precision,
        recall: recall,
        f1: f1,
        confusionMatrix: confusionMatrix
    };

    // Save metrics to a JSON file
    fs.writeFileSync('metrics.json', JSON.stringify(metrics, null, 2));

    console.log(`Metrics saved to metrics.json`);

    trueTensors.dispose();
    predTensors.dispose();
}

// Function to evaluate model
function evaluateModel(classifier) {
    // Load your test data from a file or another source
    const testData = [
        { title: "Natural language processing and BERT", category: "Artificial Intelligence" },
        { title: "AI-generated music", category: "Artificial Intelligence" },
        { title: "Application of AI to clinical diagnosis and disease classification", category: "Artificial Intelligence" },
        { title: "Homework tracker ", category: "Artificial Intelligence" },
        { title: "AI-generated movie script ", category: "Artificial Intelligence" },

        // { title: "Classroom Demonstration(s) of Physical System ModelingBayesian Agent-Based Population Studies: Transforming Simulation Models of Human Migration", category: "Computational Modeling" },
        // { title: "It takes all sorts: the mathematics of people’s behaviour in financial markets", category: "Computational Modeling" },
        // { title: "Centre for Doctoral Training in Next Generation Computational Modelling", category: "Computational Modeling" },
        // { title: "Coupled multi-scale simulation of high Reynolds number airfoil flows", category: "Computational Modeling" },
        // { title: "Precision study of critical slowing down in lattice simulations of the CP^{N-1} model", category: "Computational Modeling" },
        
        { title: "Anomaly detection, intrusion and its prevention", category: "Cybersecurity Network" },
        { title: "Detecting or mitigating compromising indicators", category: "Cybersecurity Network" },
        { title: "Research on relevant Geopolitical Cyber security", category: "Cybersecurity Network" },
        { title: "Cybercrime monetization and orchestration and automating security", category: "Cybersecurity Network" },
        { title: "Cyber security data analytics", category: "Cybersecurity Network" },

        { title: "Natural language processing and BERTTypical kiryana shop management system", category: "Web Development" },
        { title: "Rental management system", category: "Web Development" },
        { title: "School Management System", category: "Web Development" },
        { title: "Online grocery store", category: "Web Development" },
        { title: "ELECTRONIC WASTE MANAGEMENT SYSTEM", category: "Web Development" },

        { title: "Remote Health Monitoring System for COVID-19 Patients – IoT in Healthcare", category: "IoT Infrastructure" },
        { title: "Measure Heart Rate and SpO2", category: "IoT Infrastructure" },
        { title: "Safety Monitoring System for Manual Wheelchairs", category: "IoT Infrastructure" },
        { title: "Smart Door Lock System – IoT Home Automation", category: "IoT Infrastructure" },
        { title: "Smoke Detecting IoT Device Using Gas Sensor – IoT Home Safety", category: "IoT Infrastructure" },

        { title: "Monitoring Social Distancing", category: "Visual Image Processing" },
        { title: "Mask Detection", category: "Visual Image Processing" },
        { title: "Lane and Curve Detection ", category: "Visual Image Processing" },
        { title: "Drowsiness Detection for Drivers", category: "Visual Image Processing" },
        { title: "License Plate Recognition", category: "Visual Image Processing" },

        { title: "Android Sales CRM App", category: "Mobile App Development" },
        { title: "Retail Store Inventory & POS Checkout App", category: "Mobile App Development" },
        { title: "Android Tour Recommendation App", category: "Mobile App Development" },
        { title: "Android Customer Relationship Management App", category: "Mobile App Development" },
        { title: "Mobile Quiz Through WiFi Project", category: "Mobile App Development" },

        { title: "Balling and board games-Pinball", category: "Game Development" },
        { title: "Jungle-themed games-Jurassic World.", category: "Game Development" },
        { title: "NFT Ether Legends", category: "Game Development" },
        { title: "Mystery story game-Harry Potter Hogwarts Mystery", category: "Game Development" },
        { title: "Car racing game-Asphalt 9: Legends", category: "Game Development" },
    ];

    // Initialize arrays to store true and predicted labels
    const trueLabels = [];
    const predictedLabels = [];

    // Evaluate each test data point
    testData.forEach(item => {
        const preprocessedTitle = preprocessText(item.title);
        const predictedCategory = classifier.classify(preprocessedTitle);

        trueLabels.push(item.category);
        predictedLabels.push(predictedCategory);

        console.log(`Title: ${item.title} | Expected: ${item.category} | Predicted: ${predictedCategory}`);
    });

    // Calculate and display evaluation metrics
    calculateMetrics(trueLabels, predictedLabels);
}

// Load the classifier model
const modelFilePath = './classifierModel.json'; // Adjust the path if necessary

natural.BayesClassifier.load(modelFilePath, null, (err, classifier) => {
    if (err) {
        console.error('Error loading the model:', err);
        return;
    }

    // Evaluate the model
    evaluateModel(classifier);
});
