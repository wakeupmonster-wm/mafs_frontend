import React from "react";
import { RenderField } from "./render.field";

export const AdSection = ({ title, platform, icon, control }) => {
  const statusOptions = [
    { label: "On", value: "On" },
    { label: "Off", value: "Off" },
  ];

  const prefix = platform.toLowerCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      {/* App Open Ads */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <div className="md:col-span-3">
          <RenderField
            control={control}
            name={`${prefix}.appOpen`}
            label={`${platform} · App Open Ads`}
            placeholder="ca-app-pub-••••••••••••••••"
          />
        </div>
        <RenderField
          control={control}
          name={`${prefix}.appOpenStatus`}
          label="Status"
          type="select"
          options={statusOptions}
        />
      </div>

      {/* Interstitial Ads */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <div className="md:col-span-2">
          <RenderField
            control={control}
            name={`${prefix}.interstitial`}
            label={`${platform} · Interstitial Ads`}
            placeholder="ca-app-pub-••••••••••••••••"
          />
        </div>
        <RenderField
          control={control}
          name={`${prefix}.interstitialClick`}
          label="Ad Click"
          placeholder="5"
        />
        <RenderField
          control={control}
          name={`${prefix}.interstitialStatus`}
          label="Status"
          type="select"
          options={statusOptions}
        />
      </div>

      {/* Native Ads */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <div className="md:col-span-2">
          <RenderField
            control={control}
            name={`${prefix}.native`}
            label={`${platform} · Native Ads`}
            placeholder="ca-app-pub-••••••••••••••••"
          />
        </div>
        <RenderField
          control={control}
          name={`${prefix}.nativeEveryN`}
          label="Ad Every N Items"
          placeholder="25"
        />
        <RenderField
          control={control}
          name={`${prefix}.nativeStatus`}
          label="Status"
          type="select"
          options={statusOptions}
        />
      </div>
    </div>
  );
};
