"use client";

import Loader from "@/components/Loader";
import Navbar from "@/components/Nav";
import Repo from "@/components/Repo";
import type { GithubData } from "@/components/Repos";

export default function Page() {
  const storedRepos = localStorage.getItem("ttViewedRepos");
  const data = storedRepos ? JSON.parse(storedRepos) : [];

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
