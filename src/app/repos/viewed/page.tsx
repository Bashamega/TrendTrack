"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import Navbar from "@/components/Nav";
import Repo, { ViewedRepo } from "@/components/Repo";
import type { GithubData } from "@/components/Repos";

export default function Page() {
  const [data, setData] = useState<ViewedRepo[]>([]);
  const [filteredData, setFilteredData] = useState<GithubData[] | [] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [date, setDate] = useState<string | undefined>(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRepos = localStorage.getItem("ttViewedRepos");
      try {
        const parsedData = storedRepos ? JSON.parse(storedRepos) : [];
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setData([]);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((repo) => {
        const matchesSearchQuery = searchQuery
          ? repo.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

        const matchesDate = date === repo.viewedAt;

        return matchesSearchQuery && matchesDate;
      });

      setFilteredData(filtered);
    }
  }, [searchQuery, data, date]);

  return (
    <main>
      <Navbar />
      <div className="flex md:flex-row flex-col items-center gap-2 py-5 px-5">
        <input
          type="date"
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded"
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
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-gray-200 font-bold py-3 px-4 rounded"
        />
      </div>

      {filteredData ? (
        filteredData.length > 0 ? (
          <div className="grid gap-5 px-5 pt-5">
            {filteredData.map((item, index) => (
              <Repo data={item} key={index} show={true} />
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
    </main>
  );
}
