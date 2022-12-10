
import { NewspaperIcon } from "@heroicons/react/24/solid";

const actions = [
  {
    name: "Create a story",
    href: "/story/1",
    iconForeground: "text-orange-700",
    iconBackground: "bg-orange-50",
    icon: NewspaperIcon,
    disabled: true,
    description:
      "Create a story and give it certain scenarios",
  },
];

import Action from "./action";

export default function NewItemDialog(props) {
  
  return (
    <section
      aria-labelledby="quick-links-title "
      className="mx-auto my-20 b"
    >
      <h1 className="text-4xl my-10 mx-auto text-center" id="quick-links-title">
        What would you like to do?
      </h1>
      <div className="overflow-hidden  sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0">
        {actions.map((action, idx) => (
          <Action action={action} icon={action.icon} key={idx} idx={idx} len={actions.length} onSubmit={props.onSubmit} isLoading={props.loading} onClick={props.onClick} />
        ))}
      </div>
    </section>
  );
}
