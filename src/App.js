import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { InputBox } from "./InputBox";

const configuration = new Configuration({
  // apiKey: process.env.REACT_APP_API_KEY,
  // apiKey: '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',
  apiKey: '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',

  // apiKey: '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',
});
const openai = new OpenAIApi(configuration);

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState("512x512");
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {

  try {
    const sizeval = document.getElementById("size_select").value;
    console.log("99999999999999999999999 =>",sizeval);
    console.log("generate Image",userPrompt,number,size);
    const imageParameters = {
      prompt: userPrompt,
      n: parseInt(number),
      // size: size,
      size: sizeval,
    };
    const response = await openai.createImage(imageParameters);
    const urlData = response.data.data[0].url;
    console.log(response);
    setImageUrl(urlData);
    
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

  return (
    <main className="App">
      {imageUrl && <img src={imageUrl} className="image" alt="ai thing" />}
      <InputBox label={"Description"} setAttribute={setUserPrompt} />
      <InputBox label={"Amount"} setAttribute={setNumber} />

      <select id="size_select">
	      <option value="256x256">Small</option>
	      <option value="512x512">Medium</option>
	      <option value="1024x1024">Large</option>
      </select>
      <button className="main-button" onClick={() => generateImage()}>
        Generate
      </button>
    </main>
  );
}

export default App;