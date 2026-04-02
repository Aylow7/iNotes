import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import { marked } from 'marked';
import { motion, AnimatePresence } from 'framer-motion';

export const Editor: React.FC = () => {
  const { notes, activeNoteId, updateNote, isMarkdownMode } = useNotesStore();
  const activeNote = notes.find((n) => n.id === activeNoteId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [localContent, setLocalContent] = useState('');

  // Sync local content when active note changes
  useEffect(() => {
    if (activeNote) {
      setLocalContent(activeNote.content);
    } else {
      setLocalContent('');
    }
  }, [activeNoteId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    
    // Smoothly update the store (this will update titles in sidebar)
    if (activeNoteId) {
      updateNote(activeNoteId, newContent);
    }
  };

  const renderedMarkdown = useMemo(() => {
    if (!localContent) return '';
    return marked.parse(localContent) as string;
  }, [localContent]);

  if (!activeNote) {
    return (
      <div className="editor-empty">
        <div className="empty-content">
          <h3>Select a note to start writing</h3>
          <p>Create a new note with <kbd>Ctrl</kbd>+<kbd>N</kbd></p>
        </div>
        <style>{`
          .editor-empty {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--bg-color);
            color: var(--text-dim);
          }
          .empty-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          kbd {
            background-color: #333;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.8rem;
            color: var(--text-color);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <AnimatePresence mode="wait">
        {!isMarkdownMode ? (
          <motion.div
            key={`raw-${activeNoteId}`}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="editor-wrapper"
          >
            <textarea
              ref={textareaRef}
              value={localContent}
              onChange={handleChange}
              placeholder="Start writing..."
              spellCheck={false}
              autoFocus
              className="raw-textarea"
            />
          </motion.div>
        ) : (
          <motion.div
            key="markdown"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="markdown-preview prose"
            dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
          />
        )}
      </AnimatePresence>

      <style>{`
        .editor-container {
          flex: 1;
          height: calc(100vh - 64px);
          overflow-y: auto;
          background-color: var(--bg-color);
          position: relative;
        }

        .editor-wrapper {
          width: 100%;
          height: 100%;
          padding: 40px 60px;
          margin: 0 auto;
        }

        .raw-textarea {
          width: 100%;
          height: 100%;
          resize: none;
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-color);
          background: transparent;
          caret-color: var(--accent-color);
          transition: caret-color 0.2s ease;
        }

        .markdown-preview {
          padding: 40px 60px;
          margin: 0 auto;
          line-height: 1.7;
          color: var(--text-color);
        }

        /* Markdown Styles */
        .prose h1, .prose h2, .prose h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          color: var(--accent-color);
        }
        .prose p { margin-bottom: 1em; }
        .prose code {
          background-color: #1a1a1a;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .prose pre {
          background-color: #1a1a1a;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 1em;
          overflow-x: auto;
        }
        .prose ul, .prose ol {
          margin-left: 24px;
          margin-bottom: 1em;
        }
        .prose blockquote {
          border-left: 4px solid var(--accent-color);
          padding-left: 16px;
          color: var(--text-dim);
          font-style: italic;
          margin: 1.5em 0;
        }
      `}</style>
    </div>
  );
};
