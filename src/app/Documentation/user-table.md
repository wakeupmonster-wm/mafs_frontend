> 👉 **Fast scanning** + quick decisions, not deep inspection  
> 👉 **Deep details** should live in User Details (360° view)

## 🎯 Golden Rule for Admin Tables

- 8–10 columns max (desktop)
- Everything else → drawer / modal / detail page
- Admin should answer in 3 seconds:
  - Who is the user?
  - Is the account healthy?
  - Any risk (ban / verification)?
  - What action can I take?

## Actuall Response:
```js
{
    "success": true,
    "pagination": {
        "page": 1,
        "limit": 20,
        "total": 1,
        "totalPages": 1
    },
    "data": [
        {
            "_id": "6961fdba3deaa60525828ddc",
            "isPhoneVerified": true,
            "isEmailVerified": true,
            "role": "USER",
            "createdAt": "2024-11-20T08:45:10.000Z",
            "profile": {
                "profileId": "6961fdf33deaa60525828ddd",
                "nickname": "Riya",
                "dob": "2001-05-12T00:00:00.000Z",
                "age": 25,
                "gender": "female",
                "height": 165,
                "about": "Love painting, travel, and coffee ☕🎨",
                "jobTitle": "Software Engineer",
                "company": "Google",
                "totalCompletion": 95
            },
            "account": {
                "status": "active",
                "isPremium": true,
                "phone": "+919876543210",
                "email": "riya.sharma@example.com",
                "authMethod": "email",
                "banDetails": {
                    "isBanned": false,
                    "reason": null,
                    "bannedBy": null,
                    "bannedAt": null
                },
                "deactivationDetails": {
                    "isDeactivated": false,
                    "reason": null,
                    "deactivatedAt": null
                },
                "deletionDetails": {
                    "isScheduledForDeletion": false,
                    "scheduledAt": null
                },
                "createdAt": "2024-11-20T08:45:10.000Z"
            },
            "attributes": {
                "zodiac": "Taurus",
                "education": "Master's",
                "familyPlans": "Want kids",
                "personalityType": "INFJ",
                "communicationStyle": "Thoughtful",
                "loveStyle": "Quality Time",
                "pets": "Dog",
                "drinking": "Occasionally",
                "smoking": "Never",
                "workout": "3x a week",
                "dietary": "Vegetarian",
                "sleeping": "Early Bird",
                "socialMedia": "Instagram",
                "languages": [
                    "English",
                    "Hindi"
                ],
                "interests": [
                    "painting",
                    "travel",
                    "coffee",
                    "cricket"
                ],
                "music": [
                    "Indie",
                    "Pop"
                ],
                "movies": [
                    "Romance",
                    "Drama"
                ],
                "books": [
                    "Atomic Habits"
                ],
                "travel": [
                    "Goa",
                    "Bali"
                ],
                "religion": "Christian"
            },
            "discovery": {
                "distanceRange": 50,
                "ageRange": {
                    "min": 24,
                    "max": 35
                },
                "showMeGender": [
                    "man"
                ],
                "relationshipGoal": "Dating",
                "globalVisibility": "everyone"
            },
            "location": {
                "type": "Point",
                "coordinates": [
                    75.8577,
                    22.7196
                ],
                "city": "Indore",
                "country": "India",
                "full_address": "Indore, Madhya Pradesh, India"
            },
            "photos": [
                {
                    "id": "photo_1",
                    "url": "https://cdn.app.com/profiles/u_123/photo1.jpg",
                    "publicId": "photo_1",
                    "order": 0,
                    "uploadedAt": "2024-11-20T09:00:00.000Z"
                },
                {
                    "id": "photo_2",
                    "url": "https://cdn.app.com/profiles/u_123/photo2.jpg",
                    "publicId": "photo_2",
                    "order": 1,
                    "uploadedAt": "2024-11-20T09:05:00.000Z"
                }
            ],
            "verification": {
                "status": "approved",
                "selfieUrl": "https://cdn.app.com/kyc/selfie.png",
                "docUrl": "https://cdn.app.com/kyc/id.png",
                "rejectionReason": null
            },
            "lastProfileUpdate": "2026-01-10T14:28:12.622Z"
        }
    ]
}
```  

<!-- ## ✅ RECOMMENDED FINAL TABLE COLUMNS (BEST PRACTICE) -->

# ✅ Recommended Admin User Table (Final Structure)

## 👥 Admin User Management Table

An enterprise-grade, moderation-friendly user dashboard structure designed for
high-scalability and rapid scanning. Optimized for **shadcn/ui DataTable** and
dating-app specific workflows.

---

## 📊 Primary Table Structure (Desktop)

The following columns are prioritized for the main dashboard view to ensure
quick decision-making without horizontal scrolling.

