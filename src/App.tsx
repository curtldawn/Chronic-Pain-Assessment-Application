/**
 * Main Application Component
 * Configures routing and provides global context
 *
 * Security Features:
 * - CSRF protection initialized on app mount
 * - All API requests automatically protected with CSRF tokens
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from '@context/QuizContext';
import { useCsrfInit } from './hooks/useCsrf';

/**
 * Lazy-loaded Quiz pages
 */
const Q1Duration = React.lazy(() => import('./pages/Quiz/Q1Duration'));
const DisqualifiedTooSoon = React.lazy(() => import('./pages/Quiz/DisqualifiedTooSoon'));
const Q2Treatments = React.lazy(() => import('./pages/Quiz/Q2Treatments'));
const ConnectingMessageQ2 = React.lazy(() => import('./pages/Quiz/ConnectingMessageQ2'));

/**
 * Loading fallback component
 * Displayed while lazy-loaded components are being fetched
 */
const LoadingFallback: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f7f4ed',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        color: '#1d2c49',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#1d2c49',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px',
        }}
      />
      <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>Loading...</p>
    </div>
  </div>
);

/**
 * Main App Component
 * Sets up routing, context providers, and global suspense boundaries
 */
const App: React.FC = () => {
  // Initialize CSRF protection on app mount
  useCsrfInit();

  return (
    <BrowserRouter>
      <QuizProvider>
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* New Quiz Routes */}
            <Route path="/" element={<Navigate to="/quiz/q1-duration" replace />} />
            <Route path="/quiz/q1-duration" element={<Q1Duration />} />
            <Route path="/quiz/disqualified-too-soon" element={<DisqualifiedTooSoon />} />
            <Route path="/quiz/q2-treatments" element={<Q2Treatments />} />
            <Route path="/quiz/connecting-message-q2" element={<ConnectingMessageQ2 />} />
            
            {/* Catch all - redirect to quiz start */}
            <Route path="*" element={<Navigate to="/quiz/q1-duration" replace />} />
          </Routes>
        </React.Suspense>
      </QuizProvider>

      {/* Global styles for spinner animation */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </BrowserRouter>
  );
};

export default App;
