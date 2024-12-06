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

  return (
    <div className="w-1/2">
      <h1 className="font-bold text-4xl  w-full mb-2">Undraggable List</h1>
      <div className="flex flex-col gap-y-1">
        {array.map((item) => (
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
