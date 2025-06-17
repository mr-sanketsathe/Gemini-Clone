import { createContext, useState } from "react";
import runChat from "../config/Gemini"
export const Context = createContext();
function ContextProvider(props) {
    let [input, setInput] = useState('');
    let [showResult, setshowResult] = useState(false);
    let [resultData, setresultData] = useState('');
    let [currPrompt, setcurrPrompt] = useState('');
    let [loading, setLoading] = useState(false);
    let [recent, setRecent] = useState([]);

    let TypeWriter = (index, nextWord) => {
        setLoading(false);
        setInput('');
        setTimeout(() => {
            setresultData((curr) => curr += (nextWord + " "));
        }, 90 * index);
    }
    let onSent = async (query) => {
        console.log(query);
        setresultData('');
        setLoading(true);
        if (query !== undefined) {
            setcurrPrompt(`${query} ?`);
            let response = await runChat(query);
            let responseArray1 = response.split('**');
            let responseStr = '';
            for (let i = 0; i < responseArray1.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    responseStr += responseArray1[i];
                } else {
                    responseStr += `<b>${responseArray1[i]}</b>`
                }
            }
            let responseArray2 = responseStr.split("*" || ":").join(' ');
            let responseArray3 = responseArray2.split(' ');
            for (let i = 0; i < responseArray3.length; i++) {
                TypeWriter(i, responseArray3[i]);
            }
        } else {
            setRecent((curr) => { return [...curr, input] });
            setcurrPrompt(`${input} ?`);
            let response = await runChat(input);

            let responseArray1 = response.split('**');
            let responseStr = '';
            for (let i = 0; i < responseArray1.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    responseStr += responseArray1[i];
                } else {
                    responseStr += `<b>${responseArray1[i]}</b>`
                }
            }
            let responseArray2 = responseStr.split("*" || ":").join(' ');
            let responseArray3 = responseArray2.split(' ');
            for (let i = 0; i < responseArray3.length; i++) {
                TypeWriter(i, responseArray3[i]);
            }
        }
    }
    const contextValue = {
        onSent,
        input,
        setInput,
        showResult,
        setshowResult,
        resultData,
        currPrompt,
        loading,
        setLoading,
        recent,
        runChat,
        setresultData,

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;