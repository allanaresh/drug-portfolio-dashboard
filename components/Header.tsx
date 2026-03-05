"use client";
import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { UserRole } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, login, logout } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const pathname = usePathname();

  const handleRoleSelect = (role: UserRole) => {
    login(role);
    setShowRoleMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm sm:text-xl font-bold text-gray-900">
                  Clinical R&D Portfolio
                </h1>
                <p className="text-xs text-gray-500">
                  Drug Development Dashboard
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-4 lg:gap-6">
              <Link
                href="/"
                className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === "/"
                    ? "text-primary-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/analytics"
                className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === "/analytics"
                    ? "text-primary-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Analytics
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <div className="flex items-center gap-2 flex-1 sm:flex-none justify-between sm:justify-start">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium text-xs sm:text-sm whitespace-nowrap"
                >
                  Login
                </button>
                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={() => handleRoleSelect(UserRole.VIEWER)}
                      className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login as Viewer
                    </button>
                    <button
                      onClick={() => handleRoleSelect(UserRole.EDITOR)}
                      className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login as Editor
                    </button>
                    <button
                      onClick={() => handleRoleSelect(UserRole.ADMIN)}
                      className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login as Admin
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
