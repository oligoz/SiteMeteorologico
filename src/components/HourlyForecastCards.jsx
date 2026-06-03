function HourlyForecast({ time, icon, alt, temp }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-(--radius) min-w-22.5 hover:border-primary/30 transition-colors">
      <span className="text-muted-foreground">{time}</span>
      <img src={icon} alt={alt} className="w-8 h-8" />
      <span className="text-foreground">{temp}°</span>
    </div>
  );
}

function HourlyForecastCards({ hourlyData }) {
  return (
    <section>
      <div className="mb-8">
        <h3 className="text-foreground mb-4">Previsão Horária</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {hourlyData.map((item, idx) => (
            <HourlyForecast
              key={idx}
              time={item.time.split(" ")[1]}
              icon={item.condition.icon}
              alt={item.condition.text}
              temp={item.temp_c}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HourlyForecastCards;
