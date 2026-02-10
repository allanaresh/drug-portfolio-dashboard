"use client";

import React from "react";
import { useData } from "@/lib/DataContext";
import { DevelopmentPhase, TherapeuticArea } from "@/types";

export default function AnalyticsPage() {
  const { programs } = useData();

  // Calculate phase distribution
  const phaseDistribution = Object.values(DevelopmentPhase).map((phase) => ({
    phase,
    count: programs.filter((p) => p.phase === phase).length,
  }));

  // Calculate therapeutic area distribution
  const therapeuticAreaDistribution = Object.values(TherapeuticArea).map(
    (area) => ({
      area,
      count: programs.filter((p) => p.therapeuticArea === area).length,
    }),
  );

  // Calculate priority distribution
  const priorityDistribution = [
    {
      priority: "High",
      count: programs.filter((p) => p.priority === "High").length,
    },
    {
      priority: "Medium",
      count: programs.filter((p) => p.priority === "Medium").length,
    },
    {
      priority: "Low",
      count: programs.filter((p) => p.priority === "Low").length,
    },
  ];

  // Calculate budget analysis
  const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = programs.reduce((sum, p) => sum + p.budgetSpent, 0);
  const budgetByPhase = Object.values(DevelopmentPhase).map((phase) => {
    const phasePrograms = programs.filter((p) => p.phase === phase);
    return {
      phase,
      budget: phasePrograms.reduce((sum, p) => sum + p.budget, 0),
      spent: phasePrograms.reduce((sum, p) => sum + p.budgetSpent, 0),
    };
  });

  const maxCount = Math.max(...phaseDistribution.map((d) => d.count));

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Portfolio Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into your drug development portfolio
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Portfolio Value
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              ${(totalBudget / 1000000000).toFixed(2)}B
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Across {programs.length} programs
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Total Spend
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              ${(totalSpent / 1000000000).toFixed(2)}B
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Remaining Budget
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              ${((totalBudget - totalSpent) / 1000000000).toFixed(2)}B
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Available for allocation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Phase Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Programs by Development Phase
            </h3>
            <div className="space-y-4">
              {phaseDistribution.map((item) => (
                <div key={item.phase}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {item.phase}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-500 h-full rounded-full transition-all"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Therapeutic Area Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Programs by Therapeutic Area
            </h3>
            <div className="space-y-4">
              {therapeuticAreaDistribution
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <div key={item.area}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.area}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.count}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all"
                        style={{
                          width: `${(item.count / programs.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Priority Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Programs by Priority
            </h3>
            <div className="space-y-4">
              {priorityDistribution.map((item) => (
                <div
                  key={item.priority}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full mr-3 ${
                        item.priority === "High"
                          ? "bg-red-500"
                          : item.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item.priority} Priority
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget by Phase */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Budget Allocation by Phase
            </h3>
            <div className="space-y-4">
              {budgetByPhase
                .filter((item) => item.budget > 0)
                .sort((a, b) => b.budget - a.budget)
                .map((item) => (
                  <div key={item.phase}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.phase}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${(item.budget / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-purple-500 h-full rounded-full transition-all"
                          style={{
                            width: `${(item.spent / item.budget) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 min-w-[3rem] text-right">
                        {((item.spent / item.budget) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Top Programs Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Programs by Budget
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phase
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Therapeutic Area
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilization
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs
                  .sort((a, b) => b.budget - a.budget)
                  .slice(0, 10)
                  .map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {program.code}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {program.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {program.phase}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {program.therapeuticArea}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(program.budget / 1000000).toFixed(2)}M
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${(program.budgetSpent / 1000000).toFixed(2)}M
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-full rounded-full ${
                                (program.budgetSpent / program.budget) * 100 >
                                80
                                  ? "bg-red-500"
                                  : (program.budgetSpent / program.budget) *
                                        100 >
                                      60
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                              style={{
                                width: `${(program.budgetSpent / program.budget) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">
                            {(
                              (program.budgetSpent / program.budget) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
