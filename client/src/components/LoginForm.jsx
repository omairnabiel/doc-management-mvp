import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState();
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const OnSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await axios.post("/login", data);
      localStorage.token = result.data.token;
      history.push("/");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)}>
      <div className="mb-3">
        <label for="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          {...register("email", {
            required: true,
            // email regex
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
        />
        {errors.email?.type === "required" && (
          <div className="fs-6 text-danger">Email is required</div>
        )}
        {errors.email?.type === "pattern" && (
          <div className="fs-6 text-danger">Email must be valid</div>
        )}
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          {...register("password", {
            required: true,
            // email regex
            minLength: {
              value: 6,
            },
          })}
        />
        {errors.password?.type === "minLength" && (
          <div className="fs-6 text-danger">Must be atleast 6 characters</div>
        )}
      </div>

      <div className="d-flex">
        <button
          className="btn btn-primary"
          disabled={isSubmitting}
          type="submit"
        >
          Login
        </button>
        <Link to="/signup">
          <button
            className="btn btn-outline-secondary mx-2"
            disabled={isSubmitting}
            type="submit"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </form>
  );
};
