"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import supabase from "utils/supabase-browser";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import Spinner from "components/Spinner";

export default function NewProjectDialog(props) {
  const { register, handleSubmit } = useForm();

  const { mutate, isLoading, isSuccess, data } = useMutation({
    mutationKey: ["createProject"],
    mutationFn: async (data: any) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const result = await supabase
        .from("project")
        .insert({
          name: data.name,
          description: data.description,
          user_id: session?.user?.id || "7626d657-a45b-4fc8-a8e9-f7606b560ffb",
        })
        .select();
      return result;
    },
  });

  const router = useRouter();

  if (isSuccess) {
    router.push(`/project/${data.data[0]?.uuid}`);
  }

  return (
    <form
      className="space-y-8 max-w-4xl mx-auto "
      onSubmit={handleSubmit(mutate as any)}
    >
      <div className=" divide-gray-200">
        <div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Create New Project
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Projects are the basic wrapper around all what we have
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-12  ">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <desc>
                <p className="my-1 text-sm text-gray-500">
                  Give your project a descriptive name, we&apos;ll use this to
                  identify your project.
                </p>
              </desc>
              <div className="mt-1 flex rounded-md shadow-s m">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  {...register("name", { required: true })}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-12  ">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Description (optional)
              </label>
              <desc>
                <p className="my-1 text-sm text-gray-500">
                  Give your project a description, this is mostly for you own
                  reference in the future
                </p>
              </desc>
              <div className="mt-1 flex rounded-md shadow-s m">
                <textarea
                  name="description"
                  id="description"
                  autoComplete="description"
                  {...register("description", { required: false })}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pr-3 grid grid-cols-12">
        <button
          type="button"
          onClick={() => props.onClick(false)}
          className="rounded-md border col-span-6 w-full border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex col-span-6 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isLoading ? <Spinner /> : "Create"}
        </button>
      </div>
    </form>
  );
}
