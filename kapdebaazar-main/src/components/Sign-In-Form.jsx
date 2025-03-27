import {
  signInWithGooglePopup,
  signAuthUserWithEmailAndPassword,
} from "../utils/firebase/firebase";
import { message } from "antd";
import { Form, Input } from "antd";
import "../resources/signin.scss";
import { useNavigate } from "react-router-dom";
function SignInForm({ setloading }) {
  const navigate = useNavigate(true);
  const userlogin = async () => {
    try {
      setloading(true);
      await signInWithGooglePopup();
      setloading(false);
      message.success("Successfully signed in");
      navigate("/");
    } catch (error) {
      setloading(false);
      message.error("Something went wrong");
    }
  };
  const onFinish = async (values) => {
    try {
      setloading(true);
      await signAuthUserWithEmailAndPassword(
        values.email,
        values.password
      );
      setloading(false);
      message.success("Successfully signed in");
      navigate("/");
    } catch (error) {
      setloading(false);
      message.error("Login failed");
    }
  };
  return (
    <div className="signbox">
      <h1 className="formheader">Already have an account?</h1>
      <h3 className="subheader">Sign In with email and password</h3>
      <Form layout="vertical" onFinish={onFinish} className="form" id="sign-in-form">
        <Form.Item label="Email" name="email" className="item">
          <Input type="email" required className="input" id="em1" />
        </Form.Item>
        <Form.Item label="Password" name="password" className="item">
          <Input type="password" required className="input" id="ps1" />
        </Form.Item>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "space-between" }}
        >
          <button type="submit" className="primary">
            SIGN IN
          </button>
          <button type="button" onClick={() => userlogin()} className="secondary">
            GOOGLE SIGN IN
          </button>
        </div>
      </Form>
    </div>
  );
}

export default SignInForm;
