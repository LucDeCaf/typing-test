import { ImCross } from "solid-icons/im";
import type { Accessor, Component, Setter } from "solid-js";

interface ResultsProps {
    show: Accessor<boolean>;
    words: Accessor<string[]>;
    target: Accessor<string[]>;
    setShow: Setter<boolean>;
}

const Results: Component<ResultsProps> = (props) => {
    return (
        <div
            class={
                "fixed top-0 left-0 grid place-items-center w-screen h-screen bg-slate-900 p-20 transition-opacity " +
                (props.show() ? "opacity-100" : "opacity-0")
            }
        >
            <div class="bg-slate-800 rounded-3xl w-full h-full p-12 pt-10 font-mono">
                <div class="flex justify-between items-center">
                    <h1 class="text-4xl">Results</h1>
                    <button
                        onclick={() => {
                            props.setShow(false);
                        }}
                        class="text-2xl focus-visible:outline-none"
                    >
                        <ImCross />
                    </button>
                </div>
                <hr class="border my-6" />
                <div class="text-xl flex flex-col gap-2">
                    <p class="flex justify-between">
                        <span>wpm</span>
                        <span>wip</span>
                    </p>
                    <p class="flex justify-between">
                        <span>acc</span>
                        <span>wip</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { Results };
