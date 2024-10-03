import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GithubData } from "./Repos";
import starImage from "@/assets/starImage.svg";
import forkImage from "@/assets/forkImage.svg";
import Image from "next/image";
import languageColors from "@/colors";
import { getBestContrastColor } from "@/lib/contrastColors";

interface RepoProps {
  data: GithubData;
  key: number;
  show: boolean;
}

const Repo: React.FC<RepoProps> = ({ data, key, show }) => {
  const [viewed, setViewed] = useState<boolean>(false);

  useEffect(() => {
    const storedRepos = localStorage.getItem("ttViewedRepos");

    if (storedRepos) {
      const repos = JSON.parse(storedRepos);
      repos.forEach((repo: GithubData) => {
        if (repo.id === data.id) {
          setViewed(true);
        }
      });
    } else {
      setViewed(false);
    }
  }, [data]);

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
          className="repo-card bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          key={key}
          onClick={handleOnClick}
        >
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-200">{data.name}</p>
            {viewed && (
              <p className="text-gray-400 text-sm font-medium">Viewed</p>
            )}
          </div>

          {/* Language Badge - Only show if language is specified */}
          {data.language ? (
            <span
              className="ml-2 inline-block  text-xs font-medium px-2.5 py-0.5 rounded"
              style={{
                backgroundColor: languageColors[data.language] || "#ccc",
                color: getBestContrastColor(languageColors[data.language]),
              }} // Default color if language is not in the map
            >
              {data.language}
            </span>
          ) : null}

          <p className="text-gray-400">{data.message}</p>

          {/* Stars and Forks Section */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center">
              <Image src={starImage} alt="Fork" className="h-4 w-4 mr-1" />
              <p className="text-gray-400">Stars: {data.stars}</p>
            </div>
            <div className="flex items-center">
              <Image src={forkImage} alt="Fork" className="h-4 w-4 mr-1" />
              <p className="text-gray-400">Forks: {data.forks}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Repo;
