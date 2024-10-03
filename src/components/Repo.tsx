import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

import { GithubData } from "./Repos";

interface RepoProps {
  data: GithubData;
  key: number;
  show: boolean;
}

const Repo: React.FC<RepoProps> = ({ data, key, show }) => {
  const [viewed, setViewed] = useState<boolean>(() => {
    const storedRepos = localStorage.getItem("ttViewedRepos");
    return storedRepos ? JSON.parse(storedRepos).includes(data.id) : false;
  });

  const handleOnClick = () => {
    const existingRepos = localStorage.getItem("ttViewedRepos");
    const repos = existingRepos ? JSON.parse(existingRepos) : [];

    if (!repos.includes(data.id)) {
      repos.push(data);
      localStorage.setItem("ttViewedRepos", JSON.stringify(repos));
    }

    window.open(`https://github.com${data.name}`);
    setViewed(true);
  };

  return (
    <AnimatePresence mode="popLayout">
      {(!viewed || show) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer",
          )}
          key={key}
          onClick={handleOnClick}
        >
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-200">{data.name}</p>
            {viewed && (
              <p className="text-gray-400 text-sm font-medium">Viewed</p>
            )}
          </div>

          <p className="text-gray-400">Stars: {data.stars}</p>
          <p className="text-gray-400">Forks: {data.forks}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Repo;
