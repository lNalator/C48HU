import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayerProps {
  error: string;
}

const ErrorDisplayer: React.FC<ErrorDisplayerProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-center bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md space-x-2 mt-2">
      <AlertTriangle className="w-5 h-5" />
      <span className="text-sm">{error}</span>
    </div>
  );
};

export default ErrorDisplayer;
