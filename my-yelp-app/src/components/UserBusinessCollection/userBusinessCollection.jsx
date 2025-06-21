import React, { useEffect, useState } from "react";

function UserBusinessCollection() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/favorites")
            .then(res => res.json())
            .then(data => {
                setFavorites(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="user-business-collection">
            <h2>Your Business Collection</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {favorites.map(biz => (
                        <li key={biz._id}>{biz.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserBusinessCollection;