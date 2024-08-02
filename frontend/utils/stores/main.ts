import { create } from "zustand";
import { Analysis } from "../types/Analysis";

type Store = {
  analysis: Analysis[];
  addAnalysis: (data: Analysis) => void;
};

const useStore = create<Store>()((set, get) => ({
  analysis: [],
  addAnalysis: (data: Analysis) =>
    set((state) => ({
      analysis: [
        ...state.analysis,
        {
          name: data.name,
          timestamp: new Date().toString(),
          id: state.analysis.length + 1,
        },
      ],
    })),
}));

export default useStore;
