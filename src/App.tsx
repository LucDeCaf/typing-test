import {
    createSignal,
    type Component,
    For,
    createEffect,
    Show,
} from "solid-js";
import { Word } from "./components/Word";
import { ImCross } from "solid-icons/im";

const App: Component = () => {
    const targetWords = "These are the target words.".split(" ");
    const [words, setWords] = createSignal([""]);
    const [showResults, setShowResults] = createSignal(false);

    const resetTest = () => {
        setWords([""]);
        addEventListener("keydown", handleKeyDown);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const newWords = [...words()];

        switch (e.code) {
            case "Space":
                if (newWords.length === targetWords.length) {
                    removeEventListener("keydown", handleKeyDown);
                    setShowResults(true);
                    return;
                }
                if (newWords[newWords.length - 1].length > 0) {
                    newWords.push("");
                }
                break;

            case "Backspace":
                if (newWords.length === 1 && newWords[0] === "") return;

                if (e.altKey) {
                    if (newWords[newWords.length - 1].length === 0) {
                        newWords.pop();
                    }
                    newWords[newWords.length - 1] = "";
                    break;
                }

                if (newWords[newWords.length - 1].length === 0) {
                    newWords.pop();
                    break;
                }

                newWords[newWords.length - 1] = newWords[
                    newWords.length - 1
                ].slice(0, newWords[newWords.length - 1].length - 1);

                break;

            default:
                if (e.ctrlKey || e.metaKey || e.key === "Alt") return;

                if (e.key.length === 1) {
                    newWords[newWords.length - 1] += e.key;
                }
                break;
        }

        setWords(newWords);
    };

    resetTest();

    createEffect(() => console.log(words()));

    return (
        <main class="px-16 pt-32">
            <h1 class="text-center text-4xl text-slate-300 font-mono">
                Start typing to take the test
            </h1>
            <div class="p-24 text-2xl font-mono flex">
                <div class="flex gap-4">
                    <For each={targetWords}>
                        {(target, i) => (
                            <Word
                                target={target}
                                value={words()[i()] ? words()[i()] : ""}
                            />
                        )}
                    </For>
                </div>
            </div>
            <Show when={showResults()}>
                <div class="fixed top-0 left-0 grid place-items-center w-screen h-screen bg-opacity-80 bg-slate-900 p-20">
                    <div class="bg-slate-800 rounded-3xl w-full h-full p-12 pt-10 font-mono">
                        <div class="flex justify-between items-center">
                            <h1 class="text-4xl">Results</h1>
                            <button
                                onclick={() => {
                                    setShowResults(false);
                                    resetTest();
                                }}
                                class="text-2xl"
                            >
                                <ImCross />
                            </button>
                        </div>
                    </div>
                </div>
            </Show>
        </main>
    );
};

export default App;
