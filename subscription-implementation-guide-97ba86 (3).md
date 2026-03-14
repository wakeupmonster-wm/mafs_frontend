# Keen as Mustard — Master Implementation & Handoff Document (v3)

> **Single source of truth** for the Subscription & Monetization module.
> Covers architecture, schemas, APIs, admin panel, Flutter integration, edge cases, and testing.
> Structured by team domain: **Backend → Admin → Flutter → QA**.

| | |
|---|---|
| **Flutter app name** | Keen as Mustard |
| **Backend codebase** | MAFS (unchanged) |
| **Version** | v3 — Master Handoff |
| **Last updated** | 2026-02-26 |

---

# PART 0 — OVERVIEW & LOCKED DECISIONS

Everything in this section is **final and agreed upon**. Do not change without PM approval.

---

## 0.1 Decisions Locked In

| # | Topic | Decision |
|---|---|---|
| 1 | API response format | **ALL** APIs return `{ success: boolean, message: string, data: any }` |
| 2 | Grace period | **None.** No `GRACE` status, no grace UI, no grace fields |
| 3 | Promo codes | Not in v1 |
| 4 | Mid-cycle upgrade/downgrade | Not in v1. New purchase replaces old. Pushed to v2 |
| 5 | Plans | 2 only: **1-Month ($9.95 AUD)**, **3-Month ($24 AUD)** |
| 6 | Premium perks | See §0.3 for full list (8 perks) |
| 7 | Supercharge naming | Supercharge == Boost (same feature, one name throughout) |
| 8 | Store product IDs | Placeholders until Apple/Google accounts ready |
| 9 | Daily reset timezone | **AEST (Australia/Sydney)** — midnight AEST |
| 10 | Admin controls | **Quantities only** (6 numbers). Reset periods are hardcoded, never editable |
| 11 | Purchased consumables | **Never expire.** Survive subscription expiry. User paid real money |
| 12 | Milestone reward | First **1,000 users** auto-granted 30-day Premium on registration. No claim button |
| 13 | Daily Giveaway | Existing giveaway system updated to include **ALL users** (free + premium) as eligible winners |
| 14 | AdMob | Free users see ads. Premium users do not. Native ad cards only — no sticky banners |
| 15 | Subscription expiry notification | Push notification sent **3 days** before subscription expires |

---

## 0.2 Premium Plan Details

One plan, two billing variations:

| Variation | Price (AUD) | Duration | Store Product ID (placeholder) |
|---|---|---|---|
| 1-Month | $9.95 | 30 days | `com.keenasmustard.premium.1month` |
| 3-Month | $24.00 | 90 days | `com.keenasmustard.premium.3month` |

---

## 0.3 Premium Perks (Full List)

All of these are included with any active Premium subscription:

| # | Perk | Details |
|---|---|---|
| 1 | **Unlimited Likes** | No daily cap |
| 2 | **Unlimited Rewinds** | No daily cap |
| 3 | **3 Super Keens / day** | Daily reset at midnight AEST (admin-configurable quantity) |
| 4 | **2 Profile Boosts / month** | Monthly reset on 1st (admin-configurable quantity) |
| 5 | **See Who Liked You** | Feature toggle (admin can disable) |
| 6 | **Passport** | Change location to swipe in other cities (feature toggle) |
| 7 | **Advanced Filters** | Feature toggle (admin can disable) |
| 8 | **No Ads** | AdMob hidden for premium users |

---

## 0.4 Out of Scope (v1)

- No grace periods
- No promo codes
- No mid-cycle upgrade/downgrade flows
- No consumable purchase analytics in admin dashboard (post-launch)
- No automated email on subscription expiry (cron exists, integration deferred)

---

## 0.5 The Two-Bucket System (Core Rule)

There are **TWO completely different types** of consumables. They follow different rules. Every developer must understand this before writing any code.

### Bucket 1: FREE ALLOCATIONS (included with tier)

"Use it or lose it" — resets on a fixed schedule, does **NOT** stack. Like a daily lunch allowance: skip today, you don't get two tomorrow.

| Item | Free User | Premium User | Reset Period (hardcoded) |
|---|---|---|---|
| **Likes / Swipes** | 30 per day | Unlimited | Daily at midnight AEST |
| **Rewinds** | 3 per day | Unlimited | Daily at midnight AEST |
| **Super Keens** | 1 per week | 3 per day | Weekly (Monday midnight AEST) for free / Daily for premium |
| **Boosts** | 0 (none) | 2 per month | Monthly (1st of each month at midnight AEST) |

**Why different periods?** Intentional (Tinder model):
- **Likes/Rewinds** = everyday actions → daily reset
- **Super Keens** = special → weekly for free (scarcity/FOMO), daily for premium (generous)
- **Boosts** = most valuable → monthly even for premium

**Admin controls quantity only.** Periods are hardcoded. Admin cannot change "per day" to "per week." This avoids edge-case nightmares and no major dating app allows period changes.

### Bucket 2: PURCHASED CONSUMABLES (bought with real money)

Simple rule: **purchased consumables NEVER expire.** No validity period. They stay forever.

- Free user buys 5 Super Keens for $3.50 → those 5 stay whether used today, next month, or next year
- Premium user buys 10 Boosts and subscription expires next week → those 10 Boosts are still there after expiry
- Taking away paid items = refund requests, bad reviews, potential Apple/Google policy violations

This is exactly how Tinder, Bumble, and Hinge handle it.

### How the Two Buckets Work TOGETHER (Consumption Priority)

When a user performs an action (Super Keen, Boost, Like, Rewind):
1. **Use from FREE ALLOCATION first** (quota)
2. If quota exhausted → **use from PURCHASED BALANCE** (wallet)
3. If both are 0 → **return error** → Flutter shows store/paywall

**Real example:** Premium user has 3 free Super Keens/day + bought 5 from store.
- Uses 1 → 2 free remaining, 5 purchased
- Uses 2 → 1 free remaining, 5 purchased
- Uses 3 → 0 free remaining, 5 purchased
- Uses 4 → dips into purchased → 0 free, **4 purchased**
- Next day at midnight → free resets to 3, purchased stays at 4

If this user's Premium expires → drops to 1 free Super Keen/week. But 4 purchased still there.

---

## 0.6 Admin Controls Summary

The admin panel has **ONE configuration page** with just quantities. No duration fields, no validity fields, no expiry settings.

### The 6 Admin-Configurable Numbers

| # | Setting | Default | Controls |
|---|---|---|---|
| 1 | Free user swipes per day | 30 | How many likes/swipes free users get daily |
| 2 | Free user rewinds per day | 3 | How many rewinds free users get daily |
| 3 | Free user Super Keens per week | 1 | How many Super Keens free users get weekly |
| 4 | Free user boosts per month | 0 | How many boosts free users get monthly (default: none) |
| 5 | Premium user Super Keens per day | 3 | How many Super Keens premium users get daily |
| 6 | Premium user boosts per month | 2 | How many boosts premium users get monthly |

**Not configurable by admin (hardcoded):**
- Premium likes = unlimited (hardcoded `-1`)
- Premium rewinds = unlimited (hardcoded `-1`)
- Reset periods (daily/weekly/monthly) — fixed in code
- Purchased consumable expiry — always "never"

---

## 0.7 Consumable Pack Pricing

### Super Keen Packs
| Pack | Price (AUD) | Per-unit | Store Product ID (placeholder) |
|---|---|---|---|
| 1 Super Keen | $1.00 | $1.00 | `com.keenasmustard.superkeen.1` |
| 5 Super Keens | $3.50 | $0.70 | `com.keenasmustard.superkeen.5` |
| 10 Super Keens | $6.00 | $0.60 | `com.keenasmustard.superkeen.10` |

### Boost Packs
| Pack | Price (AUD) | Per-unit | Store Product ID (placeholder) |
|---|---|---|---|
| 1 Boost | $3.00 | $3.00 | `com.keenasmustard.boost.1` |
| 5 Boosts | $12.50 | $2.50 | `com.keenasmustard.boost.5` |
| 10 Boosts | $20.00 | $2.00 | `com.keenasmustard.boost.10` |

---

## 0.8 Implementation Order (All Teams)

Each step must be completed + tested before moving forward. Steps are numbered for sequencing — team assignments are noted.

