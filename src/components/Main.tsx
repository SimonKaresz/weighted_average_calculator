import { useState } from "react";
import { EngText } from "../content/eng_text";
import { HunText } from "../content/hun_text";
import { useLangContext } from "../context/LangContext";

export default function Main() {
  let initialVal: number[] = [1, 1, 1, 1, 1, 1, 1, 1];

  const [initialCountersGrade, setInitialCountersGrade] =
    useState<number[]>(initialVal);
  const [initialCountersCredit, setInitialCountersCredit] =
    useState<number[]>(initialVal);

  const [countersGrade, setCountersGrade] =
    useState<number[]>(initialCountersGrade);
  const [countersCredit, setCountersCredit] = useState<number[]>(
    initialCountersCredit
  );

  const [result, setResult] = useState<number>();

  const { isEnglish } = useLangContext();

  //Weighted Average
  const getResult = (grades: number[], credits: number[]) => {
    let a = 0;
    let b = 0;
    for (let i = 0; i < grades.length; i++) {
      const weight = credits[i];
      a += weight * grades[i];
      b += weight;
    }
    return Math.round((a / b) * 100) / 100;
  };

  /////Line Management/////
  const IncreaseHandler = () => {
    const insertItem = 1;
    setCountersGrade([...countersGrade, insertItem]);
    setCountersCredit([...countersCredit, insertItem]);
  };

  const IncreaseQuantity = () => {
    return (
      <button
        className="mx-6 w-[100px] rounded-xl bg-slate-400 py-2 text-2xl font-semibold"
        onClick={IncreaseHandler}
      >
        {isEnglish ? EngText.add : HunText.add}
      </button>
    );
  };

  const DecreaseHandler = () => {
    let newGradeArray = countersGrade.slice(0, countersGrade.length - 1);
    let newCreditArray = countersCredit.slice(0, countersCredit.length - 1);
    if (newGradeArray.length > 2 && newCreditArray.length > 2) {
      setCountersGrade(newGradeArray);
      setCountersCredit(newCreditArray);
    } else {
      if (isEnglish) {
        alert("Minimum three line required!");
      } else {
        alert("Minimum 3 sor kötelező!");
      }
    }
  };

  const DecreaseQuantity = () => {
    return (
      <button
        className="mx-6 w-[100px] rounded-xl bg-slate-700 py-2 text-2xl font-semibold text-neutral-200"
        onClick={DecreaseHandler}
      >
        {isEnglish ? EngText.subtract : HunText.subtract}
      </button>
    );
  };

  /////Grade/////
  function handleIncrementGradeClick(index: number) {
    const nextCounters = countersGrade.map((c, i) => {
      if (i === index && c < 5) {
        return c + 1;
      } else {
        return c;
      }
    });
    setCountersGrade(nextCounters);
  }

  function handleDecrementGradeClick(index: number) {
    const nextCounters = countersGrade.map((c, i) => {
      if (i === index && c > 1) {
        return c - 1;
      } else {
        return c;
      }
    });
    setCountersGrade(nextCounters);
  }

  /////Credit/////
  function handleIncrementCreditClick(index: number) {
    const nextCounters = countersCredit.map((c, i) => {
      if (i === index && c < 12) {
        return c + 1;
      } else {
        return c;
      }
    });
    setCountersCredit(nextCounters);
  }

  function handleDecrementCreditClick(index: number) {
    const nextCounters = countersCredit.map((c, i) => {
      if (i === index && c > 1) {
        return c - 1;
      } else {
        return c;
      }
    });
    setCountersCredit(nextCounters);
  }

  /////Input component/////
  const Input = (props: any) => {
    return (
      <div className="flex h-full w-[100%] flex-col items-center">
        {props.array.map((num: number, i: number) => (
          <div
            key={i}
            className="flex h-[100px] w-[100%] items-center justify-around border-t"
          >
            <button
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border text-5xl font-semibold text-neutral-300 sm:pb-[10px]"
              onClick={() => {
                props.funcDec(i);
              }}
            >
              -
            </button>
            <p className="cursor-default text-4xl text-neutral-300">{num}</p>
            <button
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border text-5xl font-semibold text-neutral-300 lg:pb-[10px]"
              onClick={() => {
                props.funcInc(i);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>
    );
  };

  const GradeComponentHeader = () => {
    return (
      <h1 className="py-2 text-4xl font-semibold text-emerald-400">
        {isEnglish ? EngText.grade : HunText.grade}
      </h1>
    );
  };

  const GradeComponentInputs = () => {
    return (
      <Input
        array={countersGrade}
        stArray={setCountersGrade}
        funcInc={handleIncrementGradeClick}
        funcDec={handleDecrementGradeClick}
        target="Grade"
        setInitial={setInitialCountersGrade}
        initial={initialCountersGrade}
      />
    );
  };

  const GradeComponent = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-l-xl bg-slate-600/80">
        <GradeComponentHeader />
        <GradeComponentInputs />
      </div>
    );
  };

  const CreditComponentHeader = () => {
    return (
      <h1 className="py-2 text-4xl font-semibold text-red-500">
        {isEnglish ? EngText.credits : HunText.credits}
      </h1>
    );
  };

  const CreditComponentInputs = () => {
    return (
      <Input
        array={countersCredit}
        stArray={setCountersCredit}
        funcInc={handleIncrementCreditClick}
        funcDec={handleDecrementCreditClick}
        target="Credit"
        setInitial={setInitialCountersCredit}
        initial={initialCountersCredit}
      />
    );
  };

  const CreditComponent = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-r-xl bg-slate-800/70">
        <CreditComponentHeader />
        <CreditComponentInputs />
      </div>
    );
  };

  const CalculatBtn = () => {
    return (
      <button
        className="h-[40px] w-[50%] rounded-xl border-2 border-green-500 bg-green-200/40 text-3xl font-bold text-neutral-200 shadow-2xl"
        onClick={() => setResult(getResult(countersGrade, countersCredit))}
      >
        {isEnglish ? EngText.calculation : HunText.calculation}
      </button>
    );
  };

  const ResultField = () => {
    return (
      <p className="w-[50%] text-center text-3xl font-semibold text-neutral-200">
        {isEnglish ? EngText.average : HunText.average}
        <span className="mx-2 text-neutral-800 underline">{result}</span>
      </p>
    );
  };

  const CalculationComponent = () => {
    return (
      <div className="my-6 flex w-full max-w-[90%] items-center justify-center">
        <CalculatBtn />
        <ResultField />
      </div>
    );
  };

  return (
    <main className="mt-16 flex w-full flex-col items-center justify-center lg:w-[800px]">
      <div className="flex w-full items-center justify-center">
        <IncreaseQuantity />
        <DecreaseQuantity />
      </div>
      <div className="mt-12 flex w-full max-w-[97%] items-center justify-center">
        <GradeComponent />
        <CreditComponent />
      </div>
      <CalculationComponent />
    </main>
  );
}
