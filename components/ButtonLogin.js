import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, extraStyle }) => {
  if (isLoggedIn === true) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary " + ${extraStyle ? extraStyle : ""}`}
      >
        Welcome back {name}
      </Link>
    );
  } else {
    return (
      <button className="btn">
        <Link href="/login">Login</Link>
      </button>
    );
  }
};

export default ButtonLogin;
