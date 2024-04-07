import { useForm } from "react-hook-form";
import axios from "axios";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import ButtonLoad from "../../Animations/ButtonLoad";
import { useState } from "react";

const serVer = `https://recycle-app-backend.vercel.app`;

const Policy = () => {
  const [deployBtn, setDeployBtn] = useState("Deploy Policy");
  const [result, setResult] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setDeployBtn(<ButtonLoad />);
    const token = localStorage.getItem("recycle-users");

    const { policyName, description } = data;

    try {
      const response = await axios.post(
        `${serVer}/deploy-policy`,
        {
          policyName,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data } = response;

      setResult(data.message);

      reset();
    } catch (error) {
      setResult(error.response.data.message);
    } finally {
      setTimeout(() => {
        setResult("");
      }, 3000);

      setDeployBtn("Deploy Policy");
    }
  };

  return (
    <div className="feedback">
      <HeaderGoBack h1="Deploy Policy" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="policyName">Policy Name</label>
          <input
            type="text"
            id="policyName"
            {...register("policyName", { required: true })}
          />
          {errors.policyName && <p>Policy Name is required</p>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && <p>Description is required</p>}
        </div>
        <button type="submit">{deployBtn}</button>
      </form>
      <p className="error-p">{result}</p>
    </div>
  );
};

export default Policy;
