import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-light.css';
// import 'github-markdown-css/github-markdown.css';

const chapters = [
  'algebra',
  'matrices',
  'calculus',
  'probability',
  'sets',
  'geometry'
];

export default function NotesPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chapter = searchParams.get("chapter") || "algebra";

  const [markdown, setMarkdown] = useState("Loading notes...");

  useEffect(() => {
    fetch(`/notes/${chapter}.md`)
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
      .catch(() => setMarkdown("❌ Notes not found."));
  }, [chapter]);

  return (
    <div className="flex w-full min-h-screen bg-white text-gray-800 print:bg-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-300 sticky top-0 h-screen hidden md:block">
        <h2 className="text-xl font-bold mb-4">📚 Chapters</h2>
        <ul className="space-y-2">
          {chapters.map((ch) => (
            <li key={ch}>
              <Link
                to={`/notes?chapter=${ch}`}
                className={`block px-4 py-2 rounded-md font-medium ${ch === chapter ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'}`}
              >
                {ch.charAt(0).toUpperCase() + ch.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8">
        {/* Header section */}
        <div className="flex justify-end items-center p-4 mb-2 no-print">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            🖨️ Print / Save as PDF
          </button>
        </div>

        {/* Notes preview */}
        <div className="relative bg-white border border-gray-300 rounded-xl p-6 shadow-md">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-1 border border-gray-300 rounded-full font-bold text-lg">
            📓 Notes: {chapter.charAt(0).toUpperCase() + chapter.slice(1)}
          </div>
          <div className="markdown-body mt-6">
            <ReactMarkdown
              children={markdown}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-base leading-relaxed mb-4" {...props} />,
                li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
                input: ({ node, ...props }) => <input type="checkbox" className="mr-2 accent-purple-600" {...props} disabled={false}/>,
                code: ({ node, ...props }) => <code className="bg-gray-100 px-1 rounded text-sm text-purple-700" {...props} />,
                pre: ({ node, ...props }) => <pre className="bg-gray-100 text-black p-4 rounded overflow-auto mb-4" {...props} />
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
