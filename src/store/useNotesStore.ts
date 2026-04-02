import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  searchQuery: string;
  isMarkdownMode: boolean;
  
  // Actions
  addNote: () => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleMarkdownMode: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      activeNoteId: null,
      searchQuery: '',
      isMarkdownMode: false,

      addNote: () => set((state) => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title: 'New Note',
          content: '',
          updatedAt: Date.now(),
        };
        return {
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        };
      }),

      updateNote: (id, content) => set((state) => {
        const updatedNotes = state.notes.map((note) => {
          if (note.id === id) {
            const lines = content.trim().split('\n');
            const title = lines[0] ? lines[0].replace(/[#*`]/g, '').slice(0, 40) : 'Untitled';
            return {
              ...note,
              content,
              title: title || 'Untitled',
              updatedAt: Date.now(),
            };
          }
          return note;
        });

        // Move active note to top of list
        const activeNote = updatedNotes.find(n => n.id === id);
        const otherNotes = updatedNotes.filter(n => n.id !== id);
        
        return {
          notes: activeNote ? [activeNote, ...otherNotes] : updatedNotes,
        };
      }),

      deleteNote: (id) => set((state) => {
        const remainingNotes = state.notes.filter((n) => n.id !== id);
        return {
          notes: remainingNotes,
          activeNoteId: state.activeNoteId === id ? (remainingNotes[0]?.id || null) : state.activeNoteId,
        };
      }),

      setActiveNote: (id) => set({ activeNoteId: id }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      toggleMarkdownMode: () => set((state) => ({ isMarkdownMode: !state.isMarkdownMode })),
    }),
    {
      name: 'inote-storage',
    }
  )
);
