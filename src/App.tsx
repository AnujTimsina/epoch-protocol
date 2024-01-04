import { useState } from "react";
import "./App.css";
import Test from "./assets/test.json";

type TestKeys = keyof typeof Test;
type TestValues = (typeof Test)[TestKeys];

function App() {
  // const [count, setCount] = useState(0);

  const [chain, setchain] = useState<keyof typeof Test>();
  const [dex, setDex] = useState<string[]>();
  const [tickerPairOption, setTickerPairOption] = useState<string[]>();
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const chainIDs = Object.keys(Test);
  const changeHandler = (e: any) => {
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
    setTickerPairOption(tokenArrayTicker);
    console.log("token array: ", tokenArrayTicker);
  };
  // const swaps = test.map(())

  console.log(dex, "chain");

  return (
    <div>
      <select
        defaultValue={"1"}
        value={chain}
        name="cars"
        id="cars"
        onChange={changeHandler}
      >
        {chainIDs.map((item, id) => (
          <option value={item} key={id}>
            {`ChainID: ${item}`}{" "}
          </option>
        ))}
      </select>

      {dex ? (
        <select id="swaaps" onChange={dexChangeHandler}>
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
          value={selectedTicker}
          onChange={changeTickerPair}
        >
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
