
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";

// /* ================= PRESET CONFIGURATIONS ================= */

// // Transition jo Apple jaisa smooth "spring" feel degi
// const smoothSpring = {
//   type: "spring",
//   stiffness: 80,   // Thoda kam stiffness for elegance
//   damping: 12,     // Control bounce
//   mass: 0.8,
// };

// // const chipVariants = {
// //   initial: { 
// //     opacity: 0, 
// //     scale: 0.2, 
// //     x: "-50%", 
// //     y: "-50%",
// //     filter: "blur(4px)" 
// //   },
// //   hover: (p) => ({
// //     opacity: 1, 
// //     scale: 1, 
// //     x: p.tx, 
// //     y: p.ty,
// //     filter: "blur(0px)",
// //     transition: smoothSpring, // Pehle wala fast & smooth transition
// //     // Floating animation jo hover ke baad start hogi
// //     animate: {
// //       y: [p.ty, p.ty - 7, p.ty], 
// //       transition: {
// //         duration: 2.5,
// //         repeat: Infinity,
// //         ease: "easeInOut",
// //       }
// //     }
// //   }),
// // };


// const chipVariants = {
//   initial: { 
//     opacity: 0, 
//     scale: 0.2, 
//     x: "-50%", 
//     y: "-50%",
//     filter: "blur(4px)" 
//   },
//   hover: (p) => ({
//     opacity: 1, 
//     scale: 1, 
//     x: p.tx, 
//     y: p.ty, // Pehle apni jagah par aayega center se
//     filter: "blur(0px)",
//     transition: smoothSpring, // Bilkul pehle jaisa fast movement
    
//     // Floating effect yahan separate hai, jo position hit karne ke baad trigger hoga
//     animate: {
//       y: [p.ty, p.ty - 6, p.ty], 
//       transition: {
//         duration: 2.5,
//         repeat: Infinity,
//         ease: "easeInOut",
//         delay: 0.5 // Taki pehle center se nikalne wala animation khatam ho jaye
//       }
//     }
//   }),
// };


// export default function ProfileCard() {
//   return (
//     <>
//       <style>{`
//         .visual-container {
//           position: relative;
//           height: 320px;
//           width: 100%;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: #ffffff;
//           overflow: visible; /* Chips ko card ke bahar dikhne ke liye */
//         }

//         .gradient-glow {
//           position: absolute;
//           inset: 0;
//           background: radial-gradient(circle at 50% 30%, #c1f4f6 0%, #ffffff 70%);
//           opacity: 0;
//           transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         .card-wrapper:hover .gradient-glow {
//           opacity: 0.6;
//         }

//         /* Essential for smooth performance */
//         .chip-element {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           will-change: transform, opacity;
//           z-index: 5;
//           pointer-events: none;
//         }

//         .chip-box {
//           background: white;
//           padding: 10px 20px;
//           border-radius: 100px;
//           font-size: 15px;
//           font-weight: 500;
//           color: #1a1a1a;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.06);
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           border: 1px solid rgba(0,0,0,0.04);
//         }

//         .profile-card-main {
//           position: relative;
//           z-index: 10;
//           background: white;
//           border-radius: 24px;
//           padding: 16px 20px;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           width: 320px;
//           box-shadow: 0 15px 35px rgba(0,0,0,0.07);
//           border: 1px solid rgba(0,0,0,0.02);
//         }

//         .avatar-img {
//           width: 68px;
//           height: 68px;
//           border-radius: 50%;
//           object-fit: cover;
//           border: 3px solid #71d7fe;
//         }
//       `}</style>

//       <motion.div 
//         className="card-wrapper"
//         initial="initial"
//         whileHover="hover"
//         style={{ 
//           width: "450px", 
//           borderRadius: "32px", 
//           overflow: "hidden", 
//           background: "white",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.03)" 
//         }}
//       >
//         <div className="visual-container">
//           <div className="gradient-glow" />

//           {/* 1. Blue Tick (Top Left - Exactly like screenshot) */}
//           <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "-100px", ty: "-130px" }}>
//             <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#71D7FE"/>
//             </svg>
//           </motion.div>

//           {/* 2. Music (Top Right) */}
//           <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "60px", ty: "-150px" }} animate={{ y: ["0%", "-2%", "2%", "0%"] }} 
//   transition={{ 
//     y: { repeat: Infinity, duration: 3, ease: "easeInOut" } 
//   }}>
//             <div className="chip-box">Music 🎵</div>
//           </motion.div>

//           {/* 3. Travel (Bottom Left) */}
//           <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "-150px", ty: "60px" }}>
//             <div className="chip-box">Travel ✈️</div>
//           </motion.div>

//           {/* 4. Basketball (Bottom Right) */}
//           <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "45px", ty: "85px" }}>
//             <div className="chip-box">Basketball 🏀</div>
//           </motion.div>

