import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  'Pack of': string;
  Brand: string;
  'Model Name': string;
  Quantity: string;
  Type: string;
  'Container Type': string;
  'Maximum Shelf Life': string;
  'Food Preference': string;
  'Storage Instructions': string;
  'Nutrient Content': string;
  Organic: string;
  Ingredients: string;
  'Net Quantity': string;
  Price: string;
}

const Scrape: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [data, setData] = useState<Product[]>([]);

  const scrapeData = () => {
    axios
      .get(`https://labelblind-backend.vercel.app/scrape?url=${encodeURI(url)}`)
      .then(() => {
        alert('Data scraped successfully');
        setUrl('');
      })
      .catch(() => alert('Data will be available soon'));
  };

  useEffect(() => {
    axios
      .get<Product[]>('https://labelblind-backend.vercel.app/data')
      .then(resp => {
        setData(resp.data);
        console.log(resp.data);
      })
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
        required
      />
      <button type="submit" className="border border-gray-800 bg-900 w-[200px]">
        Scrape
      </button>
      <label>Data Till Now</label>
      <table className="overflow-x-scroll">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pack of</th>
            <th>Brand</th>
            <th>Model name</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Container Type</th>
            <th>Maximum Shelf life</th>
            <th>Food Preference</th>
            <th>Storage Instructions</th>
            <th>Nutrient Content</th>
            <th>Organic</th>
            <th>Ingredients</th>
            <th>Net Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product['Pack of']}</td>
              <td>{product.Brand}</td>
              <td>{product['Model Name']}</td>
              <td>{product.Quantity}</td>
              <td>{product.Type}</td>
              <td>{product['Container Type']}</td>
              <td>{product['Maximum Shelf Life']}</td>
              <td>{product['Food Preference']}</td>
              <td>{product['Storage Instructions']}</td>
              <td>{product['Nutrient Content']}</td>
              <td>{product.Organic}</td>
              <td>{product.Ingredients}</td>
              <td>{product['Net Quantity']}</td>
              <td>{product.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default Scrape;
