/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchConfig, saveConfig } from "../store/subscription.slice";
import { PageHeader } from "@/components/common/headSubhead";
import {
  Settings,
  Save,
  Loader2,
  RefreshCcw,
  Sparkles,
  Crown,
  Heart,
  Eye,
  Globe2,
  SlidersHorizontal,
  BanIcon,
  Trophy,
  Users,
  Calendar,
  RotateCcw,
  Zap,
  Star,
  Rocket,
  Shield,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PreLoader } from "@/app/loader/preloader";
import { Container } from "@/components/common/container";

export default function ConfigPage() {
  const dispatch = useDispatch();
  const { config, configLoading, actionLoading } = useSelector(
    (state) => state.subscription,
  );

  // Local editable state — mirrors exact schema
  const [freeLimits, setFreeLimits] = useState({
    swipesPerDay: 30,
    rewindsPerDay: 3,
    superKeensPerWeek: 1,
    boostsPerMonth: 0,
  });
  const [premiumLimits, setPremiumLimits] = useState({
    swipesPerDay: -1,
    rewindsPerDay: -1,
    superKeensPerDay: 3,
    boostsPerMonth: 2,
  });
  const [premiumFeatures, setPremiumFeatures] = useState({
    seeWhoLikedYou: true,
    passport: true,
    advancedFilters: true,
    noAds: true,
  });
  const [milestone, setMilestone] = useState({
    targetUserCount: 1000,
    grantDurationDays: 30,
    isActive: true,
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [originalConfig, setOriginalConfig] = useState(null);

  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  // When config loads from API, populate local state
  useEffect(() => {
    if (config) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFreeLimits({
        swipesPerDay: config.freeLimits?.swipesPerDay ?? 30,
        rewindsPerDay: config.freeLimits?.rewindsPerDay ?? 3,
        superKeensPerWeek: config.freeLimits?.superKeensPerWeek ?? 1,
        boostsPerMonth: config.freeLimits?.boostsPerMonth ?? 0,
      });
      setPremiumLimits({
        swipesPerDay: config.premiumLimits?.swipesPerDay ?? -1,
        rewindsPerDay: config.premiumLimits?.rewindsPerDay ?? -1,
        superKeensPerDay: config.premiumLimits?.superKeensPerDay ?? 3,
        boostsPerMonth: config.premiumLimits?.boostsPerMonth ?? 2,
      });
      setPremiumFeatures({
        seeWhoLikedYou: config.premiumFeatures?.seeWhoLikedYou ?? true,
        passport: config.premiumFeatures?.passport ?? true,
        advancedFilters: config.premiumFeatures?.advancedFilters ?? true,
        noAds: config.premiumFeatures?.noAds ?? true,
      });
      setMilestone({
        targetUserCount: config.milestone?.targetUserCount ?? 1000,
        grantDurationDays: config.milestone?.grantDurationDays ?? 30,
        isActive: config.milestone?.isActive ?? true,
      });
      setOriginalConfig(config);
      setHasChanges(false);
    }
  }, [config]);

  // Track changes
  const markChanged = useCallback(() => setHasChanges(true), []);

  const updateFree = (key, value) => {
    const parsed = parseInt(value, 10);
    setFreeLimits((prev) => ({ ...prev, [key]: isNaN(parsed) ? 0 : parsed }));
    markChanged();
  };
  const updatePremium = (key, value) => {
    const parsed = parseInt(value, 10);
    setPremiumLimits((prev) => ({
      ...prev,
      [key]: isNaN(parsed) ? 0 : parsed,
    }));
    markChanged();
  };
  const updateFeature = (key, value) => {
    setPremiumFeatures((prev) => ({ ...prev, [key]: value }));
    markChanged();
  };
  const updateMilestone = (key, value) => {
    if (typeof value === "boolean") {
      setMilestone((prev) => ({ ...prev, [key]: value }));
    } else {
      const parsed = parseInt(value, 10);
      setMilestone((prev) => ({ ...prev, [key]: isNaN(parsed) ? 0 : parsed }));
    }
    markChanged();
  };

  // PATCH — sends only changed sections
  const handleSave = async () => {
    const payload = {};

    // Compare with original and only send changed sections
    if (
      JSON.stringify(freeLimits) !==
      JSON.stringify({
        swipesPerDay: originalConfig?.freeLimits?.swipesPerDay ?? 30,
        rewindsPerDay: originalConfig?.freeLimits?.rewindsPerDay ?? 3,
        superKeensPerWeek: originalConfig?.freeLimits?.superKeensPerWeek ?? 1,
        boostsPerMonth: originalConfig?.freeLimits?.boostsPerMonth ?? 0,
      })
    ) {
      payload.freeLimits = freeLimits;
    }
    if (
      JSON.stringify(premiumLimits) !==
      JSON.stringify({
        swipesPerDay: originalConfig?.premiumLimits?.swipesPerDay ?? -1,
        rewindsPerDay: originalConfig?.premiumLimits?.rewindsPerDay ?? -1,
        superKeensPerDay: originalConfig?.premiumLimits?.superKeensPerDay ?? 3,
        boostsPerMonth: originalConfig?.premiumLimits?.boostsPerMonth ?? 2,
      })
    ) {
      payload.premiumLimits = premiumLimits;
    }
    if (
      JSON.stringify(premiumFeatures) !==
      JSON.stringify({
        seeWhoLikedYou: originalConfig?.premiumFeatures?.seeWhoLikedYou ?? true,
        passport: originalConfig?.premiumFeatures?.passport ?? true,
        advancedFilters:
          originalConfig?.premiumFeatures?.advancedFilters ?? true,
        noAds: originalConfig?.premiumFeatures?.noAds ?? true,
      })
    ) {
      payload.premiumFeatures = premiumFeatures;
    }
    if (
      JSON.stringify(milestone) !==
      JSON.stringify({
        targetUserCount: originalConfig?.milestone?.targetUserCount ?? 1000,
        grantDurationDays: originalConfig?.milestone?.grantDurationDays ?? 30,
        isActive: originalConfig?.milestone?.isActive ?? true,
      })
    ) {
      payload.milestone = milestone;
    }

    if (Object.keys(payload).length === 0) {
      toast.info("No changes to save");
      return;
    }

    const result = await dispatch(saveConfig(payload));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Configuration updated successfully!");
      setHasChanges(false);
      setOriginalConfig(result.payload);
    } else {
      toast.error(result.payload || "Failed to update config");
    }
  };

  const handleReset = () => {
    if (originalConfig) {
      setFreeLimits({
        swipesPerDay: originalConfig.freeLimits?.swipesPerDay ?? 30,
        rewindsPerDay: originalConfig.freeLimits?.rewindsPerDay ?? 3,
        superKeensPerWeek: originalConfig.freeLimits?.superKeensPerWeek ?? 1,
        boostsPerMonth: originalConfig.freeLimits?.boostsPerMonth ?? 0,
      });
      setPremiumLimits({
        swipesPerDay: originalConfig.premiumLimits?.swipesPerDay ?? -1,
        rewindsPerDay: originalConfig.premiumLimits?.rewindsPerDay ?? -1,
        superKeensPerDay: originalConfig.premiumLimits?.superKeensPerDay ?? 3,
        boostsPerMonth: originalConfig.premiumLimits?.boostsPerMonth ?? 2,
      });
      setPremiumFeatures({
        seeWhoLikedYou: originalConfig.premiumFeatures?.seeWhoLikedYou ?? true,
        passport: originalConfig.premiumFeatures?.passport ?? true,
        advancedFilters:
          originalConfig.premiumFeatures?.advancedFilters ?? true,
        noAds: originalConfig.premiumFeatures?.noAds ?? true,
      });
      setMilestone({
        targetUserCount: originalConfig.milestone?.targetUserCount ?? 1000,
        grantDurationDays: originalConfig.milestone?.grantDurationDays ?? 30,
        isActive: originalConfig.milestone?.isActive ?? true,
      });
      setHasChanges(false);
      toast.info("All changes reverted");
    }
  };

  /* ======================== LOADING STATE ======================== */
  if (configLoading || !originalConfig) {
    return <PreLoader />;
  }

  /* ======================== MAIN UI ======================== */
  return (
    <Container>
      <motion.div
        className="w-full space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageHeader
            heading="Subscription Config"
            subheading="Control quotas, feature toggles, and milestone programs"
            icon={<Settings className="w-10 h-10 text-white" />}
            color="bg-brand-aqua shadow-indigo-100 shadow-xl"
          />
          <div className="flex gap-3">
            {hasChanges && (
              <Button
                variant="outline"
                className="rounded-xl h-11 px-5 font-bold gap-2 bg-slate-50 hover:bg-brand-aqua border-slate-200 text-muted-foreground hover:text-white"
                onClick={handleReset}
              >
                <RefreshCcw className="w-4 h-4" /> Revert
              </Button>
            )}
            <Button
              className={cn(
                "rounded-xl h-11 px-6 font-black border gap-2 shadow-sm transition-all duration-300",
                hasChanges
                  ? "bg-slate-50 hover:bg-brand-aqua text-muted-foreground hover:text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none scale-95",
              )}
              onClick={handleSave}
              disabled={!hasChanges || actionLoading}
            >
              {actionLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {hasChanges ? "Save Changes" : "No Changes"}
            </Button>
          </div>
        </header>

        {/* Config Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ─────────── CARD 1: Free User Limits ─────────── */}
          <ConfigCard
            icon={<Heart className="w-4 h-4 text-rose-500" />}
            // emoji="🆓"
            title="Free User Limits"
            subtitle="Quota restrictions for non-premium users"
            // color="rose"
          >
            <QuotaField
              label="Swipes Per Day"
              description="Daily swipe quota for free users"
              value={freeLimits.swipesPerDay}
              onChange={(v) => updateFree("swipesPerDay", v)}
              min={0}
              max={100}
              icon={<Heart className="w-3.5 h-3.5" />}
            />
            <QuotaField
              label="Rewinds Per Day"
              description="How many times they can undo a swipe"
              value={freeLimits.rewindsPerDay}
              onChange={(v) => updateFree("rewindsPerDay", v)}
              min={0}
              max={20}
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            />
            <QuotaField
              label="Super Keens Per Week"
              description="Weekly super keen allowance"
              value={freeLimits.superKeensPerWeek}
              onChange={(v) => updateFree("superKeensPerWeek", v)}
              min={0}
              max={10}
              icon={<Star className="w-3.5 h-3.5" />}
            />
            <QuotaField
              label="Boosts Per Month"
              description="Monthly profile boosts (0 = disabled)"
              value={freeLimits.boostsPerMonth}
              onChange={(v) => updateFree("boostsPerMonth", v)}
              min={0}
              max={10}
              icon={<Rocket className="w-3.5 h-3.5" />}
            />
          </ConfigCard>

          {/* ─────────── CARD 2: Premium User Limits ─────────── */}
          <ConfigCard
            icon={<Crown className="w-4 h-4 text-amber-500" />}
            // emoji="👑"
            title="Premium User Limits"
            subtitle="Quota limits for subscribed users"
            // color="amber"
          >
            <QuotaField
              label="Swipes Per Day"
              description="-1 means unlimited swipes"
              value={premiumLimits.swipesPerDay}
              onChange={(v) => updatePremium("swipesPerDay", v)}
              min={-1}
              max={999}
              icon={<Heart className="w-3.5 h-3.5" />}
              allowUnlimited
            />
            <QuotaField
              label="Rewinds Per Day"
              description="-1 means unlimited rewinds"
              value={premiumLimits.rewindsPerDay}
              onChange={(v) => updatePremium("rewindsPerDay", v)}
              min={-1}
              max={999}
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              allowUnlimited
            />
            <QuotaField
              label="Super Keens Per Day"
              description="Daily super keens for premium"
              value={premiumLimits.superKeensPerDay}
              onChange={(v) => updatePremium("superKeensPerDay", v)}
              min={-1}
              max={999}
              icon={<Star className="w-3.5 h-3.5" />}
              allowUnlimited
            />
            <QuotaField
              label="Boosts Per Month"
              description="Monthly boost quota for premium"
              value={premiumLimits.boostsPerMonth}
              onChange={(v) => updatePremium("boostsPerMonth", v)}
              min={-1}
              max={100}
              icon={<Rocket className="w-3.5 h-3.5" />}
              allowUnlimited
            />
          </ConfigCard>

          {/* ─────────── CARD 3: Premium Feature Toggles ─────────── */}
          <ConfigCard
            icon={<Sparkles className="w-4 h-4 text-violet-500" />}
            // emoji="✨"
            title="Premium Feature Toggles"
            subtitle="Enable or disable premium features globally"
            // color="violet"
          >
            <FeatureToggle
              label="See Who Liked You"
              description="Premium users can see profiles that liked them"
              checked={premiumFeatures.seeWhoLikedYou}
              onCheckedChange={(v) => updateFeature("seeWhoLikedYou", v)}
              icon={<Eye className="w-4 h-4" />}
            />
            <FeatureToggle
              label="Passport (Location Change)"
              description="Change location to match with users anywhere"
              checked={premiumFeatures.passport}
              onCheckedChange={(v) => updateFeature("passport", v)}
              icon={<Globe2 className="w-4 h-4" />}
            />
            <FeatureToggle
              label="Advanced Filters"
              description="Unlock advanced search filters and preferences"
              checked={premiumFeatures.advancedFilters}
              onCheckedChange={(v) => updateFeature("advancedFilters", v)}
              icon={<SlidersHorizontal className="w-4 h-4" />}
            />
            <FeatureToggle
              label="No Ads"
              description="Remove all advertisements for premium users"
              checked={premiumFeatures.noAds}
              onCheckedChange={(v) => updateFeature("noAds", v)}
              icon={<BanIcon className="w-4 h-4" />}
            />
          </ConfigCard>

          {/* ─────────── CARD 4: Milestone Program ─────────── */}
          <ConfigCard
            icon={<Trophy className="w-4 h-4 text-emerald-500" />}
            // emoji="🏆"
            title="Milestone Program"
            subtitle="Grant free premium to early adopters"
            // color="emerald"
          >
            <FeatureToggle
              label="Program Active"
              description="Enable / disable the milestone program"
              checked={milestone.isActive}
              onCheckedChange={(v) => updateMilestone("isActive", v)}
              icon={<Shield className="w-4 h-4" />}
            />
            <QuotaField
              label="Target User Count"
              description="First N signups get free premium"
              value={milestone.targetUserCount}
              onChange={(v) => updateMilestone("targetUserCount", v)}
              min={1}
              max={100000}
              icon={<Users className="w-3.5 h-3.5" />}
            />
            <QuotaField
              label="Grant Duration (Days)"
              description="How many days of free premium they get"
              value={milestone.grantDurationDays}
              onChange={(v) => updateMilestone("grantDurationDays", v)}
              min={1}
              max={365}
              icon={<Calendar className="w-3.5 h-3.5" />}
            />
            {/* Visual Progress Indicator */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                  Milestone Progress
                </span>
                <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[10px]">
                  {milestone.isActive ? "LIVE" : "PAUSED"}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={0} className="h-2 flex-1 bg-emerald-200" />
                <span className="text-xs font-black text-emerald-800">
                  0 / {milestone.targetUserCount}
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 font-medium">
                Each qualifying user receives {milestone.grantDurationDays} days
                of free premium access.
              </p>
            </div>
          </ConfigCard>
        </div>

        {/* Info Banner */}
        <div className="px-2">
          <div className="bg-slate-800 rounded-[2rem] p-6 flex items-start gap-4 shadow-xl">
            <div className="p-2 bg-brand-aqua/20 rounded-xl mt-0.5">
              <Info className="w-5 h-5 text-brand-aqua" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-black text-white">
                How Config Changes Work
              </h4>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Changes take effect{" "}
                <span className="text-brand-aqua font-bold">immediately</span>{" "}
                after saving. Free/Premium limits control daily quotas —
                existing users will see updated limits on their next session.
                Feature toggles enable/disable premium features{" "}
                <span className="text-brand-aqua font-bold">globally</span> for
                all premium users. The milestone program auto-grants premium to
                first N users — set{" "}
                <span className="text-white font-bold">isActive = false</span>{" "}
                to pause.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

/* ======================== REUSABLE COMPONENTS ======================== */

const ConfigCard = ({ icon, emoji, title, subtitle, color, children }) => {
  const borderColors = {
    rose: "border-rose-200/60 hover:border-rose-300",
    amber: "border-amber-200/60 hover:border-amber-300",
    violet: "border-violet-200/60 hover:border-violet-300",
    emerald: "border-emerald-200/60 hover:border-emerald-300",
  };
  const headerBg = {
    rose: "bg-rose-50/50",
    amber: "bg-amber-50/50",
    violet: "bg-violet-50/50",
    emerald: "bg-emerald-50/50",
  };

  return (
    <Card
      className={cn(
        "rounded-2xl transition-all duration-500 shadow-sm bg-slate-50 overflow-hidden gap-0",
        borderColors[color] || "border-slate-200",
      )}
    >
      <CardHeader className={cn(headerBg[color])}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <div className="flex-1">
            <CardTitle className="text-sm font-black text-foreground flex items-center gap-2">
              {icon} {title}
            </CardTitle>
            <p className="text-[10px] font-bold text-secondary-foreground uppercase tracking-widest mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3 space-y-4">{children}</CardContent>
    </Card>
  );
};

const QuotaField = ({
  label,
  description,
  value,
  onChange,
  min,
  max,
  icon,
  allowUnlimited,
}) => {
  const isUnlimited = value === -1;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex items-center gap-2">
          <span className="text-secondary-foreground group-hover:text-brand-aqua transition-colors">
            {icon}
          </span>
          <Label className="text-[11px] font-black uppercase text-muted-muted tracking-widest">
            {label}
          </Label>
        </div>

        {allowUnlimited && isUnlimited && (
          <Badge className="bg-amber-100 text-amber-700 border-none font-black text-[9px] uppercase tracking-widest px-2 py-0.5 animate-pulse">
            Unlimited
          </Badge>
        )}
      </div>

      {description && (
        <p className="text-[10px] font-medium text-slate-400 mb-2 pl-5">
          {description}
        </p>
      )}

      <div className="flex items-center gap-2 my-3">
        <Input
          type="number"
          className={cn(
            "h-10 rounded-2xl border font-bold text-sm transition-all",
            isUnlimited
              ? "bg-amber-50 text-amber-700"
              : "bg-slate-50 text-slate-800",
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
        />
        {allowUnlimited && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
              isUnlimited
                ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
                : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100",
            )}
            onClick={() => onChange(isUnlimited ? "0" : "-1")}
          >
            {isUnlimited ? "Set Limit" : "∞ Unlimited"}
          </Button>
        )}
      </div>
    </div>
  );
};

const FeatureToggle = ({
  label,
  description,
  checked,
  onCheckedChange,
  icon,
}) => (
  <div className="flex items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 py-3 rounded-2xl transition-all group">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div
        className={cn(
          "p-2 rounded-xl transition-all duration-300",
          checked
            ? "bg-brand-aqua/10 text-brand-aqua"
            : "bg-slate-200/60 text-slate-400",
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black text-slate-800 truncate">{label}</p>
        {description && (
          <p className="text-[10px] font-medium text-slate-400 truncate">
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="flex items-center gap-2 ml-3">
      <span
        className={cn(
          "text-[10px] font-black uppercase tracking-widest transition-colors",
          checked ? "text-brand-aqua" : "text-slate-400",
        )}
      >
        {checked ? "ON" : "OFF"}
      </span>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={"bg-brand-aqua"}
      />
    </div>
  </div>
);
