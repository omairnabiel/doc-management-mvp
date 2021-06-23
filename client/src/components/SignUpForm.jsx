import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState();

  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({});

  let password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await axios.post("/signup", data);
      localStorage.token = result.data.token;
      history.push("/login");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          name="password"
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p className="fs-6 text-danger">{errors.password.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">
          Confirm Password
        </label>
        <input
          className="form-control"
          type="password"
          {...register("password_repeat", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.password_repeat && (
          <p className="fs-6 text-danger">{errors.password_repeat.message}</p>
        )}
      </div>
      <div className="d-flex">
        <button
          className="btn btn-outline-secondary"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>

        <div className="mx-2">
          <span className="align-bottom">
            Already have an account <Link to="/login">Sign In</Link>
          </span>
        </div>
      </div>
    </form>
  );
};
