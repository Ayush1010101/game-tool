import "server-only";

import createClient from "utils/supabase-server";
import Link from "next/link";
import NewItemButton from "./new-item-button";

export default async function Example(props) {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("project")
    .select("*")
    .eq("uuid", props.params.id)
    .single();
  const { data: stories } = await supabase
    .from("item")
    .select("*")
    .eq("project_id", props.params.id);

  return (
    <>
      <div className=" flex min-h-full flex-col  my-10">
        <div className="mx-auto w-full max-w-7xl flex-grow grid gap-4 grid-cols-12">
          <div className=" pb-4 col-span-12">
            <div className="">
              <div className="flex items-center">
                <h1 className="font-medium text-lg leading-6 flex-1">
                  {project.name}&apos;s Items
                </h1>
                <NewItemButton />
              </div>
            </div>
            <ul role="list" className="mt-3 bg-white rounded-lg  shadow">
              {stories?.map((story) => (
                <Link href={`/item/${story.uuid}`} key={story.uuid}>
                  <li
                    key={story.id}
                    className="flex flex-col px-8 py-4 border-solid border-b border-gray-200 hover:bg-red-50"
                  >
                    {story.name}
                    <span className="inline-flex mt-3 items-center rounded-md w-fit bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
                      {story?.category?.name}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
