import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth } from '../utils/firebase/firebase';
import { Form, message, Input } from "antd";
import "../resources/signin.scss";
import { useNavigate } from 'react-router-dom';
function SignUpForm({setloading}) {
  const navigate = useNavigate(true);
  const onFinish = async (values)=>{
    if(values.password!== values.confirm_password){
       message.error("Password doens't match");
       return;
    }
    try {
      setloading(true);
      const {user} = await createAuthUserWithEmailAndPassword(values.email, values.password);
      await createUserDocumentFromAuth({...user,displayName: values.displayName});
      setloading(false);
      message.success("Successfully signed up");
      navigate("/");
    } catch (error) {
      setloading(false);
      if(error.code === 'auth/email-already-in-use'){
        message.error("You're already registered.Please Sign In");
     }
      else message.error("Something went wrong");
    }
  }
  return (
    <div className='signbox'>
        <h1 className='formheader'>I don't have an account</h1>
        <Form layout="vertical" onFinish={onFinish} className='form'>
            <Form.Item label="Name" name="displayName" className='item'>
                <Input type="text" required className='input'/>
            </Form.Item >
            <Form.Item label="Email" name="email" className='item'>
                <Input type="email" required className='input' id="em2"/>
            </Form.Item>
            <Form.Item label="Password" name="password" className='item'>
                <Input type="password" placeholder='atleast 6 digits' required className='input' id="ps2"/>
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirm_password" className='item'>
                <Input type="password" placeholder='atleast 6 digits' required className='input'/>
            </Form.Item>
            <button type='submit' className='primary'>SIGN UP</button>
        </Form>
    </div>
  )
}

export default SignUpForm;