'use client'

import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [seedText, setSeedText] = useState('');
  const [minWords, setMinWords] = useState(8);
  const [maxWords, setMaxWords] = useState(16);
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5328/api/generate', {
        seed_text: seedText,
        min_words: minWords,
        max_words: maxWords,
      });
      if (response.data.generated_title === "No title generated.") {
        setError('No title generated. Try with a different seed text.');
      } else {
        setGeneratedTitle(response.data.generated_title);
      }
    } catch (error) {
      console.error('Error generating title:', error);
      setError('Failed to generate title. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5328/api/recommendation', {
        title: generatedTitle,
      });
      alert('Title saved successfully');
    } catch (error) {
      console.error('Error saving title:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Project Title Generator</h1>
      <div className={styles.inputGroup}>
        <label>Seed Text:</label>
        <input
          type="text"
          value={seedText}
          onChange={(e) => setSeedText(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Min Words:</label>
        <input
          type="number"
          value={minWords}
          onChange={(e) => setMinWords(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Max Words:</label>
        <input
          type="number"
          value={maxWords}
          onChange={(e) => setMaxWords(e.target.value)}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Title'}
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.generatedTitle}>
        {generatedTitle && (
          <>
            <h2>Generated Title:</h2>
            <p className='whitespace-pre-wrap'>{generatedTitle}</p>
            <button onClick={handleSave}>Save</button>
          </>
        )}
      </div>
    </div>
  );
}
