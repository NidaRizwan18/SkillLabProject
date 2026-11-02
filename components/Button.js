import Link from "next/link";

// variant: primary | secondary | ghost   size: md | sm
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  ...rest
}) {
  const className = `btn btn-${variant} btn-${size}`;
  if (href) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}
