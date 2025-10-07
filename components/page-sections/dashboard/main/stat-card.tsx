import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  chartColor: string;
  growth: string;
}

export function StatCard({
  value,
  label,
  icon: Icon,
  iconColor,
  iconBgColor,
  chartColor,
  growth,
}: StatCardProps) {
  return (
    <div className="bg-card rounded-xl border p-6 relative overflow-hidden">
      <div className="flex items-start justify-between">
        {/* Left side - Value and Label */}
        <div className="space-y-1">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>

        {/* Right side - Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
      </div>

      {/* Small area chart placeholder */}
      <div className="mt-4 h-16 relative">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={`gradient-${label.replace(/\s+/g, "-")}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={chartColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor={chartColor} stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <path
            d="M0,25 Q25,15 50,20 T100,10 L100,30 L0,30 Z"
            fill={`url(#gradient-${label.replace(/\s+/g, "-")})`}
            fillOpacity="0.8"
          />
          {/* Top line only */}
          <path
            d="M0,25 Q25,15 50,20 T100,10"
            fill="none"
            stroke={chartColor}
            strokeWidth="1"
          />
        </svg>

        {/* Growth indicator */}
        <div
          className="absolute bottom-1 right-2 text-xs font-medium"
          style={{ color: chartColor }}
        >
          ↗ {growth}
        </div>
      </div>
    </div>
  );
}
