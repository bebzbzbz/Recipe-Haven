import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { mainContext } from "../context/MainProvider"
import IUser from "../models/IUser"
import supabase from "../utils/supabase"
import Button from "../components/Button"

interface IUserProps {
    user: IUser,
    setUser: (user: IUser) => void
}

const SignUp = () => {
    const navigate = useNavigate()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const firstnameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)

    const {user, setUser} = useContext(mainContext) as IUserProps

    // const [profileImg, setProfileImg] = useState<File | null>(null)

    // const uploadImg = async() => {
    //     if(!profileImg) return null

    //     const fileName = profileImg.name

    //     const {error} = await supabase.storage.from("profile-imgs").upload(fileName, profileImg)

    //     if(error) {
    //         console.error("Error uploading the profile image")
    //     }

    //     const photoUrl = supabase.storage.from("profile-imgs").getPublicUrl(fileName).data.publicUrl
    //     return photoUrl
    // }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || ""
        const username = usernameRef.current?.value || ""
        const firstname = firstnameRef.current?.value || ""
        const lastname = lastnameRef.current?.value || ""

        // const uploadedImgUrl = await uploadImg()
        // if(!uploadedImgUrl) return null

        if(user) {
            setUser(
                {
                ...user,
                email: email,
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                // img_url: uploadedImgUrl
                }
            )
        }

        try {
            const {data, error} = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        // img_url: uploadedImgUrl
                    }
                }
            })
            if(error){
                console.error("Error while signing up", error)
            } else {
                console.log(data)
            }
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

    return (  
        <section>
            <h2 className="text-center mb-5">Sign Up</h2>
            <form onSubmit={handleSignUp} className="grid grid-cols-2 items-center gap-3 px-80">
                <fieldset className="col-span-2">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        required
                        name="username" 
                        placeholder="Username" 
                        ref={usernameRef} 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        required 
                        name="email" 
                        placeholder="Email" 
                        ref={emailRef} 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text"
                        required 
                        name="password" 
                        placeholder="Password" 
                        ref={passwordRef} 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="firstname">First Name</label>
                    <input 
                        type="text"
                        required 
                        name="firstname" 
                        placeholder="First Name" 
                        ref={firstnameRef} 
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="lastname">Last Name</label>
                    <input 
                        type="text"
                        required 
                        name="lastname" 
                        placeholder="Last Name" 
                        ref={lastnameRef} 
                        className="bg-lime-200"/>
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="profile-img">Upload Profile Image</label>
                    <input 
                        type="file" 
                        id="profile-img" 
                        accept="image/*" 
                        className="bg-lime-200"
                        required
                        onChange={(e) => {
                            if(e.target.files) {
                                setProfileImg(e.target.files[0])
                            }
                        }}/>
                </fieldset> */}
                <fieldset className="mt-5 flex col-span-2 justify-center gap-5">
                    <Button
                    text="Register"
                    title="Register"
                    bgColor="bg-lime-600"
                    hoverBgColor="hover:bg-lime-500"
                    buttonType="submit"/>
                    <Button
                    text="I have a profile already"
                    title="To Login"
                    bgColor="bg-amber-600"
                    hoverBgColor="hover:bg-amber-500"
                    buttonType="button"
                    action={() => navigate("/login")}/>
                </fieldset>
        </form>
        </section>
    );
}

export default SignUp;