import { useState } from "react";
import { signupFields } from "./assets/formFields";
import FormAction from "./ActionBtn";
import Input from "./Input";
import styles from "./styles/Signup.module.scss";
import ToastNotification from "../../toastNotification/toast";
import { useNavigate } from "react-router-dom";
import { registeredUsers } from "../../assets/user/registeredUsers";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState({
    ...fieldsState,
    gender: "male",
  });
  const navigate = useNavigate();

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signupState.name.length < 5) {
        throw "Name is too short.";
      }
      if (signupState.password.length < 5) {
        throw "Password is too short.";
      }
      if (signupState.password !== signupState.confirmPassword) {
        throw "Passwords do not match...";
      }
      ToastNotification.success("You have been successfully signuped.");
      registeredUsers.push(signupState);
      navigate("/login");
    } catch (err) {
      ToastNotification.error(err);
    }
  };

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmit}
    >
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <div
          className={styles.genderBtnsWrapper}
          onChange={handleChange}
        >
          <input
            type="radio"
            defaultChecked
            value="male"
            name="gender"
            id="gender"
          />
          <span>Men</span>
          <input
            type="radio"
            value="female"
            name="gender"
            id="gender"
          />
          <span>Woman</span>
        </div>
        <FormAction
          handleSubmit={handleSubmit}
          text="Signup"
        />
      </div>
    </form>
  );
}
