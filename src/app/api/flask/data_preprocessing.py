import re
import os

def read_topics_from_file(file_path):
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"The file '{file_path}' was not found.")
    with open(file_path, 'r', encoding='utf-8') as file:
        topics = file.read().splitlines()
    return topics

def clean_text(text):
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def preprocess_topics(topics):
    cleaned_topics = [clean_text(topic) for topic in topics]
    return cleaned_topics

def save_cleaned_topics_to_file(topics, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        for topic in topics:
            file.write(topic + '\n')

if __name__ == "__main__":
    input_file_path = 'src/app/api/flask/topics.txt'  
    output_file_path = './cleaned_topics.txt' 

    # Read topics from file
    topics = read_topics_from_file(input_file_path)

    # Preprocess the topics
    cleaned_topics = preprocess_topics(topics)

    # Save the cleaned topics to a new file
    save_cleaned_topics_to_file(cleaned_topics, output_file_path)

    print(f"Cleaned topics saved to {output_file_path}")
