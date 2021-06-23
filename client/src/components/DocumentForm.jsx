import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";

export const DocumentForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState();
  const [isEdit, setEditMode] = useState(false);
  const { id: documentId } = useParams();

  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  async function addDocument(data) {
    setIsSubmitting(true);
    try {
      await axios.post("/document", data);
      history.push("/");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  async function updateDocument(data) {
    setIsSubmitting(true);
    try {
      await axios.put(`/document/${props.match.params.id}`, data);
      history.push("/");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }
  const onSubmit = async (data) => {
    isEdit ? updateDocument(data) : addDocument(data);
  };

  useEffect(() => {
    const { id } = props.match.params;

    if (id) {
      setEditMode(true);
      getDocument();
    }
  }, [props.match.params.id]);

  async function getDocument() {
    const result = await axios.get(`/document/${documentId}`);
    const document = result.data[0];
    for (let key in document) {
      setValue(key, document[key]);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="form-control"
            {...register("name", {
              required: true,
              maxLength: 20,
            })}
          />
          {errors.name?.type === "required" && (
            <div className="fs-6 text-danger">Name is required</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Email is required",
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
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            placeholder="Contact Number"
            {...register("phone")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="form-control"
            {...register("address")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ktpNumber" className="form-label">
            KTP Number
          </label>
          <input
            type="number"
            id="ktpNumber"
            placeholder="KTP Number (must be unique)"
            className="form-control"
            {...register("ktpNumber")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="npwpNumber" className="form-label">
            NPWP Number
          </label>
          <input
            id="npwpNumber"
            type="number"
            placeholder="NPWP Number"
            className="form-control"
            {...register("npwpNumber")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passportNumber" className="form-label">
            Passport Number
          </label>
          <input
            id="passportNumber"
            type="text"
            placeholder="Passport Number (must be unique)"
            className="form-control"
            {...register("passportNumber")}
          />
        </div>

        <div className="d-flex">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};
