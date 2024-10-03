"use client";

import Loader from "@/components/Loader";
import Navbar from "@/components/Nav";
import Repo from "@/components/Repo";
import type { GithubData } from "@/components/Repos";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<GithubData[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRepos = localStorage.getItem("ttViewedRepos");
      const parsedData = storedRepos ? JSON.parse(storedRepos) : [];
      setData(parsedData);
    }
  }, []);

  return (
    <main>
      <Navbar />
      {data ? (
        data.length > 0 ? (
          <div className="grid gap-5 px-5 pt-5">
            {data.map((item: GithubData, index: number) => (
              <Repo data={item} key={index} show={true} />
            ))}
          </div>
        ) : (
          <div className="w-screen flex flex-col items-center justify-center pt-4">
            <h1 className=" text-2xl">No Data!</h1>
          </div>
        )
      ) : (
        <Loader />
      )}
    </main>
  );
}
