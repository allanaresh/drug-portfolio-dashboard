"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useData } from "@/lib/DataContext";
import { useAuth } from "@/lib/AuthContext";
import {
  DevelopmentPhase,
  TherapeuticArea,
  MilestoneStatus,
  StudyStatus,
} from "@/types";

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getProgramDetail, updateProgram } = useData();
  const { canEdit } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "studies" | "milestones"
  >("overview");

  const programId = params.id as string;
  const programDetail = getProgramDetail(programId);

  const [editedProgram, setEditedProgram] = useState(programDetail);

  if (!programDetail || !editedProgram) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-73px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Program not found
          </h2>
          <p className="text-gray-500 mb-4">
            The program you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProgram(programId, {
      name: editedProgram.name,
      description: editedProgram.description,
      therapeuticArea: editedProgram.therapeuticArea,
      phase: editedProgram.phase,
      targetIndication: editedProgram.targetIndication,
      mechanism: editedProgram.mechanism,
      projectLead: editedProgram.projectLead,
      therapeuticLead: editedProgram.therapeuticLead,
      priority: editedProgram.priority,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProgram(programDetail);
    setIsEditing(false);
  };

  const budgetUtilization = (
    (programDetail.budgetSpent / programDetail.budget) *
    100
  ).toFixed(1);

  // Calculate enrollment progress
  const totalTargetEnrollment = programDetail.studies.reduce(
    (sum, s) => sum + s.targetEnrollment,
    0,
  );
  const totalCurrentEnrollment = programDetail.studies.reduce(
    (sum, s) => sum + s.currentEnrollment,
    0,
  );
  const enrollmentProgress =
    totalTargetEnrollment > 0
      ? ((totalCurrentEnrollment / totalTargetEnrollment) * 100).toFixed(1)
      : "0";

  // Count milestones by status
  const completedMilestones = programDetail.milestones.filter(
    (m) => m.status === MilestoneStatus.COMPLETED,
  ).length;
  const totalMilestones = programDetail.milestones.length;

  const getStatusColor = (status: StudyStatus) => {
    const colors: Record<StudyStatus, string> = {
      [StudyStatus.NOT_STARTED]: "bg-gray-100 text-gray-800",
      [StudyStatus.RECRUITING]: "bg-blue-100 text-blue-800",
      [StudyStatus.ACTIVE]: "bg-green-100 text-green-800",
      [StudyStatus.COMPLETED]: "bg-emerald-100 text-emerald-800",
      [StudyStatus.SUSPENDED]: "bg-yellow-100 text-yellow-800",
      [StudyStatus.TERMINATED]: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const getMilestoneStatusColor = (status: MilestoneStatus) => {
    const colors: Record<MilestoneStatus, string> = {
      [MilestoneStatus.NOT_STARTED]: "bg-gray-100 text-gray-800",
      [MilestoneStatus.IN_PROGRESS]: "bg-blue-100 text-blue-800",
      [MilestoneStatus.COMPLETED]: "bg-green-100 text-green-800",
      [MilestoneStatus.DELAYED]: "bg-red-100 text-red-800",
      [MilestoneStatus.AT_RISK]: "bg-yellow-100 text-yellow-800",
    };
    return colors[status];
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </button>

            {canEdit() && (
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Program
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-mono text-gray-500">
                  {programDetail.code}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    programDetail.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : programDetail.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {programDetail.priority} Priority
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProgram.name}
                  onChange={(e) =>
                    setEditedProgram({ ...editedProgram, name: e.target.value })
                  }
                  className="text-3xl font-bold text-gray-900 mb-2 w-full border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {programDetail.name}
                </h1>
              )}
              {isEditing ? (
                <textarea
                  value={editedProgram.description}
                  onChange={(e) =>
                    setEditedProgram({
                      ...editedProgram,
                      description: e.target.value,
                    })
                  }
                  className="text-gray-600 w-full border border-gray-300 rounded px-2 py-1"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600 max-w-3xl">
                  {programDetail.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">
              Development Phase
            </p>
            {isEditing ? (
              <select
                value={editedProgram.phase}
                onChange={(e) =>
                  setEditedProgram({
                    ...editedProgram,
                    phase: e.target.value as DevelopmentPhase,
                  })
                }
                className="mt-2 w-full border border-gray-300 rounded px-2 py-1"
              >
                {Object.values(DevelopmentPhase).map((phase) => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {programDetail.phase}
              </p>
            )}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">
              Budget Utilization
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {budgetUtilization}%
            </p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-full rounded-full ${
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

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">
              Enrollment Progress
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {enrollmentProgress}%
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {totalCurrentEnrollment} / {totalTargetEnrollment} patients
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Milestones</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {completedMilestones} / {totalMilestones}
            </p>
            <p className="text-sm text-gray-500 mt-1">Completed</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("studies")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "studies"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Studies ({programDetail.studies.length})
              </button>
              <button
                onClick={() => setActiveTab("milestones")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "milestones"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Milestones ({programDetail.milestones.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Program Details
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Therapeutic Area
                      </dt>
                      {isEditing ? (
                        <select
                          value={editedProgram.therapeuticArea}
                          onChange={(e) =>
                            setEditedProgram({
                              ...editedProgram,
                              therapeuticArea: e.target
                                .value as TherapeuticArea,
                            })
                          }
                          className="mt-1 w-full border border-gray-300 rounded px-2 py-1"
                        >
                          {Object.values(TherapeuticArea).map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900">
                          {programDetail.therapeuticArea}
                        </dd>
                      )}
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Target Indication
                      </dt>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProgram.targetIndication}
                          onChange={(e) =>
                            setEditedProgram({
                              ...editedProgram,
                              targetIndication: e.target.value,
                            })
                          }
                          className="mt-1 w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900">
                          {programDetail.targetIndication}
                        </dd>
                      )}
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Mechanism
                      </dt>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProgram.mechanism}
                          onChange={(e) =>
                            setEditedProgram({
                              ...editedProgram,
                              mechanism: e.target.value,
                            })
                          }
                          className="mt-1 w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900">
                          {programDetail.mechanism}
                        </dd>
                      )}
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Project Lead
                      </dt>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProgram.projectLead}
                          onChange={(e) =>
                            setEditedProgram({
                              ...editedProgram,
                              projectLead: e.target.value,
                            })
                          }
                          className="mt-1 w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900">
                          {programDetail.projectLead}
                        </dd>
                      )}
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Therapeutic Lead
                      </dt>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProgram.therapeuticLead}
                          onChange={(e) =>
                            setEditedProgram({
                              ...editedProgram,
                              therapeuticLead: e.target.value,
                            })
                          }
                          className="mt-1 w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <dd className="mt-1 text-sm text-gray-900">
                          {programDetail.therapeuticLead}
                        </dd>
                      )}
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Financial Information
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Total Budget
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        ${(programDetail.budget / 1000000).toFixed(2)}M
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Budget Spent
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        ${(programDetail.budgetSpent / 1000000).toFixed(2)}M
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Remaining Budget
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        $
                        {(
                          (programDetail.budget - programDetail.budgetSpent) /
                          1000000
                        ).toFixed(2)}
                        M
                      </dd>
                    </div>
                  </dl>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">
                    Timeline
                  </h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Start Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {programDetail.startDate}
                      </dd>
                    </div>
                    {programDetail.estimatedApprovalDate && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Estimated Approval
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {programDetail.estimatedApprovalDate}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "studies" && (
              <div className="space-y-4">
                {programDetail.studies.map((study) => (
                  <div
                    key={study.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {study.studyNumber}
                          </h4>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(study.status)}`}
                          >
                            {study.status}
                          </span>
                        </div>
                        <p className="text-gray-600">{study.title}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Indication</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {study.indication}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sites</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {study.sitesCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          Principal Investigator
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {study.principalInvestigator}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          Primary Endpoint
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {study.primaryEndpoint}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">
                          Enrollment Progress
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {study.currentEnrollment} / {study.targetEnrollment}{" "}
                          patients
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-full rounded-full"
                          style={{
                            width: `${(study.currentEnrollment / study.targetEnrollment) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "milestones" && (
              <div className="space-y-4">
                {programDetail.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {milestone.title}
                          </h4>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}
                          >
                            {milestone.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {milestone.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Target Date</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {milestone.targetDate}
                            </p>
                          </div>
                          {milestone.completionDate && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Completion Date
                              </p>
                              <p className="text-sm font-medium text-gray-900 mt-1">
                                {milestone.completionDate}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
