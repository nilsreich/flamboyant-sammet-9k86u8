import { useTimer } from "react-timer-hook";
import { PlayIcon, PauseIcon, ResetIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import * as Slider from "@radix-ui/react-slider";

export default function App() {
  const audio = useRef(null);
  let time = new Date();
  time.setSeconds(time.getSeconds() + 300);

  const { seconds, isRunning, minutes, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => audio.current!.play(),
  });

  const changeTime = (newTime: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + newTime);
    restart(time);
    pause();
  };

  return (
    <div className="h-screen flex bg-neutral-950 text-slate-300">
      <audio src="./water.mp3" ref={audio} />
      <div className="m-auto">
        <div className="flex gap-6 items-center">
          <div className="w-68 text-right py-12 mx-auto text-9xl">
            {minutes < 10 ? "0" + minutes.toString() : minutes}:
            {seconds < 10 ? "0" + seconds.toString() : seconds}
          </div>
          <div>
            <form>
              <Slider.Root
                className="relative flex flex-col items-center select-none touch-none w-0.5 h-[350px] mt-10"
                defaultValue={[300]}
                onValueChange={(e) => changeTime(e[0])}
                orientation="vertical"
                max={3599}
                disabled={isRunning ? true : false}
                step={60}
                aria-label="Volume"
              >
                <Slider.Track className="bg-neutral-800 w-0.5 grow rounded-lg">
                  <Slider.Range className="bg-neutral-800 absolute w-full rounded-lg" />
                </Slider.Track>
                <Slider.Thumb className="-mt-2 bg-neutral-400 focus:outline-none -ml-2 w-4 rounded-full h-4 absolute" />
              </Slider.Root>
            </form>
          </div>
        </div>
        <div className="w-min flex mx-auto">
          {isRunning ? (
            <button
              className="bg-black px-4  py-2"
              onClick={() => {
                pause();
              }}
            >
              <PauseIcon />
            </button>
          ) : (
            <button
              className="bg-black px-4 py-2"
              onClick={() => {
                resume();
              }}
            >
              <PlayIcon />
            </button>
          )}

          <button
            className="bg-black px-4 py-2 border-l  border-neutral-800"
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + value);
              restart(time);
            }}
          >
            <ResetIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
