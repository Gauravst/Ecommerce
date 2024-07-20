import React, { useEffect, useState } from 'react';
import png from '../../../images/favicon.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, forgotPasswordLink } from '../../features/authSlice';
import { toast } from 'react-toastify';
import InputBox from '../../utils/InputBox';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  let { isLoading, error, isUserLogin, success } = data;

  const checkInput = async (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (emailPattern.test(value)) {
      return 'email';
    } else if (usernamePattern.test(value)) {
      return 'username';
    } else {
      return 'invalid';
    }
  };

  useEffect(() => {
    if (isUserLogin) {
      navigate('/');
      toast.success('User login successfully');

      setFormData({
        email: '',
        password: '',
      });
    }
  }, [isUserLogin]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginId = await checkInput(formData.email);

    let ForgotData;
    if (loginId == 'email') {
      loginData = {
        email: formData.email,
      };
    } else {
      loginData = {
        username: formData.email,
      };
    }

    try {
      dispatch(forgotPasswordLink({ ForgotData }));
      if (success) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  return (
    <div className="my-4 flex w-full flex-wrap px-4">
      <div className="my-10 w-full px-4">
        <div className="relative mx-auto max-w-[525px] rounded-lg border  bg-white px-10 py-16 text-center shadow-md shadow-black sm:px-12 md:px-[60px]">
          <div className="flex flex-col text-center md:mb-16">
            <Link to="/" className="mx-auto inline-block max-w-[160px]">
              <img className="h-20" src={png} alt="logo" />
            </Link>
            <h2 className="text-2xl font-semibold text-primary">
              Forgot Password
            </h2>
          </div>
          <div className="mt-2 flex w-full flex-col">
            <div className="mb-6 flex w-full flex-col items-center justify-start">
              <label htmlFor="email" className="w-full text-start">
                Email or Username
              </label>
              <InputBox
                type="email"
                placeholder="Email or Username"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-slate-700 bg-transparent px-4 text-base outline-none focus-visible:shadow-none"
              />
            </div>
            <div className="mb-7">
              <button
                onClick={handleSubmit}
                className="mt-1 h-11 w-full rounded-md bg-primary px-5 font-medium text-white shadow-md shadow-black transition duration-300 ease-in-out hover:bg-primary-light"
              >
                {isLoading ? 'Loading...' : 'Generate Reset Link'}
              </button>
            </div>
          </div>
          <ul className="-mx-2 mb-12 flex justify-between"></ul>
          <div>
            Remember your password?{' '}
            <Link
              to={'/login'}
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
