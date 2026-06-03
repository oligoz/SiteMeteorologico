import { MapPin, Droplets, Wind } from "lucide-react";
import LoaderSpinner from "./LoaderSpiner";
import { useEffect, useState } from "react";

function SummaryCard({
  location,
  date,
  lastUpdated,
  temperature,
  condition,
  feelsLike,
  chanceOfRain,
  wind,
}) {
  return (
    <section>
      <div className="relative mb-8 bg-linear-to-br/oklch from-primary to-secondary rounded-(--radius) overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1591552265137-99c59d9f4927?w=1200&h=400&fit=crop&auto=format"
            alt="Blue sky with white clouds"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-8 sm:p-12">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                <MapPin className="w-5 h-5" />
                <span>{location}</span>
              </div>
              <h2 className="text-foreground mb-1">
                {date ? (
                  new Date(date).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                ) : (
                  <LoaderSpinner />
                )}
              </h2>
              <div className="text-primary-foreground/70">
                <span className="flex gap-2">
                  Última atualização:{" "}
                  {lastUpdated ? (
                    new Date(lastUpdated).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  ) : (
                    <LoaderSpinner />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-12">
            <div>
              <div className="text-7xl sm:text-8xl text-primary-foreground tracking-tighter mb-2">
                {temperature ? `${temperature}°` : <LoaderSpinner />}
              </div>
              <div className="text-xl text-primary-foreground/90">
                {condition ? condition : <LoaderSpinner />}
              </div>
            </div>
            <div className="hidden sm:flex flex-col gap-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <span className="flex gap-2">
                  Sensação térmica:{" "}
                  {feelsLike ? `${feelsLike}°` : <LoaderSpinner />}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                <span className="flex gap-2">
                  Chance de chuva:{" "}
                  {chanceOfRain !== null && chanceOfRain !== undefined ? (
                    `${chanceOfRain}%`
                  ) : (
                    <LoaderSpinner />
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                <span className="flex gap-2">
                  Vento: {wind ? wind : <LoaderSpinner />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SummaryCard;
