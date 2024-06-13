import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

function login() {
  const initialState = { userName: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { userName, password } = userData;
  const { state = {}, dispatch } = useContext(DataContext);
  const { auth = {} } = state;
  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };


  const handleSubmit = async e => {
    e.preventDefault()

    const res = await postData('auth/login', userData)

    if (res.error) {
      window.location.reload();
      return;
    }

    dispatch({
      type: 'AUTH', payload: {
        token: res.access_token,
        user: res.user
      }
    })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: '/api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)

    // check if user has admin privileges
    if (res.user.role === 'user') {
      router.push("/subadmin");
    } else if (res.user.role === 'admin') {
      router.push("/admin");
    } else if (res.user.role === 'user') {
      router.push("/subadmin")
    }
  }

  const [isChecked, setChecked] = useState(true);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  return (
    <body className="  relative">
      {/* <img
        src="/loginbg.jpg"
        className="absolute opacity-50  w-full  object-fill"
      /> */}
      <div className="flex justify-around bg-black ">
        <div className="">
          <div className=" w-full">
            <form
              clssName="bg-[#030305] border border-amber-400 rounded-lg  shadow-md  p-2 px-8 w-[100%] h-[100%] "
              onSubmit={handleSubmit}
            >
              <h1 className="text-white font-fun text-center">SubAdmin Login</h1>
              <div className="pt-4 flex ">
                <label
                  className=" text-white mt-auto font-medium pb-4  px-2 text-lg "
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none  rounded w-full text-2xl mt-auto p-1 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="userName"
                  value={userName}
                  onChange={handleChangeInput}
                  type="text"
                  placeholder="FUN"
                />
              </div>
              <div className="py-4 flex bg-[#030305]">
                <label
                  className=" text-white mt-auto font-medium pb-4  px-2 text-lg "
                  htmlFor="username"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none  rounded w-full text-2xl mt-auto p-1 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
                  placeholder="******"
                />
              </div>
              <div className="py-4 flex text-black bg-[#030305]">
                <input
                  className="form-checkbox h-6 w-6 text-gray-600"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  name="checkbox"
                />
                <label
                  className=" text-white  text-lg px-2 -mt-2 font-medium  py-2"
                  htmlFor="password"
                >
                  Remember Me
                </label>

              </div>
              <div className="flex bg-[#030305] items-center justify-between w-1/2 ml-auto">
                <button
                  className="bg-gradient-to-b from-neutral-400 to-amber-300 hover:bg-red-700 w-full  text-black   border border-white font-bold py-3  text-2xl px-2 rounded-lg focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>

        </div>


      </div>
    </body>
  );
}

export default login;