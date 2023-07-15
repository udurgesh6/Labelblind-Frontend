import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

const Scrape: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [data, setData] = useState<string>('');
  const scrapeData = () => {
    axios
      .get(`https://labelblind-backend.vercel.app/scrape?url=${encodeURI(url)}`)
      .then(() => {
        alert('Data scraped successfully');
        setUrl('');
      })
      .catch(() => alert('Data will be available in sometime'));
  };

  useEffect(() => {
    axios
      .get('https://labelblind-backend.vercel.app/data')
      .then(resp => setData(resp.data))
      .catch(() => {});
  }, []);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    scrapeData();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label>Enter URL to scrape</label>
      <input
        value={url}
        onChange={handleUrlChange}
        className="border border-gray-900 w-[200px]"
      />
      <button type="submit" className="border border-gray-800 bg-900 w-[200px]">
        Scrape
      </button>
      <label>Data Till Now</label>
      {JSON.stringify(data)}
    </form>
  );
};

export default Scrape;
