import { useContext, useState } from "react";
import IUser from "../models/IUser";
import { mainContext } from "../context/MainProvider";

const Profile = () => {
    const {setProfile} = useContext(mainContext) as any

    return (  
        <section className="text-center">
            <h2>You're logged in!</h2>
        </section>
    );
}

export default Profile;