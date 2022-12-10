"use client";

import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

import Link from "next/link";
import { PlayIcon, CheckIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import Spinner from "components/Spinner";
import { useForm } from "react-hook-form";

export default function Action(props) {
  const { action, idx, len, icon } = props;
  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div
      // href={action.href}
      onClick={() => setIsOpen(true)}
      key={action.name}
      className={classNames(
        idx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
        idx === 1 ? "sm:rounded-tr-lg" : "",
        idx === len - 2 ? "sm:rounded-bl-lg" : "",
        idx === len - 1 ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none" : "",
        "bg-white relative group shadow bg-white-50 m-3 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-500"
      )}
    >

      <div>
        <span
          className={classNames(
            action.iconBackground,
            action.iconForeground,
            "rounded-lg inline-flex p-3 ring-4 ring-white"
          )}
        >
          <props.icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium">
          {/* <a href={action.href} className="focus:outline-none"> */}
          {/* Extend touch target to entire panel */}
          <span className="absolute inset-0" aria-hidden="true" />
          {action.name}
          {/* </a> */}
        </h3>
        <p className="mt-2 text-sm text-gray-500">{action.description}</p>
      </div>
      <span
        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </div>
  );
}

