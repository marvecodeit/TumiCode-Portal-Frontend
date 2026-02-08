import  {useState} from 'react'
import './SignUp.css';
import { loginUser } from '../api/auth.api.js';
import { useAuth} from '../components/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
     const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
     try {
      const res = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      toast.success("Login successful 🎉");

      login(res.data);
if (res.data.user.role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}
      // ⏳ let toast show before redirect
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 500);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <div className="container">
        <div className="sub-container">
    <h3>TumiCodes(Developer) Portal </h3>
    <div className="form-control">
        <form action="" onSubmit={submit}>
            <div className="center">
                <div className="sub-center">
            
            <div className="names">
                <label htmlFor="">Email</label><br />
                      <input type="email" name="" id="" placeholder='yourname@service.com' required 
                      onChange={(e) => setForm({  ...form, email: e.target.value})} />
            </div>
            <div className="names">
                <label htmlFor="">Password</label><br />
                      <input type="password" name="" id="" placeholder='Password' required 
                      onChange={(e) => setForm({ ...form, password: e.target.value })}    />
                      </div>
            </div>
            </div>
            <div className="btn-container">
                <button>Login</button>
            </div>
                <p className='already-acc'>Don't have an account?  <Link to='/signup'>TumiCore Support Team</Link></p>

        </form>
        </div>
    </div>
    </div>
   
    </>
  )
}

export default Login