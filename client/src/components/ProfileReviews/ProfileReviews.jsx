import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Comments from "../Comments/Comments";
import { getUserReviews } from "../../redux/actions";
import { useSelector } from "react-redux";
import { getUserData } from "../../Utils/useLocalStorage";


const ProfileReviews = () => {
    const reviews = useSelector((state) => state.productReviews);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () =>{
            if (!user) {
                const data = await getUserData();
                setUser(data);
            }
        })();
        dispatch(getUserReviews(user?.id))
    },  [dispatch, user, user?.id])

    return (
        <div>
            {reviews.length ? (
              reviews.map((r) => (
                <Comments score={r.score} reviews={r.reviews} />
              ))
            ) : (
              <h3>No hay reseñas</h3>
            )}
        </div>
    );
}

export default ProfileReviews;