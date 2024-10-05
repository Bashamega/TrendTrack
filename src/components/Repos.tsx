"use client";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Repo from "./Repo";
import Image from "next/image";
import filterImage from "@/assets/filterImage.svg";
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
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [minStarsFilter, setMinStarsFilter] = useState<number | undefined>(
    undefined,
  );
  const [selectedOption, setSelectedOption] = useState<string>("daily");
  const [date, setDate] = useState<string | undefined>(
    new Date().toISOString().split("T")[0],
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState<boolean>(false);

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
      const filtered = data.filter((repo) => {
        const matchesName = repo.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesLanguage = languageFilter
          ? repo.language.toLowerCase().includes(languageFilter.toLowerCase())
          : true;
        const matchesStars = minStarsFilter
          ? repo.stars >= minStarsFilter
          : true;

        return matchesName && matchesLanguage && matchesStars;
      });
      setFilteredData(filtered);
    }
  }, [searchQuery, data, languageFilter, minStarsFilter]);

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
        <button
          className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded flex items-center justify-center"
          onClick={() => setIsFilterBoxVisible(!isFilterBoxVisible)}
        >
          <Image
            src={filterImage} // Use next/image for importing the SVG
            alt="Filter Icon"
            width={25} // Set appropriate width
            height={25} // Set appropriate height
          />
        </button>

        {/* Floating Filter Box */}
        {isFilterBoxVisible && (
          <div className="absolute top-32 left-96 w-64 bg-gray-700 p-4 rounded shadow-lg z-10">
            <h3 className="text-white font-semibold mb-2">Filter Options</h3>
            <div className="mb-4">
              <label className="text-gray-200">Language:</label>
              <input
                type="text"
                placeholder="Enter language"
                className="w-full bg-gray-600 text-gray-200 py-2 px-3 rounded mt-1"
                onChange={(e) => setLanguageFilter(e.target.value)} // Update language filter
              />
            </div>
            <div>
              <label className="text-gray-200">Stars:</label>
              <input
                type="number"
                placeholder="Minimum stars"
                className="w-full bg-gray-600 text-gray-200 py-2 px-3 rounded mt-1"
                onChange={(e) =>
                  setMinStarsFilter(Number(e.target.value) || undefined)
                } // Update stars filter
              />
            </div>
            <button
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => {
                // Apply filters logic
                setIsFilterBoxVisible(false); // Close the filter box after applying
              }}
            >
              Apply Filters
            </button>
          </div>
        )}

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
