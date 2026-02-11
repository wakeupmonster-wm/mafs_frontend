import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Link } from "lucide-react";
import React from "react";

export const NotFoundState = () => {
  return (
    <div className="m-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="p-8 max-w-2xl w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h2>

          <p className="text-gray-600 mb-6">
            The requested profile could not be found.
          </p>

          <Link to="/admin/management/profile-review">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