| #   | Column Name        | Data Source                                   | UI Representation                    | Why It Matters                 |
| :-- | :----------------- | :-------------------------------------------- | :----------------------------------- | :----------------------------- |
| 1   | **Select / Sr.No.**  | —                                             | Checkbox + Serial No.                | Bulk actions & quick reference |
| 2   | **User ⭐**        | `profile.nickname`, `account.email`, `avatar` | Avatar + Name (bold) + Email (muted) | Identity at a glance           |
| 3   | **Role**           | `role`                                        | Badge (USER / ADMIN)                 | Access & permission clarity    |
| 4   | **Joined Date**    | `account.createdAt`                           | DD MMM YYYY + Tooltip                | Trust & lifecycle context      |
| 5   | **Age / Gender**   | `profile.age`, `profile.gender`               | 25 • Female                          | Dating-app specific relevance  |
| 6   | **Completion**     | `profile.totalCompletion`                     | Progress bar / % (color-coded)       | User quality signal            |
| 7   | **Account Status** | `account.status`, `isPremium`                 | Active • Premium badges              | Monetization + health          |
| 8   | **Ban Status**     | `account.banDetails.isBanned`                 | Red / Green badge + Tooltip          | Risk & moderation              |
| 9   | **Auth Method**    | `account.authMethod`                          | Icons (Email / Phone / Google)       | Detect fake or risky users     |
| 10  | **Actions**        | —                                             | View / Edit / Block / More           | Admin operations               |

---

## 🛠️ Admin Toolbar & Search

To maintain performance with large datasets, all search and filter operations
are handled **server-side**.

### 1️⃣ Global Search Bar

Located on the top-left of the table. It queries multiple fields simultaneously
to help admins find users fast.

- **Fields Covered:** `nickname`, `email`, `phone`.
- **Behavior:** Debounced input (300ms) triggering a fresh API fetch.

### 2️⃣ Export Logic (Bulk Operations)

Located on the top-right. Supports three primary admin workflows:

| Export Option    | Payload Requirements | Use Case                      |
| :--------------- | :------------------- | :---------------------------- |
| **Current Page** | `page`, `limit`      | Quick local audit             |
| **Selected**     | `userIds[]`          | Targeted data extraction      |
| **Filtered All** | `filters{}`          | Reporting and marketing lists |

---

## 🎨 Visual Formatting Rules

### 🔹 Status Colors

| State        | Color               | Meaning               |
| :----------- | :------------------ | :-------------------- |
| **Active**   | 🟢 Green            | Normal user activity  |
| **Inactive** | ⚪ Gray             | Account dormant       |
| **Premium**  | 🟨 Gold / 🟣 Purple | High-value subscriber |
| **Banned**   | 🔴 Red              | Account suspended     |
| **Unbanned** | 🟢 Green            | Restored access       |

### 🔹 Profile Completion Logic

| Completion % | Color     | Signal                   |
| :----------- | :-------- | :----------------------- |
| `< 50%`      | 🔴 Red    | Low quality / Likely bot |
| `50–80%`     | 🟡 Yellow | Average profile          |
| `> 80%`      | 🟢 Green  | High-quality / Verified  |

## 🧩 Technical Implementation

### Toolbar Layout (shadcn/ui)

```jsx
<div className="flex items-center justify-between gap-2 py-4">
  {/* Left: Search */}
  <div className="relative flex items-center">
    <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Search name, email, phone..."
      className="pl-9 w-[300px]"
    />
  </div>

  {/* Right: Actions & Filters */}
  <div className="flex items-center gap-2">
    <ExportDropdown />
    <DataTableViewOptions table={table} />
    <UserFilters />
  </div>
</div>
```

### 🔹 Auth Method Icons

- **Email:** 📧
- **Phone:** 📱
- **Google:** 🟢 G
- **Apple:** 🍎

---

## 🧩 Detailed View (User 360° Drawer)

_Clicking a row opens a side drawer with secondary data to keep the main table
clean._

| Section          | Contents                                             |
| :--------------- | :--------------------------------------------------- |
| **Profile**      | Bio, interests, physical attributes, prompts         |
| **Photos**       | All uploaded profile images (full resolution)        |
| **Verification** | Selfie-to-photo match, ID docs, verification status  |
| **Discovery**    | Preferred age range, distance, global/local settings |
| **Moderation**   | Ban history, report logs, previous admin actions     |

> [!IMPORTANT] > **Data to exclude from Table:** Bio, full interest lists,
> location coordinates, and document URLs should stay in the **360° Drawer** to
> maintain scanning speed.

---

## 🔍 Search & Filtering

Recommended top-level filters for the `DataTable` toolbar:

- **Status:** Active, Inactive, Banned
- **Role:** User, Admin
- **Premium:** Yes / No
- **Auth Method:** Email, Phone, Google, Apple
- **Completion:** Range slider (e.g., 0% - 100%)

## Backend API Recommendation

```js
GET /admin/users?search=riya&status=active&page=1&limit=20
```

`[!WARNING]` Performance Tip: Do not filter client-side for datasets exceeding
1,000 rows. Always use server-side pagination to keep the UI responsive.

---

## 🏁 Final Verdict

- **Fast Scanning:** ✅
- **Quick Decisions:** ✅
- **Minimal Clutter:** ✅
- **Scalable:** ✅ (Ready for millions of users)
