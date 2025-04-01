import React from 'react'
import './Login.css'

function Login() {
  return (
    <>
  {/* inspired by https://codepen.io/FlorinPop17/pen/vPKWjd */}
  <div id="container">
    <div className="login">
      <div className="content">
        <h1>Log In</h1>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <span className="remember">Remember me</span>
          <span className="forget">Forgot password?</span>
          <span className="clearfix" />
          <button onclick="return false;">Log In</button>
        </form>
        <span className="loginwith">Or Connect with</span>
        <a href="https://www.facebook.com/emin.qasimovdia">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="https://www.twitter.com/webkoder">
          <svg
            className="feather feather-twitter sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>
        <a href="https://www.github.com/eminqasimov">
          <svg
            className="feather feather-github sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
        <a href="#">
          {" "}
          <svg
            className="feather feather-linkedin sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x={2} y={9} width={4} height={12} />
            <circle cx={4} cy={4} r={2} />
          </svg>
        </a>
        <span className="copy">© 2019</span>
      </div>
    </div>
    <div className="page front">
      <div className="content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={96}
          height={96}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-user-plus"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy={7} r={4} />
          <line x1={20} y1={8} x2={20} y2={14} />
          <line x1={23} y1={11} x2={17} y2={11} />
        </svg>
        <h1>Hello, friend!</h1>
        <p>Enter your personal details and start journey with us</p>
        <button type="" id="register">
          Register{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-right-circle"
          >
            <circle cx={12} cy={12} r={10} />
            <polyline points="12 16 16 12 12 8" />
            <line x1={8} y1={12} x2={16} y2={12} />
          </svg>
        </button>
      </div>
    </div>
    <div className="page back">
      <div className="content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={96}
          height={96}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-log-in"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10 17 15 12 10 7" />
          <line x1={15} y1={12} x2={3} y2={12} />
        </svg>
        <h1>Welcome Back!</h1>
        <p>To keep connected with us please login with your personal info</p>
        <button type="" id="login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-left-circle"
          >
            <circle cx={12} cy={12} r={10} />
            <polyline points="12 8 8 12 12 16" />
            <line x1={16} y1={12} x2={8} y2={12} />
          </svg>{" "}
          Log In
        </button>
      </div>
    </div>
    <div className="register">
      <div className="content">
        <h1>Sign Up</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-facebook"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
        <svg
          className="feather feather-twitter sc-dnqmqq jxshSx"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
        <svg
          className="feather feather-github sc-dnqmqq jxshSx"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
        <svg
          className="feather feather-linkedin sc-dnqmqq jxshSx"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x={2} y={9} width={4} height={12} />
          <circle cx={4} cy={4} r={2} />
        </svg>
        <span className="loginwith">Or</span>
        <form>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <span className="remember">I accept terms</span>
          <span className="clearfix" />
          <button onclick="return false;">Register</button>
        </form>
      </div>
    </div>
  </div>
  <a
    href="https://codepen.io/eminqasimov/full/KYrVBr"
    target="_blank"
    className="version"
  >
    Rolling Version{" "}
  </a>
</>

  )
}

export default Login