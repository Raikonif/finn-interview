import useSignIn from "@/hooks/useSignIn.tsx";

const Login = () => {
  const {emailRef, passRef, handleSubmit, isLoading} = useSignIn()

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-form-wrapper">
          <h1>Login</h1>
          <p>Sign in to access your account</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                required
                disabled={isLoading}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                ref={passRef}
                required
                disabled={isLoading}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Demo credentials: admin / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
