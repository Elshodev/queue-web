import { create } from "zustand";

type StateAction = {
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  setCheck: (check: any) => void;
  modals?: {
    logout?: boolean;
    scan?: boolean;
    queue?: boolean;
    queueOvir?: boolean;
    service?: boolean;
  };
  check?: any;
};

const initialState: StateAction = {
  openModal: () => {},
  closeModal: () => {},
  setCheck: () => {},
  modals: {
    logout: false,
    scan: false,
    queue: false,
    queueOvir: false,
    service: false,
  },
  check: null,
};

const modalsStore = create<StateAction>((set) => ({
  ...initialState,
  openModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: true } }));
  },
  closeModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: false } }));
  },
  setCheck: (check) => {
    set({ check });
  },
}));

export default modalsStore;
