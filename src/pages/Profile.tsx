import { useContext, useEffect, useState } from "react";
import IUser from "../models/IUser";
import { mainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";
import Button from "../components/Button";

interface IContext {
    user: IUser,
    setUser: (user: IUser) => void
}

const Profile = () => {
    const {user, setUser} = useContext(mainContext) as IContext

    const [newUserData, setNewUserData] = useState<IUser | null>(null)

    const fetchData = async () => {
        const {data: currentUser, error} = await supabase.from("users").select("*").eq("id", user.id)

        if(error) {
            console.error("User fetch failed", error)
        } else {
            setUser(currentUser?.[0] || null)
            setNewUserData(currentUser?.[0] || null)
        }
        console.log(currentUser?.[0])
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(newUserData)

    const handleSaveChanges = async () => {
        if(user) {
            const {error} = await supabase.from("users").update({
                username: newUserData?.username,
                img_url: newUserData?.img_url,
            }).eq("id", user.id)

            if(error){
                console.error("Saving changes failed", error)
            } else {
                fetchData()
            }
        }
    }

    return (  
        <section className="text-center flex flex-col items-center gap-7">
            <h2>Welcome {user?.username}!</h2>
            <img src={user.img_url} alt="Avatar" className="rounded-full w-50 h-50 object-cover" />
            <form onSubmit={handleSaveChanges}>
                <h3>Edit profile</h3>
                <fieldset className="w-80">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        placeholder="Change Username" 
                        value={newUserData?.username}
                        onChange={(e) => setNewUserData({...newUserData, username: e.target.value || ""})}
                        className="bg-lime-200"/>
                </fieldset>
                {/* <fieldset className="w-80">
                    <label htmlFor="profile-img">Profile Image</label>
                    <input 
                        type="file" 
                        id="profile-img"
                        className="bg-lime-200"
                        value={newUserData.img_url}
                        accept="image/*"
                        onChange={(e) => setNewUserData({...newUserData, img_url: e.target.files?.item})}/>
                </fieldset> */}
                <fieldset>
                    <Button buttonType="submit" text="Save changes" title="Save changes" bgColor="bg-amber-600" hoverBgColor="hover:bg-amber-500"/>
                </fieldset>
            </form>
        </section>
    );
}

export default Profile;