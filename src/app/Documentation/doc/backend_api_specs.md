# 🚀 Dashboard API Documentation (Frontend to Backend Guide)

Yeh document backend team ke liye hai taaki frontend ki **Dashboard Insights API** ko easily same JSON format me design aur implement kiya ja sake. Frontend par abhi hum `dummyResponse` use kar rahe hain jo ki date-filters (Today, Last 7 days, custom date, etc.) ke hisaab se dynamically change hota hai. 

Backend ko same JSON structure return karna hai taaki frontend perfectly chal sake bina API structure change kare.

## 📌 Endpoint Details
- **Route:** `GET /api/v1/admin/dashboard/data` (Ya jo bhi backend team decide kare, isko `src/services/api-enpoints/dashboard.enpoints.js` me change kr sakte hain baad me)
- **Method:** `GET`

### 1️⃣ Request Query Parameters (Frontend kya bhejega?)
Frontend date filters ke base par query parameters bhejega. `From` and `to` dates ISO format mein aayengi:
- `from` : Start Date (e.g. `2026-04-01T00:00:00.000Z`)
- `to` : End Date (e.g. `2026-04-08T23:59:59.999Z`)

> [!TIP]
> *Zaroori Note:* Agar koi query parameter nahi aata hai toh API ko mostly default **Last 7 days** ka data return karna chahiye.

---

### 2️⃣ Expected JSON Response Format (Backend kya return karega?)
Backend se exact neeche diye gye format mein response aana chahiye. Main keys kya kaam karti hain uska exact explanation comments me diya hai.

