import { Component } from "solid-js";

interface LetterProps {
    target: string;
    value: string;
    extra: boolean;
}

const Letter: Component<LetterProps> = (props) => {
    if (props.extra) {
        return <span class="text-red-900">{props.value}</span>;
    }

    if (props.value === "") {
        return <span class="text-slate-500">{props.target}</span>;
    }

    if (props.target !== props.value) {
        return <span class="text-red-500">{props.target}</span>;
    }

    return <span>{props.value}</span>;
};

export { Letter, type LetterProps };
