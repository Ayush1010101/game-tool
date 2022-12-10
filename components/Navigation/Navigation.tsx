"use client";

import React, { use, useEffect } from "react";
import { Fragment } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, ChartBarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import supabase from "utils/supabase-browser";
import { usePathname } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
];

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon, current: true },
];


export default function Navigation({ user }: any) {

  const pathname = usePathname();

  return (
    <Popover className="z-20 bg-slate-800 shadow sticky top-0 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between py-3 md:justify-start md:space-x-10">
          <Link href="/">
            <div className="flex items-center">
              <span className={`text-xl`}>Minnal</span>
            </div>
          </Link>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          {!user?.id ? (
            <div> Please login </div>
          ) : (
            <nav className="hidden space-x-10 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base ${
                    pathname.startsWith(item.href)
                      ? "text-red-600 font-bold"
                      : "text-gray-500"
                  } hover:text-gray-900`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {user?.id ? (
              <Menu as="div" className="relative ml-4 flex-shrink-0">
                <div>
                  <Menu.Button className="flex rounded-full bg-red-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-700">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item key={"signout"}>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            supabase.auth.signOut();
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign Out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
}
