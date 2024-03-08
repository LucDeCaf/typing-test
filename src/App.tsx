import { createSignal, type Component, For, createEffect } from "solid-js";
import { Word } from "./components/Word";

const App: Component = () => {
    const targetWords = "These are the target words.".split(" ");
    const [words, setWords] = createSignal([""]);

    addEventListener("keydown", (e) => {
        const newWords = [...words()];

        switch (e.code) {
            case "Space":
                if (newWords[newWords.length - 1].length > 0) {
                    newWords.push("");
                }
                break;

            case "Backspace":
                if (newWords.length === 1 && newWords[0] === "") break;

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
                if (e.ctrlKey || e.metaKey) break;

                if (e.key.length === 1) {
                    newWords[newWords.length - 1] += e.key;
                }
                break;
        }

        setWords(newWords);
    });

    createEffect(() => console.log(words()));

    return (
        <main class="px-16 pt-32">
            <h1 class="text-center text-4xl">Start typing to take the test</h1>
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
        </main>
    );
};

export default App;