| Step | Task | Team | Est. Hours |
|---|---|---|---|
| 1 | Cleanup & Security Fixes | Backend | ~2h |
| 2 | Create/Update Schemas | Backend | ~4h |
| 3 | UsageService (the engine) | Backend | ~6h |
| 4 | Catalog + Status APIs *(Flutter starts here)* | Backend | ~4h |
| 5 | Enforce Quotas in existing APIs | Backend | ~4h |
| 6 | Purchases (subscription + consumable verify, restore) | Backend | ~6h |
| 7 | Webhooks (update Apple/Google handlers) | Backend | ~2h |
| 8 | Milestone Auto-Grant | Backend | ~2h |
| 9 | Cron Jobs (expiry, notification, giveaway) | Backend | ~3h |
| 10 | Admin APIs | Backend | ~4h |
| 11 | Admin Panel Screens | Admin (React) | ~8-10h |
| 12 | Profile/Auth Formatter + Legacy Cleanup | Backend | ~3h |
| 13 | Flutter Integration | Flutter | ~15-20h |
| 14 | QA & Edge Case Testing | QA | ~8-10h |

---
---

# PART 1 — BACKEND DOMAIN

All backend implementation tasks, schemas, services, APIs, webhooks, and cron jobs.

---

## 1.1 Cleanup & Critical Fixes

> **Time:** ~2 hours | **No new features — just fixing landmines**

### 1.1.1 Firebase private key — move to env vars

**File:** `config/firebase-service-account.json`
**Problem:** Full private key committed to git. Anyone with repo access has Firebase Admin.
**Fix:**
1. Copy the JSON contents into env var `FIREBASE_SERVICE_ACCOUNT_JSON`
2. Parse it at runtime: `JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)`
3. Add `config/firebase-service-account.json` to `.gitignore`
4. Rotate the key in Firebase Console immediately

### 1.1.2 Redis URL from env

**File:** `config/cache.js`
**Problem:** Hardcoded `redis://127.0.0.1:6379`
**Fix:** Use `process.env.REDIS_URL || "redis://127.0.0.1:6379"`

### 1.1.3 Delete dead code

- **Delete** `modules/matches/swipe/matches.model.js` — duplicate Match model, causes `OverwriteModelError`
- **Delete** `modules/NewAdmin/` — entire directory is unused duplicate of `modules/Admin/`

### 1.1.4 Enable auth status checks

**File:** `modules/auth/auth.middleware.js`
**Problem:** Banned/deactivated/deleted checks are commented out. Banned users can still call all APIs.
**Fix:** Uncomment the account status checks.

### 1.1.5 Fix subscription data fragmentation

**Current problem (CRITICAL):** Premium state lives in 4 places, NOT synced:
1. `User.isPremium` + `User.premiumExpiresAt` — NEVER written by subscription module
2. `Profile.subscription` subdoc — written by `_syncProfile()`
3. `UserSubscription` model — read by `quotaHelper` and feed, but NEVER updated by IAP flow
4. `Subscription` model — the actual IAP record

**Result:** User buys subscription via IAP → `Subscription` created → `Profile.subscription` synced → but `UserSubscription` still says "free" → quota stays at free limits.

**Fix:** After §1.2, the new `UsageService` will read from `Subscription` model + `SubscriptionConfig` directly. The old `UserSubscription`, `quotaHelper`, and `limit.service.js` will be deprecated.

---

## 1.2 Schemas (Create / Update)

> **Time:** ~4 hours

### 1.2.1 `SubscriptionConfig` — Admin-controlled limits (NEW)

**File to create:** `modules/subscription/models/SubscriptionConfig.js`
**Purpose:** Single source of truth for the 6 admin numbers + premium feature toggles.
**Pattern:** Singleton document (only one row in the collection). Use `findOneAndUpdate` with `upsert: true`.

```js
{
  // --- The 6 admin-configurable numbers ---
  freeLimits: {
    swipesPerDay:      { type: Number, default: 30 },   // #1
    rewindsPerDay:     { type: Number, default: 3 },    // #2
    superKeensPerWeek: { type: Number, default: 1 },    // #3
    boostsPerMonth:    { type: Number, default: 0 },    // #4
  },
  premiumLimits: {
    // swipesPerDay: not stored — hardcoded as -1 (unlimited)
    // rewindsPerDay: not stored — hardcoded as -1 (unlimited)
    superKeensPerDay:  { type: Number, default: 3 },    // #5
    boostsPerMonth:    { type: Number, default: 2 },    // #6
  },

  // --- Premium feature toggles ---
  premiumFeatures: {
    seeWhoLikedYou: { type: Boolean, default: true },
    passport:        { type: Boolean, default: true },   // NEW: location change
    advancedFilters: { type: Boolean, default: true },
    noAds:           { type: Boolean, default: true },
  },

  // --- Milestone config ---
  milestone: {
    targetUserCount:   { type: Number, default: 1000 },   // first N users get premium
    grantDurationDays: { type: Number, default: 30 },     // how many days of premium
    isActive:          { type: Boolean, default: true },   // admin can disable
  },

  updatedBy: { type: ObjectId, ref: 'User' }  // admin who last changed
}
```

**Important:** Reset periods are NOT stored here. They are hardcoded constants in `UsageService`:
```js
const RESET_PERIODS = {
  FREE_SUPER_KEENS:    'WEEKLY',   // Monday midnight AEST
  PREMIUM_SUPER_KEENS: 'DAILY',    // midnight AEST
  BOOSTS:              'MONTHLY',  // 1st of month midnight AEST
  LIKES:               'DAILY',    // midnight AEST
  REWINDS:             'DAILY',    // midnight AEST
};
```

### 1.2.2 `Product` — Catalog for subscriptions + consumable packs (NEW)

**File to create:** `modules/subscription/models/Product.js`
**Purpose:** Flutter gets prices, badges, quantities from API. No hardcoding in app.

> **SCALABILITY NOTE:** `planType` is a free-form **String**, NOT an enum. This allows admin to create new plan types (e.g., "6_MONTH", "YEARLY") without code changes. Validation happens at the application layer, not schema layer.

```js
{
  productKey:   { type: String, unique: true },  // e.g. "superkeen_5", "boost_10", "premium_1month"
  type:         { type: String, enum: ['SUBSCRIPTION', 'CONSUMABLE'] },
  
  // Subscription-specific
  planType:     { type: String },                // "1_MONTH", "3_MONTH" — NOT an enum (scalable)
  durationDays: { type: Number },                // 30, 90 — admin can set for new plans
  
  // Consumable-specific
  consumableType: { type: String, enum: ['SUPER_KEEN', 'BOOST'] },  // only for CONSUMABLE
  quantity:       { type: Number },  // how many items in this pack
  
  // Display (for Flutter UI)
  displayName:  { type: String },    // "5 Super Keens"
  subtitle:     { type: String },    // "Only $0.70 each"
  badge:        { type: String },    // "Popular", "Best Value"
  displayPrice: { type: String },    // "$3.50" (display only — real price from store)
  priceAUD:     { type: Number },    // 3.50 (for admin reference)
  
  // Store product IDs (filled when Apple/Google accounts ready)
  appleProductId:  { type: String, default: null },
  googleProductId: { type: String, default: null },
  
  // Admin controls
  isActive:     { type: Boolean, default: true },
  sortOrder:    { type: Number, default: 0 },
}
```

#### Seed Data (8 Products)

**Subscriptions:**
| productKey | displayName | displayPrice | planType | durationDays |
|---|---|---|---|---|
| `premium_1month` | Keen as Mustard Premium (1 Month) | $9.95 | 1_MONTH | 30 |
| `premium_3month` | Keen as Mustard Premium (3 Months) | $24.00 | 3_MONTH | 90 |

**Super Keen Packs:**
| productKey | quantity | displayPrice | subtitle | badge |
|---|---|---|---|---|
| `superkeen_1` | 1 | $1.00 | — | — |
| `superkeen_5` | 5 | $3.50 | Only $0.70 each | — |
| `superkeen_10` | 10 | $6.00 | Only $0.60 each | Best Value |

**Boost Packs:**
| productKey | quantity | displayPrice | subtitle | badge |
|---|---|---|---|---|
| `boost_1` | 1 | $3.00 | — | — |
| `boost_5` | 5 | $12.50 | $2.50 each | Popular |
| `boost_10` | 10 | $20.00 | $2.00 each | Best Value |

### 1.2.3 Usage Tracking Models (NEW)

#### `UserDailyUsage` — Daily counters

**File to create:** `modules/subscription/models/UserDailyUsage.js`
**Purpose:** Track likes, rewinds, and premium super keens used per day.

