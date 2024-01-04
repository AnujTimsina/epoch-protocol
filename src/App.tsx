import { useState } from "react";
import "./App.css";
import Test from "./assets/test.json";

type TestKeys = keyof typeof Test;
type TestValues = (typeof Test)[TestKeys];

function App() {
  // const [count, setCount] = useState(0);

  const [chain, setchain] = useState<keyof typeof Test>();
  const [dex, setDex] = useState<string[]>();
  const [selectedDex, setSelectedDex] = useState<string>();
  const [tickerPairOption, setTickerPairOption] = useState<string[]>();
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const chainIDs = Object.keys(Test);

  const chainChangeHandler = (e: any) => {
    if (selectedDex) {
      setSelectedDex("");
    }

    if (tickerPairOption?.length) {
      setTickerPairOption(undefined);
    }

    if (selectedTicker) {
      setSelectedTicker("");
    }

    const selectedChain = e.target.value as keyof typeof Test;
    setchain(e.target.value);

    const secondLevellKeys = Test[selectedChain];
    setDex(Object.keys(secondLevellKeys));
  };

  const changeTickerPair = (e: any) => {
    setSelectedTicker(e.target.value);
  };

  const dexChangeHandler = (e: any) => {
    const selectedDex = e.target.value as any;
    // keyof TestValues;
    if (!chain) return;

    setSelectedDex(selectedDex);

    const tokenArray = (Test[chain] as any)[selectedDex];

    const tokenArrayTicker = tokenArray?.map(
      (el: Record<any, any>, index: number) => {
        const individualTokenEntry = Object.values(el);

        const tickerArray = individualTokenEntry.map(
          (tokenDetail: any, innerIndex: number) => {
            return tokenDetail.ticker;
          }
        );
        return tickerArray.join("-");
      }
    );

    setSelectedTicker("");
    setTickerPairOption(tokenArrayTicker);
  };

  return (
    <div>
      <select
        defaultValue={""}
        value={chain}
        name="cars"
        id="cars"
        onChange={chainChangeHandler}
        // disabled
      >
        <option value="" disabled>
          Select a chain
        </option>

        {chainIDs.map((item, id) => (
          <option value={item} key={id}>
            {`ChainID: ${item}`}{" "}
          </option>
        ))}
      </select>

      {dex ? (
        <select
          defaultValue={""}
          value={selectedDex}
          // id="swaaps"
          onChange={dexChangeHandler}
        >
          <option value="" disabled>
            Select a chain
          </option>

          {dex?.map((item, id) => (
            <option value={item} key={id}>
              {item}
            </option>
          ))}
        </select>
      ) : null}

      {tickerPairOption ? (
        <select
          id="pairDetail"
          defaultValue={""}
          value={selectedTicker}
          // defaultValue={undefined}
          onChange={changeTickerPair}
        >
          <option value="" disabled>
            Select a chain
          </option>

          {tickerPairOption?.map((item, id) => (
            <option value={item} key={id}>
              {item}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
}

export default App;
