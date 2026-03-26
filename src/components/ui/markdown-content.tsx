'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from 'next-themes';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

const FENCE_RE = /^(```|~~~)/;
const BLOCK_RE = /^(#{1,6}\s|>\s?|[-*+]\s|\d+\.\s|\|)/;

function isPlainTextLine(line: string) {
  const trimmed = line.trim();

  return trimmed !== '' && !BLOCK_RE.test(trimmed) && !FENCE_RE.test(trimmed);
}

function preserveSoftBreaks(content: string) {
  const lines = content.split('\n');
  const normalized: string[] = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (FENCE_RE.test(trimmed)) {
      inFence = !inFence;
      normalized.push(line);
      continue;
    }

    const previousLine = normalized.at(-1);

    if (!inFence && previousLine && isPlainTextLine(previousLine) && isPlainTextLine(line)) {
      normalized[normalized.length - 1] = `${previousLine}  `;
    }

    normalized.push(line);
  }

  return normalized.join('\n');
}

export function MarkdownContent({ content }: { content: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const components: Components = {
    a({ href, children, ...props }) {
      const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/80 hover:decoration-primary/60"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer noopener' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    p({ children }) {
      return <p className="my-3 leading-7 text-foreground/90">{children}</p>;
    },
    strong({ children }) {
      return (
        <strong className="rounded-[0.35rem] bg-primary/10 px-1.5 py-0.5 font-semibold text-foreground">
          {children}
        </strong>
      );
    },
    ul({ children }) {
      return <ul className="my-3 list-disc space-y-1 pl-5 marker:text-primary/70">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="my-3 list-decimal space-y-1 pl-5 marker:text-primary/70">{children}</ol>;
    },
    li({ children }) {
      return <li className="pl-1 leading-7">{children}</li>;
    },
    blockquote({ children }) {
      return (
        <blockquote className="my-4 border-l-3 border-primary/30 bg-muted/40 py-2 pl-4 text-foreground/80 italic">
          {children}
        </blockquote>
      );
    },
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
      {preserveSoftBreaks(content)}
    </ReactMarkdown>
  );
}
