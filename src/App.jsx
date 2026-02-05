// src / App.jsx;
import React from "react";
import { Sparkles } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-[80vh] relative bg-aqua-gradient-start flex flex-col items-center justify-center px-6 text-center">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-aqua-gradient blur-[120px] opacity-95" />

      <main className="max-w-3xl w-full space-y-10 z-10 py-20">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#46C7CD]/10 border border-[#46C7CD]/20 rounded-full font-bold text-grey-800">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
              Coming soon 2026
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-grey-900">
            Match At First <br />
            <span className="text-brand-aqua drop-shadow-sm">Swipe</span>
          </h1>
          <p className="text-lg md:text-2xl text-grey-500 max-w-xl mx-auto font-medium leading-relaxed">
            The future of connection is almost here. Love shouldn't be a waiting
            game.
          </p>
        </div>
      </main>
    </div>
  );
}

//      import { useState } from "react";

//      export default function App() {
//        const [token, setToken] = useState("");
//        const [loading, setLoading] = useState(false);
//        const [error, setError] = useState("");
//        const [response, setResponse] = useState(null);

//        const [form, setForm] = useState({
//          latitude: "",
//          longitude: "",
//          city: "",
//          state: "",
//          country: "",
//          full_address: ""
//        });

//        const handleChange = (e) => {
//          setForm({ ...form, [e.target.name]: e.target.value });
//        };

//        const submitLocation = async () => {
//          setError("");
//          setResponse(null);

//          if (!token) {
//            setError("Token is required");
//            return;
//          }

//          if (!form.latitude || !form.longitude) {
//            setError("Latitude and Longitude are required");
//            return;
//          }

//          try {
//            setLoading(true);

//            const res = await fetch(
//              "https:api.matchatfirstswipe.com.au/api/v1/profile/location",
//              {
//                method: "POST",
//                headers: {
//                  "Content-Type": "application/json",
//                  Authorization: `Bearer ${token}`
//                },
//                body: JSON.stringify({
//                  latitude: Number(form.latitude),
//                  longitude: Number(form.longitude),
//                  city: form.city,
//                  state: form.state,
//                  country: form.country,
//                  full_address: form.full_address
//                })
//              }
//            );

//            const data = await res.json();

//            if (!res.ok) {
//              throw new Error(data.message || "Something went wrong");
//            }

//            setResponse(data);
//          } catch (err) {
//            setError(err.message);
//          } finally {
//            setLoading(false);
//          }
//        };

//        return (
//          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//            <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-6 space-y-4">
//              <h1 className="text-2xl font-bold text-center">
//                Update Profile Location (API Test)
//              </h1>

//              {/* TOKEN */}
//              <div>
//                <label className="block text-sm font-medium mb-1">
//                  Auth Token
//                </label>
//                <input
//                  type="text"
//                  className="w-full border rounded-lg px-3 py-2"
//                  placeholder="Bearer token (without Bearer word)"
//                  value={token}
//                  onChange={(e) => setToken(e.target.value)}
//                />
//              </div>

//              {/* LOCATION FIELDS */}
//              {[
//                { name: "latitude", label: "Latitude" },
//                { name: "longitude", label: "Longitude" },
//                { name: "city", label: "City" },
//                { name: "state", label: "State" },
//                { name: "country", label: "Country" },
//                { name: "full_address", label: "Full Address" }
//              ].map((item) => (
//                <div key={item.name}>
//                  <label className="block text-sm font-medium mb-1">
//                    {item.label}
//                  </label>
//                  <input
//                    type="text"
//                    name={item.name}
//                    value={form[item.name]}
//                    onChange={handleChange}
//                    className="w-full border rounded-lg px-3 py-2"
//                  />
//                </div>
//              ))}

//              {/* BUTTON */}
//              <button
//                onClick={submitLocation}
//                disabled={loading}
//                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//              >
//                {loading ? "Updating..." : "Update Location"}
//              </button>

//              {/* ERROR */}
//              {error && (
//                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
//                  {error}
//                </div>
//              )}

//              {/* RESPONSE */}
//              {response && (
//                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-auto max-h-80">
//      {JSON.stringify(response, null, 2)}
//                </pre>
//              )}
//            </div>
//          </div>
//        );
//      }

//    import { useState } from "react";

//    export default function App() {
//      const [token, setToken] = useState("");
//      const [page, setPage] = useState(1);
//      const [limit, setLimit] = useState(10);

//      const [loading, setLoading] = useState(false);
//      const [error, setError] = useState("");
//      const [response, setResponse] = useState(null);

//      const fetchFeed = async () => {
//        setError("");
//        setResponse(null);
//        setLoading(true);

//        try {
//          console.clear();
//          console.log("➡️ Requesting feed", { page, limit });

