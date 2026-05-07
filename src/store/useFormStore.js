import { create } from 'zustand';

export const useFormStore = create((set) => ({
  fields: [],
  focusedFieldId: null,

  setFields: (fields) => set({ fields }),

  updateField: (id, value) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, value } : f)),
    })),

  setFocusedField: (id) => set({ focusedFieldId: id }),
}));
