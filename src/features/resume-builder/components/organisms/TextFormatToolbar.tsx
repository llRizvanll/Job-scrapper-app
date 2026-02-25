import React from 'react';

interface TextFormatToolbarProps {
  visible: boolean;
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onBulletList: () => void;
  onNumberedList: () => void;
  onAlignLeft: () => void;
  onAlignCenter: () => void;
  onAlignRight: () => void;
  onAlignJustify: () => void;
  onLink: () => void;
  onClearFormatting: () => void;
}

const TextFormatToolbar: React.FC<TextFormatToolbarProps> = ({
  visible,
  onBold,
  onItalic,
  onUnderline,
  onBulletList,
  onNumberedList,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onAlignJustify,
  onLink,
  onClearFormatting,
}) => {
  if (!visible) return null;

  const buttonClass =
    'p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors';
  const dividerClass = 'w-px h-6 bg-gray-300 mx-1';

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg px-2 py-1.5 flex items-center gap-1 print:hidden animate-in fade-in zoom-in duration-200">
      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('bold');
          onBold();
        }}
        title="Bold (Ctrl+B)"
      >
        <span className="font-bold text-base">B</span>
      </button>

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('italic');
          onItalic();
        }}
        title="Italic (Ctrl+I)"
      >
        <span className="italic text-base">I</span>
      </button>

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('underline');
          onUnderline();
        }}
        title="Underline (Ctrl+U)"
      >
        <span className="underline text-base">U</span>
      </button>

      <div className={dividerClass} />

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('insertUnorderedList');
          onBulletList();
        }}
        title="Bullet list"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('insertOrderedList');
          onNumberedList();
        }}
        title="Numbered list"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
          />
        </svg>
      </button>

      <div className={dividerClass} />

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('justifyLeft');
          onAlignLeft();
        }}
        title="Align left"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h10M4 18h16"
          />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('justifyCenter');
          onAlignCenter();
        }}
        title="Align center"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M7 12h10M4 18h16"
          />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('justifyRight');
          onAlignRight();
        }}
        title="Align right"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M10 12h10M4 18h16"
          />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('justifyFull');
          onAlignJustify();
        }}
        title="Justify"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className={dividerClass} />

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          const url = window.prompt('Enter URL:');
          if (url) {
            execCommand('createLink', url);
          }
          onLink();
        }}
        title="Insert link"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>

      <button
        type="button"
        className={buttonClass}
        onMouseDown={handleMouseDown}
        onClick={() => {
          execCommand('removeFormat');
          onClearFormatting();
        }}
        title="Clear formatting"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
          />
        </svg>
      </button>
    </div>
  );
};

export default TextFormatToolbar;

