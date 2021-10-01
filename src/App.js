import { useCallback, useState } from "react";
import cards from "./cards.json";
import githubSVG from "./assets/github.svg";

function App() {
  const [type, setType] = useState("");
  const handleTypeChange = useCallback((e) => {
    setType(e.target.value);
  }, []);

  const [search, setSearch] = useState("");
  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <header className="flex p-3">
        <select
          onChange={handleTypeChange}
          className="w-2/6 py-2 pl-3 text-white bg-transparent border border-gray-700 rounded appearance-none sm:w-24"
        >
          <option value="">全部</option>
          <option value="trap">陷阱卡</option>
          <option value="magic">魔法卡</option>
          <option value="monster">怪獸卡</option>
        </select>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="搜尋"
          className="w-3/6 px-3 py-1 ml-3 text-base text-gray-100 bg-gray-600 border border-gray-600 rounded outline-none sm:w-80 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-indigo-500 leading-8 transition-colors duration-200 ease-in-out"
          onChange={handleSearchChange}
        />
        <a className="flex items-center justify-center w-1/6 ml-3 sm:w-12" href="https://github.com/tpai/dogedeck" target="_blank" rel="noreferrer">
          <img
            src={githubSVG}
            alt="github"
            className="w-10 h-10 p-2 text-white bg-gray-800 rounded-full"
          />
        </a>
      </header>
      <div className="flex flex-wrap mx-auto overflow-y-scroll cards-container">
        {cards
          .reverse()
          .filter(
            (card) =>
              card.title.includes(search) && (card.type === type || type === "")
          )
          .map((card) => (
            <img
              key={encodeURIComponent(card.title)}
              className="object-cover object-center w-1/2 rounded-lg sm:w-1/3 lg:w-1/6"
              alt={card.title}
              src={card.src}
            />
          ))}
      </div>
    </section>
  );
}

export default App;
