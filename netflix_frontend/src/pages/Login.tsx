import { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff, AlertCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

interface FormData {
  username: string;
  password: string;
  rememberMe: boolean;
}


const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));

      await new Promise((resolve) => setTimeout(resolve, 100));

      const isAuthed = await isAuthenticated();
      if (isAuthed) {
        navigate("/home");
      } else {
        throw new Error("Authentication failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90">
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-80 rounded">
        <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>

        {error && (
          <div
            role="alert"
            className="p-4 mb-4 text-red-400 bg-red-900 bg-opacity-20 border border-red-600 rounded flex items-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-4 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              aria-invalid={error ? "true" : "false"}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2 relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
              aria-invalid={error ? "true" : "false"}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white focus:outline-none focus:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="flex items-center justify-between text-zinc-400">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
                className="rounded border-zinc-600 text-red-600 focus:ring-red-600"
              />
              <span>Remember me</span>
            </label>

            <a
              href="/forgot-password"
              className="text-zinc-400 hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
            >
              Forgot password?
            </a>
          </div>
        </form>

        <div className="text-zinc-400">
          <span>New to Netflix? </span>
          <a
            href="/signup"
            className="text-white hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
          >
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