```js
{
  userId:          { type: ObjectId, ref: 'User', required: true },
  dateKey:         { type: String, required: true },  // "2026-02-25" in AEST
  likesUsed:       { type: Number, default: 0 },
  rewindsUsed:     { type: Number, default: 0 },
  superKeensUsed:  { type: Number, default: 0 },  // only for premium daily reset
}
// Compound unique index: { userId: 1, dateKey: 1 }
```

**Reset rule:** New document each AEST day. Old docs are naturally "reset" because the `dateKey` changes. Optionally TTL-index to auto-delete docs older than 7 days.

#### `UserWeeklyUsage` — Weekly counters (free Super Keens)

**File to create:** `modules/subscription/models/UserWeeklyUsage.js`
**Purpose:** Track free-tier Super Keens used per week.

```js
{
  userId:          { type: ObjectId, ref: 'User', required: true },
  weekKey:         { type: String, required: true },  // "2026-W09" (ISO week in AEST)
  superKeensUsed:  { type: Number, default: 0 },
}
// Compound unique index: { userId: 1, weekKey: 1 }
```

**Reset rule:** New document each Monday midnight AEST.

#### `UserMonthlyUsage` — Monthly counters (Boosts)

**File to create:** `modules/subscription/models/UserMonthlyUsage.js`
**Purpose:** Track boosts used per calendar month.

```js
{
  userId:       { type: ObjectId, ref: 'User', required: true },
  monthKey:     { type: String, required: true },  // "2026-02" in AEST
  boostsUsed:   { type: Number, default: 0 },
}
// Compound unique index: { userId: 1, monthKey: 1 }
```

**Reset rule:** New document each 1st-of-month midnight AEST.

### 1.2.4 `UserConsumableBalance` — Purchased wallet (NEW)

**File to create:** `modules/subscription/models/UserConsumableBalance.js`
**Purpose:** Purchased pack balances. **Never expires.**

```js
{
  userId:           { type: ObjectId, ref: 'User', required: true, unique: true },
  superKeensBalance: { type: Number, default: 0 },
  boostsBalance:     { type: Number, default: 0 },
}
```

**Rules:**
- Incremented when consumable purchase is verified
- Decremented only when free allocation is exhausted and user uses an item
- **NEVER** decremented or zeroed on subscription expiry
- **NEVER** has a TTL or expiry date

### 1.2.5 Update Existing `Subscription` Model

**File:** `modules/subscription/models/Subscription.js`

Changes needed:
1. **Add** `"admin_granted"` to `platform` enum: `["ios", "android", "admin_granted"]`
2. **Change** `planType` from enum to **free-form String**: `{ type: String }` — NOT `enum: ['1_MONTH', '3_MONTH']`. This allows admin to create new plan types without code changes.
3. **Remove** `GRACE` from `status` enum: `["ACTIVE", "EXPIRED", "CANCELLED", "PAUSED", "REVOKED", "PENDING"]`
4. **Remove** `gracePeriodEndsAt` field
5. **Remove** `isInGracePeriod()` method
6. **Update** `hasAccess()` — return `true` if status is `ACTIVE` **OR** status is `CANCELLED` but `expiresAt > now` (cancelled-but-still-active)
7. **Update** `findActiveByUser()` — include `CANCELLED` with future expiry: `{ status: { $in: ['ACTIVE', 'CANCELLED'] }, expiresAt: { $gt: new Date() } }`
8. **Add** admin grant fields:
   ```js
   grantedBy:    { type: ObjectId, ref: 'User' },  // admin who granted (or null for milestone)
   grantReason:  { type: String },                   // "milestone", "support", "test"
   ```
9. **Add** period tracking:
   ```js
   currentPeriodStart: { type: Date },
   currentPeriodEnd:   { type: Date },
   ```
10. **Add** cancellation tracking:
    ```js
    cancelledAt:   { type: Date, default: null },   // when user cancelled
    cancelReason:  { type: String, default: null },  // "user_cancelled", "billing_issue"
    ```

**Key behavior change — `CANCELLED` status:**
- When Apple/Google sends a cancellation webhook, set `status: 'CANCELLED'` and `cancelledAt: now`
- The subscription **still grants access** until `expiresAt`
- `hasAccess()` returns `true` if `status === 'CANCELLED' && expiresAt > Date.now()`
- When `expiresAt` passes, the expiry cron changes status to `EXPIRED`

### 1.2.6 Deprecate Old Models (Do NOT Delete Yet)

These models will be replaced but kept for backward compatibility during transition:
- `modules/auth/UserSubscription.model.js` → replaced by `SubscriptionConfig` + usage models
- `modules/matches/swipe/limit.service.js` → replaced by `UsageService`
- `common/utils/quotaHelper.js` → replaced by `UsageService`

Mark with `// DEPRECATED — will be removed after v2 migration` comment at top of each file.

---

## 1.3 UsageService — The Engine

> **Time:** ~6 hours | **This is the most important piece — all APIs depend on it**

### 1.3.1 Create `UsageService`

**File to create:** `modules/subscription/services/usage.service.js`

This is the **single service** that answers: "Can this user do X? And deduct if yes."

#### Core Methods

```js
class UsageService {
  // Get the user's current limits based on tier
  async getLimitsForUser(userId)
  // Returns: { likes: { limit, period }, superKeens: { limit, period }, rewinds: { limit, period }, boosts: { limit, period } }

  // Check if user can perform action (does NOT deduct)
  async canPerformAction(userId, action)
  // Returns: { allowed: boolean, source: 'quota'|'wallet'|null, quotaRemaining, walletBalance }

  // Use an item (deducts from quota first, then wallet)
  async useItem(userId, action)
  // Returns: { success, source: 'quota'|'wallet', quotaRemaining, walletBalance }

  // Get full status snapshot (for status API)
  async getFullStatus(userId)
  // Returns the complete status object (see §1.4.2)

  // Add purchased items to wallet
  async addToWallet(userId, type, quantity)
  // type: 'SUPER_KEEN' | 'BOOST'
}
```

#### Key Logic Inside `useItem(userId, action)`

```
1. Determine if user has access (query Subscription model — hasAccess())
   NOTE: hasAccess() returns true for ACTIVE *and* CANCELLED-but-not-expired
2. Get config from SubscriptionConfig singleton
3. Get correct usage doc based on reset period:
   - LIKES:               UserDailyUsage   (dateKey = today AEST)
   - REWINDS:             UserDailyUsage   (dateKey = today AEST)
   - SUPER_KEEN (premium): UserDailyUsage   (dateKey = today AEST)
   - SUPER_KEEN (free):    UserWeeklyUsage  (weekKey = current AEST week)
   - BOOST:               UserMonthlyUsage (monthKey = current AEST month)
4. Check if quota remaining > 0:
   - YES → increment usage doc, return { source: 'quota' }
   - NO  → check UserConsumableBalance:
     - balance > 0 → decrement balance, return { source: 'wallet' }
     - balance = 0 → return { success: false, error: 'LIMIT_REACHED' }
```

### 1.3.2 AEST Date Helpers

**File to create:** `modules/subscription/utils/dateHelpers.js`

```js
const { DateTime } = require('luxon');  // add luxon to package.json

const TIMEZONE = 'Australia/Sydney';

function getAESTDateKey()  { return DateTime.now().setZone(TIMEZONE).toFormat('yyyy-MM-dd'); }
function getAESTWeekKey()  { return DateTime.now().setZone(TIMEZONE).toFormat("kkkk-'W'WW"); }
function getAESTMonthKey() { return DateTime.now().setZone(TIMEZONE).toFormat('yyyy-MM'); }

function getNextMidnightAEST() {
  return DateTime.now().setZone(TIMEZONE).plus({ days: 1 }).startOf('day').toJSDate();
}
function getNextMondayAEST() {
  const now = DateTime.now().setZone(TIMEZONE);
  const monday = now.plus({ weeks: 1 }).startOf('week');  // luxon weeks start Monday
  return monday.toJSDate();
}
function getNextMonthStartAEST() {
  return DateTime.now().setZone(TIMEZONE).plus({ months: 1 }).startOf('month').toJSDate();
}
```

---

## 1.4 User-Facing APIs

> **Time:** ~4 hours | **Flutter starts integrating here**

### 1.4.1 `GET /api/v1/subscription/catalog`

