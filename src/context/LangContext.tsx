import { createContext, useContext } from "react";

export type LangContent = {
  isEnglish: boolean;
  setIsEnglish: (s: boolean) => void;
};

export const LangContext = createContext<LangContent>({
  isEnglish: false,
  setIsEnglish: () => {},
});

export const useLangContext = () => useContext(LangContext);
