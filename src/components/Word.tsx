import { Component, For, Show } from "solid-js";
import { Letter } from "./Letter";

interface WordProps {
    target: string;
    value: string;
}

const Word: Component<WordProps> = (props) => {
    const targetLetters = () => props.target.split("");
    const valueLetters = () => props.value.split("");
    
    return (
        <div>
            <For each={valueLetters()}>
                {(value, i) => (
                    <Letter
                        target={targetLetters()[i()]}
                        value={value}
                        extra={i() >= targetLetters().length}
                    />
                )}
            </For>
            <Show when={targetLetters().length > valueLetters().length}>
                <For each={targetLetters().slice(valueLetters().length)}>
                    {(target, _i) => (
                        <Letter
                            target={target}
                            value={''}
                            extra={false}
                        />
                    )}
                </For>
            </Show>
        </div>
    );
};

export { Word, type WordProps };
