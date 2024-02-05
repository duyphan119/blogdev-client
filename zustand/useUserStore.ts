import { Profile } from "@/types/auth";
import { create } from "zustand";

interface State {
    profile: Profile | null;
    isFetchedProfile: boolean;
    setProfile: (profile: Profile | null) => void;
}

const useUserStore = create<State>()((set) => ({
    profile: null,
    isFetchedProfile: false,
    setProfile: (profile: Profile | null) => set((state) => ({
        profile, isFetchedProfile: true
    })),
}))

export default useUserStore;