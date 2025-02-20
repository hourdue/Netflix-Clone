import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, AlertCircle, Loader, Check, X } from 'lucide-react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

const SignupPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const passwordRequirements = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validatePassword = (password: string) => {
    const checks = {
      minLength: password.length >= passwordRequirements.minLength,
      hasUpperCase: passwordRequirements.hasUpperCase.test(password),
      hasLowerCase: passwordRequirements.hasLowerCase.test(password),
      hasNumber: passwordRequirements.hasNumber.test(password),
      hasSpecialChar: passwordRequirements.hasSpecialChar.test(password),
    };
    return checks;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
    setGeneralError('');
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    
    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordChecks = validatePassword(formData.password);
    if (!Object.values(passwordChecks).every(Boolean)) {
      newErrors.password = 'Password does not meet requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      console.log('Registration successful:', data);
      
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = validatePassword(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90">
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-80 rounded">
        <h1 className="text-3xl font-bold text-white mb-8">Sign Up</h1>

        {generalError && (
          <div
            role="alert"
            className="p-4 mb-4 text-red-400 bg-red-900 bg-opacity-20 border border-red-600 rounded flex items-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`w-full p-4 rounded bg-zinc-800 text-white border ${
                errors.username ? 'border-red-500' : 'border-zinc-700'
              } focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600`}
              required
              aria-invalid={errors.username ? 'true' : 'false'}
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className={`w-full p-4 rounded bg-zinc-800 text-white border ${
                errors.email ? 'border-red-500' : 'border-zinc-700'
              } focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600`}
              required
              aria-invalid={errors.email ? 'true' : 'false'}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-4 rounded bg-zinc-800 text-white border ${
                  errors.password ? 'border-red-500' : 'border-zinc-700'
                } focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600`}
                required
                aria-invalid={errors.password ? 'true' : 'false'}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-zinc-400 hover:text-white focus:outline-none focus:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="space-y-2 text-sm">
              {Object.entries(passwordChecks).map(([check, passes]) => (
                <div
                  key={check}
                  className={`flex items-center space-x-2 ${
                    passes ? 'text-green-400' : 'text-zinc-400'
                  }`}
                >
                  {passes ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  <span>
                    {check === 'minLength' && 'At least 8 characters'}
                    {check === 'hasUpperCase' && 'One uppercase letter'}
                    {check === 'hasLowerCase' && 'One lowercase letter'}
                    {check === 'hasNumber' && 'One number'}
                    {check === 'hasSpecialChar' && 'One special character'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Creating account...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="text-zinc-400">
          <span>Already have an account? </span>
          <a
            href="/login"
            className="text-white hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
          >
            Sign in now
          </a>
        </div>

        <div className="text-sm text-zinc-500">
          By signing up, you agree to our Terms of Use and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default SignupPage;