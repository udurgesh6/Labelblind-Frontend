import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TweetOptions from './TweetOptions';
import Profile from './assets/images/profile.svg';

interface Tweet {
  _id: string;
  author: string;
  publishedDate: string;
  text: string;
  imageUrl?: string;
  url: string;
  liked: boolean;
}

const Timeline: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>(null || []);
  const [filteredTweets, setFilteredTweets] = useState<Array<Tweet> | null>(
    null
  );
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async (): Promise<void> => {
    try {
      const response = await axios.get<Tweet[]>(
        'https://www.mocky.io/v2/5d1ef97d310000552febe99d'
      );
      let tweetsData = response.data;
      tweetsData = tweetsData.map((current_tweet: Tweet) => ({
        ...current_tweet,
        liked: localStorage.getItem('likedTweets')
          ? JSON.parse(localStorage.getItem('likedTweets')!)?.includes(
              current_tweet._id
            )
            ? true
            : false
          : false,
      }));
      setTweets(tweetsData);
      setFilteredTweets(tweetsData);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const handleDateRangeChange = (): void => {
    const filtered = tweets.filter((tweet: Tweet) => {
      const tweetDate = new Date(tweet.publishedDate);
      return (
        (startDate === '' || tweetDate >= new Date(startDate)) &&
        (endDate === '' || tweetDate <= new Date(endDate))
      );
    });
    setFilteredTweets(filtered);
  };

  const handleLike = (tweetId: string): void => {
    const likedTweets = localStorage.getItem('likedTweets');
    let allTweets = [...tweets];
    let indexOfCurrentTweet = allTweets.findIndex(
      (current_tweet: Tweet) => current_tweet._id === tweetId
    );
    allTweets[indexOfCurrentTweet].liked =
      !allTweets[indexOfCurrentTweet].liked;
    setTweets(allTweets);
    if (likedTweets) {
      if (JSON.parse(likedTweets)?.includes(tweetId)) {
        let removedTweet = JSON.parse(likedTweets)?.filter(
          (current_tweet_id: string) => current_tweet_id !== tweetId
        );
        localStorage.setItem('likedTweets', JSON.stringify(removedTweet));
      } else {
        let newLikedTweets = [...JSON.parse(likedTweets), tweetId] as string[];
        localStorage.setItem('likedTweets', JSON.stringify(newLikedTweets));
      }
    } else {
      let likedTweets = [tweetId];
      localStorage.setItem('likedTweets', JSON.stringify(likedTweets));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <div className="flex flex-row items-center justify-between">
          <div className="mb-4 flex flex-col">
            <label className="mr-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className="mr-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleDateRangeChange}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Apply Filter
          </button>

          {filteredTweets !== null &&
            filteredTweets.length !== tweets.length && (
              <button onClick={() => setFilteredTweets(tweets)} title="Reset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
        </div>
        {filteredTweets === null && (
          <p className="text-center text-lg">Loading...</p>
        )}
        {filteredTweets !== null && filteredTweets.length < 1 && (
          <p className="text-center text-lg">
            No tweets found for the selected date range!
          </p>
        )}
        {filteredTweets !== null &&
          filteredTweets.map((tweet: Tweet) => (
            <div
              key={tweet._id}
              className="bg-white hover:bg-gray-100 rounded shadow p-4 border-b border-gray-200 cursor-pointer"
            >
              <a
                className="flex flex-row"
                href={tweet.url}
                target="_blank"
                rel="noreferrer"
              >
                <img src={Profile} alt="profile" className="h-12 w-12" />

                <div className="flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="text-md font-bold mr-1">{tweet.author}</p>
                    <p className="text-gray-600 mr-1">@{tweet.author} </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-1 h-1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <p className="text-gray-600 ml-1">
                      {new Date(tweet.publishedDate).toLocaleString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <p className="mb-4">{tweet.text}</p>
                  {tweet.imageUrl && (
                    <div className="flex mb-4">
                      <img
                        className="w-full rounded-md"
                        src={tweet.imageUrl}
                        alt={`Tweet ${tweet.author}`}
                      />
                    </div>
                  )}
                  <TweetOptions
                    tweet_id={tweet._id}
                    liked={tweet.liked}
                    handleLike={handleLike}
                  />
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline;
