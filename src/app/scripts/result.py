import json
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load metrics from JSON file
with open('metrics.json') as f:
    metrics = json.load(f)

categories = [
    "Artificial Intelligence",
    "Computational Modelling",
    "Cybersecurity Network",
    "IoT Infrastructure",
    "Visual Image Processing",
    "Web Development",
    "Mobile App Development",
    "Game Development",
]

# Confusion Matrix
confusion_matrix = np.array(metrics['confusionMatrix'])

plt.figure(figsize=(10, 7))
sns.heatmap(confusion_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=categories, yticklabels=categories)
plt.xlabel('Predicted')
plt.ylabel('True')
plt.title('Confusion Matrix')
plt.show()

# Precision, Recall, F1 Scores
precision = metrics['precision']
recall = metrics['recall']
f1 = metrics['f1']

x = np.arange(len(categories))

plt.figure(figsize=(15, 5))

plt.subplot(1, 3, 1)
plt.barh(x, precision, color='skyblue')
plt.yticks(x, categories)
plt.xlabel('Precision')
plt.title('Precision per Category')

plt.subplot(1, 3, 2)
plt.barh(x, recall, color='lightgreen')
plt.yticks(x, categories)
plt.xlabel('Recall')
plt.title('Recall per Category')

plt.subplot(1, 3, 3)
plt.barh(x, f1, color='salmon')
plt.yticks(x, categories)
plt.xlabel('F1 Score')
plt.title('F1 Score per Category')

plt.tight_layout()
plt.show()

# Accuracy
accuracy = metrics['accuracy']
print(f'Accuracy: {accuracy * 100:.2f}%')
