import { useState } from "react";
import { FiEye, FiEyeOff, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import {AuthController} from "../../BackEnd/Controllers/AuthController.js"

function Login({ onLogin, switchToRegister }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.email || errors.password || !formData.email || !formData.password) return;

        try {
            setLoading(true);
            if (formData.rememberMe) {
                localStorage.setItem("user", JSON.stringify(formData));
            }
            await onLogin(formData); 
        } catch (err) {
            setErrors({ general: err.message || "Credenciales inválidas" });
        } finally {
            setLoading(false);
        }
    };


    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
        }));

        if (name === "email") {
        setErrors(prev => ({
            ...prev,
            email: !validateEmail(value) ? "Invalid email format" : ""
        }));
        }
        if (name === "password") {
        setErrors(prev => ({
            ...prev,
            password: !validatePassword(value) ? "Password must be at least 8 characters" : ""
        }));
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative py-8 px-4"
            style={{
                //backgroundImage: `url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3)`
                backgroundImage: `url('../../../public/backgroundFirts.jpg')`
            }}>
            <div className="absolute inset-0 backdrop-blur-[6px] bg-foreground/30"></div>
            
            <div className="w-full max-w-md relative z-10">
                <div className="backdrop-blur-xl bg-card/70 p-8 rounded-xl shadow-xl border border-border/50">
                    <div className="text-center mb-8">
                        <h1 className="text-heading font-heading text-foreground mb-2">
                        Welcome to WalkyApp
                        </h1>
                        <p className="text-accent">Please enter your credentials</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-input focus:ring-2 focus:ring-ring focus:outline-none"
                                required
                            />
                            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg bg-background/50 border border-input focus:ring-2 focus:ring-ring focus:outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-accent hover:text-foreground"
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="rounded border-input text-primary focus:ring-ring"
                                />
                                <span className="ml-2 text-sm text-accent">Remember me</span>
                            </label>
                            
                            <button type="button" className="text-sm text-primary hover:text-ring">
                                Forgot password?
                            </button>
                        </div>

                        {errors.general && <p className="text-destructive">{errors.general}</p>}
                        <button type="submit" disabled={loading} className="w-full bg-primary text-background py-2 rounded-lg hover:bg-ring transition-colors font-medium">
                            {loading ? "Cargando..." : "Sign In"}
                        </button>
                        
                        <p className="text-center text-sm text-accent mt-6">
                        Don't have an account? 
                        <button
                            type="button"
                            onClick={switchToRegister}
                            className="text-primary hover:text-ring font-medium ml-1"
                        >
                            Sign up
                        </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;