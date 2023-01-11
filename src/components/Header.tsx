import { EngText } from "../content/eng_text";
import { HunText } from "../content/hun_text";

import EngFlat from "../dist/image/eng_flag.png";
import HunFlat from "../dist/image/hun_flag.png";
import { useLangContext } from "../context/LangContext";

export const Header = () => {
  const { isEnglish, setIsEnglish } = useLangContext();

  interface FlagProps {
    src: string;
    alt: string;
    title: string;
    event: () => void;
  }

  const toggle = (props: boolean) => {
    setIsEnglish(props);
  };

  const ChangeLangTitle = () => {
    return (
      <h1 className="text-xl">
        {isEnglish ? EngText.changeLangText : HunText.changeLangText}
      </h1>
    );
  };

  const ChangeLangFlag = (props: FlagProps) => {
    return (
      <button onClick={props.event}>
        <img
          className="w-12"
          src={props.src}
          alt={props.alt}
          title={props.title}
        />
      </button>
    );
  };

  const ChangeLang = () => {
    return (
      <div className="flex items-center justify-center">
        <ChangeLangTitle />
        <div className="flex w-[200px] items-center justify-evenly">
          <ChangeLangFlag
            event={() => toggle(true)}
            src={EngFlat}
            alt={EngFlat}
            title={isEnglish ? "english" : "angol"}
          />
          <ChangeLangFlag
            event={() => toggle(false)}
            src={HunFlat}
            alt={HunFlat}
            title={isEnglish ? "hungarian" : "magyar"}
          />
        </div>
      </div>
    );
  };

  return (
    <header className="mt-12 flex w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-5xl font-semibold text-neutral-200">
        {isEnglish ? EngText.title : HunText.title}
      </h1>
      <ChangeLang />
    </header>
  );
};
