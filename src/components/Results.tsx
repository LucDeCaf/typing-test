import { ImCross } from "solid-icons/im";
import { Accessor, Component, Resource, Setter } from "solid-js";

interface ResultsProps {
    resetter: () => void;
    setShowResults: Setter<boolean>;
    words: Accessor<string[]>;
    target: Resource<string[]>;
}

const Results: Component<ResultsProps> = (props) => {
    return (
        <div class="fixed top-0 left-0 grid place-items-center w-screen h-screen bg-opacity-80 bg-slate-900 p-20">
            <div class="bg-slate-800 rounded-3xl w-full h-full p-12 pt-10 font-mono">
                <div class="flex justify-between items-center">
                    <h1 class="text-4xl">Results</h1>
                    <button
                        onclick={() => {
                            props.setShowResults(false);
                            props.resetter();
                        }}
                        class="text-2xl"
                    >
                        <ImCross />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Results };
