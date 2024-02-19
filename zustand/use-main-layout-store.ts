import { CategoryParent } from "@/types/category-parent";
import { create } from "zustand";

type State = {
    categoryParentList: CategoryParent[];
    setCategoryParentList: (categoryParentList: CategoryParent[]) => void;
};

const useMainLayoutStore = create<State>()((set) => ({
    categoryParentList: [],
    setCategoryParentList: (categoryParentList: CategoryParent[]) =>
        set((state) => ({ ...state, categoryParentList })),
}));

export default useMainLayoutStore;
