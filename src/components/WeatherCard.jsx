import { Cloud, Droplets, Wind, Gauge, Eye, Sun } from "lucide-react";

function WeatherCard({ icon, label, value, unit }) {
  const icons = {
    humidity: Droplets,
    wind: Wind,
    pressure: Gauge,
    visibility: Eye,
    uv: Sun,
  };

  const Icon = icons[icon];

  return (
    <div className="bg-card border border-border p-6 rounded-(--radius) hover:border-primary/30 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl tracking-tight text-foreground">{value}</span>
        {unit && <span className="text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}

export default WeatherCard;
