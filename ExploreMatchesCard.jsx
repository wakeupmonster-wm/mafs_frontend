// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// const images = [
//   "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400", // Monica
//   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", // Eliza
//   "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400"  // Profile 3
// ];

// export default function ExploreMatchesCard() {
//   const [isHovered, setIsHovered] = useState(false);
//   const [stack, setStack] = useState([0, 1, 2]);

//   useEffect(() => {
//     let interval;
//     if (isHovered) {
//       interval = setInterval(() => {
//         setStack((prev) => {
//           const newStack = [...prev];
//           const top = newStack.shift();
//           newStack.push(top);
//           return newStack;
//         });
//       }, 2000); // 2 seconds ka gap taaki animation relax lage
//     }
//     return () => clearInterval(interval);
//   }, [isHovered]);

//   return (
//     <>
//       <style>{`
//         .explore-container {
//           width: 100%;
//           max-width: 480px;
//           background: white;
//           border-radius: 40px;
//           border: 1px solid #ededed;
//           overflow: hidden;
//           cursor: pointer;
//           box-shadow: 0 4px 24px rgba(0,0,0,0.02);
//         }
//         .explore-visual {
//           position: relative;
//           height: 400px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: white;
//         }
//         .explore-bg-glow {
//           position: absolute;
//           inset: 0;
//           background: radial-gradient(circle at 50% 35%, rgba(193, 244, 246, 0.9) 0%, rgba(255, 255, 255, 0) 80%);
//           opacity: 0;
//           transition: opacity 0.6s ease;
//           z-index: 1;
//         }
//         .explore-container:hover .explore-bg-glow { opacity: 1; }

//         .profile-stack-card {
//           position: absolute;
//           width: 210px;
//           height: 290px;
//           border-radius: 24px;
//           background-size: cover;
//           background-position: center;
//           box-shadow: 0 15px 40px rgba(0,0,0,0.12);
//           border: 4px solid white;
//         }
//         .keen-badge {
//           position: absolute;
//           top: 15px;
//           left: 15px;
//           background: rgba(255,255,255,0.25);
//           backdrop-filter: blur(8px);
//           color: #111;
//           padding: 4px 14px;
//           border-radius: 100px;
//           font-weight: 800;
//           font-style: italic;
//           font-size: 13px;
//           border: 1px solid rgba(255,255,255,0.4);
//         }
//         .explore-footer { padding: 40px; }
//         .explore-footer h2 { margin: 0; font-size: 32px; font-weight: 800; color: #111; letter-spacing: -0.5px; }
//         .explore-footer p { color: #666; margin-top: 10px; font-size: 17px; line-height: 1.5; }
//       `}</style>

//       <motion.div 
//         className="explore-container" 
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="explore-visual">
//           <div className="explore-bg-glow" />

//           <AnimatePresence mode="popLayout">
//             {stack.slice(0, 3).map((imgIndex, i) => {
//               const isTop = i === 0;
//               return (
//                 <motion.div
//                   key={imgIndex}
//                   className="profile-stack-card"
//                   style={{ 
//                     backgroundImage: `url(${images[imgIndex]})`,
//                     zIndex: 10 - i 
//                   }}
//                   layout
//                   initial={{ opacity: 0, scale: 0.8, x: 0 }}
//                   animate={{
//                     opacity: 1,
//                     scale: 1 - i * 0.06,
//                     x: isHovered ? (isTop ? 0 : 35 * i) : 0, 
//                     y: isHovered ? (isTop ? 0 : -15 * i) : 0,
//                     rotate: isHovered ? (isTop ? 0 : 6 * i) : 0,
//                   }}
//                   exit={{ 
//                     x: 250, // Pehle Right turn hoga
//                     rotate: 25, // Turn angle
//                     opacity: 0, 
//                     scale: 0.9,
//                     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
//                   }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 100,
//                     damping: 15
//                   }}
//                 >
//                   {isTop && <div className="keen-badge">Keen</div>}
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>

//         <div className="explore-footer">
//           <h2>Explore Matches</h2>
//           <p>See profiles matched based on your preferences and location in Australia.</p>
//         </div>
//       </motion.div>
//     </>
//   );
// }

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  { id: 1, url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500", name: "MONICA (24)", dist: "5 km" },
  { id: 2, url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500", name: "ELIZA (22)", dist: "3 km" },
  { id: 3, url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500", name: "SARA (25)", dist: "8 km" }
];

export default function ExploreMatchesCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2200); // Har 2.2 sec mein card change hoga
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  // Peeche wala card nikalne ke liye logic
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <>
      <style>{`
        .explore-container {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 40px;
          border: 1px solid #ededed;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          box-shadow: 0 4px 24px rgba(0,0,0,0.02);
        }

        .explore-visual {
          position: relative;
          height: 420px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          overflow: visible;
        }

        .explore-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 75% 60%, rgba(193, 244, 246, 0.9) 50%, rgba(255, 255, 255, 0) 110%);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: 1;
        }
        .explore-container:hover .explore-bg-glow { opacity: 1; }

        .profile-card {
          position: absolute;
          width: 210px;
          height: 300px;
          border-radius: 24px;
          background-size: cover;
          background-position: center;
          border: 4px solid white;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 15px;
          color: white;
          font-family: sans-serif;
        }

        .keen-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: #c1f4f6;
          padding: 4px 12px;
          border-radius: 100px;
          font-weight: 800;
          font-style: italic;
          font-size: 14px;
        }

        .card-meta { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }

        .explore-footer { padding: 40px; position: relative; z-index: 10; background: white; }
        .explore-footer h2 { margin: 0; font-size: 32px; font-weight: 800; color: #111; }
        .explore-footer p { color: #666; margin-top: 10px; font-size: 17px; line-height: 1.5; }
      `}</style>

      <motion.div 
        className="explore-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="explore-visual">
          <div className="explore-bg-glow" />

          {/* BACK CARD - Jo peeche wait kar raha hai */}
          <motion.div
            key={`back-${nextIndex}`}
            className="profile-card"
            style={{ 
              backgroundImage: `url(${images[nextIndex].url})`,
              zIndex: 5
            }}
            animate={{
              scale: isHovered ? 0.9 : 0.85,
              rotate: isHovered ? 0 : 0,
              x: isHovered ? 0 : 0,
              opacity: isHovered ? 0.8 : 0.5
            }}
            transition={{ duration: 10 }}
          />

          {/* FRONT CARD - Jo swipe hokar remove hoga */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`front-${currentIndex}`}
              className="profile-card"
              style={{ 
                backgroundImage: `url(${images[currentIndex].url})`,
                zIndex: 20
              }}
              initial={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
              animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ 
                x: 350,       // Card right side nikal jayga
                rotate: 25,   // Thoda tilt hoga
                opacity: 0, 
                transition: { duration: 0.7, ease: [0.32, 0, 0.67, 0] } 
              }}
            >
              <div className="keen-badge">Keen</div>
              <div className="card-meta">
                <div style={{ fontWeight: '800', fontSize: '15px' }}>{images[currentIndex].name}</div>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>📍 {images[currentIndex].dist}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="explore-footer">
          <h2>Explore Matches</h2>
          <p>See profiles matched based on your preferences and location in Australia.</p>
        </div>
      </motion.div>
    </>
  );
}