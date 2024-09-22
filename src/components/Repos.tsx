"use client"
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Repo from './Repo';

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
    const [data, setData] = useState<GithubData[] | []>([])

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://trending.eddiehubcommunity.org/daily";
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const res = await response.json();
                setData(res)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='h-full'>
            {data.length > 0 ? (
                <div className='grid gap-5 px-5 pt-5'>
                    {data.map((item, index) => (
                    <Repo data={item} key={index} />
                    ))}
                </div>
            ) : <Loader />}
        </section>
    );
};

export default Repos;