```json
{
  "success": true,
  "meta": {
    "dateRange": { "from": "...", "to": "..." },
    "preset": "last7", 
    "periodLabel": "Last 7 Days", 
    "contextLabel": "vs previous 7 days" 
    // ^ ^ ^ Yeh labels frontend UI mein title ya comparisons dikhane ke kaam aate hain. (e.g "Last 7 days at a glance")
  },
  "data": {

    // 🌟 ZONE A: "Main Top KPIs" (Top 5 Quick Stats)
    "zoneA": {
      "title": "Last 7 days at a glance", // Backend se bhejna best rhega
      "stats": [
        {
          "label": "Revenue",
          "value": "+8.5%",
          "sub": "vs previous 7 days", 
          "icon": "Sparkles", // Frontend supports: Sparkles, TrendingUp, Users, ShieldAlert, Flag
          "color": "emerald" 
        },
        {
          "label": "KYC pending",
          "value": "120",
          "sub": "Review now →",
          "icon": "ShieldAlert",
          "color": "cyan",
          "isActionable": true, // True hone pe ye link jaisa dikhta hai  
          "route": "/admin/management/kyc-verifications"
        }
        // (Isi format mein total 5 objects bhejne hai Zone A ke lie)
      ]
    },

    // 🚨 ZONE B: "Ecosystem Alerts" (3 Danger/Warning Cards)
    "zoneB": {
      "alerts": [
        {
          "id": "kyc",
          "label": "KYC Verification",
          "value": "120 profiles waiting for approval",
          "sub": "Review to activate new users",
          "badge": "High", // Priority Set
          "badgeColor": "red",
          "icon": "ShieldCheck",
          "route": "/admin/management/kyc-verifications"
        }
        // Ghosting Rate, High Reported Users ke details similarly add honge...
      ]
    },

    // 📊 ZONE C: "Key Metrics Health" (Sparkline Graphs aur Ratios ke liye)
    "zoneC": {
      "metrics": [
        {
          "label": "Match Liquidity",
          "value": "1.5%",
          "sub": "150 matches / 10k swipes",
          "trend": "8.3%",
          "isPositive": true, // True mtlb Green graph/trend, False mtlb Red
          "chartData": [20, 40, 35, 50, 45, 60, 55] // 7 din ke chhote line graph ki values
        },
        {
          "label": "Gender Ratio",
          "value": "63 : 37",
          "sub": "Male : Female",
          "isRatio": true, // Is flag ke karan graph ki jagah ek cute ratio bar banta hai
          "ratioValue": 63 // Out of 100 male value bhej do bas
        }
      ]
    },

    // 💰 REVENUE BREAKDOWN
    "revenueBreakdown": {
      "subtitle": "Last 7 days revenue by source",
      "total": "520", // Centered total value
      "insight": "Boosts contribute 31% of last 7 days revenue", 
      "categories": [
        {
          "label": "Subscriptions",
          "value": 202800,
          "displayValue": "202k",
          "percentage": 39,
          "color": "hsl(182 59% 75%)" // Colors ko exactly ase hi use karwa sakte hain
        }
      ]
    },

    // 📉 CONVERSION FUNNEL
    "conversionFunnel": {
      "subtitle": "Where users drop off",
      "insight": "Biggest drop is at Profile Completion. Consider UX improvements.",
      "stages": [
        {
          "label": "App Installs",
          "value": 10000,
          "dropOff": 0,
          "color": "hsl(182 100% 88%)"
        },
        {
          "label": "Signups",
          "value": 8200,
          "dropOff": -18,
          "color": "hsl(182 85% 78%)"
        }
      ]
    },

    // 🎯 PERFORMANCE INSIGHTS
    "performanceInsights": {
      "subtitle": "What's working, what needs focus",
      "insight": "Boosts and 4+ photo users drive the best results.",
      "metrics": [
        {
          "label": "Boost ROI",
          "value": "4.5x", // Value show ke lie
          "percentage": 90, // Progress line ki percentage show ke lie
          "color": "hsl(182 59% 54%)"
        }
        // Super Keen rate, Normal match rate vgera...
      ]
    },

    // 🔴 LIVE ACTIVITY (Real-time events)
    "liveActivity": {
      "subtitle": "Important events happening now",
      "events": [
        {
          "id": 1,
          "time": "just now",
          "description": "User #4821 bought a Boost",
          "color": "#46C7CD"
        },
        {
          "id": 2,
          "time": "1m ago",
          "description": "Aisha & Rohan just matched!",
          "color": "#46C7CD"
        }
      ]
      // NOTE: Is list ko as realtime event feed ya most-recent polling ke taur par append kar sakte hain. E.g Trading platform type har 1 sec update hona chahiye.
    },

    // 🔥 ACTIVITY HEATMAP
    "activityHeatmap": {
      "subtitle": "When your users are most active",
      "insight": "Peak activity: 7PM - 10PM • Best day: Friday",
      "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      "times": ["6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am"],
      "data": [
        [1, 1, 1, 1, 2, 3, 3, 2], // Mon
        [1, 2, 1, 1, 2, 3, 3, 2], // Tue
        [1, 1, 1, 2, 2, 3, 3, 2]  // Wed
        // ... (data values 0 to 3 ke beech vary krni chahie - intensity dikhati hai)
      ]
      // NOTE: Yeh heatmap data proper Monday-Sunday basis aur specific timings ke mutabiq backend se aana chahiye.
    },

    // 👥 USER GROWTH & GENDER
    "genderGrowth": {
      "subtitle": "Daily signups for the last 7 days",
      "insight": "Male signups are up 18% this week",
      "data": [
        { "day": "Mon", "male": 300, "female": 210 },
        { "day": "Tue", "male": 260, "female": 200 }
      ]
      // NOTE: Iss section me data main top-right date filter KE AUR andar module ke lokal drop-down (7d, 30d, 3m) dono basis pe update hona chahiye. API me `timeRange` query param support krein.
    }
    
  }
}
```

### 💡 Backend Developer Ke Liye Pro-Tips:
1. **Naming & Types are very important:** JSON object ke andar key names (jaise `isActionable`, `chartData`, `route` etc.) exact upper design ke hisaab se hi aani chaiyein warna frontend variables mapping me error de sakta hai. 
2. **Context Labels dynamically calculate karein:** Frontend par saari responsibility daalne se acha hai API direct text generate karke hi bheje. Jaise agr `from` and `to` ek din ka date span hai toh backend `meta.contextLabel` me `"vs yesterday"` bhejega, aur agar custom period hai to `"vs previous period"` bhejega. Usse humara code logic kafi less ho jata hai!
3. **Real-time Live Activity:** "Live Activity" ka nature event-stream/trading-type ka hai. Aage chalke hum isko separate WebSocket endpoint (`wss://...`) par bhi move kar sakte hain so that wo UI pe live flash ho. Heatmap ki values pure hafte ki average activity ke basis par aayengi. User Growth chart local component level pe dropdown filters override provide karta hai!