**Purpose:** Single endpoint for Flutter to build store/paywall UI. No hardcoded prices in app.
**Auth:** Required (to personalize milestone status)

**Response:**
```json
{
  "success": true,
  "message": "Catalog fetched",
  "data": {
    "subscriptions": [
      {
        "productKey": "premium_1month",
        "displayName": "Keen as Mustard Premium (1 Month)",
        "displayPrice": "$9.95",
        "planType": "1_MONTH",
        "durationDays": 30,
        "appleProductId": "com.keenasmustard.premium.1month",
        "googleProductId": "com.keenasmustard.premium.1month",
        "sortOrder": 1
      },
      {
        "productKey": "premium_3month",
        "displayName": "Keen as Mustard Premium (3 Months)",
        "displayPrice": "$24.00",
        "planType": "3_MONTH",
        "durationDays": 90,
        "appleProductId": "com.keenasmustard.premium.3month",
        "googleProductId": "com.keenasmustard.premium.3month",
        "badge": "Best Value",
        "sortOrder": 2
      }
    ],
    "consumables": {
      "superKeens": [
        {
          "productKey": "superkeen_1",
          "quantity": 1,
          "displayPrice": "$1.00",
          "appleProductId": null,
          "googleProductId": null,
          "sortOrder": 1
        },
        {
          "productKey": "superkeen_5",
          "quantity": 5,
          "displayPrice": "$3.50",
          "subtitle": "Only $0.70 each",
          "sortOrder": 2
        },
        {
          "productKey": "superkeen_10",
          "quantity": 10,
          "displayPrice": "$6.00",
          "subtitle": "Only $0.60 each",
          "badge": "Best Value",
          "sortOrder": 3
        }
      ],
      "boosts": [
        {
          "productKey": "boost_1",
          "quantity": 1,
          "displayPrice": "$3.00",
          "sortOrder": 1
        },
        {
          "productKey": "boost_5",
          "quantity": 5,
          "displayPrice": "$12.50",
          "subtitle": "$2.50 each",
          "badge": "Popular",
          "sortOrder": 2
        },
        {
          "productKey": "boost_10",
          "quantity": 10,
          "displayPrice": "$20.00",
          "subtitle": "$2.00 each",
          "badge": "Best Value",
          "sortOrder": 3
        }
      ]
    },
    "milestone": {
      "target": 1000,
      "currentCount": 847,
      "isActive": true
    }
  }
}
```

**Implementation notes:**
- Query `Product.find({ isActive: true }).sort({ sortOrder: 1 })`
- Group by `type` and `consumableType` to build the response shape
- `milestone.currentCount` = `User.countDocuments()` (total registered users)
- `milestone.isActive` = from `SubscriptionConfig.milestone.isActive`

### 1.4.2 `GET /api/v1/subscription/status`

**Purpose:** Flutter calls this on app launch + after any action to refresh UI state.
**Auth:** Required

**Response (Premium user — active):**
```json
{
  "success": true,
  "message": "Status fetched",
  "data": {
    "isPremium": true,
    "plan": "1_MONTH",
    "status": "ACTIVE",
    "expiresAt": "2026-03-25T00:00:00.000Z",
    "autoRenew": true,
    "isCancelled": false,
    "cancelledAt": null,

    "allocations": {
      "likes":      { "limit": -1, "used": 10, "remaining": -1, "period": "daily",   "resetsAt": "2026-02-26T13:00:00.000Z" },
      "rewinds":    { "limit": -1, "used": 0,  "remaining": -1, "period": "daily",   "resetsAt": "2026-02-26T13:00:00.000Z" },
      "superKeens": { "limit": 3,  "used": 1,  "remaining": 2,  "period": "daily",   "resetsAt": "2026-02-26T13:00:00.000Z" },
      "boosts":     { "limit": 2,  "used": 1,  "remaining": 1,  "period": "monthly", "resetsAt": "2026-03-01T13:00:00.000Z" }
    },

    "wallet": {
      "superKeens": 4,
      "boosts": 0
    },

    "premiumFeatures": {
      "seeWhoLikedYou": true,
      "passport": true,
      "advancedFilters": true,
      "noAds": true
    },

    "showAds": false
  }
}
```

**Response (Premium user — cancelled but still active):**
```json
{
  "success": true,
  "message": "Status fetched",
  "data": {
    "isPremium": true,
    "plan": "1_MONTH",
    "status": "CANCELLED",
    "expiresAt": "2026-03-25T00:00:00.000Z",
    "autoRenew": false,
    "isCancelled": true,
    "cancelledAt": "2026-02-20T10:00:00.000Z",

    "allocations": { "..." : "same as active premium" },
    "wallet": { "superKeens": 4, "boosts": 0 },
    "premiumFeatures": { "seeWhoLikedYou": true, "passport": true, "advancedFilters": true, "noAds": true },
    "showAds": false
  }
}
```
> Flutter shows: "Your subscription is cancelled. Premium access until Mar 25, 2026."

**Response (Free user):**
```json
{
  "success": true,
  "message": "Status fetched",
  "data": {
    "isPremium": false,
    "plan": null,
    "status": "NONE",
    "expiresAt": null,
    "autoRenew": false,
    "isCancelled": false,
    "cancelledAt": null,

    "allocations": {
      "likes":      { "limit": 30, "used": 12, "remaining": 18, "period": "daily",   "resetsAt": "2026-02-26T13:00:00.000Z" },
      "rewinds":    { "limit": 3,  "used": 0,  "remaining": 3,  "period": "daily",   "resetsAt": "2026-02-26T13:00:00.000Z" },
      "superKeens": { "limit": 1,  "used": 0,  "remaining": 1,  "period": "weekly",  "resetsAt": "2026-03-02T13:00:00.000Z" },
      "boosts":     { "limit": 0,  "used": 0,  "remaining": 0,  "period": "monthly", "resetsAt": "2026-03-01T13:00:00.000Z" }
    },

    "wallet": {
      "superKeens": 4,
      "boosts": 0
    },

    "premiumFeatures": {
      "seeWhoLikedYou": false,
      "passport": false,
      "advancedFilters": false,
      "noAds": false
    },

    "showAds": true
  }
}
```

**Status API field reference:**
- `limit: -1` means unlimited (premium likes/rewinds)
- `remaining: -1` means unlimited
- `resetsAt` is always in UTC (converted from AEST midnight/Monday/1st-of-month)
- `wallet` balances are always shown regardless of tier
- `showAds` — `true` for free users, `false` for premium. Flutter uses this to show/hide AdMob ads
- `isCancelled` — `true` when user cancelled but still has access until `expiresAt`
- `isPremium` — `true` for both ACTIVE and CANCELLED-but-not-expired subscriptions

---

## 1.5 Enforce Quotas in Existing Feature APIs

> **Time:** ~4 hours

### 1.5.1 Swipe API (`modules/matches/swipe/swipe.service.js`)

**Current state:** Uses `UserSubscription` + `quotaHelper` with hardcoded limits.
**New:** Replace with `UsageService.useItem(userId, 'LIKE')` call.

Changes in `swipe.service.js`:
1. Remove import of `UserSubscription` and `quotaHelper`
2. Import `UsageService` instead
3. In `performSwipe()`:
   - For `action === 'like'`: call `usageService.useItem(userId, 'LIKE')`
   - For `action === 'superlike'`: call `usageService.useItem(userId, 'SUPER_KEEN')`
   - If `{ success: false }` → return `{ allowed: false, error: 'LIMIT_REACHED' }`
4. In `performRewind()`: call `usageService.useItem(userId, 'REWIND')`

### 1.5.2 Boost API (`modules/Boost/boost.controller.js`)

**Current state:** Only checks `user.isPremium` (which is never set). No quota deduction.
**New:** Replace with `UsageService.useItem(userId, 'BOOST')`.

Changes in `boost.controller.js`:
1. Remove `isPremium` check
2. Call `usageService.useItem(userId, 'BOOST')`
3. If success → activate boost in Redis (existing 30-min TTL logic stays)
4. If fail → return error with `code: 'BOOST_LIMIT_REACHED'`
5. This means **free users with 0 boost allocation but purchased boosts CAN boost** (correct behavior)

### 1.5.3 Feed API — include usage in response

**Current state:** `getFeedService()` returns wallet data from `UserSubscription`.
**New:** After feed query, append `usageService.getFullStatus(userId)` to the response so Flutter has fresh counts.

---

## 1.6 Purchases (Subscription + Consumables)

> **Time:** ~6 hours

