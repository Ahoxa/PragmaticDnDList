import { useEffect, useState, useRef } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import invariant from "tiny-invariant";
import { RiDraggable } from "react-icons/ri";

type ListProps = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
};

export const List = (props: ListProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const itemRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = itemRef.current;
    const dragHandleEl = dragHandleRef.current;
    invariant(el);
    invariant(dragHandleEl);

    combine(
      draggable({
        element: el,
        dragHandle: dragHandleEl,
        getInitialData() {
          return { id: props.id };
        },
        onDragStart() {
          setIsDragging(true);
        },
        onDrag() {
          setIsDragging(true);
        },
        onDrop() {
          setIsDragging(false);
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({ x: "16px", y: "16px" }),
            render({ container }) {
              container.innerHTML = `${props.title}`;
            },
          });
        },
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) => {
          const data = {
            id: props.id,
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
      })
    );
  }, [props.id]);

  return (
    <div
      ref={itemRef}
      className={`flex items-center p-4 border-2 border-green-200 ${
        isDragging && "opacity-20"
      }`}
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
