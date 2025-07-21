"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (message: string) => {
    toast.success(message, { position: "top-right", autoClose: 3000 });
};

export const showErrorToast = (message: string) => {
    toast.error(message, { position: "top-right", autoClose: 3000 });
};
export const showInfoToast = (message: string) => {
    toast.info(message, { position: "top-right", autoClose: 3000 });
};
export const showWarningToast = (message: string) => {
    toast.warn(message, { position: "top-right", autoClose: 3000 });
};

export const showLoadingToast = (message: string) => {
    toast.loading(message, { position: "top-right", autoClose: false });
};

export const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
    switch (type) {
        case "success":
            showSuccessToast(message);
            break;
        case "error":
            showErrorToast(message);
            break;
        case "info":
            showInfoToast(message);
            break;
        case "warning":
            showWarningToast(message);
            break;
        default:
            toast(message, { position: "top-right", autoClose: 3000 });
    }
};

export default function Toast() {
    return <ToastContainer newestOnTop pauseOnHover />;
}