//          const res = await fetch(
//            `https:api.matchatfirstswipe.com.au/api/v1/swipe/feed?page=${page}&limit=${limit}`,
//            {
//              method: "GET",
//              headers: {
//                Authorization: `Bearer ${token}`
//              }
//            }
//          );

//          const data = await res.json();
//          console.log("⬅️ API Response:", data);

//          if (!res.ok) {
//            throw new Error(data.message || "Failed to fetch feed");
//          }

//          setResponse(data);
//        } catch (err) {
//          setError(err.message);
//        } finally {
//          setLoading(false);
//        }
//      };

//      return (
//        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//          <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6 space-y-4">
//            <h1 className="text-2xl font-bold text-center">
//              Redis Feed Tester (Manual Page / Limit)
//            </h1>

//            {/* TOKEN */}
//            <div>
//              <label className="block text-sm font-medium mb-1">JWT Token</label>
//              <input
//                className="w-full border rounded px-3 py-2"
//                placeholder="Paste token (without Bearer)"
//                value={token}
//                onChange={(e) => setToken(e.target.value)}
//              />
//            </div>

//            {/* PAGE & LIMIT */}
//            <div className="flex gap-4">
//              <div className="flex-1">
//                <label className="block text-sm font-medium mb-1">Page</label>
//                <input
//                  type="number"
//                  className="w-full border rounded px-3 py-2"
//                  value={page}
//                  onChange={(e) => setPage(Number(e.target.value))}
//                  min={1}
//                />
//              </div>

//              <div className="flex-1">
//                <label className="block text-sm font-medium mb-1">Limit</label>
//                <input
//                  type="number"
//                  className="w-full border rounded px-3 py-2"
//                  value={limit}
//                  onChange={(e) => setLimit(Number(e.target.value))}
//                  min={1}
//                />
//              </div>
//            </div>

//            {/* FETCH BUTTON */}
//            <button
//              onClick={fetchFeed}
//              disabled={loading}
//              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
//            >
//              {loading ? "Fetching..." : "Fetch Feed"}
//            </button>

//            {/* ERROR */}
//            {error && (
//              <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
//                {error}
//              </div>
//            )}

//            {/* META INFO */}
//            {response && (
//              <div className="bg-gray-50 border p-3 rounded text-sm">
//                <p><b>Cached:</b> {String(response.cached)}</p>
//                <p><b>Count:</b> {response.count}</p>
//                <p><b>Page:</b> {page}</p>
//                <p><b>Limit:</b> {limit}</p>
//              </div>
//            )}

//            {/* FEED LIST */}
//            {response?.data && (
//              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                {response.data.map((item) => (
//                  <div
//                    key={item.userId}
//                    className="border rounded-lg p-4 space-y-1"
//                  >
//                    <p className="font-semibold">
//                      {item.profile.nickname} ({item.profile.age})
//                    </p>
//                    <p className="text-sm text-gray-500">
//                      {item.profile.distanceText}
//                    </p>
//                    <p className="text-sm">
//                      {item.context.compatibilityLabel} –{" "}
//                      {item.context.matchScore}%
//                    </p>
//                  </div>
//                ))}
//              </div>
//            )}

//            {/* RAW JSON */}
//            {response && (
//              <pre className="bg-black text-green-400 text-xs p-4 rounded max-h-96 overflow-auto">
//    {JSON.stringify(response, null, 2)}
//              </pre>
//            )}
//          </div>
//        </div>
//      );
//    }

//   import { useEffect, useMemo, useRef, useState } from "react";
//   import { io } from "socket.io-client";

//   /* ================= CONFIG ================= */
//   const API_BASE = "https:api.matchatfirstswipe.com.au";
//   const SOCKET_URL = "https:api.matchatfirstswipe.com.au";

//   /* ================= HELPERS ================= */
//   function getUserIdFromToken(token) {
//     if (!token) return null;
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.userId;
//     } catch {
//       return null;
//     }
//   }

//   /* ================= APP ================= */
//   export default function App() {
//     /* ---------- AUTH ---------- */
//     const [tokenA, setTokenA] = useState("");
//     const [tokenB, setTokenB] = useState("");

//     const userAId = useMemo(() => getUserIdFromToken(tokenA), [tokenA]);
//     const userBId = useMemo(() => getUserIdFromToken(tokenB), [tokenB]);

//     /* ---------- MATCH ---------- */
//     const [matchId, setMatchId] = useState("");

//     /* ---------- CHAT STATE ---------- */
//     const [messages, setMessages] = useState([]);
//     const [textA, setTextA] = useState("");
//     const [textB, setTextB] = useState("");

//     /* ---------- REPORT ---------- */
//     const [reportReason, setReportReason] = useState("fake");
//     const [reportDesc, setReportDesc] = useState("");

//     /* ---------- SOCKET ---------- */
//     const socketA = useRef(null);
//     const socketB = useRef(null);

