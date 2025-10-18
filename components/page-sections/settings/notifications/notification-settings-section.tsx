"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function NotificationSettingsSection() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email",
      title: "Email Notifications",
      description:
        "Substance can send you email notifications for any new direct messages",
      enabled: true,
    },
    {
      id: "news",
      title: "News and Update Settings",
      description:
        "The latest news about latest features and software update settings",
      enabled: true,
    },
    {
      id: "tips",
      title: "Tips & Tutorials",
      description:
        "Tips & Tricks in order to improve your performance efficiency",
      enabled: true,
    },
    {
      id: "offers",
      title: "Offers & Promotions",
      description: "Promotion about package prices and its latest discouts",
      enabled: true,
    },
    {
      id: "more-activity",
      title: "More Activity",
      description:
        "Substance can send you email notifications for any new direct messages",
      enabled: false,
    },
    {
      id: "all-reminders",
      title: "All Remainders & Activity",
      description:
        "Notify all system activats and remainders that have been created",
      enabled: true,
    },
    {
      id: "activity-only",
      title: "Activity Only",
      description:
        "Only notify latest activity updates about increasing or decreasing data",
      enabled: true,
    },
    {
      id: "important-reminders",
      title: "Important Remainders Only",
      description: "Only notify all the remainders that have been made",
      enabled: true,
    },
  ]);

  const handleToggle = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">
          Get notification what happening right now, you can turn off at any
          time
        </p>
      </div>

      {/* Notification Settings List */}
      <div className="space-y-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex-1 space-y-1">
              <h3 className="font-medium text-base">{notification.title}</h3>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
            <Switch
              checked={notification.enabled}
              onCheckedChange={() => handleToggle(notification.id)}
              className="mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
