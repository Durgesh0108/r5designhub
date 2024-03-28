import React from "react";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className: String;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden  ${className}`}
    >
      {children}
    </div>
  );
}
