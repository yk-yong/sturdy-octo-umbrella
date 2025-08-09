import { useState, useEffect, useMemo } from "react";
import type {
  Festival,
  FilterState,
  Language,
  UIState,
} from "./types/festival";
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
  // State management
  const [uiState, setUIState] = useState<UIState>({
    language: "en",
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

  // Handle language change
  const handleLanguageChange = (language: Language) => {
    setUIState((prev) => ({ ...prev, language }));
  };

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
      <Header
        language={uiState.language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <Statistics
          festivals={allFestivals}
          filteredFestivals={filteredFestivals}
          language={uiState.language}
        />

        {/* Filters */}
        <FilterComponent
          filters={filters}
          language={uiState.language}
          onFiltersChange={handleFiltersChange}
        />

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {uiState.language === "ms"
              ? "Festival Malaysia"
              : uiState.language === "zh"
              ? "马来西亚节日"
              : "Malaysian Festivals"}
          </h2>
          <p className="text-gray-600">
            {uiState.language === "ms"
              ? `Menunjukkan ${filteredFestivals.length} daripada ${allFestivals.length} festival`
              : uiState.language === "zh"
              ? `显示 ${filteredFestivals.length} 个节日，共 ${allFestivals.length} 个`
              : `Showing ${filteredFestivals.length} of ${allFestivals.length} festivals`}
          </p>
        </div>

        {/* Festival Grid */}
        <FestivalGrid
          festivals={filteredFestivals}
          language={uiState.language}
          onFestivalClick={handleFestivalClick}
        />
      </main>

      {/* Festival Detail Modal */}
      <FestivalDetailModal
        festival={uiState.selectedFestival}
        language={uiState.language}
        isOpen={uiState.isDetailModalOpen}
        onClose={handleModalClose}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            {uiState.language === "ms"
              ? "Menerokai kepelbagaian budaya Malaysia"
              : uiState.language === "zh"
              ? "探索马来西亚的文化多样性"
              : "Exploring Malaysia's Cultural Diversity"}
          </p>
          <p className="text-gray-400 text-sm">
            {uiState.language === "ms"
              ? "Dibina dengan ❤️ untuk memahami tradisi Malaysia"
              : uiState.language === "zh"
              ? "用 ❤️ 构建，为了理解马来西亚传统"
              : "Built with ❤️ to understand Malaysian traditions"}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
