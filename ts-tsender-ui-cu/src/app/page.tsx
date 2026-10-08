"use client";

// import HomeContent from "@/components/HomeContent";
// import {useAccount} from "wagmi";

// export default function Home() {
//   const {isConnected} = useAccount();
//   return (
//     <div>
//       {isConnected ? (
//         <div>
//           <HomeContent />
//         </div>
//       ) : (
//         <div>
//           Please Connect a wallet...
//         </div>
//       )
//         }
//     </div>
//   );
// }
import AirdropForm from "@/components/AirdropForm";

export default function Home() {
  return (
    <div>
      <AirdropForm />
    </div>
  );
}

// can you turn this into a reusable header componet with;
// -A github link/buttton 
// a tittle called TSender
// this connect button is on the right side...


