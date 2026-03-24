'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

export function MarkdownContent({ content }: { content: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className ?? '');
      const isInline = !match;

      if (isInline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }

      return (
        <div className="not-prose">
          <SyntaxHighlighter
            style={isDark ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            customStyle={{ borderRadius: '0.5rem', fontSize: '0.8rem', margin: '0.75rem 0', border: 'none' }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