### 1.6.1 Subscription Purchase Verify (UPDATE existing)

**Existing endpoint:** `POST /api/v1/subscription/verify`
**Changes:** Store `currentPeriodStart/End`, sync `User.isPremium = true`, return full status.

**Request:** `{ "platform": "ios", "receipt": "<receipt>", "productId": "com.keenasmustard.premium.1month" }`

**Response:** `{ success, data: { subscription: {...}, status: {full status from §1.4.2} } }`

### 1.6.2 Consumable Purchase Verify (NEW)

**New endpoint:** `POST /api/v1/subscription/verify-consumable`

**Flow:** Flutter IAP → send receipt + productKey → backend verifies → looks up Product → `addToWallet()` → logs transaction → returns wallet.

**Request:** `{ "platform": "ios", "receipt": "<receipt>", "productKey": "superkeen_5" }`
**Response:** `{ success, data: { wallet: { superKeens: 9, boosts: 0 }, transaction: {...} } }`

**Important:** Google consumables must call `purchases.products.consume` after verification.

### 1.6.3 Restore Purchases (NEW)

**New endpoint:** `POST /api/v1/subscription/restore`

**Flow:** Flutter restore → send receipts → backend verifies each. Subscriptions reactivated if valid. Consumables **NOT re-credited** (one-time). Wallet is server-side — tied to account, not device.

**Request:** `{ "platform": "ios", "receipts": ["<receipt1>"] }`
**Response:** `{ success, data: { restoredSubscription: true, status: {...} } }`

---

## 1.7 Webhooks (Update Existing)

> **Time:** ~2 hours

**Files:** `webhook.controller.js` + `subscription.service.js`

### 1.7.1 Remove Grace Period Handling
- Apple: `DID_FAIL_TO_RENEW` → map to `handleExpire` (not grace)
- Google: `IN_GRACE_PERIOD` / `ON_HOLD` → map to `handleExpire`
- Remove/deprecate `handleGracePeriod()` method

### 1.7.2 Handle Cancellation (NEW)
When Apple `DID_CHANGE_RENEWAL_STATUS` (auto-renew off) or Google `SUBSCRIPTION_CANCELED`:
1. Set `status = 'CANCELLED'`, `cancelledAt = now`, `autoRenew = false`
2. **Do NOT change `expiresAt`** — user keeps access until then
3. **Do NOT set `User.isPremium = false`** — still premium until expiry

### 1.7.3 On Renewal
- Update `currentPeriodStart/End` from store data
- If was `CANCELLED`, set back to `ACTIVE`, clear `cancelledAt`

### 1.7.4 On Expire
- Set `User.isPremium = false`, sync profile
- **Do NOT touch `UserConsumableBalance`** — wallet survives expiry

---

## 1.8 Milestone Auto-Grant (First 1,000 Users)

> **Time:** ~2 hours

**No API endpoint needed.** Auto-granted during registration.

**Files to modify:**
- `modules/auth/auth.service.js` — in `verifyPhoneOtpUnified()`, after `isNewUser === true`
- `modules/auth/social/social.service.js` — in `findOrCreateSocialUser()`, after new user saved

**Logic (same in both):**
```js
if (isNewUser) {
  const config = await SubscriptionConfig.findOne();
  if (config?.milestone?.isActive) {
    const totalUsers = await User.countDocuments();
    if (totalUsers <= config.milestone.targetUserCount) {
      const expiresAt = new Date(Date.now() + config.milestone.grantDurationDays * 86400000);
      await Subscription.create({
        userId: user._id, platform: 'admin_granted', planType: '1_MONTH',
        status: 'ACTIVE', startedAt: new Date(), expiresAt,
        grantedBy: null, grantReason: 'milestone_first_1000',
      });
      user.isPremium = true;
      user.premiumExpiresAt = expiresAt;
      await user.save();
    }
  }
}
```

**Key points:**
- No claim button. Fully automatic.
- Uses `SubscriptionConfig.milestone` (admin can change target/duration/disable)
- Race condition: slight overshoot at 1001 is acceptable

---

## 1.9 Cron Jobs

> **Time:** ~3 hours

### 1.9.1 Subscription Expiry (UPDATE `subscriptionCron.js`)
- **Remove** the GRACE period cron
- **Update** expiry cron to handle both ACTIVE and CANCELLED:
  ```js
  await Subscription.updateMany(
    { status: { $in: ['ACTIVE', 'CANCELLED'] }, expiresAt: { $lte: new Date() } },
    { $set: { status: 'EXPIRED' } }
  );
  // Then sync: User.isPremium = false for each expired user
  ```

### 1.9.2 Expiry Push Notification (UPDATE `premiumExpiryReminder.cron.js`)
- Change timezone from `Asia/Kolkata` to `Australia/Sydney`
- Run at 10:00 AM AEST daily
- Query subscriptions expiring in 3 days (±12h window)
- Send FCM: "Your Keen as Mustard Premium expires in 3 days"
- Add `expiryNotificationSent: Boolean` to Subscription model, reset on renewal

### 1.9.3 Giveaway (UPDATE `giveaway.worker.js`)
- **Remove** `isPremium: true` from the `$match` pipeline (line ~109)
- All active users who matched today are eligible, not just premium

---

## 1.10 Profile/Auth Formatter + Legacy Cleanup

> **Time:** ~3 hours

### 1.10.1 Profile Formatter (`profile.formatter.js`)
Replace hardcoded `MAX_LIKES`, `MAX_SUPERLIKES`, `UserSubscription` reads with:
```js
subscription: await usageService.getFullStatus(userId)
```

### 1.10.2 Auth Formatter (`auth.formatter.js`)
Same pattern — replace hardcoded wallet with `usageService.getFullStatus()`.

### 1.10.3 Feed Response (`swipe.service.js`)
Remove wallet computation from `getFeedService()`. Append `usageService.getFullStatus()`.

### 1.10.4 Deprecation Cleanup (After v2 stable)
Remove: `UserSubscription` model, `quotaHelper.js`, `limit.service.js`, `Profile.subscription` subdoc.

---

## 1.11 File Structure Map

```
modules/subscription/
├── models/
│   ├── Subscription.js              ← UPDATE (scalable planType, cancellation, no GRACE)
│   ├── SubscriptionConfig.js        ← NEW (admin config + milestone)
│   ├── SubscriptionEvent.js         ← EXISTING
│   ├── SubscriptionTransaction.js   ← UPDATE (add CONSUMABLE_PURCHASE, MILESTONE_GRANT)
│   ├── Product.js                   ← NEW (catalog, scalable planType)
│   ├── UserDailyUsage.js            ← NEW
│   ├── UserWeeklyUsage.js           ← NEW
│   ├── UserMonthlyUsage.js          ← NEW
│   └── UserConsumableBalance.js     ← NEW
├── services/
│   ├── subscription.service.js      ← UPDATE (cancellation, no grace)
│   ├── usage.service.js             ← NEW (the engine)
│   ├── apple.service.js             ← UPDATE (consumable verify)
│   └── google.service.js            ← UPDATE (consumable consume)
├── controllers/
│   ├── subscription.controller.js   ← UPDATE (catalog, status, consumable, restore)
│   ├── webhook.controller.js        ← UPDATE (cancellation, no grace)
│   └── admin.subscription.controller.js ← NEW
├── routes/
│   ├── subscription.routes.js       ← UPDATE
│   ├── webhook.routes.js            ← EXISTING
│   └── admin.subscription.routes.js ← NEW
├── cron/
│   └── subscriptionCron.js          ← UPDATE
├── utils/
│   └── dateHelpers.js               ← NEW
├── seeds/
│   └── seedProducts.js              ← NEW (8 products)
jobs/
├── giveaway/giveaway.worker.js      ← UPDATE (remove isPremium filter)
└── adminNotification/premiumExpiryReminder.cron.js ← UPDATE (AEST, 3-day)
```

## 1.12 Dependencies

Add to `package.json`: `"luxon": "^3.x"` — used for AEST timezone calculations.

---
---

# PART 2 — ADMIN DOMAIN

Admin backend APIs and panel screen specifications.

---

## 2.1 Admin APIs

> **Backend time:** ~4 hours | **Admin panel time:** ~8-10 hours

**Route prefix:** `/api/v1/admin/subscription/*`
**Auth:** `auth` + `allowAdmin` middleware

### 2.1.1 Config CRUD

**`GET /config`** — Returns SubscriptionConfig singleton (limits + features + milestone).

