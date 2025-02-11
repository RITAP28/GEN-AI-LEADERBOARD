import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const User = () => {

    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [search] = useSearchParams();
    const id = search.get("id");

    const fetchUser = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:4000/api/v1/users/byId/${id}`);
            setUser(data.user);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return loading ? (
        <div className="flex justify-center items-center">
            <p className="text-2xl font-semibold">Loading...</p>
        </div>
    ) : (
        <div>
            {user.publicProfile}
        </div>
    )
}

export default User;