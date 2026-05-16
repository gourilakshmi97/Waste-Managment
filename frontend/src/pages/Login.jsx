import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {

  try {

    const response = await API.post(
      "/auth/login",
      data
    );

    console.log(response.data);

    // Save token

    localStorage.setItem(
      "token",
      response.data.token
    );

    alert("Login Successful");

    navigate("/home");

  } catch (error) {

    console.log(error);

    alert("Invalid Credentials");
  }
};

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="error">
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="error">
              {errors.password.message}
            </p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

        <div className="signup-link">

          <p>
            Don't have an account?
          </p>

          <Link to="/signup">
            Signup
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;