//     /* ================= SOCKET CONNECT ================= */
//     useEffect(() => {
//       if (tokenA) {
//         socketA.current = io(SOCKET_URL, {
//           auth: { token: tokenA }
//         });

//         socketA.current.on("new_message", msg => {
//           setMessages(prev => [...prev, formatIncoming(msg, userAId)]);
//         });
//       }

//       if (tokenB) {
//         socketB.current = io(SOCKET_URL, {
//           auth: { token: tokenB }
//         });

//         socketB.current.on("new_message", msg => {
//           setMessages(prev => [...prev, formatIncoming(msg, userBId)]);
//         });
//       }

//       return () => {
//         socketA.current?.disconnect();
//         socketB.current?.disconnect();
//       };
//     }, [tokenA, tokenB, userAId, userBId]);

//     /* ================= JOIN CHAT ================= */
//     const joinChat = () => {
//       socketA.current?.emit("join_chat", { matchId });
//       socketB.current?.emit("join_chat", { matchId });
//     };

//     /* ================= SEND MESSAGE (EVENT ONLY) ================= */
//     const sendFromA = () => {
//       if (!textA.trim()) return;
//       socketA.current.emit("send_message", {
//         matchId,
//         text: textA
//       });
//       setTextA("");
//     };

//     const sendFromB = () => {
//       if (!textB.trim()) return;
//       socketB.current.emit("send_message", {
//         matchId,
//         text: textB
//       });
//       setTextB("");
//     };

//     /* ================= REPORT USER ================= */
//     const reportUser = async () => {
//       const otherUserId =
//         messages.find(m => !m.isMine)?.senderId;

//       if (!otherUserId) {
//         alert("No messages to report");
//         return;
//       }

//       const lastFiveMessages = messages.slice(-5).map(m => ({
//         text: m.text,
//         senderId: m.senderId,
//         sentAt: m.sentAt
//       }));

//       await fetch(
//         `${API_BASE}/api/v1/profile/report/${otherUserId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${tokenA}`
//           },
//           body: JSON.stringify({
//             reason: reportReason,
//             description: reportDesc,
//             context: {
//               matchId,
//               lastMessages: lastFiveMessages
//             }
//           })
//         }
//       );

//       alert("User reported successfully");
//     };

//     /* ================= UI ================= */
//     return (
//       <div className="min-h-screen bg-gray-100 p-6">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Chat + Events + Report (Test Panel)
//         </h1>

//         {/* TOKENS */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <input
//             placeholder="User A Token"
//             className="p-2 border rounded"
//             value={tokenA}
//             onChange={e => setTokenA(e.target.value)}
//           />
//           <input
//             placeholder="User B Token"
//             className="p-2 border rounded"
//             value={tokenB}
//             onChange={e => setTokenB(e.target.value)}
//           />
//         </div>

//         {/* MATCH */}
//         <div className="flex gap-2 mb-4">
//           <input
//             placeholder="Match ID"
//             className="p-2 border rounded flex-1"
//             value={matchId}
//             onChange={e => setMatchId(e.target.value)}
//           />
//           <button
//             onClick={joinChat}
//             className="bg-blue-600 text-white px-4 rounded"
//           >
//             Join Chat
//           </button>
//         </div>

//         {/* CHAT */}
//         <div className="grid grid-cols-2 gap-4">
//           {/* USER A */}
//           <ChatBox
//             title="User A"
//             messages={messages}
//             userId={userAId}
//             text={textA}
//             setText={setTextA}
//             send={sendFromA}
//           />

//           {/* USER B */}
//           <ChatBox
//             title="User B"
//             messages={messages}
//             userId={userBId}
//             text={textB}
//             setText={setTextB}
//             send={sendFromB}
//           />
//         </div>

//         {/* REPORT */}
//         <div className="mt-6 bg-white p-4 rounded shadow">
//           <h2 className="font-semibold mb-2">Report User (from User A)</h2>

//           <select
//             className="border p-2 mr-2"
//             value={reportReason}
//             onChange={e => setReportReason(e.target.value)}
//           >
//             <option value="fake">Fake</option>
//             <option value="spam">Spam</option>
//             <option value="abuse">Abuse</option>
//           </select>

//           <input
//             placeholder="Description"
//             className="border p-2 mr-2"
//             value={reportDesc}
//             onChange={e => setReportDesc(e.target.value)}
//           />

//           <button
//             onClick={reportUser}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Report
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ================= COMPONENTS ================= */

//   function ChatBox({ title, messages, userId, text, setText, send }) {
//     return (
//       <div className="bg-white rounded shadow p-3 flex flex-col h-[400px]">
//         <h3 className="font-semibold mb-2">{title}</h3>

//         <div className="flex-1 overflow-y-auto space-y-2 mb-2">
//           {messages.map((m, i) => (
//             <div
//               key={i}
//               className={`p-2 rounded max-w-[70%] ${
//                 m.senderId === userId
//                   ? "bg-green-200 ml-auto"
//                   : "bg-gray-200"
//               }`}
//             >
//               {m.text}
//             </div>
//           ))}
//         </div>

