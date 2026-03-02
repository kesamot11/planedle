import { getBestUsers } from "../hooks/useTopUsers";
import { useState, useEffect } from "react";

interface TopUser {
    name: string;
    total: number;
}

export default function TopUsers() {

    const [topUsers, setTopUsers] = useState<TopUser[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getBestUsers();
                setTopUsers(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="p-3 bg-gray-200 text-gray-600 rounded-xl shadow-md w-fit mx-auto">
            <h2 className="text-lg font-semibold mb-3 border-b border-white/20 pb-1 text-blue-500">Top Users</h2>
            <table className="min-w-[250px] text-sm">
                <thead>
                    <tr className="text-gray-800">
                        <th className="text-left py-2 pr-4">#</th>
                        <th className="text-left py-2 pr-4">Name</th>
                        <th className="text-right py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {topUsers.map((user, index) => {
                        const medal = index === 0 ? "1" : index === 1 ? "2" : index === 2 ? "3" : String(index + 1);
                        return (
                            <tr key={index} className="hover:bg-white/10 transition-colors border-t border-white/10">
                                <td className="py-2 pr-4">{medal}</td>
                                <td className="py-2 pr-4">{user.name}</td>
                                <td className="py-2 text-right">{user.total}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    );
}
