// components/ui/badge.jsx
import React from "react";
import classNames from "classnames";

export function Badge({ children, className }) {
  return (
    <span
      className={classNames(
        "text-xs font-medium px-2 py-1 rounded-full capitalize",
        className
      )}
    >
      {children}
    </span>
  );
}
