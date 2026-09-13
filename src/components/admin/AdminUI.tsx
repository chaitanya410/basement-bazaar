import React from 'react';
import { Loader2, AlertTriangle, Inbox, X } from 'lucide-react';

/** Shared presentational pieces for the admin CMS. */

export const PageHeader: React.FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ title, description, action }) => (
  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    {action}
  </div>
);

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost' | 'danger';
  }
> = ({ variant = 'primary', className = '', children, ...props }) => {
  const styles = {
    primary: 'bg-ngo-blue text-gray-950 hover:bg-ngo-darkBlue',
    ghost: 'bg-gray-800 text-gray-300 hover:bg-gray-700',
    danger: 'bg-red-950 text-red-300 hover:bg-red-900 border border-red-900/60',
  }[variant];

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${styles} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-xl ${className}`}>{children}</div>
);

export const QueryState: React.FC<{
  isLoading: boolean;
  error: unknown;
  isEmpty: boolean;
  emptyLabel: string;
  children: React.ReactNode;
}> = ({ isLoading, error, isEmpty, emptyLabel, children }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 text-ngo-blue animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-red-300">Could not load this data</p>
          <p className="text-sm text-gray-500 mt-1">
            {error instanceof Error ? error.message : String(error)}
          </p>
        </div>
      </Card>
    );
  }

  if (isEmpty) {
    return (
      <Card className="p-12 text-center">
        <Inbox className="w-8 h-8 text-gray-700 mx-auto mb-3" />
        <p className="text-gray-500">{emptyLabel}</p>
      </Card>
    );
  }

  return <>{children}</>;
};

export const Modal: React.FC<{
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <button
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl my-4 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-gray-500 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

const inputClass =
  'w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition';

export const Field: React.FC<{
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, hint, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-1.5">
      {label}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-600 mt-1">{hint}</p>}
  </div>
);

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={inputClass} />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className={inputClass} />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select {...props} className={inputClass} />
);

export const Badge: React.FC<{ tone?: 'blue' | 'green' | 'amber' | 'red' | 'gray'; children: React.ReactNode }> = ({
  tone = 'gray',
  children,
}) => {
  const tones = {
    blue: 'bg-blue-950 text-blue-300 border-blue-900',
    green: 'bg-green-950 text-green-300 border-green-900',
    amber: 'bg-amber-950 text-amber-300 border-amber-900',
    red: 'bg-red-950 text-red-300 border-red-900',
    gray: 'bg-gray-800 text-gray-400 border-gray-700',
  }[tone];
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${tones}`}>
      {children}
    </span>
  );
};

/** Horizontally scrollable table wrapper — admin tables are wide. */
export const TableWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Card className="overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">{children}</table>
    </div>
  </Card>
);

export const Th: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <th className="px-4 py-3 font-semibold text-gray-400 whitespace-nowrap border-b border-gray-800">
    {children}
  </th>
);

export const Td: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <td className={`px-4 py-3 border-b border-gray-800/60 align-top ${className}`}>{children}</td>
);