//         <div className="flex gap-2">
//           <input
//             className="border p-2 flex-1 rounded"
//             value={text}
//             onChange={e => setText(e.target.value)}
//             placeholder="Type message"
//           />
//           <button
//             onClick={send}
//             className="bg-green-600 text-white px-4 rounded"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ================= FORMATTER ================= */
//   function formatIncoming(msg, myUserId) {
//     return {
//       id: msg._id,
//       text: msg.text,
//       senderId: msg.sender,
//       isMine: msg.sender === myUserId,
//       sentAt: msg.createdAt
//     };
//   }

//  import { useRef, useState } from "react";
//  import { io } from "socket.io-client";

//  const API_BASE = "https:api.matchatfirstswipe.com.au";
//  const SOCKET_URL = "https:api.matchatfirstswipe.com.au";

//  /* ================= UTILS ================= */
//  function getUserIdFromToken(token) {
//    try {
//      return JSON.parse(atob(token.split(".")[1])).userId;
//    } catch {
//      return null;
//    }
//  }

//  export default function App() {
//    /* ================= STATE ================= */
//    const [tokenA, setTokenA] = useState("");
//    const [tokenB, setTokenB] = useState("");
//    const [matchId, setMatchId] = useState("");

//    const [messages, setMessages] = useState([]);
//    const [textA, setTextA] = useState("");
//    const [textB, setTextB] = useState("");

//    const socketA = useRef(null);
//    const socketB = useRef(null);

//    const userAId = getUserIdFromToken(tokenA);
//    const userBId = getUserIdFromToken(tokenB);

//    /* ================= SOCKET CONNECT ================= */
//    const connectUserA = () => {
//      console.log("🔌 Connecting User A socket");

//      socketA.current = io(SOCKET_URL, {
//        transports: ["websocket"],
//        extraHeaders: {
//          Authorization: `Bearer ${tokenA}`
//        }
//      });

//      socketA.current.on("connect", () => {
//        console.log("✅ User A socket connected", socketA.current.id);
//      });

//      socketA.current.on("new_message", msg => {
//        console.log("📩 User A received:", msg);
//        setMessages(prev => [...prev, formatMsg(msg, userAId)]);
//      });

//      socketA.current.on("connect_error", err => {
//        console.error("❌ User A socket error:", err.message);
//      });
//    };

//    const connectUserB = () => {
//      console.log("🔌 Connecting User B socket");

//      socketB.current = io(SOCKET_URL, {
//        transports: ["websocket"],
//        extraHeaders: {
//          Authorization: `Bearer ${tokenB}`
//        }
//      });

//      socketB.current.on("connect", () => {
//        console.log("✅ User B socket connected", socketB.current.id);
//      });

//      socketB.current.on("new_message", msg => {
//        console.log("📩 User B received:", msg);
//        setMessages(prev => [...prev, formatMsg(msg, userBId)]);
//      });

//      socketB.current.on("connect_error", err => {
//        console.error("❌ User B socket error:", err.message);
//      });
//    };

//    /* ================= JOIN CHAT ================= */
//    const joinChat = () => {
//      console.log("➡️ Joining chat:", matchId);
//      socketA.current.emit("join_chat", { matchId });
//      socketB.current.emit("join_chat", { matchId });
//    };

//    /* ================= SEND MESSAGE ================= */
//    const sendFromA = () => {
//      console.log("➡️ User A send:", textA);

//      socketA.current.emit("send_message", {
//        matchId,
//        text: textA
//      });

//      setMessages(prev => [
//        ...prev,
//        {
//          text: textA,
//          senderId: userAId,
//          isMine: true
//        }
//      ]);

//      setTextA("");
//    };

//    const sendFromB = () => {
//      console.log("➡️ User B send:", textB);

//      socketB.current.emit("send_message", {
//        matchId,
//        text: textB
//      });

//      setMessages(prev => [
//        ...prev,
//        {
//          text: textB,
//          senderId: userBId,
//          isMine: true
//        }
//      ]);

//      setTextB("");
//    };

//    /* ================= REPORT USER ================= */
//    const reportUser = async () => {
//      const otherUserId =
//        messages.find(m => m.senderId !== userAId)?.senderId;

//      const lastFiveMessages = messages.slice(-5).map(m => ({
//        text: m.text,
//        senderId: m.senderId,
//        sentAt: new Date()
//      }));

//      console.log("🚨 Reporting user:", otherUserId);

//      await fetch(`${API_BASE}/api/v1/profile/report/${otherUserId}`, {
//        method: "POST",
//        headers: {
//          "Content-Type": "application/json",
//          Authorization: `Bearer ${tokenA}`
//        },
//        body: JSON.stringify({
//          reason: "fake",
//          description: "test report",
//          context: {
//            matchId,
//            lastMessages: lastFiveMessages
//          }
//        })
//      });

