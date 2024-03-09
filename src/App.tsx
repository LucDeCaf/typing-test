import {
    createSignal,
    type Component,
    For,
    createEffect,
} from "solid-js";
import { Word } from "./components/Word";
import { Results } from "./components/Results";
import { generate } from "random-words";

const App: Component = () => {
    const [target, setTarget] = createSignal<string[]>([]);
    const [words, setWords] = createSignal([""]);
    const [showResults, setShowResults] = createSignal(false);

    const generateTarget = (number: number) => {
        const target = generate({
            exactly: number,
            minLength: 2,
            maxLength: 8,
        });

        return target as string[];
    };

    const startTest = () => {
        setTarget(generateTarget(10));
        setWords([""]);
        addEventListener("keydown", handleKeyDown);
    };

    const stopTest = () => {
        removeEventListener("keydown", handleKeyDown);
        setShowResults(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const newWords = [...words()];

        switch (e.code) {
            case "Space":
                if (newWords.length === target()!.length) {
                    stopTest();
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

        if (
            newWords.length === target()!.length &&
            newWords[newWords.length - 1] === target()![target()!.length - 1]
        ) {
            stopTest();
        }
        setWords(newWords);
    };

    createEffect(() => {
        showResults() ? null : startTest();
    });

    return (
        <main class="px-16 pt-32">
            <h1 class="text-center text-4xl text-slate-300 font-mono">
                Start typing to take the test
            </h1>
            <div class="p-24 text-2xl font-mono">
                <For each={target()}>
                    {(target, i) => (
                        <Word
                            target={target}
                            value={words()[i()] ? words()[i()] : ""}
                        />
                    )}
                </For>
            </div>
            <Results
                show={showResults}
                words={words}
                target={target}
                setShow={setShowResults}
            />
        </main>
    );
};

export default App;
