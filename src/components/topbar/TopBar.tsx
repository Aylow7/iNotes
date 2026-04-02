import React from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import { Search, Eye, Edit3 } from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';

export const TopBar: React.FC = () => {
  const { searchQuery, setSearchQuery, isMarkdownMode, toggleMarkdownMode } = useNotesStore();

  return (
    <div className="topbar">
      <div className="search-container glow-focus">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search notes... (Ctrl+F)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          id="search-input"
        />
      </div>

      <div className="mode-toggle">
        <LayoutGroup>
          <button 
            className={`toggle-btn ${!isMarkdownMode ? 'active' : ''}`} 
            onClick={() => isMarkdownMode && toggleMarkdownMode()}
          >
            {!isMarkdownMode && (
              <motion.div 
                layoutId="active-pill"
                className="toggle-slider"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Edit3 size={16} className="toggle-icon" />
            <span className="toggle-text">Raw</span>
          </button>
          
          <button 
            className={`toggle-btn ${isMarkdownMode ? 'active' : ''}`} 
            onClick={() => !isMarkdownMode && toggleMarkdownMode()}
          >
            {isMarkdownMode && (
              <motion.div 
                layoutId="active-pill"
                className="toggle-slider"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Eye size={16} className="toggle-icon" />
            <span className="toggle-text">Markdown</span>
          </button>
        </LayoutGroup>
      </div>

      <style>{`
        .topbar {
          height: 64px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-color);
          border-bottom: 1px solid #222;
        }

        .search-container {
          display: flex;
          align-items: center;
          background-color: #1a1a1a;
          padding: 8px 16px;
          border-radius: 10px;
          width: 300px;
          transition: all 0.2s ease;
        }

        .search-icon {
          color: var(--text-dim);
          margin-right: 12px;
        }

        .search-input {
          flex: 1;
          font-size: 0.9rem;
        }

        .mode-toggle {
          display: flex;
          background-color: #1a1a1a;
          border-radius: 10px;
          padding: 4px;
          gap: 4px;
        }

        .toggle-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-dim);
          transition: color 0.2s ease;
          min-width: 100px;
        }

        .toggle-btn.active {
          color: var(--bg-color);
        }

        .toggle-icon, .toggle-text {
          position: relative;
          z-index: 1;
        }

        .toggle-slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--accent-color);
          border-radius: 8px;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};
