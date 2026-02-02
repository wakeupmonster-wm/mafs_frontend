import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const StatCard = ({ label, value, icon }) => {
  return (
    <Card className="shadow-sm border-none bg-muted/30">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase">
            {label}
          </p>
          <p className="text-2xl font-black">{value}</p>
        </div>
        <div className="p-2 bg-background rounded-full">{icon}</div>
      </CardContent>
    </Card>
  );
};
