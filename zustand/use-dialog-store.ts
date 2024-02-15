import { ReactNode, Fragment } from "react";
import { create } from "zustand";

type Option = {
    title: string;
    onConfirm: () => void;
    confirmVariant:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost";
    description: string;
    content: ReactNode | null;
    okText: string;
    cancelText: string;
};

type State = Option & {
    visible: boolean;
    show: (option?: Partial<Option>) => void;
    toggleVisible: () => void;
};

const useDialogStore = create<State>()((set) => ({
    visible: false,
    title: "Are you absolutely sure?",
    show: (option?: Partial<Option>) =>
        set(() => {
            return {
                visible: true,
                ...option,
            };
        }),
    toggleVisible: () =>
        set((state) => ({ ...state, visible: !state.visible })),
    onConfirm: () => {},
    confirmVariant: "destructive",
    description:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    content: null,
    okText: "Yes",
    cancelText: "No",
}));

export default useDialogStore;
