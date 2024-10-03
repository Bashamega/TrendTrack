"use client";

import React, { useEffect, useState } from "react";

import Loader from "./Loader";
import Repo from "./Repo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";

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
  const [filteredData, setFilteredData] = useState<GithubData[] | [] | null>(
    null,
  );
  const [selectedOption, setSelectedOption] = useState<string>("daily");
  const [date, setDate] = useState<string | undefined>(
    new Date().toISOString().split("T")[0],
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showViewed, setShowViewed] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://trending.eddiehubcommunity.org/${selectedOption}${
        date ? `?date=${date}` : ""
      }`;
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
      }
    };

    fetchData();
  }, [date, selectedOption]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  return (
    <section className="h-full">
      <div className="flex flex-row items-center justify-between p-5">
        <div className="w-full flex space-x-2 items-center">
          <input
            type="date"
            className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />
          <input
            type="text"
            placeholder="Search Repositories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded"
          />
          <Select
            value={selectedOption}
            onValueChange={(value) => {
              setSelectedOption(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Daily" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily" defaultChecked={true}>
                Daily
              </SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded text-nowrap"
          onClick={() => setShowViewed(!showViewed)}
        >
          {showViewed ? "Hide Viewed" : "Show Viewed"}
        </button>
      </div>

      <div className="flex px-5 justify-end w-full">
        <Link href="/repos/viewed" className="link text-sm" shallow>
          Viewed Repos
        </Link>
      </div>

      {filteredData ? (
        filteredData.length > 0 ? (
          <div className="grid gap-5 px-5 pt-5">
            {filteredData.map((item, index) => (
              <Repo data={item} key={index} show={showViewed} />
            ))}
          </div>
        ) : (
          <div className="w-screen flex flex-col items-center justify-center">
            <h1 className=" text-2xl">No Data!</h1>
          </div>
        )
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Repos;
