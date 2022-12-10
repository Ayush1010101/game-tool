"use client";

import React, { useState, Fragment } from "react";

import { Transition, Dialog } from "@headlessui/react";

import NewProject from "./new-item-dialog";

export default function NewProjectButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-7xl flex-grow lg:flex">
        <div className="min-w-0 flex-1 bg-white xl:flex">
          <div className="lg:min-w-0 lg:flex-1">
            <div className=" pb-4 xl:border-t-0  xl:pt-6">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-flex  justify-center rounded-md border  bg-red-600 border-red-300 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-50 focus:ring-offset-2"
                >
                  New Item
                </button>

                <Transition.Root show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="fixed z-100"
                    onClose={() => setIsOpen(false)}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed z-100 inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-100 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all max-w-7xl mt-10 z-200">
                            <NewProject onClick={setIsOpen} />
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition.Root>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
