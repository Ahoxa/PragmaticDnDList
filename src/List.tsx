import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { RiDraggable } from "react-icons/ri";

type ListProps = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
};

export const List = (props: ListProps) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = itemRef.current;
    const dragHandleEl = dragHandleRef.current;
    invariant(el);
    invariant(dragHandleEl);

    draggable({
      element: el,
      dragHandle: dragHandleEl,
    });
  }, []);

  return (
    <div
      ref={itemRef}
      className="flex items-center p-4 border-2 border-green-200"
    >
      <div ref={dragHandleRef} className="cursor-grab p-2">
        <RiDraggable size={"22px"} />
      </div>
      <div className="flex items-center gap-x-4">
        {props.icon}
        <div className="font-bold">{props.title}</div>
        <div className="">{props.description}</div>
      </div>
    </div>
  );
};
