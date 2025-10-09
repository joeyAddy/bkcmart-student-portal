"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number | string;
  icon: LucideIcon;
  iconColor: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  title: string;
  titleIcon?: LucideIcon;
  items: TimelineItem[];
  spacing?: "compact" | "normal";
  showViewAll?: boolean;
  viewAllText?: string;
  viewAllAction?: () => void;
  className?: string;
}

export function Timeline({
  title,
  titleIcon: TitleIcon,
  items,
  spacing = "normal",
  showViewAll = false,
  viewAllText = "View All",
  viewAllAction,
  className = "",
}: TimelineProps) {
  const itemSpacing = spacing === "compact" ? "space-y-4" : "space-y-6";
  const lineHeight = spacing === "compact" ? "h-12" : "h-16";
  const iconSize = spacing === "compact" ? "w-10 h-10" : "w-12 h-12";
  const iconIconSize = spacing === "compact" ? "w-4 h-4" : "w-5 h-5";
  const leftOffset = spacing === "compact" ? "left-5" : "left-6";
  const topOffset = spacing === "compact" ? "top-10" : "top-12";

  return (
    <Card className={`h-fit ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          {TitleIcon && <TitleIcon className="w-4 h-4 text-primary" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={itemSpacing}>
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="relative">
                {/* Timeline Line */}
                {index < items.length - 1 && (
                  <div
                    className={`absolute ${leftOffset} ${topOffset} w-0.5 ${lineHeight} bg-border`}
                  ></div>
                )}

                {/* Timeline Item */}
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 ${iconSize} bg-background border-2 border-border rounded-full flex items-center justify-center`}
                  >
                    <IconComponent
                      className={`${iconIconSize} ${item.iconColor}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">{item.content}</div>
                </div>
              </div>
            );
          })}
        </div>

        {showViewAll && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                if (viewAllAction) {
                  viewAllAction();
                }
              }}
              className="text-sm text-primary font-semibold hover:underline"
            >
              {viewAllText}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
