import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartCard({ time, forecast }) {
  const [temperatureData, setTemperatureData] = useState([]);
  const [intervalTemp, setIntervalTemp] = useState([0, 40]);

  useEffect(() => {
    if (!time || !forecast) return;
    const timeStart = new Date(time);
    const timeEnd = new Date(time);
    timeEnd.setDate(timeStart.getDate() + 1);

    var newTemperatureData = [];

    forecast.forEach((day) => {
      day.hour.forEach((hour) => {
        const hourTime = new Date(hour.time);
        if (hourTime >= timeStart && hourTime <= timeEnd) {
          newTemperatureData.push({
            time: hourTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            temp: hour.temp_c,
          });
        }
      });
    });
    setTemperatureData(newTemperatureData);
    const interval = [
      Math.floor(Math.min(...newTemperatureData.map((d) => d.temp)) - 0.5),
      Math.ceil(Math.max(...newTemperatureData.map((d) => d.temp)) + 0.5),
    ];
    setIntervalTemp(interval);
  }, [time, forecast]);

  return (
    <div className="lg:col-span-2 bg-card border border-border rounded-(--radius) p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-foreground">Temperatura nas próximas 24h</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={temperatureData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="time"
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px" }}
            domain={intervalTemp}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              color: "var(--foreground)",
            }}
            formatter={(value) => [`${value}°C`, "Temperatura"]}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ fill: "var(--primary)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AlertCard({ alert, effective }) {
  return (
    <div className="p-4 bg-accent rounded-lg border-l-4 border-secondary">
      <div className="flex items-start gap-3">
        <div>
          <h4 className="text-accent-foreground mb-1">{alert.headline}</h4>
          <p className="text-muted-foreground text-sm">{alert.desc}</p>
          <div className="text-xs text-muted-foreground mt-2">
            <span className="font-medium">Emitido em:</span>{" "}
            {new Date(effective.split("T")[0] + "T00:00:00").toLocaleDateString(
              "pt-BR",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              },
            )}{" "}
            {effective.split("T")[1].split("-")[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertsCard({ alerts }) {
  return (
    <div className="bg-card border border-border rounded-(--radius) p-6 overflow-auto max-h-100">
      <h3 className="text-foreground mb-4">Alertas Meteorológicos</h3>
      <div className="space-y-4">
        {alerts.length > 0 ? (
          // Sort alerts by date, most recent first
          alerts
            .sort((a, b) => new Date(b.effective) - new Date(a.effective))
            .map((alertItem, index) => (
              <AlertCard
                key={index}
                alert={alertItem}
                effective={alertItem.effective}
              />
            ))
        ) : (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground text-sm">
              Nenhum alerta emitido.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChartAlertCards({ time, forecast, alerts }) {
  return (
    <section>
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <ChartCard time={time} forecast={forecast} />
        <AlertsCard alerts={alerts} />
      </div>
    </section>
  );
}

export default ChartAlertCards;