//      alert("✅ Report sent");
//    };

//    /* ================= UI ================= */
//    return (
//      <div className="p-6 bg-gray-100 min-h-screen">
//        <h1 className="text-xl font-bold mb-4">
//          Chat Socket Test (WORKING)
//        </h1>

//        <div className="grid grid-cols-2 gap-4 mb-4">
//          <input
//            placeholder="User A Token"
//            className="p-2 border"
//            value={tokenA}
//            onChange={e => setTokenA(e.target.value)}
//          />
//          <input
//            placeholder="User B Token"
//            className="p-2 border"
//            value={tokenB}
//            onChange={e => setTokenB(e.target.value)}
//          />
//        </div>

//        <div className="flex gap-2 mb-4">
//          <button
//            onClick={connectUserA}
//            className="bg-green-600 text-white px-3 py-1"
//          >
//            Connect A
//          </button>
//          <button
//            onClick={connectUserB}
//            className="bg-blue-600 text-white px-3 py-1"
//          >
//            Connect B
//          </button>
//        </div>

//        <input
//          placeholder="Match ID"
//          className="p-2 border w-full mb-2"
//          value={matchId}
//          onChange={e => setMatchId(e.target.value)}
//        />

//        <button
//          onClick={joinChat}
//          className="bg-black text-white px-4 py-2 mb-4"
//        >
//          Join Chat
//        </button>

//        <div className="grid grid-cols-2 gap-4">
//          <ChatBox
//            title="User A"
//            messages={messages}
//            userId={userAId}
//            text={textA}
//            setText={setTextA}
//            send={sendFromA}
//          />
//          <ChatBox
//            title="User B"
//            messages={messages}
//            userId={userBId}
//            text={textB}
//            setText={setTextB}
//            send={sendFromB}
//          />
//        </div>

//        <button
//          onClick={reportUser}
//          className="mt-6 bg-red-600 text-white px-4 py-2"
//        >
//          Report User (A → B)
//        </button>
//      </div>
//    );
//  }

//  /* ================= COMPONENTS ================= */
//  function ChatBox({ title, messages, userId, text, setText, send }) {
//    return (
//      <div className="bg-white p-3 rounded shadow h-[300px] flex flex-col">
//        <h2 className="font-semibold mb-2">{title}</h2>

//        <div className="flex-1 overflow-y-auto space-y-2">
//          {messages.map((m, i) => (
//            <div
//              key={i}
//              className={`p-2 rounded ${
//                m.senderId === userId
//                  ? "bg-green-200 ml-auto"
//                  : "bg-gray-200"
//              }`}
//            >
//              {m.text}
//            </div>
//          ))}
//        </div>

//        <div className="flex gap-2 mt-2">
//          <input
//            value={text}
//            onChange={e => setText(e.target.value)}
//            className="border p-1 flex-1"
//          />
//          <button
//            onClick={send}
//            className="bg-green-600 text-white px-3"
//          >
//            Send
//          </button>
//        </div>
//      </div>
//    );
//  }

//  /* ================= FORMAT ================= */
//  function formatMsg(msg, myUserId) {
//    return {
//      text: msg.text,
//      senderId: msg.sender,
//      isMine: msg.sender === myUserId
//    };
//  }

//  import { useEffect } from "react";
//  import gsap from "gsap";
//  import { ScrollTrigger } from "gsap/ScrollTrigger";

//  gsap.registerPlugin(ScrollTrigger);

//  export default function App() {
//    useEffect(() => {
//       Smooth phone scroll animation through hero section
//      gsap.to("#phone-hero", {
//        scrollTrigger: {
//          trigger: "#hero-section",
//          start: "top top",
//          end: "bottom 90%",
//          scrub: 2,
//          markers: false,
//        },
//        y: 500,
//        ease: "none",
//      });

//       First phone benefits animation
//      gsap.timeline({
//        scrollTrigger: {
//          trigger: "#phone-1",
//          start: "top 70%",
//          end: "top 20%",
//          scrub: 1.5,
//          markers: false,
//        },
//      })
//        .fromTo(
//          "#phone-1-left",
//          { x: -200, opacity: 0 },
//          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
//        )
//        .fromTo(
//          "#phone-1-right",
//          { x: 200, opacity: 0 },
//          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
//          0.2
//        );

//       Second phone benefits animation
//      gsap.timeline({
//        scrollTrigger: {
//          trigger: "#phone-2",
//          start: "top 70%",
//          end: "top 20%",
//          scrub: 1.5,
//          markers: false,
//        },
//      })
//        .fromTo(
//          "#phone-2-left",
//          { x: -200, opacity: 0 },
//          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
//        )
//        .fromTo(
//          "#phone-2-right",
//          { x: 200, opacity: 0 },
//          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
//          0.2
//        );

