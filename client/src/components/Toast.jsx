/**
 * Toast — lightweight notification system using react-hot-toast.
 * Import `toast` from this file to fire notifications anywhere.
 */
import { Toaster, toast as _toast } from 'react-hot-toast';

export const toast = {
  success: (msg) => _toast.success(msg, { id: msg }),
  error: (msg) => _toast.error(msg, { id: msg }),
  info: (msg) => _toast(msg, { id: msg }),
};

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1f2937',
          color: '#f9fafb',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          fontSize: '13px',
          fontWeight: 500,
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        },
        success: {
          iconTheme: { primary: '#22c55e', secondary: '#0f172a' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#0f172a' },
        },
      }}
    />
  );
}
