function DailyForecast({ day, icon, alt, high, low }) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-(--radius) hover:border-primary/30 transition-colors">
      <span className="text-foreground min-w-20">{day}</span>
      <div className="flex items-center gap-3">
        <img src={icon} alt={alt} className="w-10 h-10" />
        <div className="flex items-center gap-2 min-w-20 justify-end">
          <span className="text-foreground">{high}°</span>
          <span className="text-muted-foreground">{low}°</span>
        </div>
      </div>
    </div>
  );
}

function DailyForecastCards({ dailyForecast }) {
  return (
    <section>
      <div>
        <h3 className="text-foreground mb-4">
          Próximos {dailyForecast.length} Dias
        </h3>
        <div className="grid gap-3">
          {dailyForecast.map((item, idx) => (
            <DailyForecast
              key={idx}
              day={item.date}
              icon={item.day.condition.icon}
              alt={item.day.condition.text}
              high={item.day.maxtemp_c}
              low={item.day.mintemp_c}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DailyForecastCards;
