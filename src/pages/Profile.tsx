import { useContext, useEffect, useState } from "react";
import IUser from "../models/IUser";
import { mainContext } from "../context/MainProvider";
import supabase from "../utils/supabase";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

interface IContext {
    user: IUser,
    setUser: (user: IUser) => void
}

const Profile = () => {
    const {user, } = useContext(mainContext) as IContext
    const [newUserData, setNewUserData] = useState<IUser | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        setNewUserData(user)
    }, [user])

    const [profileImg, setProfileImg] = useState<File | null>(null)

    const uploadImg = async() => {
        if(profileImg) {
            const fileName = profileImg.name

            const {error} = await supabase.storage.from("profile-imgs").upload(fileName, profileImg)
            if(error) {
                console.error("Error uploading the profile image")
            }
    
            const photoUrl = supabase.storage.from("profile-imgs").getPublicUrl(fileName).data.publicUrl
            return photoUrl
        }
    }
    
    const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uploadedImgUrl = await uploadImg()

        if(user) {
            if(!!profileImg) {
                const {error} = await supabase.from("users").update({
                    username: newUserData?.username,
                    firstname: newUserData?.firstname,
                    lastname: newUserData?.lastname,
                    img_url: uploadedImgUrl,
                }).eq("id", user.id)
    
                if(error){
                    console.error("Saving changes failed", error)
                } else {
                    console.log(newUserData)
                    navigate("/")
                }
            } else {
                const {error} = await supabase.from("users").update({
                    username: newUserData?.username,
                    firstname: newUserData?.firstname,
                    lastname: newUserData?.lastname,
                    img_url: newUserData?.img_url,
                }).eq("id", user.id)
    
                if(error){
                    console.error("Saving changes failed", error)
                } else {
                    console.log(newUserData)
                    location.reload()
                }
            }
        }
        setProfileImg(null)
    }

    return (  
        <section className="flex flex-col lg:flex-row-reverse items-center justify-center gap-7">
            <div>
                {user?.img_url ? <img src={user?.img_url} alt="Avatar" className="rounded-full w-70 h-70 object-cover mb-3" /> : <img src="/svg/onion.svg"/>}
                <p className="text-center">Current profile image</p>
            </div>
            {newUserData && 
            <div>
                <h2 className="mb-5 text-4xl font-medium">Edit Profile</h2>
                <form onSubmit={handleSaveChanges} className="grid sm:grid-cols-2 gap-3 sm:w-140">
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="Change Username" 
                        value={newUserData?.username}
                        onChange={(e) => setNewUserData({...newUserData, username: e.target.value})}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="profile-img">Upload Profile Image</label>
                    <input 
                        type="file" 
                        id="profile-img"
                        accept="image/*"
                        onChange={(e) => {
                            if(e.target.files) {setProfileImg(e.target.files[0])}
                            }}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="firstname">First Name</label>
                    <input 
                        type="text" 
                        id="firstname"
                        placeholder="Change First Name" 
                        value={newUserData?.firstname}
                        onChange={(e) => setNewUserData({...newUserData, firstname: e.target.value || ""})}/>
                </fieldset>
                <fieldset className="mb-3">
                    <label htmlFor="username">Last Name</label>
                    <input 
                        type="text" 
                        id="lastname"
                        placeholder="Change Last Name" 
                        value={newUserData?.lastname}
                        onChange={(e) => setNewUserData({...newUserData, lastname: e.target.value || ""})}/>
                </fieldset>
                <fieldset className="sm:col-span-2">
                    <Button buttonType="submit" text="Save changes" title="Save changes" bgColor="bg-recipe-light-green" hoverBgColor="hover:bg-recipe-green"/>
                </fieldset>
            </form>
            </div>}
        </section>
    );
}

export default Profile;