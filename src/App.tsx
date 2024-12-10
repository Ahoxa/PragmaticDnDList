import { useState, useEffect } from "react";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { flushSync } from "react-dom";
import { List } from "./List";
import { RiReactjsFill, RiVuejsFill, RiSvelteFill } from "react-icons/ri";

function App() {
  const array = [
    {
      id: "react",
      icon: <RiReactjsFill size={"22px"} />,
      title: "React",
      description: "React is developed by Jordan Walke.",
    },
    {
      id: "vue",
      icon: <RiVuejsFill size={"22px"} />,
      title: "Vue",
      description: "Vue is developed by Evan You.",
    },
    {
      id: "svelte",
      icon: <RiSvelteFill size={"22px"} />,
      title: "Svelte",
      description: "Svelte is developed by Rich Harris.",
    },
  ];

  const [listItem, setListItem] = useState(array);

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {       
        return source.data && source.data.id !== null;
      },
      onDrop({ source, location }) {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceData = source.data;
        const targetData = target.data;
        if (!sourceData || !targetData) return;

        const indexOfSource = listItem.findIndex(
          (item) => item.id === sourceData.id
        );
        const indexOfTarget = listItem.findIndex(
          (item) => item.id === targetData.id
        );

        if (indexOfTarget < 0 || indexOfSource < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        // DOMを更新するためにflushSyncを使用
        flushSync(() => {
          setListItem(
            reorderWithEdge({
              list: listItem,
              startIndex: indexOfSource,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: "vertical",
            })
          );
        });
      },
    });
  }, [listItem]);

  return (
    <div className="w-1/2">
      <h1 className="font-bold text-4xl  w-full mb-2">Draggable List</h1>
      <div className="flex flex-col gap-y-1">
        {listItem.map((item) => (
          <List
            key={item.id}
            id={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
