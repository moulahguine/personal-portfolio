export type ToastVariant = "success" | "error";

const TOAST_ID = "app-toast";

// Theme-aware: inverse surface with a thin border and a status marker on the left.
const TOAST_MARKER: Record<ToastVariant, string> = {
  success: "var(--primary)",
  error: "var(--danger)",
};

export function addToast(message: string, variant: ToastVariant = "success") {
  if (typeof document === "undefined") return;

  document.getElementById(TOAST_ID)?.remove();

  const toast = document.createElement("div");
  toast.id = TOAST_ID;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  toast.dataset.variant = variant;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    zIndex: "9999",
    maxWidth: "min(90vw, 24rem)",
    padding: "0.875rem 1rem",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    fontWeight: "600",
    lineHeight: "1.45",
    color: "var(--text-inverse)",
    backgroundColor: "var(--background-inverse)",
    border: "1px solid var(--border-strong)",
    borderLeft: `3px solid ${TOAST_MARKER[variant]}`,
  });

  document.body.appendChild(toast);

  window.setTimeout(() => toast.remove(), 4000);
}
