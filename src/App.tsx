import { useState } from "react";
import "./App.css";
import Test from "./assets/test.json";

function App() {
  // const [count, setCount] = useState(0);

  const [chain, setchain] = useState(0);
  //
  // console.log(Te)
  //first, create a dropdown with chainids
  //second, create a dropdown which shows the exchanges for the selected chainIDs
  //thirdly, create a dropdown which shows the token pairs for the selected exchange
  //fourthly, display the token selected  (USDC - WETH)
  // console.log("::Test", Object.keys(Test));
  const chainIDs = Object.keys(Test);
  // const test = Object.values(Test);

  // console.log(, "values");

  const changeHandler = (e: any) => {
    setchain(e.target.value);
  };
  // const swaps = test.map(())

  console.log(chain, "chain");

  return (
    <div>
      <select name="cars" id="cars" onChange={changeHandler}>
        {chainIDs.map((item, id) => (
          <option value={item} key={id}>
            {`ChainID: ${item}`}{" "}
          </option>
        ))}
      </select>

      <select name="swaps" id="swaaps">
        <option value={"a"}>
          {}
          {/* {Test[chain]} */}
        </option>
      </select>
    </div>
  );
}

export default App;
