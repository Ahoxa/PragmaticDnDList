import { useEffect, useState, useRef } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
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
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

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
        onDragEnter: ({ self }) => {
          const currentEdge = extractClosestEdge(self.data);
          setClosestEdge(currentEdge);
        },
        onDrag: ({ self }) => {
          const currentEdge = extractClosestEdge(self.data);
          setClosestEdge(currentEdge);
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
        canDrop: (arg) => {
          console.log(arg.input);
          
          if (arg.source.data.id === props.id) {
            return false;
          }
          return true;
        },
      })
    );
  }, [props.id]);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center p-4 border-2 border-green-200 ${
        isDragging && "opacity-20"
      }`}
    >
      {closestEdge && <DropIndicator edge={closestEdge} />}
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
