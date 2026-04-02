import { useEffect } from 'react';
import { useNotesStore } from '../store/useNotesStore';

export const useKeyboardShortcuts = () => {
  const { addNote, toggleMarkdownMode, activeNoteId, updateNote } = useNotesStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // New Note: Ctrl+N
      if (isCmdOrCtrl && e.key === 'n') {
        e.preventDefault();
        addNote();
      }

      // Toggle Mode: Ctrl+/
      if (isCmdOrCtrl && e.key === '/') {
        e.preventDefault();
        toggleMarkdownMode();
      }

      // Focus Search: Ctrl+F
      if (isCmdOrCtrl && e.key === 'f') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }

      // Bold: Ctrl+B
      if (isCmdOrCtrl && e.key === 'b') {
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLTextAreaElement && activeNoteId) {
          e.preventDefault();
          const start = activeElement.selectionStart;
          const end = activeElement.selectionEnd;
          const value = activeElement.value;
          const selectedText = value.substring(start, end);
          const newValue = value.substring(0, start) + `**${selectedText}**` + value.substring(end);
          
          // Update store
          updateNote(activeNoteId, newValue);
          
          // Reset cursor position (approximate)
          setTimeout(() => {
            activeElement.focus();
            activeElement.setSelectionRange(start + 2, end + 2);
          }, 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addNote, toggleMarkdownMode, activeNoteId, updateNote]);
};
