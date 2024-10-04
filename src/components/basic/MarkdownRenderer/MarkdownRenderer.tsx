import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ markdownContent }: { markdownContent: any }) => {
  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};

export default MarkdownRenderer;
