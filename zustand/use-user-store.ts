import { Author } from "@/types/user";
import { create } from "zustand";

type State = {
    profile: Author | null;
    isFetchedProfile: boolean;
    setProfile: (profile: Author | null) => void;
    logout: () => void;
};

const useUserStore = create<State>()((set) => ({
    profile: null,
    isFetchedProfile: false,
    setProfile: (profile: Author | null) =>
        set((state) => ({
            profile,
            isFetchedProfile: true,
        })),
    logout: () =>
        set((state) => ({
            profile: null,
            isFetchedProfile: true,
        })),
}));

export default useUserStore;
