"use client";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Repo from "./Repo";

export interface GithubData {
  id: number;
  type: string;
  name: string;
  message: string;
  trendingStars: number;
  language: string;
  stars: number;
  forks: number;
  createdAt: string;
}
const Repos: React.FC = () => {
  const [data, setData] = useState<GithubData[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://trending.eddiehubcommunity.org/daily";
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const filter = formData.get('filter') as string;
    const date = formData.get('date') as string;

    const filteredData = data.filter(item => {
      const nameIncludesFilter = item.name.toLowerCase().includes(filter.toLowerCase());
      const createdAtMatchesDate = item.createdAt.split('T')[0] === date;
      return nameIncludesFilter && createdAtMatchesDate;
    });

    setData(filteredData);
  };

  return (
    <section className="h-full">
      <div className="w-full py-5 pl-5">
        <input type="date" className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded" />
      </div>

      {data.length > 0 ? (
        <div className="grid gap-5 px-5 pt-5">
          {data.map((item, index) => (
            <Repo data={item} key={index} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Repos;
