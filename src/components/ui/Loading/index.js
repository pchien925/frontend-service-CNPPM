import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoadingComponent from './LoadingComponent';

const Loading = ({ show }) => {
  const [node] = useState(() => document.createElement('div'));

  useEffect(() => {
    if (show) {
      document.body.appendChild(node);
    }

    return () => {
      if (show && document.body.contains(node)) {
        document.body.removeChild(node);
      }
    };
  }, [show, node]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <LoadingComponent />
    </div>,
    node
  );
};

export default Loading;
