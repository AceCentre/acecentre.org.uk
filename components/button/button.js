import Link from "next/link";
import styles from "./button.module.css";

export const Button = ({ children, href }) => {
  if (href) return <Link href={href}>{children}</Link>;

  return <button>{children}</button>;
};
