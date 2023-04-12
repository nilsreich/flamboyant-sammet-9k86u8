import { useState } from "react";
import { create, all } from "mathjs";

// create a mathjs instance with configuration
const math = create(all, {
  epsilon: 1e-12,
  matrix: "Matrix",
  number: "BigNumber",
  precision: 64,
  predictable: false,
  randomSeed: null,
});

export default function App() {
  const numkey = [...Array(10).keys()];
  const funckey = ["-", "+", "*", "/"];
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const solve = () => {
    setResult(() => math.evaluate(input).toString());
  };

  const handleKey = (key: string) => {
    if (key.match(/[\d\+\.\-\/]/)) {
      setInput(() => input + key);
    } else if (key === "Backspace") {
      setInput(() => input.slice(0, -1));
    } else if (key === "Enter") {
      setResult(() => math.evaluate(input).toString());
    }
  };
  return (
    <div
      className="h-screen flex flex-col pb-2"
      onKeyDown={(e) => handleKey(e.key)}
      tabIndex={0}
    >
      <div className="m-2 px-2 py-2 bg-slate-100 grow text-3xl">
        <div>{input}</div>
        <div className="text-xl">{result}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 mx-2">
        <div className="col-span-3 grid grid-cols-3 gap-2">
          {numkey.map((item) => {
            return (
              <button
                onClick={() => setInput(input + item)}
                className="rounded bg-blue-300 hover:bg-blue-200 py-2"
              >
                {item}
              </button>
            );
          })}
          <button
            onClick={() => setInput(input + ".")}
            className="rounded bg-blue-300 hover:bg-blue-200 py-2"
          >
            .
          </button>
          <button
            className="rounded bg-blue-300 hover:bg-blue-200 py-2"
            onClick={() => setInput(() => input.slice(0, -1))}
          >
            rem
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {funckey.map((item) => {
            return (
              <button
                onClick={() => setInput(input + item)}
                className="rounded bg-blue-100 py-2 hover:bg-blue-50"
              >
                {item}
              </button>
            );
          })}
          <button
            className="rounded bg-teal-200 py-2 hover:bg-teal-100"
            onClick={() => solve()}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