//       Third phone benefits animation
//      gsap.timeline({
//        scrollTrigger: {
//          trigger: "#phone-3",
//          start: "top 70%",
//          end: "top 20%",
//          scrub: 1.5,
//          markers: false,
//        },
//      })
//        .fromTo(
//          "#phone-3-left",
//          { x: -200, opacity: 0 },
//          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
//        )
//        .fromTo(
//          "#phone-3-right",
//          { x: 200, opacity: 0 },
//          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
//          0.2
//        );

//      return () => {
//        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//      };
//    }, []);

//    return (
//      <div className="overflow-x-hidden bg-white">
//        {/* HERO SECTION */}
//        <section id="hero-section" className="relative min-h-screen bg-white pt-6">
//          {/* Navigation */}
//          <nav className="flex items-center justify-between px-8 md:px-16 py-6 relative z-20">
//            <div className="text-cyan-500 text-3xl font-bold">ZZ</div>
//            <div className="hidden md:flex items-center gap-10">
//              <a href="#" className="text-gray-800 hover:opacity-60 font-medium">About</a>
//              <a href="#" className="text-gray-800 hover:opacity-60 font-medium">Features</a>
//              <a href="#" className="text-gray-800 hover:opacity-60 font-medium">FAQ</a>
//              <button className="bg-white text-gray-800 border border-gray-300 px-8 py-2.5 rounded-full font-semibold hover:border-gray-400 transition">Join Now</button>
//            </div>
//          </nav>

//          {/* Hero Content Grid */}
//          <div className="grid grid-cols-3 gap-8 items-center min-h-[calc(100vh-140px)] px-8 md:px-16 max-w-7xl mx-auto">
//            {/* Left - Heading */}
//            <div className="col-span-1">
//              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
//                Match at First Swipe. Dating, Made Simple in Australia.
//              </h1>
//              <p className="text-gray-600 text-base leading-relaxed">
//                A modern dating app for Australians who want genuine matches, meaningful conversations.
//              </p>
//            </div>

//            {/* Center - Phone */}
//            <div id="phone-hero" className="col-span-1 flex justify-center">
//              <img
//                src="/After Scroll.png"
//                alt="Dating app phone"
//                className="w-72 drop-shadow-2xl"
//              />
//            </div>

//            {/* Right - QR CTA */}
//            <div className="col-span-1">
//              <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
//                Scan QR code to join the Early Access
//              </h3>
//              <p className="text-gray-600 mb-8">Launching soon across Australia au</p>
//              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 w-fit">
//                <div className="w-40 h-40 bg-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
//                  QR
//                </div>
//              </div>
//            </div>
//          </div>
//        </section>

//        {/* BENEFITS SECTION - THREE PHONES STACKED */}
//        <section id="benefits-section" className="relative py-32">
//          <div className="max-w-6xl mx-auto px-8 md:px-16">
//            <div id="phone-1" className="mb-32 relative">
//              <div className="grid grid-cols-3 gap-8 items-center">
//                <div id="phone-1-left" className="col-span-1 flex justify-end opacity-0">
//                  <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 border border-gray-200">
//                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">M</div>
//                    <span className="font-semibold text-gray-800">& Secure</span>
//                  </div>
//                </div>

//                <div className="col-span-1 flex justify-center">
//                  <img
//                    src="/Property 1=Default (5).png"
//                    alt="Phone 1"
//                    className="w-72 drop-shadow-2xl"
//                  />
//                </div>

//                {/* <div id="phone-1-right" className="col-span-1 opacity-0">
//                  <div className="bg-white rounded-full p-4 shadow-lg border border-gray-200 w-fit">
//                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-2xl">
//                      <span>♡</span>
//                    </div>
//                  </div>
//                </div> */}
//              </div>
//            </div>

//            <div id="phone-2" className="mb-32 relative">
//              <div className="grid grid-cols-3 gap-8 items-center">
//                <div id="phone-2-left" className="col-span-1 flex justify-end opacity-0">
//                  <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 border border-gray-200">
//                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">M</div>
//                    <span className="font-semibold text-gray-800">& Secure</span>
//                  </div>
//                </div>

//                {/* <div className="col-span-1 flex justify-center">
//                  <img
//                    src="/After Scroll.png"
//                    alt="Phone 2"
//                    className="w-72 drop-shadow-2xl"
//                  />
//                </div>

//                <div id="phone-2-right" className="col-span-1 opacity-0">
//                  <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 border border-gray-200">
//                    <span className="font-semibold text-gray-800">Verified Profiles</span>
//                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
//                  </div>
//                </div> */}
//              </div>
//            </div>