**`PUT /config`** — Updates config. All numbers >= 0. Changes apply immediately.
```json
{
  "freeLimits": { "swipesPerDay": 30, "rewindsPerDay": 3, "superKeensPerWeek": 1, "boostsPerMonth": 0 },
  "premiumLimits": { "superKeensPerDay": 3, "boostsPerMonth": 2 },
  "premiumFeatures": { "seeWhoLikedYou": true, "passport": true, "advancedFilters": true, "noAds": true },
  "milestone": { "targetUserCount": 1000, "grantDurationDays": 30, "isActive": true }
}
```

### 2.1.2 Grant/Revoke Subscription

**`POST /grant`** — `{ userId, planType, durationDays, reason }` → Creates `admin_granted` subscription.
**`POST /revoke`** — `{ userId, reason }` → Sets status `REVOKED`, `User.isPremium = false`.

### 2.1.3 Product Management

**`GET /products`** — All products (active + inactive).
**`PUT /products/:productKey`** — Update display fields. Cannot change structural fields.
**`POST /products`** — Create new plan (scalable — e.g., "6_MONTH"). Requires `productKey`, `type`, `planType`, `durationDays`, `displayName`, `displayPrice`.

### 2.1.4 User Lookup

**`GET /user/:userId`** — Full subscription + wallet + allocations + recent 20 transactions.

### 2.1.5 Grant Consumables

**`POST /grant-consumables`** — `{ userId, type: "SUPER_KEEN"|"BOOST", quantity, reason }` → Adds to wallet + logs transaction.

---

## 2.2 Admin Panel Screens

### Screen 1: Subscription Config (`/admin/subscription/config`)

```
┌─────────────────────────────────────────────────┐
│  Subscription Configuration                      │
├─────────────────────────────────────────────────┤
│  FREE USER LIMITS                                │
│  Swipes/day [30]  Rewinds/day [3]               │
│  Super Keens/week [1]  Boosts/month [0]         │
│                                                  │
│  PREMIUM USER LIMITS                             │
│  Swipes/day: Unlimited ∞  Rewinds/day: ∞        │
│  Super Keens/day [3]  Boosts/month [2]          │
│                                                  │
│  PREMIUM FEATURES                                │
│  [✓] See Who Liked You  [✓] Passport            │
│  [✓] Advanced Filters   [✓] No Ads              │
│                                                  │
│  MILESTONE                                       │
│  Target: [1000] users  Duration: [30] days       │
│  Status: [✓] Active  Current: 847 users          │
│                                                  │
│  Note: Reset periods are fixed (daily/weekly/    │
│  monthly). Not editable.                         │
│                         [ Save Changes ]         │
└─────────────────────────────────────────────────┘
```

### Screen 2: Product Catalog (`/admin/subscription/products`)

```
┌─────────────────────────────────────────────────┐
│  Product Catalog              [ + Add Product ]  │
├─────────────────────────────────────────────────┤
│  SUBSCRIPTION PLANS                              │
│  │ Product    │ Price  │ Badge    │ Active │     │
│  │ 1 Month    │ $9.95  │          │ [✓]    │     │
│  │ 3 Months   │ $24.00 │ Best Val │ [✓]    │     │
│                                                  │
│  SUPER KEEN PACKS                                │
│  │ 1 SK       │ $1.00  │          │ [✓]    │     │
│  │ 5 SK       │ $3.50  │          │ [✓]    │     │
│  │ 10 SK      │ $6.00  │ Best Val │ [✓]    │     │
│                                                  │
│  BOOST PACKS                                     │
│  │ 1 Boost    │ $3.00  │          │ [✓]    │     │
│  │ 5 Boosts   │$12.50  │ Popular  │ [✓]    │     │
│  │ 10 Boosts  │$20.00  │ Best Val │ [✓]    │     │
│                                                  │
│  Click row to edit. Prices are display only.     │
└─────────────────────────────────────────────────┘
```

### Screen 3: User Subscription Detail (`/admin/users/:id/subscription`)

```
┌─────────────────────────────────────────────────┐
│  User: John D. (john@example.com)                │
├─────────────────────────────────────────────────┤
│  SUBSCRIPTION                                    │
│  Status: ACTIVE │ Plan: 1 Month │ Platform: iOS  │
│  Expires: Mar 25, 2026 │ Auto-Renew: Yes         │
│  Cancelled: No                                   │
│                                                  │
│  ALLOCATIONS        │  WALLET                    │
│  Likes: 18/30 (d)   │  Super Keens: 4           │
│  Rewinds: ∞          │  Boosts: 0               │
│  SK: 2/3 (d)         │                           │
│  Boosts: 1/2 (m)     │                           │
│                                                  │
│  [ Grant Sub ] [ Grant Consumables ] [ Revoke ]  │
│                                                  │
│  TRANSACTIONS                                    │
│  Feb 25 │ PURCHASE   │ $9.95 │ iOS              │
│  Feb 20 │ CONSUMABLE │ $3.50 │ Android          │
└─────────────────────────────────────────────────┘
```

### Screen 4: Dashboard (`/admin/subscription/dashboard`)

```
┌─────────────────────────────────────────────────┐
│  Subscription Dashboard                          │
├─────────────────────────────────────────────────┤
│  [Active: 342] [Revenue: $3,420] [Churn: 2.1%]  │
│  [SK Sold: 1,240] [Boosts Sold: 89]             │
│  [Milestone: 847/1000 users granted]             │
│                                                  │
│  SUBSCRIBER LIST                                 │
│  │ User │ Plan    │ Status    │ Expires │ View │ │
│  │ ...  │ 1 Month │ ACTIVE    │ Mar 25  │  →   │ │
│  │ ...  │ 3 Month │ CANCELLED │ Jun 15  │  →   │ │
└─────────────────────────────────────────────────┘
```

---
---

# PART 3 — FLUTTER DOMAIN

> **Estimated time:** ~15-20 hours
> **Do NOT write UI code.** This section defines **when to call what API**, how to manage state, and how feature-gating works.

---

## 3.1 API Integration Guide

### When to Call Each API

| Trigger | API Call | Purpose |
|---|---|---|
| App launch | `GET /status` | Refresh all counters, premium state, ad flag |
| Open store/paywall | `GET /catalog` | Load product catalog dynamically |
| After any action (like, SK, boost, rewind) | `GET /status` | Refresh counters (or use response from action API) |
| After successful IAP (subscription) | `POST /verify` | Verify receipt, activate premium |
| After successful IAP (consumable) | `POST /verify-consumable` | Verify receipt, credit wallet |
| Settings → Restore Purchases | `POST /restore` | Restore subscription from store |
| Every 5 min in background (optional) | `GET /status` | Keep state fresh |

### State Management

Store the full status response locally (e.g., Riverpod/Bloc state):
```dart
class SubscriptionState {
  bool isPremium;
  String? plan;
  String status;          // "ACTIVE", "CANCELLED", "NONE", "EXPIRED"
  DateTime? expiresAt;
  bool autoRenew;
  bool isCancelled;
  DateTime? cancelledAt;
  Map<String, AllocationInfo> allocations;
  Map<String, int> wallet;
  Map<String, bool> premiumFeatures;
  bool showAds;
}
```

**Rule:** NEVER grant access locally without backend confirmation. The backend is the source of truth.

---

## 3.2 Feature-Gating Logic

### Action Decision Tree

For every gated action (like, super keen, rewind, boost):
```dart
bool canPerform(String action, SubscriptionState state) {
  final alloc = state.allocations[action];
  if (alloc == null) return false;
  
  if (alloc.remaining == -1) return true;  // unlimited (premium likes/rewinds)
  if (alloc.remaining > 0) return true;    // free allocation available

  // Check wallet for consumable actions
  if (action == 'superKeens' && state.wallet['superKeens']! > 0) return true;
  if (action == 'boosts' && state.wallet['boosts']! > 0) return true;

  return false;  // → show paywall / store screen
}
```

### Premium Feature Gates
```dart
bool canSeeWhoLikedYou(SubscriptionState s) => s.premiumFeatures['seeWhoLikedYou'] == true;
bool canUsePassport(SubscriptionState s) => s.premiumFeatures['passport'] == true;
bool canUseAdvancedFilters(SubscriptionState s) => s.premiumFeatures['advancedFilters'] == true;
bool shouldShowAds(SubscriptionState s) => s.showAds == true;
```

---

