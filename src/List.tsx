import { RiDraggable } from "react-icons/ri";

type ListProps = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
};

export const List = (props: ListProps) => {
  return (
    <div className="flex items-center p-4 border-2 border-green-200">
      <div className="cursor-grab p-2">
        <RiDraggable size={"22px"} />
      </div>
      <div className="flex items-center gap-x-4">
        {props.icon}
        <div className="font-bold ">{props.title}</div>
        <div className="">{props.description}</div>
      </div>
    </div>
  );
};
