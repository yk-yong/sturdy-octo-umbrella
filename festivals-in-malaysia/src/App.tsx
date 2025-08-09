import { useState, useEffect, useMemo } from "react";
import { useI18n } from "./i18n/useI18n";
import type { Festival, FilterState, UIState } from "./types/festival";
import {
  getAllFestivals,
  filterFestivals,
  sortFestivalsByDate,
} from "./utils/festivalUtils";
import { Header } from "./components/Header";
import { FilterComponent } from "./components/FilterComponent";
import { Statistics } from "./components/Statistics";
import { FestivalGrid } from "./components/FestivalGrid";
import { FestivalDetailModal } from "./components/FestivalDetailModal";
import "./App.css";

function App() {
  const { t } = useI18n();

  // State management (removed language from UI state)
  const [uiState, setUIState] = useState<UIState>({
    selectedFestival: null,
    isDetailModalOpen: false,
  });

  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    region: "all",
    searchQuery: "",
  });

  // Load festivals data
  const allFestivals = useMemo(() => {
    return sortFestivalsByDate(getAllFestivals());
  }, []);

  // Filter festivals based on current filters
  const filteredFestivals = useMemo(() => {
    return filterFestivals(allFestivals, filters);
  }, [allFestivals, filters]);

  // Handle festival card click
  const handleFestivalClick = (festival: Festival) => {
    setUIState((prev) => ({
      ...prev,
      selectedFestival: festival,
      isDetailModalOpen: true,
    }));
  };

  // Handle modal close
  const handleModalClose = () => {
    setUIState((prev) => ({
      ...prev,
      selectedFestival: null,
      isDetailModalOpen: false,
    }));
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && uiState.isDetailModalOpen) {
        handleModalClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [uiState.isDetailModalOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <Statistics
          festivals={allFestivals}
          filteredFestivals={filteredFestivals}
        />

        {/* Filters */}
        <FilterComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t("app.title")}
          </h2>
          <p className="text-gray-600">
            {t("search.resultsCount", {
              count: filteredFestivals.length,
              total: allFestivals.length,
            })}
          </p>
        </div>

        {/* Festival Grid */}
        <FestivalGrid
          festivals={filteredFestivals}
          onFestivalClick={handleFestivalClick}
        />
      </main>

      {/* Festival Detail Modal */}
      <FestivalDetailModal
        festival={uiState.selectedFestival}
        isOpen={uiState.isDetailModalOpen}
        onClose={handleModalClose}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">{t("footer.description")}</p>
          <p className="text-gray-400 text-sm">{t("footer.builtWith")}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
