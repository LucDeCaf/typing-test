import { Component, createEffect } from "solid-js";

interface LetterProps {
    target: string;
    value: string;
    extra: boolean;
}

const LetterBase: Component<{ content: string; class?: string }> = (props) => {
    return <span class={props.class ? props.class : ""}>{props.content}</span>;
};

const Letter: Component<LetterProps> = (props) => {
    if (props.extra) {
        return <LetterBase class="text-red-700" content={props.value} />;
    }

    if (props.value === "") {
        return <LetterBase class="text-slate-400" content={props.target} />;
    }

    return (
        <LetterBase
            class={props.target === props.value ? "" : "text-red-500"}
            content={props.target}
        />
    );
};

export { Letter, type LetterProps };