//            {/* <div id="phone-3" className="relative">
//              <div className="grid grid-cols-3 gap-8 items-center">
//                <div id="phone-3-left" className="col-span-1 flex justify-end opacity-0">
//                  <div className="bg-white rounded-full px-6 py-3 shadow-lg flex items-center gap-3 border border-gray-200">
//                    <span className="font-semibold text-gray-800">Safe & Secure</span>
//                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">🛡️</div>
//                  </div>
//                </div>

//                <div className="col-span-1 flex justify-center">
//                  <img
//                    src="/images/screenshot-20-28576-29.png"
//                    alt="Phone 3"
//                    className="w-72 drop-shadow-2xl"
//                  />
//                </div>

//                <div id="phone-3-right" className="col-span-1 opacity-0">
//                  <div className="bg-white rounded-full p-4 shadow-lg border border-gray-200 w-fit">
//                    <div className="text-4xl">🎁</div>
//                  </div>
//                </div>
//              </div>
//            </div> */}
//          </div>
//        </section>

//        {/* <section className="min-h-screen bg-white flex items-center justify-center border-t border-gray-200">
//          <div className="text-center px-4">
//            <h2 className="text-5xl font-bold text-gray-900 mb-4">Your Next Section</h2>
//            <p className="text-gray-600 text-lg">Add your content here</p>
//          </div>
//        </section> */}
//      </div>
//    );
//  }

//  export default function ConcentricCircles() {
//    return (
//      <div className="min-h-screen bg-black flex items-center justify-center p-8">
//        <div className="relative w-full max-w-4xl aspect-square">
//          {/* First circle - darkest gray */}
//          <div className="absolute inset-0 rounded-full bg-zinc-700 flex items-center justify-center">
//            {/* Second circle - medium gray */}
//            <div className="w-[70%] h-[70%] rounded-full bg-zinc-400 flex items-center justify-center">
//              {/* Third circle - light gray/white */}
//              <div className="w-[70%] h-[70%] rounded-full bg-zinc-200 flex items-center justify-center">
//                {/* Photo container */}
//                <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl">
//                  <img
//                    src=""
//                    alt="Profile"
//                    className="w-full h-full object-cover"
//                  />
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
//  }

