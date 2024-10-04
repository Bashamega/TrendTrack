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
      <div className="w-full py-5 px-5 flex flex-col md:flex-row md:space-x-2 md:items-center mx-auto">
        <input
          type="date"
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded mb-4 md:mb-0"
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
          className="bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded mb-4 md:mb-0"
        />
        <Select
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px] mb-4 md:mb-0">
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

      {filteredData ? (
        filteredData.length > 0 ? (
          <div className="grid gap-5 px-5 pt-5">
            {filteredData.map((item, index) => (
              <Repo data={item} key={index} />
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
