import React from "react";
import { GithubData } from "./Repos";
import starImage from "@/assets/starImage.svg";
import forkImage from "@/assets/forkImage.svg";
import Image from "next/image";
import languageColors from "@/colors";

interface RepoProps {
  data: GithubData;
  key: number;
}

const Repo: React.FC<RepoProps> = ({ data, key }) => {
  return (
    <a
      href={"https://github.com" + data.name}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      key={key}
    >
      <div className="flex items-center">
        <p className="text-xl font-semibold text-gray-200">{data.name}</p>

        {/* Language Badge - Only show if language is specified */}
        {data.language ? (
          <span
            className="ml-2 inline-block text-white text-xs font-medium px-2.5 py-0.5 rounded"
            style={{ backgroundColor: languageColors[data.language] || "#ccc" }} // Default color if language is not in the map
          >
            {data.language}
          </span>
        ) : null}
      </div>
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
    </a>
  );
};

export default Repo;
