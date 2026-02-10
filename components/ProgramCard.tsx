"use client";

import React from "react";
import { Program, DevelopmentPhase } from "@/types";
import Link from "next/link";

interface ProgramCardProps {
  program: Program;
}

const phaseColors: Record<DevelopmentPhase, string> = {
  [DevelopmentPhase.DISCOVERY]: "bg-gray-100 text-gray-800",
  [DevelopmentPhase.PRECLINICAL]: "bg-blue-100 text-blue-800",
  [DevelopmentPhase.PHASE_1]: "bg-green-100 text-green-800",
  [DevelopmentPhase.PHASE_2]: "bg-yellow-100 text-yellow-800",
  [DevelopmentPhase.PHASE_3]: "bg-orange-100 text-orange-800",
  [DevelopmentPhase.NDA_BLA]: "bg-purple-100 text-purple-800",
  [DevelopmentPhase.APPROVED]: "bg-emerald-100 text-emerald-800",
  [DevelopmentPhase.DISCONTINUED]: "bg-red-100 text-red-800",
};

const priorityColors = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function ProgramCard({ program }: ProgramCardProps) {
  const budgetUtilization = (
    (program.budgetSpent / program.budget) *
    100
  ).toFixed(1);

  return (
    <Link href={`/programs/${program.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary-300 cursor-pointer h-full flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-gray-500">
                  {program.code}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                    priorityColors[program.priority]
                  }`}
                >
                  {program.priority}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {program.name}
              </h3>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Phase</span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  phaseColors[program.phase]
                }`}
              >
                {program.phase}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Therapeutic Area</span>
              <span className="font-medium text-gray-900">
                {program.therapeuticArea}
              </span>
            </div>

            <div className="text-sm">
              <span className="text-gray-600">Target Indication</span>
              <p className="font-medium text-gray-900 mt-1 line-clamp-2">
                {program.targetIndication}
              </p>
            </div>

            <div className="text-sm">
              <span className="text-gray-600">Project Lead</span>
              <p className="font-medium text-gray-900 mt-1">
                {program.projectLead}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Budget Utilization</span>
              <span className="font-medium text-gray-900">
                {budgetUtilization}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  parseFloat(budgetUtilization) > 80
                    ? "bg-red-500"
                    : parseFloat(budgetUtilization) > 60
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${budgetUtilization}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
