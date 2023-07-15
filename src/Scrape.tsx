import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const Scrape: React.FC = () => {
  const [url, setUrl] = useState<string>('');

  const scrapeData = () => {
    axios
      .get(`https://labelblind-backend.vercel.app/scrape?url=${url}`)
      .then(() => {
        alert('Data scraped successfully');
        setUrl('');
      })
      .catch(() => alert('Some error occurred while scraping the data'));
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    scrapeData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter URL to scrape</label>
      <input value={url} onChange={handleUrlChange} />
      <button type="submit">Scrape</button>
    </form>
  );
};

export default Scrape;