/*
import { useState, useEffect, useRef } from "react";

export default function BenefitsSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isObjectCentered, setIsObjectCentered] = useState(false);
  const sectionRef = useRef(null);
  const objectRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

       Calculate when object should start moving (from hero section)
      const startMoving = Math.max(0, scrollY - 100);

       Calculate section visibility
      const sectionMiddle = sectionTop + sectionHeight / 2 - windowHeight / 2;
       eslint-disable-next-line no-unused-vars
      const distanceToCenter = Math.abs(scrollY - sectionMiddle);

       Object is centered when section is in view
      const centered =
        scrollY >= sectionTop - windowHeight / 2 &&
        scrollY <= sectionTop + sectionHeight / 2;

      setIsObjectCentered(centered);

       Calculate scroll progress for smooth movement
      const progress = Math.min(1, startMoving / (sectionTop - windowHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black">
      {/* Hero Section Placeholder 
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
        <h1 className="text-6xl font-bold text-white">Hero Section</h1>
      </div>

      {/* Floating Object (Phone/Product) 
      <div
        ref={objectRef}
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out`}
        style={{
          top: isObjectCentered ? "50%" : `${20 + scrollProgress * 30}%`,
          transform: `translate(-50%, -50%) scale(${
            isObjectCentered ? 1.1 : 0.9
          })`,
        }}
      >
        <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
          <img src="" alt="Product" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Benefits Section
      <div
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center p-8 relative"
      >
        <div className="relative w-full max-w-4xl aspect-square">
          {/* First circle - darkest gray with rotating red border 
          <div className="absolute inset-0 rounded-full bg-[#F0F1Fd] flex items-center justify-center overflow-hidden">
            {/* {isObjectCentered && (
  <div className="absolute inset-0 rounded-full animate-spin-slow">
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: `
          conic-gradient(
            from 0deg,
            #7f1d1d 0deg,
            #ef4444 40deg,
            #7f1d1d 80deg,
            #7f1d1d 360deg
          )
        `,
        WebkitMask:
          'radial-gradient(circle, transparent 69%, black 70%)',
        mask:
          'radial-gradient(circle, transparent 69%, black 70%)',
      }}
    />
  </div>
)} 

            {isObjectCentered && (
              <div className="absolute inset-0 rounded-full animate-spin-slow">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `
          conic-gradient(
            from 0deg,
            rgba(239,68,68,0) 0deg,
            rgba(239,68,68,0.15) 60deg,
            rgba(239,68,68,0.4) 120deg,
            rgba(239,68,68,0.9) 180deg,
            rgba(239,68,68,0.4) 240deg,
            rgba(239,68,68,0.15) 300deg,
            rgba(239,68,68,0) 360deg
          )
        `,
                    WebkitMask:
                      "radial-gradient(circle, transparent 69%, black 70%)",
                    mask: "radial-gradient(circle, transparent 69%, black 70%)",
                    filter: "blur(0.6px)",
                  }}
                />
              </div>
            )}

            {/* Second circle - medium gray with rotating red border 
            <div className="w-[70%] h-[70%] rounded-full bg-zinc-400 flex items-center justify-center relative overflow-hidden">
              {isObjectCentered && (
                <div className="absolute inset-0 rounded-full animate-spin-slow">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `
          conic-gradient(
            from 0deg,
            rgba(239,68,68,0) 0deg,
            rgba(239,68,68,0.15) 60deg,
            rgba(239,68,68,0.4) 120deg,
            rgba(239,68,68,0.9) 180deg,
            rgba(239,68,68,0.4) 240deg,
            rgba(239,68,68,0.15) 300deg,
            rgba(239,68,68,0) 360deg
          )
        `,
                      WebkitMask:
                        "radial-gradient(circle, transparent 69%, black 70%)",
                      mask: "radial-gradient(circle, transparent 69%, black 70%)",
                      filter: "blur(0.6px)",
                    }}
                  />
                </div>
              )}

              {/* Third circle - light gray with rotating red border
              <div className="w-[70%] h-[70%] rounded-full bg-zinc-200 flex items-center justify-center relative overflow-hidden">
                {isObjectCentered && (
                  <div className="absolute inset-0 rounded-full animate-spin-slow">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `
          conic-gradient(
            from 0deg,
            rgba(239,68,68,0) 0deg,
            rgba(239,68,68,0.15) 60deg,
            rgba(239,68,68,0.4) 120deg,
            rgba(239,68,68,0.9) 180deg,
            rgba(239,68,68,0.4) 240deg,
            rgba(239,68,68,0.15) 300deg,
            rgba(239,68,68,0) 360deg
          )
        `,
                        WebkitMask:
                          "radial-gradient(circle, transparent 69%, black 70%)",
                        mask: "radial-gradient(circle, transparent 69%, black 70%)",
                        filter: "blur(0.6px)",
                      }}
                    />
                  </div>
                )}

                {/* Center space for the floating object
                <div className="w-64 h-64" />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Content 
        <div
          className={`absolute bottom-20 left-0 right-0 text-center transition-opacity duration-1000 ${
            isObjectCentered ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Premium Benefits
          </h2>
          <p className="text-xl text-zinc-400">Experience the difference</p>
        </div>
      </div>

      {/* Next Section Placeholder 
      <div className="h-screen flex items-center justify-center bg-zinc-900">
        <h2 className="text-5xl font-bold text-white">Next Section</h2>
      </div>

                  <div>
                    <Label htmlFor="forgotConfirmPassword" className="text-sm font-semibold text-slate-700">
                      Confirm New Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="forgotConfirmPassword"
                        type={forgotPasswordForm.showConfirmPassword ? 'text' : 'password'}
                        value={forgotPasswordForm.confirmPassword}
                        onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value, error: '' }))}
                        placeholder="Confirm new password"
                        className="pr-10 border-2 focus:border-pink-500 font-medium"
                        disabled={loading || forgotPasswordForm.isVerifying}
                      />
                      <button
                        type="button"
                        onClick={() => setForgotPasswordForm(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {forgotPasswordForm.showConfirmPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                      </button>
                    </div>
                    {forgotPasswordForm.confirmPassword && (
                      <p className={`mt-2 text-sm font-semibold flex items-center gap-1 ${
                        forgotPasswordForm.newPassword === forgotPasswordForm.confirmPassword ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {forgotPasswordForm.newPassword === forgotPasswordForm.confirmPassword ? (
                          <><IconCheck size={16} /> Passwords match</>
                        ) : (
                          <><IconX size={16} /> Passwords do not match</>
                        )}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || forgotPasswordForm.isVerifying || forgotPasswordForm.otp.length !== 6}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 font-semibold shadow-lg text-base py-6"
                  >
                    {forgotPasswordForm.isVerifying ? 'Resetting Password...' : 'Reset Password'}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setForgotPasswordForm(prev => ({ 
                      ...prev, 
                      otpSent: false, 
                      otp: '', 
                      newPassword: '', 
                      confirmPassword: '',
                      error: '' 
                    }))}
                    className="w-full font-semibold"
                    disabled={loading || forgotPasswordForm.isVerifying}
                  >
                    ← Back to Email Entry
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Security Tips */}
        <Card className="mt-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconAlertCircle className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Security Tips</h3>
                <ul className="text-sm text-blue-800 space-y-1 font-medium">
                  <li>• Use a unique password that you don&apos;t use for other accounts</li>
                  <li>• Make sure your password is at least 8 characters long</li>
                  <li>• Include a mix of uppercase, lowercase, numbers, and special characters</li>
                  <li>• Change your password regularly for better security</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
*/

export default AdminProfile;