//           {/* 5. Purple Sparkle (Right Side) */}
//           <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "155px", ty: "15px" }}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="#a855f7">
//               <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
//             </svg>
//           </motion.div>

//           {/* Main Card */}
//           <motion.div 
//             className="profile-card-main"
//             variants={{
//               initial: { y: 0 },
//               hover: { y: -40, transition: { duration: 0.4, ease: "easeOut" } }
//             }}
//           >
//             <img className="avatar-img" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200" alt="Elizabeth" />
//             <div>
//               <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>Elizabeth (25)</h3>
//               <p style={{ margin: "2px 0 0", color: "#777", fontSize: "15px" }}>7 km away</p>
//             </div>
//           </motion.div>
//         </div>

//         <div style={{ padding: "35px 40px" }}>
//           <h2 style={{ fontSize: "32px", margin: "0 0 12px", fontWeight: "800", color: "#222" }}>Create Your Profile</h2>
//           <p style={{ color: "#666", fontSize: "17px", lineHeight: "1.5", margin: 0 }}>
//             Set up your profile in just a few minutes and choose what you’re looking for.
//           </p>
//         </div>
//       </motion.div>
//     </>
//   );
// }




// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/* ================= PRESET CONFIGURATIONS ================= */

const smoothSpring = {
  type: "spring",
  stiffness: 80,
  damping: 12,
  mass: 0.8,
};

const chipVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.2, 
    x: "-50%", 
    y: "-50%",
    filter: "blur(4px)" 
  },
  hover: (p) => ({
    opacity: 1, 
    scale: 1, 
    x: p.tx, 
    y: p.ty, 
    filter: "blur(0px)",
    transition: smoothSpring,
    
    // Floating effect: Jab target position par pahunch jaye tab move kare
    animate: {
      y: [p.ty, p.ty - 6, p.ty], 
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5 // Initial burst ke baad floating start hogi
      }
    }
  }),
};

export default function ProfileCard() {
  return (
    <>
      <style>{`
        .visual-container {
          position: relative;
          height: 320px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ffffff;
          overflow: visible;
        }

        .gradient-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, #c1f4f6 0%, #ffffff 70%);
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-wrapper:hover .gradient-glow {
          opacity: 0.6;
        }

        .chip-element {
          position: absolute;
          top: 50%;
          left: 50%;
          will-change: transform, opacity;
          z-index: 20;
          pointer-events: none;
        }

        .chip-box {
          background: white;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0,0,0,0.04);
        }

        .profile-card-main {
          position: relative;
          z-index: 10;
          background: white;
          border-radius: 24px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          width: 320px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.07);
          border: 1px solid rgba(0,0,0,0.02);
        }

        .avatar-img {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #71d7fe;
        }
      `}</style>

      <motion.div 
        className="card-wrapper"
        initial="initial"
        whileHover="hover"
        style={{ 
          width: "450px", 
          borderRadius: "32px", 
          overflow: "hidden", 
          background: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)" 
        }}
      >
        <div className="visual-container">
          <div className="gradient-glow" />

          {/* 1. Blue Tick */}
          <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "-100px", ty: "-130px" }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#71D7FE"/>
            </svg>
          </motion.div>

          {/* 2. Music */}
          <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "60px", ty: "-150px" }}>
            <div className="chip-box">Music 🎵</div>
          </motion.div>

          {/* 3. Travel */}
          <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "-150px", ty: "60px" }}>
            <div className="chip-box">Travel ✈️</div>
          </motion.div>

          {/* 4. Basketball */}
          <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "45px", ty: "85px" }}>
            <div className="chip-box">Basketball 🏀</div>
          </motion.div>

          {/* 5. Purple Sparkle */}
          <motion.div className="chip-element" variants={chipVariants} custom={{ tx: "155px", ty: "15px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#a855f7">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>

          {/* Main Card */}
          <motion.div 
            className="profile-card-main"
            variants={{
              initial: { y: 0 },
              hover: { y: -40, transition: { duration: 0.4, ease: "easeOut" } }
            }}
          >
            <img className="avatar-img" src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200" alt="Elizabeth" />
            <div>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>Elizabeth (25)</h3>
              <p style={{ margin: "2px 0 0", color: "#777", fontSize: "15px" }}>7 km away</p>
            </div>
          </motion.div>
        </div>

        <div style={{ padding: "35px 40px" }}>
          <h2 style={{ fontSize: "32px", margin: "0 0 12px", fontWeight: "800", color: "#222" }}>Create Your Profile</h2>
          <p style={{ color: "#666", fontSize: "17px", lineHeight: "1.5", margin: 0 }}>
            Set up your profile in just a few minutes and choose what you’re looking for.
          </p>
        </div>
      </motion.div>
    </>
  );
}