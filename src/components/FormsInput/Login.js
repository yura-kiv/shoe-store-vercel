import { useState } from "react";
import { loginFields } from "./assets/formFields";
import FormExtra from "./FormExtra";
import Input from "./Input";
import ActionBtn from "./ActionBtn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ToastNotification from "../../toastNotification/toast";
import { login as setLoginData } from "../../toolkitRedux/userAuthSlice";
import { registeredUsers } from "../../assets/user/registeredUsers";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.authSlice);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const findUser = registeredUsers.find((user) => {
        if (loginState.email === user.email && loginState.password === user.password) {
          return true;
        }
        return false;
      });
      if (findUser) {
        dispatch(setLoginData({ user: findUser }));
        setLoginState({ email: "", password: "" });
        ToastNotification.success("You have been successfully logined.");
        navigate("/");
      } else {
        throw "No such user";
      }
    } catch (err) {
      ToastNotification.error(err);
    }
  };

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <ActionBtn
        handleSubmit={handleSubmit}
        text="Login"
      />
    </form>
  );
}
