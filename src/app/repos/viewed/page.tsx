"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import Navbar from "@/components/Nav";
import Repo from "@/components/Repo";
import type { GithubData } from "@/components/Repos";

export default function Page() {
  const [data, setData] = useState<GithubData[]>([]);
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
      const parsedData = storedRepos ? JSON.parse(storedRepos) : [];
      setData(parsedData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  return (
    <main>
      <Navbar />
      <div className="flex flex-row items-center gap-2 py-5 px-5">
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
