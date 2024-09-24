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
  const [data, setData] = useState<GithubData[] | [] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<GithubData[] | [] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

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
        setFilteredData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const url = `https://trending.eddiehubcommunity.org/daily?date=${date}`;
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const res = await response.json();
          setData(res);
          setFilteredData(res);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (data) {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.language.toLowerCase().includes(query),
      );
      setFilteredData(filtered);
    }
  };

  return (
    <section className="h-full">
      <div className="w-full py-5 pl-5 flex space-x-4">
        <input
          type="date"
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded"
          onChange={handleChangeDate}
        />
        <input
          type="text"
          placeholder="Search for Repo..."
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <Loader />
      ) : filteredData && filteredData.length > 0 ? (
        <div className="grid gap-5 px-5 pt-5">
          {filteredData.map((item, index) => (
            <Repo data={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="w-screen flex flex-col items-center justify-center">
          <h1 className=" text-2xl">No Data!</h1>
        </div>
      )}
    </section>
  );
};

export default Repos;
