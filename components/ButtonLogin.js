import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, children }) => {
  if (isLoggedIn === true) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
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
