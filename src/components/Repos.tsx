"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loader from './Loader';

interface GithubData {
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
                data.map((item, index) => (
                    <div key={index}>g</div>
                ))
            ) : <Loader />}
        </section>
    );
};

export default Repos;