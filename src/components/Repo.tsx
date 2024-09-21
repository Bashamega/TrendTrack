import React from 'react';
import { GithubData } from './Repos';

interface RepoProps {
    data: GithubData;
}

const Repo: React.FC<RepoProps> = ({ data }) => {
    return (
        <a href={("https://github.com"+ data.name)} target="_blank" rel="noopener noreferrer" className="bg-slate-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" key={data.id}>
            <p className="text-xl font-semibold text-gray-200">{data.name}</p>
            <p className="text-gray-400">Stars: {data.stars}</p>
            <p className="text-gray-400">Forks: {data.forks}</p>
        </a>
    );
};

export default Repo;
