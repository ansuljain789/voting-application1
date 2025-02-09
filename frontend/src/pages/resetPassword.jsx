import { useState } from "react";
import { requestOTP, verifyOTP, resetPassword } from "./api";

export default function ResetPasswordFlow() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRequestOTP = async () => {
        try {
            await requestOTP(email);
            setStep(2); // Move to OTP input
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            await verifyOTP(email, otp);
            setStep(3); // Move to password reset
        } catch (err) {
            setError(err.response?.data?.error || "Invalid OTP");
        }
    };

    const handleResetPassword = async () => {
        try {
            await resetPassword(email, oldPassword, newPassword);
            setMessage("Password changed successfully!");
            setStep(1); // Reset flow after success
        } catch (err) {
            setError(err.response?.data?.error || "Failed to reset password");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            
            {/* Step 1: Enter Email & Request OTP */}
            {step === 1 && (
                <>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border p-2 w-full rounded mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleRequestOTP}>
                        Request OTP
                    </button>
                </>
            )}

            {/* Step 2: Enter OTP */}
            {step >= 2 && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="border p-2 w-full rounded mt-3 mb-2"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleVerifyOTP}>
                        Verify OTP
                    </button>
                </>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
                <>
                    <input
                        type="password"
                        placeholder="Old Password"
                        className="border p-2 w-full rounded mt-3 mb-2"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="border p-2 w-full rounded mb-2"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button className="bg-red-500 text-white p-2 rounded w-full" onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </>
            )}

            {/* Success & Error Messages */}
            {message && <p className="text-green-500 mt-3">{message}</p>}
            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
}
