import { Activity, Calendar, Hotel } from "lucide-react";
import React from "react";

const ActivityItem = ({
  activity,
}: {
  activity: {
    id: number;
    dog: string;
    action: string;
    time?: string;
    type: string;
  };
}) => {
  return (
    <div
      key={activity.id}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
    >
      <div
        className={`p-2 rounded-full ${
          activity.type === "daycare"
            ? "bg-green-100"
            : activity.type === "hotel"
              ? "bg-purple-100"
              : "bg-orange-100"
        }`}
      >
        {activity.type === "daycare" ? (
          <Calendar
            className={`w-4 h-4 ${
              activity.type === "daycare"
                ? "text-green-600"
                : activity.type === "hotel"
                  ? "text-purple-600"
                  : "text-orange-600"
            }`}
          />
        ) : activity.type === "hotel" ? (
          <Hotel className="w-4 h-4 text-purple-600" />
        ) : (
          <Activity className="w-4 h-4 text-orange-600" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{activity.dog}</p>
        <p className="text-sm text-gray-600">{activity.action}</p>
      </div>
      {activity.time && (
        <p className="text-xs text-gray-500">{activity.time}</p>
      )}
    </div>
  );
};

export default ActivityItem;