## 3.3 Store/Paywall Screen

- Call `GET /catalog` on screen open
- Build UI **dynamically** from response — subscription plans + consumable packs
- Use `displayPrice`, `subtitle`, `badge` from API — **do NOT hardcode prices**
- Use `appleProductId`/`googleProductId` to initiate platform IAP
- Show milestone banner if `milestone.isActive == true`: "Be one of the first 1,000 users — get free Premium!"
- After successful IAP:
  - Subscriptions → `POST /verify` with receipt
  - Consumables → `POST /verify-consumable` with receipt + productKey
- On success: update local state from response
- On failure: show error, do NOT grant access locally

---

## 3.4 My Subscription Screen (NEW)

This screen shows the user's current subscription state and lets them manage it.

### Screen Flow

```
┌─────────────────────────────────────────────┐
│  My Subscription                             │
├─────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ PLAN: Keen as Mustard Premium          │  │
│  │ Status: Active ✓                       │  │
│  │ Expires: March 25, 2026                │  │
│  │ Auto-Renew: Yes                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  FREE ALLOCATIONS (resets automatically)     │
│  Likes:       ∞ unlimited                    │
│  Rewinds:     ∞ unlimited                    │
│  Super Keens: 2 of 3 remaining (daily)       │
│  Boosts:      1 of 2 remaining (monthly)     │
│                                              │
│  PURCHASED ITEMS (never expire)              │
│  Super Keens: 4                              │
│  Boosts:      0           [ Buy More ]       │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [ Manage Subscription ]                │  │
│  │ Opens iOS/Android subscription         │  │
│  │ settings for cancellation              │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  [ Restore Purchases ]                       │
└─────────────────────────────────────────────┘
```

### Data Source

All data comes from `GET /status` response. No additional API needed.

### "Manage Subscription" Button

Deep-link to the native OS subscription management:
- **iOS:** `https://apps.apple.com/account/subscriptions`
- **Android:** `https://play.google.com/store/account/subscriptions`

The app does NOT handle cancellation itself. Users cancel through the OS.

---

## 3.5 Cancellation Flow (NEW)

When a user cancels through the OS:
1. Apple/Google sends webhook → backend sets `status: CANCELLED`
2. Next time Flutter calls `GET /status`:
   - `isCancelled: true`
   - `status: "CANCELLED"`
   - `expiresAt` still has a future date
   - `isPremium: true` (still has access!)

**Flutter must show:**
```
┌──────────────────────────────────────────┐
│  ⚠️ Your subscription is cancelled       │
│  You still have Premium access until     │
│  March 25, 2026.                         │
│                                          │
│  [ Re-subscribe ]  (opens store)         │
└──────────────────────────────────────────┘
```

**After `expiresAt` passes:**
- Backend cron changes status to `EXPIRED`
- Next `/status` call: `isPremium: false`, `showAds: true`
- Flutter immediately switches to free-tier UI

---

## 3.6 Restore Purchases

- Add "Restore Purchases" button in Settings + My Subscription screen
- Call platform restore API → collect receipts → `POST /restore`
- Show success/failure message
- On success: update local state from response `status` object

---

## 3.7 Timer/Countdown Display

- Use `allocations[x].resetsAt` to show countdown: "Resets in 4h 23m"
- Different items have different reset times:
  - Likes/Rewinds → daily (midnight AEST)
  - Super Keens (free) → weekly (Monday midnight AEST)
  - Super Keens (premium) → daily
  - Boosts → monthly (1st of month)
- Show reset time in user's local timezone (convert from UTC `resetsAt`)

---

## 3.8 Wallet Display

- Always show wallet balance alongside free allocation
- Format: "Super Keens: 2 free + 4 purchased"
- When free allocation is 0 but wallet > 0: "Using purchased Super Keens (4 left)"
- When both are 0: show paywall prompt

---

## 3.9 AdMob Placement (NEW)

- Use the `showAds` flag from `GET /status` response
- If `showAds: true` (free user): show ads
- If `showAds: false` (premium user): hide all ads

**Ad placement rules:**
- **Native ad cards** in the swipe stack (every N cards, e.g., every 5th card)
- **No sticky banners** — must feel premium and uncluttered
- **No interstitial ads** unless between natural breaks (e.g., after running out of likes)
- Ad cards should match the app's design language, not feel intrusive

---

## 3.10 Daily Giveaway

The existing giveaway system now includes free users. No Flutter changes needed unless the giveaway UI already filters by premium status client-side — if so, remove that filter.

---
---

# PART 4 — QA & EDGE CASES

Comprehensive testing checklist for the entire team.

---

## 4.1 Backend Test Checklist

### §1.1 Cleanup
- [ ] Server starts without errors
- [ ] Redis connects using env var
- [ ] No mongoose `OverwriteModelError`
- [ ] Firebase works with env-based credentials
- [ ] Banned user test: returns 403

### §1.2 Schemas
- [ ] All new models import without errors
- [ ] `SubscriptionConfig` singleton: `findOne()` returns defaults when no doc exists
- [ ] `Product` seed script creates 8 products
- [ ] `Subscription` accepts `platform: "admin_granted"` and rejects `status: "GRACE"`
- [ ] `Subscription.planType` accepts arbitrary strings (scalable, no enum)
- [ ] `UserConsumableBalance` unique index on `userId` works
- [ ] `Subscription.hasAccess()` returns `true` for CANCELLED with future expiry

### §1.3 UsageService
- [ ] `useItem()` deducts from quota first for premium user
- [ ] `useItem()` deducts from wallet when quota exhausted
- [ ] `useItem()` returns error when both quota and wallet are 0
- [ ] Free user Super Keen uses weekly counter, not daily
- [ ] Premium user Super Keen uses daily counter
- [ ] Boost uses monthly counter
- [ ] Date helpers return correct AEST keys regardless of server timezone
- [ ] `addToWallet()` increments balance correctly
- [ ] Cancelled-but-active user gets premium limits

### §1.4 APIs
- [ ] Catalog returns only `isActive: true` products
- [ ] Catalog sorts by `sortOrder`
- [ ] Catalog includes `boost_1` single pack
- [ ] Status returns correct limits for free vs premium
- [ ] Status `resetsAt` times are correct AEST→UTC
- [ ] Status includes `showAds`, `isCancelled`, `passport` fields
- [ ] Wallet balances are 0 for new users (not null/undefined)
- [ ] `limit: -1` for unlimited premium features

### §1.5 Quota Enforcement
- [ ] Like deducts from daily quota
- [ ] 31st like by free user returns `LIMIT_REACHED`
- [ ] Super Keen deducts from weekly quota for free user
- [ ] Super Keen deducts from daily quota for premium user
- [ ] Boost deducts from monthly quota
- [ ] After quota exhausted, uses wallet balance
- [ ] After both exhausted, returns error
- [ ] Rewind works for free user (3/day) and premium (unlimited)
- [ ] Free user with purchased boosts CAN boost

### §1.6 Purchases
- [ ] Subscription verify creates/updates Subscription doc
- [ ] Subscription verify sets `currentPeriodStart/End`
- [ ] Consumable verify adds correct quantity to wallet
- [ ] `superkeen_5` adds 5 to `superKeensBalance`
- [ ] `boost_1` adds 1 to `boostsBalance`
- [ ] Duplicate receipt is rejected (idempotency)
- [ ] Restore reactivates expired subscription if store says active
- [ ] Restore does NOT duplicate consumable balances
- [ ] Mock mode works in development

### §1.7 Webhooks
- [ ] Apple `EXPIRED` → user becomes free tier
- [ ] Google `EXPIRED` → user becomes free tier
- [ ] After expiry, wallet balance unchanged
- [ ] `DID_FAIL_TO_RENEW` → expires (not grace)
- [ ] Cancellation webhook → `CANCELLED` status, still has access
- [ ] Renewal after cancellation → `ACTIVE`, clears `cancelledAt`
- [ ] Renewal updates `currentPeriodStart/End`

### §1.8 Milestone
- [ ] New user #500 gets auto-granted 30-day premium
- [ ] New user #1001 does NOT get premium
- [ ] Milestone can be disabled via admin config
- [ ] Social login user also gets milestone
- [ ] Milestone subscription has `grantReason: 'milestone_first_1000'`

### §1.9 Cron Jobs
- [ ] Expired subscriptions (ACTIVE + CANCELLED past expiry) → EXPIRED
- [ ] Grace period cron removed
- [ ] Push notification sent ~3 days before expiry
- [ ] Notification not sent twice (expiryNotificationSent flag)
- [ ] Giveaway includes free users as eligible winners

