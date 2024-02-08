import { Profile } from "@/types/auth";
import { deleteCookie } from "cookies-next";
import { create } from "zustand";

interface State {
    profile: Profile | null;
    isFetchedProfile: boolean;
    setProfile: (profile: Profile | null) => void;
    logout: () => void;
}

const useUserStore = create<State>()((set) => ({
    profile: null,
    isFetchedProfile: false,
    setProfile: (profile: Profile | null) =>
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
