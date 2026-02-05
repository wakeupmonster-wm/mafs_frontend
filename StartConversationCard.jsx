
import { motion } from "framer-motion";

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 45 ,
  mass: 1
};

export default function StartConversationCard() {
  return (
    <>
      <style>{`
        .conv-container {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 40px;
          border: 1px solid #ededed;
          overflow: visible; /* Stars bahar nikalne ke liye */
          cursor: pointer;
          margin: 20px auto;
          box-shadow: 0 4px 24px rgba(0,0,0,0.02);
          font-family: sans-serif;
        }

        .conv-visual {
          position: relative;
          height: 340px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
          border-radius: 40px 40px 0 0;
        }

        /* EXACT SCREENSHOT GRADIENT */
        .conv-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 35%, 
            rgba(193, 244, 246, 0.9) 0%, 
            rgba(255, 255, 255, 0) 80%
          );
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }
        .conv-container:hover .conv-bg-glow { opacity: 1; }

        .avatar {
          width: 95px;
          height: 95px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          object-fit: cover;
          position: absolute;
          z-index: 30;
        }

        .chat-bubble {
          position: absolute;
          background: white;
          padding: 14px 24px;
          border-radius: 20px;
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
          box-shadow: 0 10px 35px rgba(0,0,0,0.07);
          z-index: 25;
          white-space: nowrap;
          border: 1px solid rgba(0,0,0,0.02);
        }

        /* Star (Sparkle) Styling */
        .star-element {
          position: absolute;
          z-index: 10;
          pointer-events: none;
        }

        .conv-footer { padding: 40px; }
        .conv-footer h2 { margin: 0; font-size: 32px; font-weight: 800; color: #111; letter-spacing: -0.5px; }
        .conv-footer p { color: #666; margin-top: 10px; font-size: 18px; line-height: 1.5; }
      `}</style>

      <motion.div className="conv-container" initial="initial" whileHover="hover">
        <div className="conv-visual">
          <div className="conv-bg-glow" />

          {/* LEFT AVATAR - Moves to Top Left */}
          <motion.img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" 
            className="avatar"
            variants={{
              initial: { x: -25, y: -10 },
              hover: { x: -160, y: -80, transition: smoothSpring }
            }}
          />
          {/* Star near Left Avatar (Screenshot style) */}
          <motion.div 
            className="star-element"
            style={{ left: '15%', top: '45%' }}
            variants={{
              initial: { scale: 0, opacity: 0 },
              hover: { scale: 1, opacity: 1, transition: { delay: 0.5, type: 'spring' } }
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" stroke="#c1f4f6" strokeWidth="1"/>
            </svg>
          </motion.div>

          {/* RIGHT AVATAR - Moves to Bottom Right */}
          <motion.img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" 
            className="avatar"
            style={{ zIndex: 31 }}
            variants={{
              initial: { x: 25, y: 15 },
              hover: { x: 160, y: 60, transition: smoothSpring }
            }}
          />
          {/* Star near Right Avatar */}
          <motion.div 
            className="star-element"
            style={{ right: '12%', top: '35%' }}
            variants={{
              initial: { scale: 0, opacity: 0 },
              hover: { scale: 1.2, opacity: 1, transition: { delay: 0.7, type: 'spring' } }
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </motion.div>

          {/* CHAT BUBBLE 1 - Comes after Avatars reach destination */}
          <motion.div 
            className="chat-bubble"
            variants={{
              initial: { opacity: 0, scale: 0.7, x: -30, y: -20 },
              hover: { 
                opacity: 1, scale: 1, x: 50, y: -90, 
                transition: { ...smoothSpring, delay: 1 } 
              }
            }}
          >
            Hey! I liked your profile.
          </motion.div>

          {/* CHAT BUBBLE 2 */}
          <motion.div 
            className="chat-bubble"
            variants={{
              initial: { opacity: 0, scale: 0.7, x: 30, y: 40 },
              hover: { 
                opacity: 1, scale: 1, x: -60, y: 80, 
                transition: { ...smoothSpring, delay: 1 } 
              }
            }}
          >
            Thanks! Glad we matched.
          </motion.div>
        </div>

        <div className="conv-footer">
          <h2>Start a Conversation</h2>
          <p>Connect and chat easily once there’s mutual interest.</p>
        </div>
      </motion.div>
    </>
  );
}