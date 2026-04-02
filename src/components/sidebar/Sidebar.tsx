import React from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const { notes, activeNoteId, setActiveNote, deleteNote, addNote, searchQuery } = useNotesStore();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes</h2>
        <button onClick={addNote} className="add-note-btn" title="New Note (Ctrl+N)">
          <Plus size={20} />
        </button>
      </div>

      <div className="notes-list">
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
              onClick={() => setActiveNote(note.id)}
            >
              <div className="note-item-content">
                <span className="note-title">{note.title}</span>
                <span className="note-date">
                  {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredNotes.length === 0 && (
          <div className="empty-state">
            {searchQuery ? 'No notes found' : 'No notes yet'}
          </div>
        )}
      </div>

      <style>{`
        .sidebar {
          width: 280px;
          height: 100%;
          background-color: var(--surface-color);
          border-right: 1px solid #222;
          display: flex;
          flex-direction: column;
          user-select: none;
          transition: transform 0.3s var(--easing), width 0.3s var(--easing);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            border-right: none;
          }
        }

        .sidebar-header {
          padding: 24px 20px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sidebar-header h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-color);
        }

        .add-note-btn {
          color: var(--accent-color);
          transition: transform 0.2s ease;
        }

        .add-note-btn:hover {
          transform: scale(1.1);
          color: var(--accent-hover);
        }

        .notes-list {
          flex: 1;
          overflow-y: auto;
          padding: 0 12px 20px;
        }

        .note-item {
          padding: 12px 16px;
          border-radius: var(--border-radius);
          cursor: pointer;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.2s var(--easing);
          position: relative;
        }

        .note-item:hover {
          background-color: #252525;
        }

        .note-item.active {
          background-color: #333;
        }

        .note-item.active .note-title {
          color: var(--accent-color);
        }

        .note-item-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow: hidden;
        }

        .note-title {
          font-size: 0.95rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-color);
        }

        .note-date {
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .delete-btn {
          opacity: 0;
          color: #ff4444;
          transition: opacity 0.2s ease;
          padding: 4px;
        }

        .note-item:hover .delete-btn {
          opacity: 0.6;
        }

        .delete-btn:hover {
          opacity: 1 !important;
        }

        .empty-state {
          padding: 40px 20px;
          text-align: center;
          color: var(--text-dim);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};
