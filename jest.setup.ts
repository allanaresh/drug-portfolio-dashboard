import "@testing-library/jest-dom";

// Mock next/navigation usePathname used in Header component
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock next/link to simply render children
jest.mock("next/link", () => {
  return ({ children }: { children: any }) => children;
});

// Ensure localStorage is available
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] ?? null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
