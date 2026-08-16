export type ToastVariant = "success" | "error";

const TOAST_ID = "app-toast";

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
    borderRadius: "0.5rem",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: variant === "error" ? "#ffffff" : "#0d1111",
    backgroundColor: variant === "error" ? "#ff5f57" : "#ffe023",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.18)",
  });

  document.body.appendChild(toast);

  window.setTimeout(() => toast.remove(), 4000);
}
