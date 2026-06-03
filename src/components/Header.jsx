import { useState } from "react";
import { Cloud, Search } from "lucide-react";

function Header({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = searchText.trim();
    if (!inputValue) return;
    onSearch(inputValue);
    setSearchText("");
  };

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-xl">
            <Cloud className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl text-foreground tracking-tight">
            WeatherPro
          </h1>
        </div>

        <div className="relative">
          <Search className="absolute w-4 h-4 top-1/2 left-2 -translate-y-1/2" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={(e) => setSearchText("")}
              placeholder="Buscar localização..."
              className="pl-8 py-1 bg-card border border-border rounded-(--radius) text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" hidden></button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
