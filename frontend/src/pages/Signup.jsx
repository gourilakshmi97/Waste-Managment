import { useForm } from "react-hook-form";

import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Signup.css";

function Signup() {

  const navigate = useNavigate();

  const {

    register,

    handleSubmit,

    formState: { errors },

  } = useForm();

  // Signup Submit

  const onSubmit = async (data) => {

    try {

      const response = await API.post(
        "/auth/signup",
        data
      );

      console.log(response.data);

      alert("Signup Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>
          Signup
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}

          <input
            type="text"

            placeholder="Enter Name"

            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="error">
              {errors.name.message}
            </p>
          )}

          {/* Email */}

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

          {/* Password */}

          <input
            type="password"

            placeholder="Enter Password"

            {...register("password", {
              required: "Password is required",

              minLength: {
                value: 6,
                message:
                  "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="error">
              {errors.password.message}
            </p>
          )}

          <button type="submit">
            Signup
          </button>

        </form>

        <p style={{ marginTop: "15px" }}>

          Already have an account?

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;