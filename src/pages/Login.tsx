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
        <section>
            <h2 className="text-center mb-5 text-4xl font-medium">Login</h2>
            <p className="text-center mb-7">You need to be a member in order to create and edit recipes.</p>
            <form onSubmit={handleLogin} className="flex flex-col items-center gap-5 mx-auto">
                <fieldset className="w-80">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        ref={emailRef} 
                        required/>
                </fieldset>
                <fieldset className="w-80">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        ref={passwordRef} 
                        required/>
                </fieldset>
                <fieldset className="flex gap-5 text-center">
                    <Button 
                        text="Login" 
                        title="Login" 
                        buttonType="submit"
                        bgColor="bg-recipe-light-green"
                        hoverBgColor="hover:bg-recipe-green"
                    />
                    <Button
                    text="Register first"
                    title="Register"
                    bgColor="bg-recipe-yellow"
                    hoverBgColor="hover:bg-recipe-pink"
                    buttonType="button"
                    action={() => navigate("/signup")}/>
                </fieldset>
        </form>
        </section>
    );
}

export default Login;