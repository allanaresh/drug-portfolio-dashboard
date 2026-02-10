"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Program, ProgramDetail, FilterOptions } from "@/types";
import { initializeSyntheticData } from "./syntheticData";

interface DataContextType {
  programs: Program[];
  programDetails: ProgramDetail[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  updateProgram: (id: string, updates: Partial<Program>) => void;
  getProgramDetail: (id: string) => ProgramDetail | undefined;
  getFilteredPrograms: () => Program[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programDetails, setProgramDetails] = useState<ProgramDetail[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    therapeuticAreas: [],
    phases: [],
    priorities: [],
    searchQuery: "",
  });

  useEffect(() => {
    // Initialize synthetic data on mount
    const data = initializeSyntheticData();
    setPrograms(data.programs);
    setProgramDetails(data.programDetails);
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, []);

  const updateProgram = (id: string, updates: Partial<Program>) => {
    setPrograms((prev) =>
      prev.map((program) =>
        program.id === id
          ? {
              ...program,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : program,
      ),
    );

    setProgramDetails((prev) =>
      prev.map((detail) =>
        detail.id === id
          ? {
              ...detail,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : detail,
      ),
    );
  };

  const getProgramDetail = (id: string): ProgramDetail | undefined => {
    return programDetails.find((detail) => detail.id === id);
  };

  const getFilteredPrograms = (): Program[] => {
    return programs.filter((program) => {
      // Filter by therapeutic areas
      if (
        filters.therapeuticAreas.length > 0 &&
        !filters.therapeuticAreas.includes(program.therapeuticArea)
      ) {
        return false;
      }

      // Filter by phases
      if (
        filters.phases.length > 0 &&
        !filters.phases.includes(program.phase)
      ) {
        return false;
      }

      // Filter by priorities
      if (
        filters.priorities.length > 0 &&
        !filters.priorities.includes(program.priority)
      ) {
        return false;
      }

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          program.name.toLowerCase().includes(query) ||
          program.code.toLowerCase().includes(query) ||
          program.targetIndication.toLowerCase().includes(query) ||
          program.projectLead.toLowerCase().includes(query)
        );
      }

      return true;
    });
  };

  // Prevent hydration mismatch by not rendering until initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <DataContext.Provider
      value={{
        programs,
        programDetails,
        filters,
        setFilters,
        updateProgram,
        getProgramDetail,
        getFilteredPrograms,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
