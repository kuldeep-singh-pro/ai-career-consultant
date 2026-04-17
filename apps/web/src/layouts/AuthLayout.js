import { jsx as _jsx } from "react/jsx-runtime";
export const AuthLayout = ({ children }) => {
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-md", children: children }) }));
};
