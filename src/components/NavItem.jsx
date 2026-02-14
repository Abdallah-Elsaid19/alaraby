"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavItem({ href, children }) {
  const pathname = usePathname();

  const isActive =
    pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "relative px-5 py-5.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-secondary text-white dark:bg-gray-950/50 dark:text-white"
          : "text-gray-200 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}
