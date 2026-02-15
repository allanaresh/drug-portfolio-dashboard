"use client";

import React from "react";
import { DevelopmentPhase, TherapeuticArea } from "@/types";
import { useData } from "@/lib/DataContext";

export default function FilterPanel() {
  const { filters, setFilters } = useData();

  const therapeuticAreas = Object.values(TherapeuticArea);
  const phases = Object.values(DevelopmentPhase);
  const priorities: ("High" | "Medium" | "Low")[] = ["High", "Medium", "Low"];

  const handleTherapeuticAreaToggle = (area: TherapeuticArea) => {
    const updated = filters.therapeuticAreas.includes(area)
      ? filters.therapeuticAreas.filter((a) => a !== area)
      : [...filters.therapeuticAreas, area];
    setFilters({ ...filters, therapeuticAreas: updated });
  };

  const handlePhaseToggle = (phase: DevelopmentPhase) => {
    const updated = filters.phases.includes(phase)
      ? filters.phases.filter((p) => p !== phase)
      : [...filters.phases, phase];
    setFilters({ ...filters, phases: updated });
  };

  const handlePriorityToggle = (priority: "High" | "Medium" | "Low") => {
    const updated = filters.priorities.includes(priority)
      ? filters.priorities.filter((p) => p !== priority)
      : [...filters.priorities, priority];
    setFilters({ ...filters, priorities: updated });
  };

  const clearAllFilters = () => {
    setFilters({
      therapeuticAreas: [],
      phases: [],
      priorities: [],
      searchQuery: "",
    });
  };

  const hasActiveFilters =
    filters.therapeuticAreas.length > 0 ||
    filters.phases.length > 0 ||
    filters.priorities.length > 0 ||
    filters.searchQuery.length > 0;

  return (
    <div className="bg-white border-r border-gray-200 overflow-y-auto h-full">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search programs..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters({ ...filters, searchQuery: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <svg
            className="absolute right-3 top-2.5 h-4 sm:h-5 w-4 sm:w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
        {/* Therapeutic Areas */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">
            Therapeutic Area
          </h3>
          <div className="space-y-2">
            {therapeuticAreas.map((area) => (
              <label
                key={area}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.therapeuticAreas.includes(area)}
                  onChange={() => handleTherapeuticAreaToggle(area)}
                  className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                  {area}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Development Phase */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">
            Development Phase
          </h3>
          <div className="space-y-2">
            {phases.map((phase) => (
              <label
                key={phase}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.phases.includes(phase)}
                  onChange={() => handlePhaseToggle(phase)}
                  className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                  {phase}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">Priority</h3>
          <div className="space-y-2">
            {priorities.map((priority) => (
              <label
                key={priority}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.priorities.includes(priority)}
                  onChange={() => handlePriorityToggle(priority)}
                  className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                  {priority}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
