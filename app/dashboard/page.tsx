import "server-only";

import createClient from "utils/supabase-server";
import Link from "next/link";


import NewProjectButton from "./new-project-button";

export const revalidate = 0;

export default async function Example(props) {
  const supabase = createClient();

  const { data: projects } = await supabase.from("project").select("*");

  return (
    <div className="mx-auto w-full max-w-7xl flex-grow lg:flex">
      <div className="min-w-0 flex-1 bg-white xl:flex">
        <div className="my-10">
          <div className="flex items-center gap-4">
            <h1 className="flex-1 text-lg font-medium">Projects</h1>

            <NewProjectButton />
          </div>

          <ul
            role="list"
            className="grid my-10 grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {projects?.map((project) => (
              <li key={project.name} className="relative">
                <Link href={`/project/${project.uuid}`}>
                  <div className="group aspect-w-10 aspect-h-5 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <img
                      src={
                        project.image ||
                        "https://media.istockphoto.com/id/1178390169/photo/modern-abstract-background.jpg?b=1&s=170667a&w=0&k=20&c=srHPrqG6Lsg942CS73ZVnINaFzc9D2iP-KbDxPl07v8="
                      }
                      alt=""
                      className="pointer-events-none w-[300px] h-[150px] group-hover:opacity-75"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">
                        View details for {project.name}
                      </span>
                    </button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {project.name}
                  </p>
                  <p className="pointer-events-none block text-sm font-medium text-gray-500">
                    {project.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
