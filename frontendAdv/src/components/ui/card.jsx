// components/ui/card.jsx
import React from "react";
import classNames from "classnames";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={classNames(
        "bg-white rounded-xl border border-gray-200 p-4 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={classNames("mb-2", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h3
      className={classNames(
        "text-sm font-semibold text-gray-800",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className }) {
  return <div className={classNames("text-sm", className)}>{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={classNames("text-sm", className)}>{children}</div>
}