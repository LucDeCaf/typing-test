import { Component, For } from "solid-js";
import { Letter } from "./Letter";

interface WordProps {
    target: string;
    value: string;
}

const Word: Component<WordProps> = (props) => {
    const targetLetters = props.target.split("");
    const valueLetters = props.value.split("");
    const extraLetters = valueLetters.slice(targetLetters.length);

    return (
        <div>
            <For each={targetLetters}>
                {(target, i) => (
                    <Letter
                        target={target}
                        value={valueLetters[i()] ? valueLetters[i()] : ""}
                        extra={false}
                    />
                )}
            </For>
            <For each={extraLetters}>
                {(extra, i) => <Letter target="" value={extra} extra={true} />}
            </For>
        </div>
    );
};

export { Word, type WordProps };