---

## 4.2 Admin Test Checklist

- [ ] Config GET returns defaults on fresh DB
- [ ] Config PUT updates, new values apply immediately
- [ ] Config includes milestone and passport fields
- [ ] Grant creates subscription with `admin_granted` platform
- [ ] Revoke sets status to `REVOKED`
- [ ] Product update changes display fields but not structural fields
- [ ] Product create allows new plan types (e.g., "6_MONTH")
- [ ] User lookup returns correct subscription + wallet + allocations
- [ ] Grant consumables adds to wallet and logs transaction
- [ ] All admin endpoints require auth + admin role

---

## 4.3 Flutter Test Checklist

- [ ] Catalog loads dynamically — no hardcoded prices
- [ ] Store shows 8 products (2 subs + 3 SK packs + 3 boost packs)
- [ ] IAP purchase flow works end-to-end (subscription + consumable)
- [ ] Status updates after every action
- [ ] Feature gates work: free user blocked from Passport, See Who Liked You, Advanced Filters
- [ ] Ads show for free users, hidden for premium
- [ ] Ad placement is native cards (no banners)
- [ ] My Subscription screen shows correct plan, expiry, allocations, wallet
- [ ] "Manage Subscription" deep-links to correct OS settings page
- [ ] Cancellation state shows "cancelled but active until X"
- [ ] After expiry: UI switches to free tier immediately
- [ ] Restore Purchases works
- [ ] Timer countdown shows correct reset time in user's timezone
- [ ] Wallet display shows "2 free + 4 purchased" format
- [ ] Milestone banner shows when milestone is active

---

## 4.4 Edge Case Matrix

### E1: Subscription expires (downgrade)
- Free allocation changes immediately to free-tier limits
- Premium daily Super Keen usage → switches to free weekly counter
- **Wallet untouched**

### E2: User upgrades (buys subscription)
- Allocation immediately changes to premium limits
- Any daily usage already consumed counts against new (higher) limit
- Monthly boost counter: uses current calendar month doc

### E3: Admin changes limits
- Effect is immediate on next API call
- No retroactive adjustment (if user used 25 likes and admin lowers to 20 → user can't use more today, but no clawback)

### E4: Midnight AEST during active session
- Flutter calls `/status` on each action
- Next swipe after midnight gets fresh allocations (new `dateKey`)

### E5: Consumables while premium
- Purchased items go to wallet. When premium expires, wallet stays.

### E6: Concurrent usage (race condition)
- MongoDB `$inc` with `findOneAndUpdate` for atomic operations
- `$inc: { superKeensBalance: -1 }` with `{ superKeensBalance: { $gt: 0 } }` prevents negative
- 0 matched docs → balance was 0 → error

### E7: App reinstall / device switch
- All data tied to account (server-side). No data loss.

### E8: 3-month plan boost allocation
- Boosts reset on 1st of each calendar month (not billing cycle)
- 3-month subscriber gets same monthly boosts as 1-month subscriber

### E9: Cancellation mid-period (NEW)
- User cancels via OS → webhook sets `CANCELLED`
- User keeps premium access until `expiresAt`
- Flutter shows "cancelled but active until X"
- After `expiresAt` → cron sets `EXPIRED` → free tier

### E10: Milestone + existing user (NEW)
- Only NEW users get milestone (checked during registration)
- Existing users who were user #500 but registered before milestone feature → NOT eligible
- If user #999 registers and already has an active subscription → milestone still creates a subscription doc (the user already has premium, so no visible change; when their paid sub expires, the milestone one may still be active)

### E11: AdMob + subscription change (NEW)
- User upgrades to premium → `showAds: false` on next `/status` call → ads disappear
- User's premium expires → `showAds: true` → ads reappear
- No caching of ad state — always use latest `/status`

### E12: Scalable plan type (NEW)
- Admin creates "6_MONTH" plan via `POST /products`
- `Subscription.planType` accepts it (free-form String)
- `UsageService` doesn't care about plan type — only about whether `hasAccess()` returns true

---

## 4.5 Cross-Team Integration Tests

| # | Scenario | Backend | Flutter | Expected |
|---|---|---|---|---|
| 1 | New user registers (user #500) | Auto-grant 30-day premium | Status shows premium | `isPremium: true`, no ads |
| 2 | Free user buys 5 Super Keens | Wallet +5 | Store → verify-consumable → wallet updated | `wallet.superKeens: 5` |
| 3 | Free user uses all 30 daily likes | 30 quota deductions | 31st like blocked | `LIMIT_REACHED` error |
| 4 | Free user with purchased boost activates boost | Wallet -1 | Boost UI activated | 30-min boost active |
| 5 | User buys 1-month premium | Subscription created | Full premium UI | All features unlocked |
| 6 | Premium user cancels via OS | Webhook → CANCELLED | "Cancelled until X" shown | Premium still works |
| 7 | Cancelled sub expires | Cron → EXPIRED | Free tier UI | Ads appear, limits enforced |
| 8 | Premium user gets push 3 days before expiry | Cron sends FCM | Notification received | Deep-link to My Subscription |
| 9 | Admin grants consumables | Wallet +N | Next status refresh shows new balance | Immediate effect |
| 10 | Admin disables "Passport" feature | Config updated | Feature gated | Passport button hidden |

---
---

# APPENDIX

---

## A: Complete API Reference

### User-Facing APIs (require auth)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/subscription/catalog` | Product catalog for store UI |
| `GET` | `/api/v1/subscription/status` | Full status (subscription + allocations + wallet + ads) |
| `POST` | `/api/v1/subscription/verify` | Verify subscription purchase |
| `POST` | `/api/v1/subscription/verify-consumable` | Verify consumable purchase |
| `POST` | `/api/v1/subscription/restore` | Restore purchases |
| `GET` | `/api/v1/subscription/history` | Transaction history |

### Admin APIs (require auth + admin role)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/admin/subscription/config` | Get subscription config |
| `PUT` | `/api/v1/admin/subscription/config` | Update config (limits + features + milestone) |
| `GET` | `/api/v1/admin/subscription/products` | List all products |
| `POST` | `/api/v1/admin/subscription/products` | Create new product (scalable plans) |
| `PUT` | `/api/v1/admin/subscription/products/:key` | Update product display fields |
| `POST` | `/api/v1/admin/subscription/grant` | Grant subscription to user |
| `POST` | `/api/v1/admin/subscription/revoke` | Revoke subscription |
| `POST` | `/api/v1/admin/subscription/grant-consumables` | Grant consumables |
| `GET` | `/api/v1/admin/subscription/user/:userId` | User subscription detail |
| `GET` | `/api/v1/admin/subscription/stats` | Dashboard stats |
| `GET` | `/api/v1/admin/subscription/subscribers` | Subscriber list |

---

## B: Product Seed Data (8 Products)

| productKey | type | planType/consumableType | quantity | displayPrice | durationDays |
|---|---|---|---|---|---|
| `premium_1month` | SUBSCRIPTION | 1_MONTH | — | $9.95 | 30 |
| `premium_3month` | SUBSCRIPTION | 3_MONTH | — | $24.00 | 90 |
| `superkeen_1` | CONSUMABLE | SUPER_KEEN | 1 | $1.00 | — |
| `superkeen_5` | CONSUMABLE | SUPER_KEEN | 5 | $3.50 | — |
| `superkeen_10` | CONSUMABLE | SUPER_KEEN | 10 | $6.00 | — |
| `boost_1` | CONSUMABLE | BOOST | 1 | $3.00 | — |
| `boost_5` | CONSUMABLE | BOOST | 5 | $12.50 | — |
| `boost_10` | CONSUMABLE | BOOST | 10 | $20.00 | — |

---

## C: Open Items (Not Blocking v1)

| Item | When |
|---|---|
| Replace placeholder store product IDs | When Apple/Google accounts ready |
| Promo codes system | v2 |
| Plan upgrade/downgrade mid-cycle handling | v2 (new purchase replaces old for now) |
| Consumable purchase analytics in admin dashboard | Post-launch |
| Automated email on subscription expiry | Cron exists, needs integration |
| Rate limiting on consumable verify endpoint | Before production launch |
| A/B testing for ad placement frequency | Post-launch |

---

*End of document. This is the single source of truth for the Subscription & Monetization module.*
