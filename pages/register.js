import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import nookies from "nookies";
import Head from "next/head";
import { useMutation } from "react-query";
import { register } from "../app/apis/auth/request";
import toast from "react-hot-toast";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  if (cookies.token) {
    return {
      redirect: {
        destination: "/shop",
      },
    };
  }

  return {
    props: {},
  };
}

function Register() {
  const [field, setField] = useState({});

  const { mutate ,isLoading} = useMutation(register, {
    onSuccess: (data) => {
      setField({});
      toast.success("your account has been registered successfully")
    },
    onError: (error) => {
      toast.error(error?.message ?? "your account has been registered failed")
    }
  })

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const doRegister = async (e) => {
    e.preventDefault();
  mutate(field)
  };

  return (
    <>
      <Head>
        <title>wefootwear | Register</title>
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-screen relative bg-cusgray pb-10 flex justify-center place-items-center"
      >
        {isLoading && (
          <div className="w-full h-screen flex justify-center place-items-center absolute top-0 right-0 bg-white backdrop-blur-sm bg-opacity-20">
            <img
              src="https://i.ibb.co/8jP3GyP/Dual-Ball-1-1s-200px.gif"
              className="w-20"
              alt=""
            />
          </div>
        )}

        <form
          onSubmit={doRegister}
          className="p-5 max-w-md mx-2 bg-white flex flex-col place-items-center shadow-lg rounded-xl"
        >
          <h1 className="text-center text-xl font-bold text-cusblack leading-6 my-5">
            BECOME A MEMBER
          </h1>
          <p className="text-sm font-medium text-gray-400 mb-4 text-center px-6">
            Create your Shop Member profile and get first access to the very
            best of products, inspiration and community.
          </p>
          
          <input
            onChange={handleChange}
            required
            type="text"
            placeholder="Full Name"
            name="fullname"
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />
          <input
            onChange={handleChange}
            required
            type="text"
            placeholder="Email address"
            name="email"
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />
          <input
            onChange={handleChange}
            required
            type="password"
            placeholder="Password"
            name="password"
            className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
          />

          <p className="text-xs text-gray-400 my-2 text-center px-6">
            By register, you agree to shop's{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms of Use</span>.
          </p>
          <button
            type="submit"
            className="bg-cusblack rounded-sm w-full text-white py-2 mt-3"
          >
            JOIN US
          </button>
          <div className="text-xs text-gray-400 mt-5">
            Already have?{" "}
            <Link href="/login">
              <a className="underline">Sign In</a>
            </Link>
          </div>
        </form>
      </motion.div>
    </>
  );
}

export default Register;
