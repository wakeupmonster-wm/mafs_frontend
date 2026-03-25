# Subscriber Management — Changes Walkthrough

## ✅ All 11 Tasks Completed

| # | Task | File(s) Changed | Status |
|---|------|-----------------|--------|
| 1 | Add `source` field to Subscription schema | [Subscription.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/models/Subscription.js#L239-L244) | ✅ |
| 2 | Set `source: "STORE"` on store purchases | [subscription.service.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/services/subscription.service.js#L213) | ✅ |
| 3 | Set `source: "ADMIN"` on admin grants + Transaction log | [admin.controller.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/controllers/admin.controller.js#L261-L289) | ✅ |
| 4 | Set `source: "GIVEAWAY"` on milestone grants | [subscription.service.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/services/subscription.service.js#L558) | ✅ |
| 5 | Return `source` in `/subscribers` list | Auto (field exists on schema with default) | ✅ |
| 6 | Return `source` + `subscriptionHistory` in `/users/:userId` | [admin.controller.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/controllers/admin.controller.js#L210-L249) | ✅ |
| 7 | Return ALL transactions in `/users/:userId` | [admin.controller.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/controllers/admin.controller.js#L222) | ✅ |
| 8 | New `POST /users/:userId/extend` endpoint | [admin.controller.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/controllers/admin.controller.js#L340-L402) + [admin.routes.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/routes/admin.routes.js#L33) | ✅ |
| 9 | Revoke restriction for `source: "STORE"` | [admin.controller.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/controllers/admin.controller.js#L305-L321) | ✅ |
| 10 | Store `reason` in consumable grant transactions | [admin.controller.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/controllers/admin.controller.js#L291-L308) | ✅ |
| 11 | Add `ADMIN` platform + new event types to Transaction model | [SubscriptionTransaction.js](file:///c:/MAFS/mafswm-dating-app/modules/subscription/models/SubscriptionTransaction.js#L19-L58) | ✅ |

---

## Detailed File Changes

### 1. Subscription Model — `source` field added
```diff:Subscription.js
// const mongoose = require("mongoose");

// const SubscriptionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     platform: {
//       type: String,
//       enum: ["ios", "android"],
//       required: true,
//     },
//     productId: {
//       type: String,
//       required: true,
//     },
//     planType: {
//       type: String,
//       enum: ["weekly", "monthly", "yearly", "lifetime"],
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: [
//         "ACTIVE",
//         "GRACE",
//         "EXPIRED",
//         "CANCELLED",
//         "PAUSED",
//         "REVOKED",
//         "PENDING",
//       ],
//       required: true,
//     },
//     autoRenew: {
//       type: Boolean,
//       default: true,
//     },
//     startedAt: {
//       type: Date,
//       required: true,
//     },
//     expiresAt: {
//       type: Date,
//     },
//     gracePeriodEndsAt: Date,
//     pausedAt: Date,
//     resumesAt: Date,
//     originalTransactionId: {
//       type: String,
//       index: true,
//       sparse: true,
//     },
//     latestTransactionId: String,
//     appAccountToken: String,
//     purchaseToken: {
//       type: String,
//       index: true,
//       sparse: true,
//     },
//     orderId: String,
//     cancellationReason: {
//       type: String,
//       enum: [
//         "USER_CANCELLED",
//         "BILLING_ERROR",
//         "PRICE_CHANGE",
//         "PRODUCT_UNAVAILABLE",
//         "REFUNDED",
//         "UNKNOWN",
//       ],
//     },
//     cancelledAt: Date,
//     retryCount: {
//       type: Number,
//       default: 0,
//     },
//     previousStatus: String,
//     isInFamilySharing: {
//       type: Boolean,
//       default: false,
//     },
//     offerType: {
//       type: String,
//       enum: ["INTRODUCTORY", "PROMOTIONAL", "OFFER_CODE", "NONE"],
//       default: "NONE",
//     },
//     offerIdentifier: String,
//     priceConsentStatus: {
//       type: String,
//       enum: ["AGREED", "PENDING", "DECLINED"],
//     },
//     environment: {
//       type: String,
//       enum: ["sandbox", "production"],
//       required: true,
//     },
//     statusHistory: [
//       {
//         from: String,
//         to: String,
//         reason: String,
//         changedAt: { type: Date, default: Date.now },
//         _id: false,
//       },
//     ],
//   },
//   {
//     timestamps: true,
//     optimisticConcurrency: true,
//   }
// );

// SubscriptionSchema.index({ userId: 1, platform: 1, expiresAt: 1, status: 1 });

// SubscriptionSchema.pre("save", function (next) {
//   if (this.platform === "ios" && !this.originalTransactionId && !this.isNew) {
//     return next(new Error("originalTransactionId required for iOS"));
//   }
//   if (this.platform === "android" && !this.purchaseToken && !this.isNew) {
//     return next(new Error("purchaseToken required for Android"));
//   }
//   if (this.isModified("status") && !this.isNew) {
//     this.statusHistory.push({
//       from: this.previousStatus || "UNKNOWN",
//       to: this.status,
//       reason: this.cancellationReason || "system",
//       changedAt: new Date(),
//     });
//   }
//   next();
// });

// SubscriptionSchema.methods.isActive = function () {
//   return this.status === "ACTIVE" && this.expiresAt > new Date();
// };

// SubscriptionSchema.methods.isInGracePeriod = function () {
//   return this.status === "GRACE" && this.gracePeriodEndsAt > new Date();
// };

// SubscriptionSchema.methods.hasAccess = function () {
//   return this.isActive() || this.isInGracePeriod();
// };

// SubscriptionSchema.statics.findActiveByUser = function (userId) {
//   return this.findOne({
//     userId,
//     status: { $in: ["ACTIVE", "GRACE"] },
//     expiresAt: { $gt: new Date() },
//   });
// };

// module.exports = mongoose.model("Subscription", SubscriptionSchema);
// // ← ADD: Compound indexes for common queries
// SubscriptionSchema.index({ userId: 1, status: 1 });
// SubscriptionSchema.index({ userId: 1, platform: 1 });
// SubscriptionSchema.index({ expiresAt: 1, status: 1 }); // Cron ke liye


const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        platform: {
            type: String,
            // "admin_granted" is for milestone and manual grants
            enum: ["ios", "android", "admin_granted"],
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        planType: {
            type: String, // e.g. "1_MONTH", "3_MONTH", "6_MONTH" (Scalable, no enum)
            required: true,
        },
        status: {
            type: String,
            enum: [
                "ACTIVE",
                "EXPIRED",
                "CANCELLED", // Cancelled means auto-renew off, but STILL HAS ACCESS until expiresAt
                "PAUSED",
                "REVOKED",
                "PENDING",
            ],
            required: true,
        },
        autoRenew: {
            type: Boolean,
            default: true,
        },
        startedAt: {
            type: Date,
            required: true,
        },
        expiresAt: {
            type: Date,
        },
        // CURRENT PERIOD TRACKING (for AEST resets and display)
        currentPeriodStart: Date,
        currentPeriodEnd: Date,

        pausedAt: Date,
        resumesAt: Date,
        originalTransactionId: {
            type: String,
            index: true,
            sparse: true,
        },
        latestTransactionId: String,
        purchaseToken: {
            type: String,
            index: true,
            sparse: true,
        },
        orderId: String,
        cancellationReason: String,
        cancelledAt: Date,

        // Notifications tracking
        expiryNotificationSent: {
            type: Boolean,
            default: false
        },

        grantedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
        grantReason: String, // e.g. "milestone_first_1000", "customer_service"

        environment: {
            type: String,
            enum: ["sandbox", "production"],
            required: true,
        },
        statusHistory: [
            {
                from: String,
                to: String,
                reason: String,
                changedAt: { type: Date, default: Date.now },
                _id: false,
            },
        ],
    },
    {
        timestamps: true,
        optimisticConcurrency: true,
    }
);

// Indexes
SubscriptionSchema.index({ userId: 1, status: 1 });
SubscriptionSchema.index({ userId: 1, expiresAt: 1 });
SubscriptionSchema.index({ expiresAt: 1, status: 1 });

SubscriptionSchema.pre("save", function (next) {
    if (this.isModified("status") && !this.isNew) {
        this.statusHistory.push({
            from: this.previousStatus || "UNKNOWN",
            to: this.status,
            reason: this.cancellationReason || "system",
            changedAt: new Date(),
        });
    }
    next();
});

// V3 access logic: ACTIVE and CANCELLED both have access if not expired
SubscriptionSchema.methods.hasAccess = function () {
    const activeStatuses = ["ACTIVE", "CANCELLED"];
    return activeStatuses.includes(this.status) && this.expiresAt > new Date();
};

SubscriptionSchema.statics.findActiveByUser = function (userId) {
    return this.findOne({
        userId,
        status: { $in: ["ACTIVE", "CANCELLED"] },
        expiresAt: { $gt: new Date() },
    }).sort({ expiresAt: -1 }); // Get the one that expires furthest in the future
};

module.exports = mongoose.model("Subscription", SubscriptionSchema);
===
// const mongoose = require("mongoose");

// const SubscriptionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     platform: {
//       type: String,
//       enum: ["ios", "android"],
//       required: true,
//     },
//     productId: {
//       type: String,
//       required: true,
//     },
//     planType: {
//       type: String,
//       enum: ["weekly", "monthly", "yearly", "lifetime"],
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: [
//         "ACTIVE",
//         "GRACE",
//         "EXPIRED",
//         "CANCELLED",
//         "PAUSED",
//         "REVOKED",
//         "PENDING",
//       ],
//       required: true,
//     },
//     autoRenew: {
//       type: Boolean,
//       default: true,
//     },
//     startedAt: {
//       type: Date,
//       required: true,
//     },
//     expiresAt: {
//       type: Date,
//     },
//     gracePeriodEndsAt: Date,
//     pausedAt: Date,
//     resumesAt: Date,
//     originalTransactionId: {
//       type: String,
//       index: true,
//       sparse: true,
//     },
//     latestTransactionId: String,
//     appAccountToken: String,
//     purchaseToken: {
//       type: String,
//       index: true,
//       sparse: true,
//     },
//     orderId: String,
//     cancellationReason: {
//       type: String,
//       enum: [
//         "USER_CANCELLED",
//         "BILLING_ERROR",
//         "PRICE_CHANGE",
//         "PRODUCT_UNAVAILABLE",
//         "REFUNDED",
//         "UNKNOWN",
//       ],
//     },
//     cancelledAt: Date,
//     retryCount: {
//       type: Number,
//       default: 0,
//     },
//     previousStatus: String,
//     isInFamilySharing: {
//       type: Boolean,
//       default: false,
//     },
//     offerType: {
//       type: String,
//       enum: ["INTRODUCTORY", "PROMOTIONAL", "OFFER_CODE", "NONE"],
//       default: "NONE",
//     },
//     offerIdentifier: String,
//     priceConsentStatus: {
//       type: String,
//       enum: ["AGREED", "PENDING", "DECLINED"],
//     },
//     environment: {
//       type: String,
//       enum: ["sandbox", "production"],
//       required: true,
//     },
//     statusHistory: [
//       {
//         from: String,
//         to: String,
//         reason: String,
//         changedAt: { type: Date, default: Date.now },
//         _id: false,
//       },
//     ],
//   },
//   {
//     timestamps: true,
//     optimisticConcurrency: true,
//   }
// );

// SubscriptionSchema.index({ userId: 1, platform: 1, expiresAt: 1, status: 1 });

// SubscriptionSchema.pre("save", function (next) {
//   if (this.platform === "ios" && !this.originalTransactionId && !this.isNew) {
//     return next(new Error("originalTransactionId required for iOS"));
//   }
//   if (this.platform === "android" && !this.purchaseToken && !this.isNew) {
//     return next(new Error("purchaseToken required for Android"));
//   }
//   if (this.isModified("status") && !this.isNew) {
//     this.statusHistory.push({
//       from: this.previousStatus || "UNKNOWN",
//       to: this.status,
//       reason: this.cancellationReason || "system",
//       changedAt: new Date(),
//     });
//   }
//   next();
// });

// SubscriptionSchema.methods.isActive = function () {
//   return this.status === "ACTIVE" && this.expiresAt > new Date();
// };

// SubscriptionSchema.methods.isInGracePeriod = function () {
//   return this.status === "GRACE" && this.gracePeriodEndsAt > new Date();
// };

// SubscriptionSchema.methods.hasAccess = function () {
//   return this.isActive() || this.isInGracePeriod();
// };

// SubscriptionSchema.statics.findActiveByUser = function (userId) {
//   return this.findOne({
//     userId,
//     status: { $in: ["ACTIVE", "GRACE"] },
//     expiresAt: { $gt: new Date() },
//   });
// };

// module.exports = mongoose.model("Subscription", SubscriptionSchema);
// // ← ADD: Compound indexes for common queries
// SubscriptionSchema.index({ userId: 1, status: 1 });
// SubscriptionSchema.index({ userId: 1, platform: 1 });
// SubscriptionSchema.index({ expiresAt: 1, status: 1 }); // Cron ke liye


const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        platform: {
            type: String,
            // "admin_granted" is for milestone and manual grants
            enum: ["ios", "android", "admin_granted"],
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        planType: {
            type: String, // e.g. "1_MONTH", "3_MONTH", "6_MONTH" (Scalable, no enum)
            required: true,
        },
        status: {
            type: String,
            enum: [
                "ACTIVE",
                "EXPIRED",
                "CANCELLED", // Cancelled means auto-renew off, but STILL HAS ACCESS until expiresAt
                "PAUSED",
                "REVOKED",
                "PENDING",
            ],
            required: true,
        },
        autoRenew: {
            type: Boolean,
            default: true,
        },
        startedAt: {
            type: Date,
            required: true,
        },
        expiresAt: {
            type: Date,
        },
        // CURRENT PERIOD TRACKING (for AEST resets and display)
        currentPeriodStart: Date,
        currentPeriodEnd: Date,

        pausedAt: Date,
        resumesAt: Date,
        originalTransactionId: {
            type: String,
            index: true,
            sparse: true,
        },
        latestTransactionId: String,
        purchaseToken: {
            type: String,
            index: true,
            sparse: true,
        },
        orderId: String,
        cancellationReason: String,
        cancelledAt: Date,

        // Notifications tracking
        expiryNotificationSent: {
            type: Boolean,
            default: false
        },

        grantedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
        grantReason: String, // e.g. "milestone_first_1000", "customer_service"

        // Tracks how the subscription was created
        source: {
            type: String,
            enum: ["STORE", "ADMIN", "GIVEAWAY"],
            default: "STORE"
        },

        environment: {
            type: String,
            enum: ["sandbox", "production"],
            required: true,
        },
        statusHistory: [
            {
                from: String,
                to: String,
                reason: String,
                changedAt: { type: Date, default: Date.now },
                _id: false,
            },
        ],
    },
    {
        timestamps: true,
        optimisticConcurrency: true,
    }
);

// Indexes
SubscriptionSchema.index({ userId: 1, status: 1 });
SubscriptionSchema.index({ userId: 1, expiresAt: 1 });
SubscriptionSchema.index({ expiresAt: 1, status: 1 });

SubscriptionSchema.pre("save", function (next) {
    if (this.isModified("status") && !this.isNew) {
        this.statusHistory.push({
            from: this.previousStatus || "UNKNOWN",
            to: this.status,
            reason: this.cancellationReason || "system",
            changedAt: new Date(),
        });
    }
    next();
});

// V3 access logic: ACTIVE and CANCELLED both have access if not expired
SubscriptionSchema.methods.hasAccess = function () {
    const activeStatuses = ["ACTIVE", "CANCELLED"];
    return activeStatuses.includes(this.status) && this.expiresAt > new Date();
};

SubscriptionSchema.statics.findActiveByUser = function (userId) {
    return this.findOne({
        userId,
        status: { $in: ["ACTIVE", "CANCELLED"] },
        expiresAt: { $gt: new Date() },
    }).sort({ expiresAt: -1 }); // Get the one that expires furthest in the future
};

module.exports = mongoose.model("Subscription", SubscriptionSchema);
```

### 2. SubscriptionTransaction Model — new enums + `reason` field
```diff:SubscriptionTransaction.js
const mongoose = require("mongoose");

const SubscriptionTransactionSchema = new mongoose.Schema(
  {
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: false,  // v3: Not required for consumable purchases
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    platform: {
      type: String,
      enum: ["ios", "android"],
      required: true,
    },
    transactionId: {
      type: String,
      index: true,
      sparse: true,
    },
    purchaseToken: {
      type: String,
      sparse: true,
    },
    orderId: String,
    productId: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: [
        "PURCHASE",
        "CONSUMABLE_PURCHASE",
        "RENEW",
        "CANCEL",
        "REFUND",
        "EXPIRE",
        "PAUSE",
        "RESUME",
        "PRICE_CHANGE",
        "BILLING_RETRY",
        "REVOKE",
      ],
      required: true,
    },
    amount: Number,
    currency: String,
    refundReason: String,
    refundAmount: Number,
    rawResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    occurredAt: {
      type: Date,
      required: true,
    },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

SubscriptionTransactionSchema.index({ subscriptionId: 1, eventType: 1 });
SubscriptionTransactionSchema.index({ transactionId: 1, platform: 1 });

module.exports = mongoose.model("SubscriptionTransaction", SubscriptionTransactionSchema);
===
const mongoose = require("mongoose");

const SubscriptionTransactionSchema = new mongoose.Schema(
  {
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: false,  // v3: Not required for consumable purchases
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    platform: {
      type: String,
      enum: ["ios", "android", "ADMIN"],
      required: true,
    },
    transactionId: {
      type: String,
      index: true,
      sparse: true,
    },
    purchaseToken: {
      type: String,
      sparse: true,
    },
    orderId: String,
    productId: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: [
        "PURCHASE",
        "CONSUMABLE_PURCHASE",
        "RENEW",
        "CANCEL",
        "REFUND",
        "EXPIRE",
        "PAUSE",
        "RESUME",
        "PRICE_CHANGE",
        "BILLING_RETRY",
        "REVOKE",
        "ADMIN_GRANT",
        "EXTENSION",
        "ADMIN_CONSUMABLE_GRANT",
      ],
      required: true,
    },
    amount: Number,
    currency: String,
    reason: String, // For admin operations (grant reason, extension reason, etc.)
    refundReason: String,
    refundAmount: Number,
    rawResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    occurredAt: {
      type: Date,
      required: true,
    },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

SubscriptionTransactionSchema.index({ subscriptionId: 1, eventType: 1 });
SubscriptionTransactionSchema.index({ transactionId: 1, platform: 1 });

module.exports = mongoose.model("SubscriptionTransaction", SubscriptionTransactionSchema);
```

### 3. Admin Controller — all controller changes
```diff:admin.controller.js
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const SubscriptionConfig = require("../models_v3/SubscriptionConfig");
const Product = require("../models_v3/Product");
const Subscription = require("../models/Subscription"); // Base subscription records
const SubscriptionTransaction = require("../models/SubscriptionTransaction");
const User = require("../../auth/auth.model");
const Profile = require("../../profile/profile.model");
const UserConsumableBalance = require("../models_v3/UserConsumableBalance");
const subscriptionService = require("../services/subscription.service");
const UsageService = require("../services/usage.service");
const logger = require("../utils/logger");

/**
 * 1. CONFIGURATION APIs
 */

exports.getConfig = async (req, res, next) => {
    try {
        const config = await SubscriptionConfig.getOrCreate();
        return res.json({ success: true, data: config });
    } catch (err) {
        next(err);
    }
};

exports.updateConfig = async (req, res, next) => {
    try {
        const config = await SubscriptionConfig.getOrCreate();

        // Partially update fields provided in body
        if (req.body.freeLimits) config.freeLimits = { ...config.freeLimits, ...req.body.freeLimits };
        if (req.body.premiumLimits) config.premiumLimits = { ...config.premiumLimits, ...req.body.premiumLimits };
        if (req.body.premiumFeatures) config.premiumFeatures = { ...config.premiumFeatures, ...req.body.premiumFeatures };
        if (req.body.milestone) config.milestone = { ...config.milestone, ...req.body.milestone };

        config.updatedAt = new Date();
        await config.save();

        return res.json({ success: true, message: "Configuration updated", data: config });
    } catch (err) {
        next(err);
    }
};

/**
 * 2. PRODUCT CATALOG APIs
 */
exports.listProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, type, isActive } = req.query;
        const filter = {};
        if (type) filter.type = type;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const products = await Product.find(filter)
            .sort({ sortOrder: 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean();

        const total = await Product.countDocuments(filter);

        return res.json({
            success: true,
            data: products,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { productKey } = req.params;
        const product = await Product.findOneAndUpdate(
            { productKey },
            { $set: req.body },
            { new: true }
        );
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        return res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

/**
 * 3. USER MANAGEMENT (Subscribers)
 */
exports.listSubscribers = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status, planType, platform, search } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (planType) filter.planType = planType;
        if (platform) filter.platform = platform;

        // Enhanced Search: Nickname, Phone, Email
        if (search) {
            const searchRegex = new RegExp(search, 'i');

            // 1. Dhoondho matching Users (Phone, Email)
            const matchedUsers = await User.find({
                $or: [
                    { email: searchRegex },
                    { phone: searchRegex }
                ]
            }).select('_id').lean();

            // 2. Dhoondho matching Profiles (Nickname)
            const matchedProfiles = await Profile.find({
                $or: [
                    { nickname: searchRegex },
                    { fullName: searchRegex }
                ]
            }).select('userId').lean();

            const userIds = [
                ...matchedUsers.map(u => u._id),
                ...matchedProfiles.map(p => p.userId)
            ];

            // 3. Subscription filter mein User IDs add karo
            filter.$or = [
                { userId: { $in: userIds } },
                { productId: searchRegex }
            ];

            // Agar search valid ObjectId hai toh direct match bhi karo
            if (mongoose.isValidObjectId(search)) {
                filter.$or.push({ userId: search });
            }
        }

        const subscriptions = await Subscription.find(filter)
            .populate("userId", "email phone")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean();

        // 4. Sabhi subscriptions ke liye Profiles fetch karo (Photo aur Nickname ke liye)
        const subUserIds = subscriptions.map(s => s.userId?._id).filter(id => id);
        const profiles = await Profile.find({ userId: { $in: subUserIds } })
            .select("userId nickname photos fullName")
            .lean();

        // Create a lookup map for profiles
        const profileMap = profiles.reduce((acc, p) => {
            acc[p.userId.toString()] = p;
            return acc;
        }, {});

        // 5. Response ko enrich karo aur structure saaf karo
        const enrichedSubs = subscriptions.map(sub => {
            const userProfile = sub.userId ? profileMap[sub.userId._id.toString()] : null;
            const isActuallyExpired = sub.expiresAt && new Date(sub.expiresAt) < new Date();

            const responseObj = {
                user: {
                    _id: sub.userId?._id,
                    phone: sub.userId?.phone || 'N/A',
                    email: sub.userId?.email || 'N/A',
                    nickname: userProfile?.nickname || userProfile?.fullName || 'N/A',
                    photo: userProfile?.photos?.[0]?.url || null
                },
                ...sub,
                isExpired: isActuallyExpired,
            };

            // Remove the redundant userId object to keep it clean
            delete responseObj.userId;

            return responseObj;
        });

        const total = await Subscription.countDocuments(filter);

        return res.json({
            success: true,
            data: enrichedSubs,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserSubscriptionDetail = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const [user, profile, subscription, transactions, wallet] = await Promise.all([
            User.findById(userId).select("phone email role accountStatus").lean(),
            Profile.findOne({ userId }).select("fullName nickname photos").lean(),
            Subscription.findOne({ userId }).sort({ createdAt: -1 }).lean(),
            SubscriptionTransaction.find({ userId }).sort({ occurredAt: -1 }).limit(10).lean(),
            UserConsumableBalance.findOne({ userId }).lean()
        ]);

        return res.json({
            success: true,
            data: {
                user: {
                    ...user,
                    fullName: profile?.fullName,
                    nickname: profile?.nickname,
                    photo: profile?.photos?.[0]?.url || null
                },
                subscription,
                recentTransactions: transactions,
                wallet
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * 4. MANUAL GRANTS & REVOCATION
 */
exports.manualGrant = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { planType, durationDays = 30, reason } = req.body;

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + durationDays);

        const subscription = await Subscription.create({
            userId,
            platform: "admin_granted",
            productId: `manual_${planType.toLowerCase()}`,
            planType: planType || "MONTHLY",
            status: "ACTIVE",
            autoRenew: false,
            startedAt: new Date(),
            expiresAt,
            grantReason: reason || "Admin manual grant",
            environment: "production"
        });

        // Sync flags
        await UsageService._syncPremiumState(userId, true);
        await subscriptionService._syncProfile(subscription);

        return res.json({ success: true, message: "Subscription granted successfully", data: subscription });
    } catch (err) {
        next(err);
    }
};

exports.grantConsumables = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { type, quantity, reason } = req.body; // type: SUPER_KEEN or BOOST

        const incrementField = {};
        if (type === 'SUPER_KEEN') incrementField.superKeensBalance = quantity;
        else if (type === 'BOOST') incrementField.boostsBalance = quantity;
        else return res.status(400).json({ success: false, message: "Invalid consumable type" });

        const wallet = await UserConsumableBalance.findOneAndUpdate(
            { userId },
            { $inc: incrementField },
            { upsert: true, new: true }
        );

        // TODO: Log this in transaction history if needed

        return res.json({ success: true, message: "Consumables granted", wallet });
    } catch (err) {
        next(err);
    }
};

exports.revokeSubscription = async (req, res, next) => {
    try {
        const { userId } = req.params;

        await Subscription.updateMany(
            { userId, status: "ACTIVE" },
            { $set: { status: "REVOKED", updatedAt: new Date() } }
        );

        await UsageService._syncPremiumState(userId, false);
        // Profile sync with empty sub info
        await subscriptionService._syncProfile({ userId, status: "REVOKED", planType: "NONE" });

        return res.json({ success: true, message: "Subscription revoked successfully" });
    } catch (err) {
        next(err);
    }
};

/**
 * 5. DASHBOARD / STATS
 */
exports.getDashboardStats = async (req, res, next) => {
    try {
        const { timeFilter = 'last7' } = req.query; // daily, weekly, last7, last15, last30, allTime

        const now = new Date();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const last24hStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const next24hEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        let startDate;
        if (timeFilter === 'daily') {
            startDate = startOfToday;
        } else if (timeFilter === 'weekly' || timeFilter === 'last7') {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (timeFilter === 'last15') {
            startDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
        } else if (timeFilter === 'last30') {
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else if (timeFilter === 'allTime') {
            startDate = new Date(0);
        } else {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }

        // 1. Parallel aggregates for high performance
        const results = await Promise.all([
            // [0] Overall Active Counts
            Subscription.aggregate([
                {
                    $group: {
                        _id: null,
                        totalSubscribers: { $sum: 1 },
                        activeSubscribers: { $sum: { $cond: [{ $eq: ["$status", "ACTIVE"] }, 1, 0] } }
                    }
                }
            ]),
            // [1] Revenue Trend (Filtered by startDate)
            SubscriptionTransaction.aggregate([
                {
                    $match: {
                        occurredAt: { $gte: startDate },
                        eventType: { $in: ["PURCHASE", "RENEW", "CONSUMABLE_PURCHASE"] }
                    }
                },
                {
                    $group: {
                        _id: {
                            day: { $dateToString: { format: "%Y-%m-%d", date: "$occurredAt" } },
                            type: { $cond: [{ $eq: ["$eventType", "CONSUMABLE_PURCHASE"] }, "consumable", "subscription"] }
                        },
                        amount: { $sum: { $ifNull: ["$amount", 0] } },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id.day": 1 } }
            ]),
            // [2] Best Selling Products
            SubscriptionTransaction.aggregate([
                {
                    $match: {
                        occurredAt: { $gte: startDate },
                        eventType: { $in: ["PURCHASE", "CONSUMABLE_PURCHASE"] }
                    }
                },
                {
                    $group: {
                        _id: "$productId",
                        salesCount: { $sum: 1 }
                    }
                },
                { $sort: { salesCount: -1 } },
                { $limit: 10 }
            ]),
            // [3] Platform Distribution (Revenue Split)
            SubscriptionTransaction.aggregate([
                { $match: { eventType: { $in: ["PURCHASE", "RENEW", "CONSUMABLE_PURCHASE"] } } },
                {
                    $group: {
                        _id: "$platform",
                        revenue: { $sum: "$amount" }
                    }
                }
            ]),
            // [4] Total Non-Fake Users
            User.countDocuments({ isFake: false }),
            // [5] SubscriptionConfig
            SubscriptionConfig.getOrCreate(),
            // [6] Monthly Metrics for KPIs (Count active at start of month)
            Subscription.countDocuments({
                status: "ACTIVE",
                createdAt: { $lt: startOfMonth },
                expiresAt: { $gt: startOfMonth }
            }),
            // [7] Cancellations (current month)
            SubscriptionTransaction.countDocuments({
                eventType: "CANCEL",
                occurredAt: { $gte: startOfMonth }
            }),
            // [8] Today's specific KPIs
            Promise.all([
                Subscription.countDocuments({ createdAt: { $gte: startOfToday } }), // todayNew
                SubscriptionTransaction.countDocuments({ eventType: "CANCEL", occurredAt: { $gte: startOfToday } }), // todayCancelled
                SubscriptionTransaction.aggregate([
                    {
                        $match: {
                            occurredAt: { $gte: startOfToday },
                            eventType: { $in: ["PURCHASE", "RENEW", "CONSUMABLE_PURCHASE"] }
                        }
                    },
                    { $group: { _id: null, total: { $sum: { $ifNull: ["$amount", 0] } } } }
                ]) // todayRevenue
            ]),
            // [9] Last 24h Activity
            Promise.all([
                Subscription.countDocuments({ createdAt: { $gte: last24hStart } }),
                SubscriptionTransaction.countDocuments({ eventType: "CONSUMABLE_PURCHASE", occurredAt: { $gte: last24hStart } }),
                SubscriptionTransaction.countDocuments({ eventType: "CANCEL", occurredAt: { $gte: last24hStart } }),
                Subscription.countDocuments({
                    status: "ACTIVE",
                    expiresAt: { $gte: now, $lte: next24hEnd }
                }),
            ]),
            // [10] Plan Distribution (Snapshot)
            Subscription.aggregate([
                { $match: { status: "ACTIVE", expiresAt: { $gt: now } } },
                {
                    $group: {
                        _id: "$planType",
                        count: { $sum: 1 }
                    }
                }
            ]),
            // [11] Active subs for MRR
            Subscription.find({
                status: "ACTIVE",
                expiresAt: { $gt: now }
            }).select("productId planType").lean()
        ]);

        const [
            totals,
            rawRevenueTrend,
            bestSellingProducts,
            platformMix,
            totalActiveUsers,
            config,
            activeCountStartOfMonth,
            monthlyCancellations,
            todayStats,
            last24hActivity,
            planDistribution,
            activeSubscriptions
        ] = results;

        // MRR Calculation
        const subscriptionProducts = await Product.find({ type: 'SUBSCRIPTION' }).lean();
        const priceMap = {};
        subscriptionProducts.forEach(p => {
            const price = parseFloat(String(p.displayPrice).replace(/[^0-9.]/g, '')) || 0;
            const monthlyPrice = p.durationDays ? (price / (p.durationDays / 30)) : price;
            priceMap[p.productKey] = monthlyPrice;
            if (p.appleProductId) priceMap[p.appleProductId] = monthlyPrice;
            if (p.googleProductId) priceMap[p.googleProductId] = monthlyPrice;
        });

        let totalMRR = 0;
        activeSubscriptions.forEach(sub => {
            totalMRR += priceMap[sub.productId] || 0;
        });

        // Format Trends Plan Distribution
        const validPlans = ["1_MONTH", "3_MONTH", "6_MONTH", "12_MONTH", "LIFETIME", "MILESTONE"];
        const finalPlanDist = planDistribution
            .filter(p => p._id && validPlans.includes(p._id.toUpperCase()))
            .map(p => ({ plan: p._id.toUpperCase(), count: p.count }));

        // Format Revenue Trend Chart
        const formattedRevTrend = {};
        rawRevenueTrend.forEach(item => {
            if (!formattedRevTrend[item._id.day]) {
                formattedRevTrend[item._id.day] = { day: item._id.day, subscription: 0, consumable: 0 };
            }
            formattedRevTrend[item._id.day][item._id.type] = item.amount;
        });

        const activeCountCurrent = totals[0]?.activeSubscribers || 0;
        const subChange = activeCountStartOfMonth > 0
            ? (((activeCountCurrent - activeCountStartOfMonth) / activeCountStartOfMonth) * 100).toFixed(1)
            : 0;

        return res.json({
            success: true,
            data: {
                kpis: {
                    totalUsers: totalActiveUsers,
                    activeSubscribers: {
                        count: activeCountCurrent,
                        change: `${subChange}%`
                    },
                    mrr: {
                        amount: Math.round(totalMRR),
                        currency: "AUD"
                    },
                    todayRevenue: todayStats[2][0]?.total || 0,
                    conversionRate: totalActiveUsers > 0 ? ((activeCountCurrent / totalActiveUsers * 100).toFixed(2) + "%") : "0%",
                    churnRate: activeCountStartOfMonth > 0 ? ((monthlyCancellations / activeCountStartOfMonth * 100).toFixed(1) + "%") : "0%",
                    milestone: {
                        currentCount: activeCountCurrent, // or use specific milestone logic
                        targetCount: config.milestone.targetUserCount,
                        percentage: (activeCountCurrent / config.milestone.targetUserCount * 100).toFixed(1)
                    }
                },
                charts: {
                    revenueTrend: Object.values(formattedRevTrend),
                    platformMix: platformMix.map(p => ({ platform: p._id, revenue: p.revenue })),
                    planDistribution: finalPlanDist,
                    bestSellingProducts
                },
                last24HoursActivity: {
                    newSubscriptions: last24hActivity[0],
                    walletPacksBought: last24hActivity[1],
                    cancellations: last24hActivity[2],
                    plansExpiringSoon: last24hActivity[3]
                }
            }
        });
    } catch (err) {
        next(err);
    }
};
===
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const SubscriptionConfig = require("../models_v3/SubscriptionConfig");
const Product = require("../models_v3/Product");
const Subscription = require("../models/Subscription"); // Base subscription records
const SubscriptionTransaction = require("../models/SubscriptionTransaction");
const User = require("../../auth/auth.model");
const Profile = require("../../profile/profile.model");
const UserConsumableBalance = require("../models_v3/UserConsumableBalance");
const subscriptionService = require("../services/subscription.service");
const UsageService = require("../services/usage.service");
const logger = require("../utils/logger");

/**
 * 1. CONFIGURATION APIs
 */

exports.getConfig = async (req, res, next) => {
    try {
        const config = await SubscriptionConfig.getOrCreate();
        return res.json({ success: true, data: config });
    } catch (err) {
        next(err);
    }
};

exports.updateConfig = async (req, res, next) => {
    try {
        const config = await SubscriptionConfig.getOrCreate();

        // Partially update fields provided in body
        if (req.body.freeLimits) config.freeLimits = { ...config.freeLimits, ...req.body.freeLimits };
        if (req.body.premiumLimits) config.premiumLimits = { ...config.premiumLimits, ...req.body.premiumLimits };
        if (req.body.premiumFeatures) config.premiumFeatures = { ...config.premiumFeatures, ...req.body.premiumFeatures };
        if (req.body.milestone) config.milestone = { ...config.milestone, ...req.body.milestone };

        config.updatedAt = new Date();
        await config.save();

        return res.json({ success: true, message: "Configuration updated", data: config });
    } catch (err) {
        next(err);
    }
};

/**
 * 2. PRODUCT CATALOG APIs
 */
exports.listProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, type, isActive } = req.query;
        const filter = {};
        if (type) filter.type = type;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const products = await Product.find(filter)
            .sort({ sortOrder: 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean();

        const total = await Product.countDocuments(filter);

        return res.json({
            success: true,
            data: products,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { productKey } = req.params;
        const product = await Product.findOneAndUpdate(
            { productKey },
            { $set: req.body },
            { new: true }
        );
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        return res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

/**
 * 3. USER MANAGEMENT (Subscribers)
 */
exports.listSubscribers = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status, planType, platform, search } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (planType) filter.planType = planType;
        if (platform) filter.platform = platform;

        // Enhanced Search: Nickname, Phone, Email
        if (search) {
            const searchRegex = new RegExp(search, 'i');

            // 1. Dhoondho matching Users (Phone, Email)
            const matchedUsers = await User.find({
                $or: [
                    { email: searchRegex },
                    { phone: searchRegex }
                ]
            }).select('_id').lean();

            // 2. Dhoondho matching Profiles (Nickname)
            const matchedProfiles = await Profile.find({
                $or: [
                    { nickname: searchRegex },
                    { fullName: searchRegex }
                ]
            }).select('userId').lean();

            const userIds = [
                ...matchedUsers.map(u => u._id),
                ...matchedProfiles.map(p => p.userId)
            ];

            // 3. Subscription filter mein User IDs add karo
            filter.$or = [
                { userId: { $in: userIds } },
                { productId: searchRegex }
            ];

            // Agar search valid ObjectId hai toh direct match bhi karo
            if (mongoose.isValidObjectId(search)) {
                filter.$or.push({ userId: search });
            }
        }

        const subscriptions = await Subscription.find(filter)
            .populate("userId", "email phone")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .lean();

        // 4. Sabhi subscriptions ke liye Profiles fetch karo (Photo aur Nickname ke liye)
        const subUserIds = subscriptions.map(s => s.userId?._id).filter(id => id);
        const profiles = await Profile.find({ userId: { $in: subUserIds } })
            .select("userId nickname photos fullName")
            .lean();

        // Create a lookup map for profiles
        const profileMap = profiles.reduce((acc, p) => {
            acc[p.userId.toString()] = p;
            return acc;
        }, {});

        // 5. Response ko enrich karo aur structure saaf karo
        const enrichedSubs = subscriptions.map(sub => {
            const userProfile = sub.userId ? profileMap[sub.userId._id.toString()] : null;
            const isActuallyExpired = sub.expiresAt && new Date(sub.expiresAt) < new Date();

            const responseObj = {
                user: {
                    _id: sub.userId?._id,
                    phone: sub.userId?.phone || 'N/A',
                    email: sub.userId?.email || 'N/A',
                    nickname: userProfile?.nickname || userProfile?.fullName || 'N/A',
                    photo: userProfile?.photos?.[0]?.url || null
                },
                ...sub,
                isExpired: isActuallyExpired,
            };

            // Remove the redundant userId object to keep it clean
            delete responseObj.userId;

            return responseObj;
        });

        const total = await Subscription.countDocuments(filter);

        return res.json({
            success: true,
            data: enrichedSubs,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserSubscriptionDetail = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const [user, profile, subscription, transactions, wallet] = await Promise.all([
            User.findById(userId).select("phone email role accountStatus").lean(),
            Profile.findOne({ userId }).select("fullName nickname photos").lean(),
            Subscription.findOne({ userId }).sort({ createdAt: -1 }).lean(),
            // Return ALL transactions (not just 10)
            SubscriptionTransaction.find({ userId }).sort({ occurredAt: -1 }).lean(),
            UserConsumableBalance.findOne({ userId }).lean()
        ]);

        // Fetch subscription history (all past subscriptions except the current one)
        const subscriptionHistory = await Subscription.find({
            userId: userId,
            ...(subscription?._id ? { _id: { $ne: subscription._id } } : {})
        }).sort({ createdAt: -1 }).lean();

        return res.json({
            success: true,
            data: {
                user: {
                    ...user,
                    fullName: profile?.fullName,
                    nickname: profile?.nickname,
                    photo: profile?.photos?.[0]?.url || null
                },
                subscription,
                subscriptionHistory,
                transactions,
                recentTransactions: transactions, // Keep backward compatibility
                wallet
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * 4. MANUAL GRANTS & REVOCATION
 */
exports.manualGrant = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { planType, durationDays = 30, reason } = req.body;

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + durationDays);

        const subscription = await Subscription.create({
            userId,
            platform: "admin_granted",
            productId: `manual_${planType.toLowerCase()}`,
            planType: planType || "MONTHLY",
            status: "ACTIVE",
            autoRenew: false,
            startedAt: new Date(),
            expiresAt,
            grantReason: reason || "Admin manual grant",
            source: "ADMIN",
            environment: "production"
        });

        // Log the admin grant as a transaction
        await SubscriptionTransaction.create({
            userId,
            subscriptionId: subscription._id,
            platform: "ADMIN",
            eventType: "ADMIN_GRANT",
            productId: `manual_${planType.toLowerCase()}`,
            amount: 0,
            currency: "AUD",
            reason: reason || "Admin manual grant",
            occurredAt: new Date(),
            idempotencyKey: `admin_GRANT_${subscription._id}_${Date.now()}`
        });

        // Sync flags
        await UsageService._syncPremiumState(userId, true);
        await subscriptionService._syncProfile(subscription);

        return res.json({ success: true, message: "Subscription granted successfully", data: { subscription } });
    } catch (err) {
        next(err);
    }
};

exports.grantConsumables = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { type, quantity, reason } = req.body; // type: SUPER_KEEN or BOOST

        const incrementField = {};
        if (type === 'SUPER_KEEN') incrementField.superKeensBalance = quantity;
        else if (type === 'BOOST') incrementField.boostsBalance = quantity;
        else return res.status(400).json({ success: false, message: "Invalid consumable type" });

        const wallet = await UserConsumableBalance.findOneAndUpdate(
            { userId },
            { $inc: incrementField },
            { upsert: true, new: true }
        );

        // Log the consumable grant as a transaction for audit trail
        await SubscriptionTransaction.create({
            userId,
            platform: "ADMIN",
            eventType: "ADMIN_CONSUMABLE_GRANT",
            productId: type, // "SUPER_KEEN" or "BOOST"
            amount: 0,
            currency: "AUD",
            reason: reason || "Admin consumable grant",
            occurredAt: new Date(),
            idempotencyKey: `admin_CONSUMABLE_${userId}_${type}_${Date.now()}`
        });

        return res.json({ success: true, message: "Consumables granted", wallet });
    } catch (err) {
        next(err);
    }
};

exports.revokeSubscription = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { reason } = req.body || {};

        // Check if user has an active subscription
        const activeSubscription = await Subscription.findOne({ userId, status: "ACTIVE" });

        if (!activeSubscription) {
            return res.status(404).json({
                success: false,
                message: "No active subscription found"
            });
        }

        // Restrict revoking store-purchased subscriptions
        if (activeSubscription.source === "STORE") {
            return res.status(400).json({
                success: false,
                message: "Cannot revoke store-purchased subscriptions. User must request refund through Apple/Google."
            });
        }

        await Subscription.updateMany(
            { userId, status: "ACTIVE" },
            { $set: { status: "REVOKED", updatedAt: new Date() } }
        );

        await UsageService._syncPremiumState(userId, false);
        // Profile sync with empty sub info
        await subscriptionService._syncProfile({ userId, status: "REVOKED", planType: "NONE" });

        return res.json({ success: true, message: "Subscription revoked successfully" });
    } catch (err) {
        next(err);
    }
};

/**
 * EXTEND SUBSCRIPTION — Adds extra days to expiresAt
 */
exports.extendSubscription = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { days, reason } = req.body;

        // Validation
        if (!days || !Number.isInteger(days) || days < 1 || days > 365) {
            return res.status(400).json({
                success: false,
                message: "days must be a positive integer between 1 and 365"
            });
        }

        if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "reason is required"
            });
        }

        const subscription = await Subscription.findOne({
            userId,
            status: "ACTIVE"
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: "No active subscription found"
            });
        }

        const previousExpiresAt = new Date(subscription.expiresAt);
        const newExpiresAt = new Date(previousExpiresAt.getTime() + (days * 24 * 60 * 60 * 1000));

        subscription.expiresAt = newExpiresAt;
        await subscription.save();

        // Log the extension as a transaction
        await SubscriptionTransaction.create({
            userId,
            subscriptionId: subscription._id,
            platform: "ADMIN",
            eventType: "EXTENSION",
            productId: subscription.productId,
            amount: 0,
            currency: "AUD",
            reason: reason,
            occurredAt: new Date(),
            idempotencyKey: `admin_EXTENSION_${subscription._id}_${Date.now()}`
        });

        // Sync profile with updated expiry
        await subscriptionService._syncProfile(subscription);

        return res.json({
            success: true,
            message: `Subscription extended by ${days} days`,
            data: {
                previousExpiresAt: previousExpiresAt.toISOString(),
                newExpiresAt: newExpiresAt.toISOString(),
                daysAdded: days
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * 5. DASHBOARD / STATS
 */
exports.getDashboardStats = async (req, res, next) => {
    try {
        const { timeFilter = 'last7' } = req.query; // daily, weekly, last7, last15, last30, allTime

        const now = new Date();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const last24hStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const next24hEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        let startDate;
        if (timeFilter === 'daily') {
            startDate = startOfToday;
        } else if (timeFilter === 'weekly' || timeFilter === 'last7') {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (timeFilter === 'last15') {
            startDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
        } else if (timeFilter === 'last30') {
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        } else if (timeFilter === 'allTime') {
            startDate = new Date(0);
        } else {
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }

        // 1. Parallel aggregates for high performance
        const results = await Promise.all([
            // [0] Overall Active Counts
            Subscription.aggregate([
                {
                    $group: {
                        _id: null,
                        totalSubscribers: { $sum: 1 },
                        activeSubscribers: { $sum: { $cond: [{ $eq: ["$status", "ACTIVE"] }, 1, 0] } }
                    }
                }
            ]),
            // [1] Revenue Trend (Filtered by startDate)
            SubscriptionTransaction.aggregate([
                {
                    $match: {
                        occurredAt: { $gte: startDate },
                        eventType: { $in: ["PURCHASE", "RENEW", "CONSUMABLE_PURCHASE"] }
                    }
                },
                {
                    $group: {
                        _id: {
                            day: { $dateToString: { format: "%Y-%m-%d", date: "$occurredAt" } },
                            type: { $cond: [{ $eq: ["$eventType", "CONSUMABLE_PURCHASE"] }, "consumable", "subscription"] }
                        },
                        amount: { $sum: { $ifNull: ["$amount", 0] } },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { "_id.day": 1 } }
            ]),
            // [2] Best Selling Products
            SubscriptionTransaction.aggregate([
                {
                    $match: {
                        occurredAt: { $gte: startDate },
                        eventType: { $in: ["PURCHASE", "CONSUMABLE_PURCHASE"] }
                    }
                },
                {
                    $group: {
                        _id: "$productId",
                        salesCount: { $sum: 1 }
                    }
                },
                { $sort: { salesCount: -1 } },
                { $limit: 10 }
            ]),
            // [3] Platform Distribution (Revenue Split)
            SubscriptionTransaction.aggregate([
                { $match: { eventType: { $in: ["PURCHASE", "RENEW", "CONSUMABLE_PURCHASE"] } } },
                {
                    $group: {
                        _id: "$platform",
                        revenue: { $sum: "$amount" }
                    }
                }
            ]),
            // [4] Total Non-Fake Users
            User.countDocuments({ isFake: false }),
            // [5] SubscriptionConfig
            SubscriptionConfig.getOrCreate(),
            // [6] Monthly Metrics for KPIs (Count active at start of month)
            Subscription.countDocuments({
                status: "ACTIVE",
                createdAt: { $lt: startOfMonth },
                expiresAt: { $gt: startOfMonth }
            }),
            // [7] Cancellations (current month)
            SubscriptionTransaction.countDocuments({
                eventType: "CANCEL",
                occurredAt: { $gte: startOfMonth }
            }),
            // [8] Today's specific KPIs
            Promise.all([
                Subscription.countDocuments({ createdAt: { $gte: startOfToday } }), // todayNew
                SubscriptionTransaction.countDocuments({ eventType: "CANCEL", occurredAt: { $gte: startOfToday } }), // todayCancelled
                SubscriptionTransaction.aggregate([
                    {
                        $match: {
                            occurredAt: { $gte: startOfToday },
                            eventType: { $in: ["PURCHASE", "RENEW", "CONSUMABLE_PURCHASE"] }
                        }
                    },
                    { $group: { _id: null, total: { $sum: { $ifNull: ["$amount", 0] } } } }
                ]) // todayRevenue
            ]),
            // [9] Last 24h Activity
            Promise.all([
                Subscription.countDocuments({ createdAt: { $gte: last24hStart } }),
                SubscriptionTransaction.countDocuments({ eventType: "CONSUMABLE_PURCHASE", occurredAt: { $gte: last24hStart } }),
                SubscriptionTransaction.countDocuments({ eventType: "CANCEL", occurredAt: { $gte: last24hStart } }),
                Subscription.countDocuments({
                    status: "ACTIVE",
                    expiresAt: { $gte: now, $lte: next24hEnd }
                }),
            ]),
            // [10] Plan Distribution (Snapshot)
            Subscription.aggregate([
                { $match: { status: "ACTIVE", expiresAt: { $gt: now } } },
                {
                    $group: {
                        _id: "$planType",
                        count: { $sum: 1 }
                    }
                }
            ]),
            // [11] Active subs for MRR
            Subscription.find({
                status: "ACTIVE",
                expiresAt: { $gt: now }
            }).select("productId planType").lean()
        ]);

        const [
            totals,
            rawRevenueTrend,
            bestSellingProducts,
            platformMix,
            totalActiveUsers,
            config,
            activeCountStartOfMonth,
            monthlyCancellations,
            todayStats,
            last24hActivity,
            planDistribution,
            activeSubscriptions
        ] = results;

        // MRR Calculation
        const subscriptionProducts = await Product.find({ type: 'SUBSCRIPTION' }).lean();
        const priceMap = {};
        subscriptionProducts.forEach(p => {
            const price = parseFloat(String(p.displayPrice).replace(/[^0-9.]/g, '')) || 0;
            const monthlyPrice = p.durationDays ? (price / (p.durationDays / 30)) : price;
            priceMap[p.productKey] = monthlyPrice;
            if (p.appleProductId) priceMap[p.appleProductId] = monthlyPrice;
            if (p.googleProductId) priceMap[p.googleProductId] = monthlyPrice;
        });

        let totalMRR = 0;
        activeSubscriptions.forEach(sub => {
            totalMRR += priceMap[sub.productId] || 0;
        });

        // Format Trends Plan Distribution
        const validPlans = ["1_MONTH", "3_MONTH", "6_MONTH", "12_MONTH", "LIFETIME", "MILESTONE"];
        const finalPlanDist = planDistribution
            .filter(p => p._id && validPlans.includes(p._id.toUpperCase()))
            .map(p => ({ plan: p._id.toUpperCase(), count: p.count }));

        // Format Revenue Trend Chart
        const formattedRevTrend = {};
        rawRevenueTrend.forEach(item => {
            if (!formattedRevTrend[item._id.day]) {
                formattedRevTrend[item._id.day] = { day: item._id.day, subscription: 0, consumable: 0 };
            }
            formattedRevTrend[item._id.day][item._id.type] = item.amount;
        });

        const activeCountCurrent = totals[0]?.activeSubscribers || 0;
        const subChange = activeCountStartOfMonth > 0
            ? (((activeCountCurrent - activeCountStartOfMonth) / activeCountStartOfMonth) * 100).toFixed(1)
            : 0;

        return res.json({
            success: true,
            data: {
                kpis: {
                    totalUsers: totalActiveUsers,
                    activeSubscribers: {
                        count: activeCountCurrent,
                        change: `${subChange}%`
                    },
                    mrr: {
                        amount: Math.round(totalMRR),
                        currency: "AUD"
                    },
                    todayRevenue: todayStats[2][0]?.total || 0,
                    conversionRate: totalActiveUsers > 0 ? ((activeCountCurrent / totalActiveUsers * 100).toFixed(2) + "%") : "0%",
                    churnRate: activeCountStartOfMonth > 0 ? ((monthlyCancellations / activeCountStartOfMonth * 100).toFixed(1) + "%") : "0%",
                    milestone: {
                        currentCount: activeCountCurrent, // or use specific milestone logic
                        targetCount: config.milestone.targetUserCount,
                        percentage: (activeCountCurrent / config.milestone.targetUserCount * 100).toFixed(1)
                    }
                },
                charts: {
                    revenueTrend: Object.values(formattedRevTrend),
                    platformMix: platformMix.map(p => ({ platform: p._id, revenue: p.revenue })),
                    planDistribution: finalPlanDist,
                    bestSellingProducts
                },
                last24HoursActivity: {
                    newSubscriptions: last24hActivity[0],
                    walletPacksBought: last24hActivity[1],
                    cancellations: last24hActivity[2],
                    plansExpiringSoon: last24hActivity[3]
                }
            }
        });
    } catch (err) {
        next(err);
    }
};
```

### 4. Admin Routes — extend endpoint added
```diff:admin.routes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { allowAdmin } = require("../../../common/middlewares/allowAdmin.middleware");
const protect = require("../../auth/auth.middleware");

// All routes here are protected and require ADMIN role
router.use(protect);
router.use(allowAdmin);

/**
 * --- Configuration ---
 */
router.get("/config", adminController.getConfig);
router.patch("/config", adminController.updateConfig);
router.put("/config", adminController.updateConfig);

/**
 * --- Product Catalog ---
 */
router.get("/products", adminController.listProducts);
router.post("/products", adminController.createProduct);
router.patch("/products/:productKey", adminController.updateProduct);
router.put("/products/:productKey", adminController.updateProduct);

/**
 * --- Subscriber Management ---
 */
router.get("/subscribers", adminController.listSubscribers);
router.get("/users/:userId", adminController.getUserSubscriptionDetail);
router.post("/users/:userId/grant", adminController.manualGrant);
router.post("/users/:userId/grant-consumable", adminController.grantConsumables);
router.post("/users/:userId/revoke", adminController.revokeSubscription);

/**
 * --- Analytics ---
 */
router.get("/stats", adminController.getDashboardStats);
router.get("/dashboard", adminController.getDashboardStats);

module.exports = router;
===
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { allowAdmin } = require("../../../common/middlewares/allowAdmin.middleware");
const protect = require("../../auth/auth.middleware");

// All routes here are protected and require ADMIN role
router.use(protect);
router.use(allowAdmin);

/**
 * --- Configuration ---
 */
router.get("/config", adminController.getConfig);
router.patch("/config", adminController.updateConfig);
router.put("/config", adminController.updateConfig);

/**
 * --- Product Catalog ---
 */
router.get("/products", adminController.listProducts);
router.post("/products", adminController.createProduct);
router.patch("/products/:productKey", adminController.updateProduct);
router.put("/products/:productKey", adminController.updateProduct);

/**
 * --- Subscriber Management ---
 */
router.get("/subscribers", adminController.listSubscribers);
router.get("/users/:userId", adminController.getUserSubscriptionDetail);
router.post("/users/:userId/grant", adminController.manualGrant);
router.post("/users/:userId/grant-consumable", adminController.grantConsumables);
router.post("/users/:userId/extend", adminController.extendSubscription);
router.post("/users/:userId/revoke", adminController.revokeSubscription);

/**
 * --- Analytics ---
 */
router.get("/stats", adminController.getDashboardStats);
router.get("/dashboard", adminController.getDashboardStats);

module.exports = router;
```

### 5. Subscription Service — `source: "STORE"` on purchases, `source: "GIVEAWAY"` on milestone
```diff:subscription.service.js
const Subscription = require("../models/Subscription");
const SubscriptionTransaction = require("../models/SubscriptionTransaction");
const Product = require("../models_v3/Product");
const UserConsumableBalance = require("../models_v3/UserConsumableBalance");
const SubscriptionConfig = require("../models_v3/SubscriptionConfig");
const UsageService = require("./usage.service");
const iapConfig = require("../config/iap.config");
const { generateIdempotencyKey } = require("../utils/iap.helpers");
const logger = require("../utils/logger");
const Profile = require("../../profile/profile.model");

class SubscriptionService {

  async _syncProfile(subscription) {
    try {

      console.log("🔄 Syncing Profile for User:", subscription.userId); // Debug 1
      if (!subscription || !subscription.userId) {
        console.log("❌ Subscription or UserId missing"); // Debug 2
        return;
      }

      const isActive = ["ACTIVE", "CANCELLED"].includes(subscription.status) && subscription.expiresAt > new Date();

      const profileUpdate = {
        "subscription.planId": subscription.planType || "free",
        "subscription.isActive": isActive,
        "subscription.expiryDate": subscription.expiresAt,
        "subscription.isTrial": false
      };

      // Agar expired/cancelled hai toh free pe set karo?
      // Optional: Depend karta hai business logic pe
      if (subscription.status === "EXPIRED" || subscription.status === "REVOKED") {
        profileUpdate["subscription.planId"] = "free";
        profileUpdate["subscription.isActive"] = false;
      }

      console.log("📝 Update Payload:", profileUpdate); // Debug 3

      await Profile.findOneAndUpdate(
        { userId: subscription.userId },
        { $set: profileUpdate }
      );

      logger.info("Profile subscription synced", { userId: subscription.userId });
    } catch (err) {
      logger.error("Profile sync failed:", err.message);
    }
  }



  /**
   * v3 Purchase Router: Determines if the purchase is a SUBSCRIPTION or CONSUMABLE
   * and routes to the correct handler.
   */
  async handlePurchase(data) {
    // Step 1: Check our Product catalog (v3 dynamic store) first
    const catalogProduct = await Product.findOne({
      $or: [
        { appleProductId: data.productId },
        { googleProductId: data.productId },
        { productKey: data.productId }
      ],
      isActive: true
    }).lean();

    // Step 2: THE FORK — Route based on product type
    if (catalogProduct && catalogProduct.type === 'CONSUMABLE') {
      return this._handleConsumablePurchase(data, catalogProduct);
    }

    // Step 3: SUBSCRIPTION flow (original logic, unchanged)
    return this._handleSubscriptionPurchase(data);
  }

  /**
   * Handles Consumable purchases (Super Keens, Boosts packs).
   * Adds items directly to the user's Wallet (UserConsumableBalance).
   */
  async _handleConsumablePurchase(data, catalogProduct) {
    // Determine which wallet field to increment
    const incrementField = {};
    if (catalogProduct.consumableType === 'SUPER_KEEN') {
      incrementField.superKeensBalance = catalogProduct.quantity;
    } else if (catalogProduct.consumableType === 'BOOST') {
      incrementField.boostsBalance = catalogProduct.quantity;
    } else {
      throw new Error(`Unknown consumable type: ${catalogProduct.consumableType}`);
    }

    // Idempotency Check (Prevent duplicate consumable granting)
    const identifier = data.transactionId || data.purchaseToken || String(Date.now());
    const eventType = "CONSUMABLE_PURCHASE";
    const key = generateIdempotencyKey(data.platform, eventType, identifier);
    
    // Using exists instead of findOne for performance, since we only need the boolean representation
    const txnExists = await SubscriptionTransaction.exists({ idempotencyKey: key });
    if (txnExists) {
      logger.info("DOUBLE GRANT PREVENTED: Consumable already granted (Idempotency)", { key, userId: data.userId });
      return {
        type: 'CONSUMABLE',
        consumableType: catalogProduct.consumableType,
        quantity: catalogProduct.quantity,
        status: "ALREADY_GRANTED"
      };
    }

    // Atomic wallet update (upsert: creates wallet if first purchase)
    const updatedWallet = await UserConsumableBalance.findOneAndUpdate(
      { userId: data.userId },
      { $inc: incrementField },
      { upsert: true, new: true }
    );

    // Log the transaction for audit trail
    await this._logTransaction({
      userId: data.userId,
      platform: data.platform,
      transactionId: data.transactionId,
      purchaseToken: data.purchaseToken,
      productId: data.productId,
      eventType: "CONSUMABLE_PURCHASE",
      amount: parseFloat(String(catalogProduct.displayPrice).replace(/[^0-9.]/g, '')) || 0,
      currency: catalogProduct.currency || "AUD",
      occurredAt: new Date(data.purchaseDate || Date.now()),
    });

    logger.info("Consumable purchase processed", {
      userId: data.userId,
      type: catalogProduct.consumableType,
      quantity: catalogProduct.quantity,
      newBalance: updatedWallet
    });

    return {
      type: 'CONSUMABLE',
      consumableType: catalogProduct.consumableType,
      quantity: catalogProduct.quantity,
      // wallet: {
      //   superKeens: updatedWallet.superKeensBalance,
      //   boosts: updatedWallet.boostsBalance
      // }
    };
  }

  /**
   * Handles Subscription purchases (Premium Plans).
   * Creates or updates a Subscription record with expiresAt.
   */
  async _handleSubscriptionPurchase(data) {
    const orConditions = [];

    if (data.originalTransactionId) {
      orConditions.push({ originalTransactionId: data.originalTransactionId });
    }
    if (data.purchaseToken) {
      orConditions.push({ purchaseToken: data.purchaseToken });
    }

    // v3: Enhanced product lookup. Check DB Catalog first, fallback to config.
    const dbProduct = await Product.findOne({
      $or: [
        { appleProductId: data.productId },
        { googleProductId: data.productId }
      ]
    }).lean();

    const configProduct = iapConfig.getProductDetails(data.productId);
    const catalogPlanType = dbProduct ? dbProduct.planType : (configProduct ? configProduct.planType : "1_MONTH");

    let existing = null;
    if (orConditions.length > 0) {
      existing = await Subscription.findOne({ $or: orConditions });
    }

    if (existing) {
      existing.userId = data.userId; // Ensure subscription belongs to current user
      existing.status = "ACTIVE";
      existing.expiresAt = new Date(data.expiresDate);
      existing.latestTransactionId = data.transactionId || existing.latestTransactionId;
      existing.previousStatus = existing.status;
      existing.productId = data.productId; // Update the product ID in case of an upgrade/crossgrade
      existing.planType = catalogPlanType; // v3: Ensure consistent planType on update/verify
      await existing.save();

      // v3 Sync: Use UsageService for consistent premium state
      UsageService._syncPremiumState(existing.userId, true).catch(err => logger.error('Sync Error:', err));
      await this._syncProfile(existing);

      logger.info("Subscription updated (existing)", {
        subscriptionId: existing._id,
        userId: data.userId,
      });

      return { type: 'SUBSCRIPTION', subscription: existing };
    }

    const subscription = await Subscription.create({
      userId: data.userId,
      platform: data.platform,
      productId: data.productId,
      planType: catalogPlanType,
      status: "ACTIVE",
      autoRenew: true,
      startedAt: new Date(data.purchaseDate || Date.now()),
      expiresAt: new Date(data.expiresDate),
      originalTransactionId: data.originalTransactionId || undefined,
      latestTransactionId: data.transactionId || undefined,
      purchaseToken: data.purchaseToken || undefined,
      orderId: data.orderId || undefined,
      environment: iapConfig.apple.environment || "sandbox",
    });

    const amount = dbProduct ? parseFloat(dbProduct.displayPrice.replace(/[^0-9.]/g, '')) : (configProduct ? configProduct.price : 0);
    const currency = dbProduct ? dbProduct.currency : (configProduct ? configProduct.currency : "AUD");

    await this._logTransaction({
      subscriptionId: subscription._id,
      userId: data.userId,
      platform: data.platform,
      transactionId: data.transactionId,
      purchaseToken: data.purchaseToken,
      productId: data.productId,
      eventType: "PURCHASE",
      amount: amount,
      currency: currency,
      occurredAt: new Date(data.purchaseDate || Date.now()),
    });

    logger.info("New subscription created", {
      subscriptionId: subscription._id,
      userId: data.userId,
      planType: subscription.planType,
    });

    // v3 Sync: Use UsageService for consistent premium state
    UsageService._syncPremiumState(subscription.userId, true).catch(err => logger.error('Sync Error:', err));
    await this._syncProfile(subscription);

    return { type: 'SUBSCRIPTION', subscription: subscription };
  }

  // ─── RENEW ───
  async handleRenew(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for renew", data);
      throw new Error("Subscription not found for renew");
    }

    // v3: Enhanced product lookup
    const dbProduct = await Product.findOne({
      $or: [
        { appleProductId: sub.productId },
        { googleProductId: sub.productId }
      ]
    }).lean();

    const configProduct = iapConfig.getProductDetails(sub.productId);
    const amount = dbProduct ? parseFloat(dbProduct.displayPrice.replace(/[^0-9.]/g, '')) : (configProduct ? configProduct.price : 0);
    const currency = dbProduct ? dbProduct.currency : (configProduct ? configProduct.currency : "AUD");

    sub.previousStatus = sub.status;
    sub.status = "ACTIVE";
    sub.expiresAt = new Date(data.expiresDate);
    sub.latestTransactionId = data.transactionId || sub.latestTransactionId;
    sub.autoRenew = true;
    sub.retryCount = 0;
    await sub.save();

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      transactionId: data.transactionId,
      productId: sub.productId,
      eventType: "RENEW",
      amount: amount,
      currency: currency,
      occurredAt: new Date(),
    });

    logger.info("Subscription renewed", { subscriptionId: sub._id });
    return sub;
  }

  // ─── CANCEL ───
  async handleCancel(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for cancel", data);
      throw new Error("Subscription not found for cancel");
    }

    sub.previousStatus = sub.status;
    sub.autoRenew = false;
    sub.cancellationReason = data.cancellationReason || "USER_CANCELLED";
    sub.cancelledAt = new Date();
    await sub.save();

    await this._syncProfile(sub);

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "CANCEL",
      occurredAt: new Date(),
    });

    logger.info("Subscription cancelled", { subscriptionId: sub._id });
    return sub;
  }

  // ─── RE-ACTIVATE (Un-cancel) ───
  async handleReActivate(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for re-activate", data);
      throw new Error("Subscription not found for re-activate");
    }

    sub.previousStatus = sub.status;
    sub.status = "ACTIVE";
    sub.autoRenew = true;
    sub.cancellationReason = undefined;
    sub.cancelledAt = undefined;
    await sub.save();

    await this._syncProfile(sub);
    await UsageService._syncPremiumState(sub.userId, true).catch(err => logger.error('Sync Error:', err));

    logger.info("Subscription re-activated", { subscriptionId: sub._id });
    return sub;
  }


  // ─── EXPIRE ───
  async handleExpire(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for expire", data);
      throw new Error("Subscription not found for expire");
    }

    sub.previousStatus = sub.status;
    sub.status = "EXPIRED";
    sub.autoRenew = false;
    await sub.save();
    await this._syncProfile(sub);

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "EXPIRE",
      occurredAt: new Date(),
    });

    logger.info("Subscription expired", { subscriptionId: sub._id });
    return sub;
  }

  // ─── REFUND ───
  async handleRefund(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for refund", data);
      throw new Error("Subscription not found for refund");
    }

    const product = iapConfig.getProductDetails(sub.productId);

    sub.previousStatus = sub.status;
    sub.status = "REVOKED";
    sub.autoRenew = false;
    sub.cancellationReason = "REFUNDED";
    sub.cancelledAt = new Date();
    await sub.save();

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "REFUND",
      amount: product ? product.price : 0,
      refundAmount: data.refundAmount || (product ? product.price : 0),
      refundReason: data.refundReason || "UNKNOWN",
      occurredAt: new Date(),
    });

    logger.info("Subscription refunded/revoked", { subscriptionId: sub._id });
    return sub;
  }

  // ─── PAUSE ───
  async handlePause(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for pause", data);
      throw new Error("Subscription not found for pause");
    }

    sub.previousStatus = sub.status;
    sub.status = "PAUSED";
    sub.pausedAt = new Date();
    sub.resumesAt = data.resumesAt ? new Date(data.resumesAt) : null;
    await sub.save();

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "PAUSE",
      occurredAt: new Date(),
    });

    logger.info("Subscription paused", { subscriptionId: sub._id });
    return sub;
  }

  // ─── CHECK ACCESS ───
  async checkAccess(userId) {
    // v3: No Grace Period. CANCELLED users still have access until expiresAt.
    const sub = await Subscription.findOne({
      userId: userId,
      status: { $in: ["ACTIVE", "CANCELLED"] },
      expiresAt: { $gt: new Date() },
    });

    if (!sub) {
      return { isPremium: false, status: "NONE" };
    }

    return {
      isPremium: true,
      status: sub.status,
      planType: sub.planType,
      expiresAt: sub.expiresAt,
      autoRenew: sub.autoRenew,
      platform: sub.platform,
      productId: sub.productId,
    };
  }

  // ─── GET USER SUBSCRIPTION ───
  async getUserSubscription(userId) {
    return Subscription.findOne({ userId: userId }).sort({ createdAt: -1 });
  }

  // ─── GET TRANSACTION HISTORY ───
  async getTransactionHistory(userId, limit) {
    const safeLimit = limit || 50;
    const [transactions, total] = await Promise.all([
      SubscriptionTransaction.find({ userId: userId })
        .sort({ occurredAt: -1 })
        .limit(safeLimit)
        .lean(),
      SubscriptionTransaction.countDocuments({ userId: userId })
    ]);
    return { transactions, total };
  }

  // ─── PRIVATE: Find subscription ───
  async _findSubscription(data) {
    if (data.originalTransactionId) {
      return Subscription.findOne({
        originalTransactionId: data.originalTransactionId,
      });
    }
    if (data.purchaseToken) {
      return Subscription.findOne({ purchaseToken: data.purchaseToken });
    }
    if (data.userId) {
      return Subscription.findOne({ userId: data.userId }).sort({ createdAt: -1 });
    }
    return null;
  }

  // ─── PRIVATE: Log transaction ───
  async _logTransaction(data) {
    const identifier = data.transactionId || data.purchaseToken || String(Date.now());
    const key = generateIdempotencyKey(data.platform, data.eventType, identifier);

    try {
      await SubscriptionTransaction.create({
        subscriptionId: data.subscriptionId,
        userId: data.userId,
        platform: data.platform,
        transactionId: data.transactionId || undefined,
        purchaseToken: data.purchaseToken || undefined,
        productId: data.productId,
        eventType: data.eventType,
        amount: data.amount,
        currency: data.currency,
        refundReason: data.refundReason,
        refundAmount: data.refundAmount,
        occurredAt: data.occurredAt || new Date(),
        idempotencyKey: key,
      });
    } catch (err) {
      if (err.code === 11000) {
        logger.warn("Duplicate transaction, skipping", { key: key });
        return;
      }
      throw err;
    }
  }
  /**
   * Milestone Grant: Automatically grants premium to the first X users.
   * Called during registration/onboarding.
   */
  async handleMilestoneGrant(userId) {
    try {
      const config = await SubscriptionConfig.getOrCreate();

      // 1. Is milestone active?
      if (!config.milestone || !config.milestone.isActive) return null;

      // 2. Already premium? Check if any subscription exists for this user
      const existingSub = await Subscription.findOne({ userId });
      if (existingSub) return null;

      // 3. User limit check
      const User = require("../../auth/auth.model");
      const userCount = await User.countDocuments({ isFake: false });

      if (userCount > config.milestone.targetUserCount) {
        // Auto-disable milestone if limit reached
        config.milestone.isActive = false;
        await config.save();
        logger.info("Milestone target reached, auto-disabled milestone grant.");
        return null;
      }

      // 4. Grant Premium (30 days)
      const duration = config.milestone.grantDurationDays || 30;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + duration);

      const subscription = await Subscription.create({
        userId,
        platform: "admin_granted",
        productId: "milestone_premium_v3",
        planType: "MILESTONE",
        status: "ACTIVE",
        autoRenew: false,
        startedAt: new Date(),
        expiresAt: expiresAt,
        grantReason: "milestone_first_1000",
        environment: "production"
      });

      // 5. Sync Premium State (User/Profile flags)
      await UsageService._syncPremiumState(userId, true);
      await this._syncProfile(subscription);

      logger.info(`Milestone premium granted to user ${userId} (Rank: ${userCount})`);
      return subscription;
    } catch (err) {
      logger.error("Milestone grant failed:", err.message);
      return null;
    }
  }
}

module.exports = new SubscriptionService();
===
const Subscription = require("../models/Subscription");
const SubscriptionTransaction = require("../models/SubscriptionTransaction");
const Product = require("../models_v3/Product");
const UserConsumableBalance = require("../models_v3/UserConsumableBalance");
const SubscriptionConfig = require("../models_v3/SubscriptionConfig");
const UsageService = require("./usage.service");
const iapConfig = require("../config/iap.config");
const { generateIdempotencyKey } = require("../utils/iap.helpers");
const logger = require("../utils/logger");
const Profile = require("../../profile/profile.model");

class SubscriptionService {

  async _syncProfile(subscription) {
    try {

      console.log("🔄 Syncing Profile for User:", subscription.userId); // Debug 1
      if (!subscription || !subscription.userId) {
        console.log("❌ Subscription or UserId missing"); // Debug 2
        return;
      }

      const isActive = ["ACTIVE", "CANCELLED"].includes(subscription.status) && subscription.expiresAt > new Date();

      const profileUpdate = {
        "subscription.planId": subscription.planType || "free",
        "subscription.isActive": isActive,
        "subscription.expiryDate": subscription.expiresAt,
        "subscription.isTrial": false
      };

      // Agar expired/cancelled hai toh free pe set karo?
      // Optional: Depend karta hai business logic pe
      if (subscription.status === "EXPIRED" || subscription.status === "REVOKED") {
        profileUpdate["subscription.planId"] = "free";
        profileUpdate["subscription.isActive"] = false;
      }

      console.log("📝 Update Payload:", profileUpdate); // Debug 3

      await Profile.findOneAndUpdate(
        { userId: subscription.userId },
        { $set: profileUpdate }
      );

      logger.info("Profile subscription synced", { userId: subscription.userId });
    } catch (err) {
      logger.error("Profile sync failed:", err.message);
    }
  }



  /**
   * v3 Purchase Router: Determines if the purchase is a SUBSCRIPTION or CONSUMABLE
   * and routes to the correct handler.
   */
  async handlePurchase(data) {
    // Step 1: Check our Product catalog (v3 dynamic store) first
    const catalogProduct = await Product.findOne({
      $or: [
        { appleProductId: data.productId },
        { googleProductId: data.productId },
        { productKey: data.productId }
      ],
      isActive: true
    }).lean();

    // Step 2: THE FORK — Route based on product type
    if (catalogProduct && catalogProduct.type === 'CONSUMABLE') {
      return this._handleConsumablePurchase(data, catalogProduct);
    }

    // Step 3: SUBSCRIPTION flow (original logic, unchanged)
    return this._handleSubscriptionPurchase(data);
  }

  /**
   * Handles Consumable purchases (Super Keens, Boosts packs).
   * Adds items directly to the user's Wallet (UserConsumableBalance).
   */
  async _handleConsumablePurchase(data, catalogProduct) {
    // Determine which wallet field to increment
    const incrementField = {};
    if (catalogProduct.consumableType === 'SUPER_KEEN') {
      incrementField.superKeensBalance = catalogProduct.quantity;
    } else if (catalogProduct.consumableType === 'BOOST') {
      incrementField.boostsBalance = catalogProduct.quantity;
    } else {
      throw new Error(`Unknown consumable type: ${catalogProduct.consumableType}`);
    }

    // Idempotency Check (Prevent duplicate consumable granting)
    const identifier = data.transactionId || data.purchaseToken || String(Date.now());
    const eventType = "CONSUMABLE_PURCHASE";
    const key = generateIdempotencyKey(data.platform, eventType, identifier);
    
    // Using exists instead of findOne for performance, since we only need the boolean representation
    const txnExists = await SubscriptionTransaction.exists({ idempotencyKey: key });
    if (txnExists) {
      logger.info("DOUBLE GRANT PREVENTED: Consumable already granted (Idempotency)", { key, userId: data.userId });
      return {
        type: 'CONSUMABLE',
        consumableType: catalogProduct.consumableType,
        quantity: catalogProduct.quantity,
        status: "ALREADY_GRANTED"
      };
    }

    // Atomic wallet update (upsert: creates wallet if first purchase)
    const updatedWallet = await UserConsumableBalance.findOneAndUpdate(
      { userId: data.userId },
      { $inc: incrementField },
      { upsert: true, new: true }
    );

    // Log the transaction for audit trail
    await this._logTransaction({
      userId: data.userId,
      platform: data.platform,
      transactionId: data.transactionId,
      purchaseToken: data.purchaseToken,
      productId: data.productId,
      eventType: "CONSUMABLE_PURCHASE",
      amount: parseFloat(String(catalogProduct.displayPrice).replace(/[^0-9.]/g, '')) || 0,
      currency: catalogProduct.currency || "AUD",
      occurredAt: new Date(data.purchaseDate || Date.now()),
    });

    logger.info("Consumable purchase processed", {
      userId: data.userId,
      type: catalogProduct.consumableType,
      quantity: catalogProduct.quantity,
      newBalance: updatedWallet
    });

    return {
      type: 'CONSUMABLE',
      consumableType: catalogProduct.consumableType,
      quantity: catalogProduct.quantity,
      // wallet: {
      //   superKeens: updatedWallet.superKeensBalance,
      //   boosts: updatedWallet.boostsBalance
      // }
    };
  }

  /**
   * Handles Subscription purchases (Premium Plans).
   * Creates or updates a Subscription record with expiresAt.
   */
  async _handleSubscriptionPurchase(data) {
    const orConditions = [];

    if (data.originalTransactionId) {
      orConditions.push({ originalTransactionId: data.originalTransactionId });
    }
    if (data.purchaseToken) {
      orConditions.push({ purchaseToken: data.purchaseToken });
    }

    // v3: Enhanced product lookup. Check DB Catalog first, fallback to config.
    const dbProduct = await Product.findOne({
      $or: [
        { appleProductId: data.productId },
        { googleProductId: data.productId }
      ]
    }).lean();

    const configProduct = iapConfig.getProductDetails(data.productId);
    const catalogPlanType = dbProduct ? dbProduct.planType : (configProduct ? configProduct.planType : "1_MONTH");

    let existing = null;
    if (orConditions.length > 0) {
      existing = await Subscription.findOne({ $or: orConditions });
    }

    if (existing) {
      existing.userId = data.userId; // Ensure subscription belongs to current user
      existing.status = "ACTIVE";
      existing.expiresAt = new Date(data.expiresDate);
      existing.latestTransactionId = data.transactionId || existing.latestTransactionId;
      existing.previousStatus = existing.status;
      existing.productId = data.productId; // Update the product ID in case of an upgrade/crossgrade
      existing.planType = catalogPlanType; // v3: Ensure consistent planType on update/verify
      await existing.save();

      // v3 Sync: Use UsageService for consistent premium state
      UsageService._syncPremiumState(existing.userId, true).catch(err => logger.error('Sync Error:', err));
      await this._syncProfile(existing);

      logger.info("Subscription updated (existing)", {
        subscriptionId: existing._id,
        userId: data.userId,
      });

      return { type: 'SUBSCRIPTION', subscription: existing };
    }

    const subscription = await Subscription.create({
      userId: data.userId,
      platform: data.platform,
      productId: data.productId,
      planType: catalogPlanType,
      status: "ACTIVE",
      autoRenew: true,
      startedAt: new Date(data.purchaseDate || Date.now()),
      expiresAt: new Date(data.expiresDate),
      originalTransactionId: data.originalTransactionId || undefined,
      latestTransactionId: data.transactionId || undefined,
      purchaseToken: data.purchaseToken || undefined,
      orderId: data.orderId || undefined,
      source: "STORE",
      environment: iapConfig.apple.environment || "sandbox",
    });

    const amount = dbProduct ? parseFloat(dbProduct.displayPrice.replace(/[^0-9.]/g, '')) : (configProduct ? configProduct.price : 0);
    const currency = dbProduct ? dbProduct.currency : (configProduct ? configProduct.currency : "AUD");

    await this._logTransaction({
      subscriptionId: subscription._id,
      userId: data.userId,
      platform: data.platform,
      transactionId: data.transactionId,
      purchaseToken: data.purchaseToken,
      productId: data.productId,
      eventType: "PURCHASE",
      amount: amount,
      currency: currency,
      occurredAt: new Date(data.purchaseDate || Date.now()),
    });

    logger.info("New subscription created", {
      subscriptionId: subscription._id,
      userId: data.userId,
      planType: subscription.planType,
    });

    // v3 Sync: Use UsageService for consistent premium state
    UsageService._syncPremiumState(subscription.userId, true).catch(err => logger.error('Sync Error:', err));
    await this._syncProfile(subscription);

    return { type: 'SUBSCRIPTION', subscription: subscription };
  }

  // ─── RENEW ───
  async handleRenew(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for renew", data);
      throw new Error("Subscription not found for renew");
    }

    // v3: Enhanced product lookup
    const dbProduct = await Product.findOne({
      $or: [
        { appleProductId: sub.productId },
        { googleProductId: sub.productId }
      ]
    }).lean();

    const configProduct = iapConfig.getProductDetails(sub.productId);
    const amount = dbProduct ? parseFloat(dbProduct.displayPrice.replace(/[^0-9.]/g, '')) : (configProduct ? configProduct.price : 0);
    const currency = dbProduct ? dbProduct.currency : (configProduct ? configProduct.currency : "AUD");

    sub.previousStatus = sub.status;
    sub.status = "ACTIVE";
    sub.expiresAt = new Date(data.expiresDate);
    sub.latestTransactionId = data.transactionId || sub.latestTransactionId;
    sub.autoRenew = true;
    sub.retryCount = 0;
    await sub.save();

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      transactionId: data.transactionId,
      productId: sub.productId,
      eventType: "RENEW",
      amount: amount,
      currency: currency,
      occurredAt: new Date(),
    });

    logger.info("Subscription renewed", { subscriptionId: sub._id });
    return sub;
  }

  // ─── CANCEL ───
  async handleCancel(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for cancel", data);
      throw new Error("Subscription not found for cancel");
    }

    sub.previousStatus = sub.status;
    sub.autoRenew = false;
    sub.cancellationReason = data.cancellationReason || "USER_CANCELLED";
    sub.cancelledAt = new Date();
    await sub.save();

    await this._syncProfile(sub);

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "CANCEL",
      occurredAt: new Date(),
    });

    logger.info("Subscription cancelled", { subscriptionId: sub._id });
    return sub;
  }

  // ─── RE-ACTIVATE (Un-cancel) ───
  async handleReActivate(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for re-activate", data);
      throw new Error("Subscription not found for re-activate");
    }

    sub.previousStatus = sub.status;
    sub.status = "ACTIVE";
    sub.autoRenew = true;
    sub.cancellationReason = undefined;
    sub.cancelledAt = undefined;
    await sub.save();

    await this._syncProfile(sub);
    await UsageService._syncPremiumState(sub.userId, true).catch(err => logger.error('Sync Error:', err));

    logger.info("Subscription re-activated", { subscriptionId: sub._id });
    return sub;
  }


  // ─── EXPIRE ───
  async handleExpire(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for expire", data);
      throw new Error("Subscription not found for expire");
    }

    sub.previousStatus = sub.status;
    sub.status = "EXPIRED";
    sub.autoRenew = false;
    await sub.save();
    await this._syncProfile(sub);

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "EXPIRE",
      occurredAt: new Date(),
    });

    logger.info("Subscription expired", { subscriptionId: sub._id });
    return sub;
  }

  // ─── REFUND ───
  async handleRefund(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for refund", data);
      throw new Error("Subscription not found for refund");
    }

    const product = iapConfig.getProductDetails(sub.productId);

    sub.previousStatus = sub.status;
    sub.status = "REVOKED";
    sub.autoRenew = false;
    sub.cancellationReason = "REFUNDED";
    sub.cancelledAt = new Date();
    await sub.save();

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "REFUND",
      amount: product ? product.price : 0,
      refundAmount: data.refundAmount || (product ? product.price : 0),
      refundReason: data.refundReason || "UNKNOWN",
      occurredAt: new Date(),
    });

    logger.info("Subscription refunded/revoked", { subscriptionId: sub._id });
    return sub;
  }

  // ─── PAUSE ───
  async handlePause(data) {
    const sub = await this._findSubscription(data);
    if (!sub) {
      logger.error("Subscription not found for pause", data);
      throw new Error("Subscription not found for pause");
    }

    sub.previousStatus = sub.status;
    sub.status = "PAUSED";
    sub.pausedAt = new Date();
    sub.resumesAt = data.resumesAt ? new Date(data.resumesAt) : null;
    await sub.save();

    await this._logTransaction({
      subscriptionId: sub._id,
      userId: sub.userId,
      platform: sub.platform,
      productId: sub.productId,
      eventType: "PAUSE",
      occurredAt: new Date(),
    });

    logger.info("Subscription paused", { subscriptionId: sub._id });
    return sub;
  }

  // ─── CHECK ACCESS ───
  async checkAccess(userId) {
    // v3: No Grace Period. CANCELLED users still have access until expiresAt.
    const sub = await Subscription.findOne({
      userId: userId,
      status: { $in: ["ACTIVE", "CANCELLED"] },
      expiresAt: { $gt: new Date() },
    });

    if (!sub) {
      return { isPremium: false, status: "NONE" };
    }

    return {
      isPremium: true,
      status: sub.status,
      planType: sub.planType,
      expiresAt: sub.expiresAt,
      autoRenew: sub.autoRenew,
      platform: sub.platform,
      productId: sub.productId,
    };
  }

  // ─── GET USER SUBSCRIPTION ───
  async getUserSubscription(userId) {
    return Subscription.findOne({ userId: userId }).sort({ createdAt: -1 });
  }

  // ─── GET TRANSACTION HISTORY ───
  async getTransactionHistory(userId, limit) {
    const safeLimit = limit || 50;
    const [transactions, total] = await Promise.all([
      SubscriptionTransaction.find({ userId: userId })
        .sort({ occurredAt: -1 })
        .limit(safeLimit)
        .lean(),
      SubscriptionTransaction.countDocuments({ userId: userId })
    ]);
    return { transactions, total };
  }

  // ─── PRIVATE: Find subscription ───
  async _findSubscription(data) {
    if (data.originalTransactionId) {
      return Subscription.findOne({
        originalTransactionId: data.originalTransactionId,
      });
    }
    if (data.purchaseToken) {
      return Subscription.findOne({ purchaseToken: data.purchaseToken });
    }
    if (data.userId) {
      return Subscription.findOne({ userId: data.userId }).sort({ createdAt: -1 });
    }
    return null;
  }

  // ─── PRIVATE: Log transaction ───
  async _logTransaction(data) {
    const identifier = data.transactionId || data.purchaseToken || String(Date.now());
    const key = generateIdempotencyKey(data.platform, data.eventType, identifier);

    try {
      await SubscriptionTransaction.create({
        subscriptionId: data.subscriptionId,
        userId: data.userId,
        platform: data.platform,
        transactionId: data.transactionId || undefined,
        purchaseToken: data.purchaseToken || undefined,
        productId: data.productId,
        eventType: data.eventType,
        amount: data.amount,
        currency: data.currency,
        refundReason: data.refundReason,
        refundAmount: data.refundAmount,
        occurredAt: data.occurredAt || new Date(),
        idempotencyKey: key,
      });
    } catch (err) {
      if (err.code === 11000) {
        logger.warn("Duplicate transaction, skipping", { key: key });
        return;
      }
      throw err;
    }
  }
  /**
   * Milestone Grant: Automatically grants premium to the first X users.
   * Called during registration/onboarding.
   */
  async handleMilestoneGrant(userId) {
    try {
      const config = await SubscriptionConfig.getOrCreate();

      // 1. Is milestone active?
      if (!config.milestone || !config.milestone.isActive) return null;

      // 2. Already premium? Check if any subscription exists for this user
      const existingSub = await Subscription.findOne({ userId });
      if (existingSub) return null;

      // 3. User limit check
      const User = require("../../auth/auth.model");
      const userCount = await User.countDocuments({ isFake: false });

      if (userCount > config.milestone.targetUserCount) {
        // Auto-disable milestone if limit reached
        config.milestone.isActive = false;
        await config.save();
        logger.info("Milestone target reached, auto-disabled milestone grant.");
        return null;
      }

      // 4. Grant Premium (30 days)
      const duration = config.milestone.grantDurationDays || 30;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + duration);

      const subscription = await Subscription.create({
        userId,
        platform: "admin_granted",
        productId: "milestone_premium_v3",
        planType: "MILESTONE",
        status: "ACTIVE",
        autoRenew: false,
        startedAt: new Date(),
        expiresAt: expiresAt,
        grantReason: "milestone_first_1000",
        source: "GIVEAWAY",
        environment: "production"
      });

      // 5. Sync Premium State (User/Profile flags)
      await UsageService._syncPremiumState(userId, true);
      await this._syncProfile(subscription);

      logger.info(`Milestone premium granted to user ${userId} (Rank: ${userCount})`);
      return subscription;
    } catch (err) {
      logger.error("Milestone grant failed:", err.message);
      return null;
    }
  }
}

module.exports = new SubscriptionService();
```

---

## API Endpoint Summary

| Method | Endpoint | Change |
|--------|----------|--------|
| `GET` | `/api/v1/admin/subscription/subscribers` | Now returns `source` field (auto via schema default) |
| `GET` | `/api/v1/admin/subscription/users/:userId` | Returns `source`, `subscriptionHistory[]`, ALL `transactions` |
| `POST` | `/api/v1/admin/subscription/users/:userId/grant` | Sets `source: "ADMIN"`, creates `ADMIN_GRANT` transaction |
| `POST` | `/api/v1/admin/subscription/users/:userId/extend` | **NEW** — extends active subscription by X days |
| `POST` | `/api/v1/admin/subscription/users/:userId/revoke` | Blocks revoking `source: "STORE"` subscriptions |
| `POST` | `/api/v1/admin/subscription/users/:userId/grant-consumable` | Creates `ADMIN_CONSUMABLE_GRANT` transaction with `reason` |

---

## Backward Compatibility

> [!NOTE]
> All changes are backward compatible:
> - `source` field has `default: "STORE"` — existing records work without migration
> - `recentTransactions` is still returned alongside new `transactions` array
> - All existing API response shapes preserved; new fields are additive only
> - Revoke now has a pre-check but only blocks STORE purchases (admin/giveaway still revocable)
