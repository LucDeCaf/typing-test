import {
    createSignal,
    type Component,
    For,
    Show,
    createResource,
    Switch,
    Match,
} from "solid-js";
import { Word } from "./components/Word";
import { Results } from "./components/Results";

const fetchWords = async (number: number) => {
    const res = await fetch(
        `https://random-word-api.herokuapp.com/word?number=${number}`
    );
    return (await res.json()) as string[];
};

const App: Component = () => {
    const [targetWords, { refetch: refetchTargetWords }] = createResource(
        () => 10,
        fetchWords
    );
    const [words, setWords] = createSignal([""]);
    const [showResults, setShowResults] = createSignal(false);

    const resetTest = () => {
        refetchTargetWords();
        setWords([""]); 
        addEventListener("keydown", handleKeyDown);
    };

    const stopTest = () => {
        removeEventListener("keydown", handleKeyDown);
        setShowResults(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!targetWords()) return;

        const newWords = [...words()];

        switch (e.code) {
            case "Space":
                if (newWords.length === targetWords()!.length) {
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
            newWords.length === targetWords()!.length &&
            newWords[newWords.length - 1] ===
                targetWords()![targetWords()!.length - 1]
        ) {
            stopTest();
        }
        setWords(newWords);
    };

    resetTest();

    return (
        <main class="px-16 pt-32">
            <h1 class="text-center text-4xl text-slate-300 font-mono">
                Start typing to take the test
            </h1>
            <div class="p-24 text-2xl font-mono">
                <Switch>
                    <Match when={targetWords.loading}>
                        <div class="text-slate-600 text-center w-full">
                            Loading...
                        </div>
                    </Match>
                    <Match when={targetWords()}>
                        <For each={targetWords()}>
                            {(target, i) => (
                                <Word
                                    target={target}
                                    value={words()[i()] ? words()[i()] : ""}
                                />
                            )}
                        </For>
                    </Match>
                </Switch>
            </div>
            <Show when={showResults()}>
                <Results
                    words={words}
                    target={targetWords}
                    setShowResults={setShowResults}
                    resetter={resetTest}
                />
            </Show>
        </main>
    );
};

export default App;
