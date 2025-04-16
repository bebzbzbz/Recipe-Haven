import { useRef } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()
    
    const handleLogin = async (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const email = emailRef.current?.value || ""
        const password = passwordRef.current?.value || ""

        try {
            const {error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if(error) {
                console.error(error)
            }
            navigate("/profile")
            console.log("logged in")
        } catch (error) {
            console.error(error)
        }
    }

    return (  
        <section className="px-40">
            <h2 className="text-center mb-5">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-5 mx-auto">
                <fieldset className="w-80">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        ref={emailRef} 
                        required
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset className="w-80">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        ref={passwordRef} 
                        required
                        className="bg-lime-200"/>
                </fieldset>
                <fieldset className="flex gap-5 text-center">
                    <Button 
                        text="Login" 
                        title="Login" 
                        buttonType="submit"
                        bgColor="bg-lime-600"
                        hoverBgColor="hover:bg-lime-500"
                    />
                    <Button
                    text="Register first"
                    title="Register"
                    bgColor="bg-amber-600"
                    hoverBgColor="hover:bg-amber-500"
                    buttonType="button"
                    action={() => navigate("/signup")}/>
                </fieldset>
        </form>
        </section>
    );
}

export default Login;