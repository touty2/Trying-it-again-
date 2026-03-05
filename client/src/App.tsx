/**
 * App Root — Chinese Graded Reader
 * Design: Structured Scholar
 *  - Persistent left sidebar on desktop
 *  - Bottom tab bar on mobile
 *  - Warm off-white background, deep teal primary
 *  - Navigation order: Dashboard → Deck → Sessions → Settings
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider, ThemeSettingsProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import { TypographyProvider } from "./contexts/TypographyContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SyncProvider, useSync } from "./contexts/SyncContext";
import { GrammarProgressProvider } from "./contexts/GrammarProgressContext";
import { useAuth } from "./_core/hooks/useAuth";
import Sessions from "./pages/Sessions";
import StoryPage from "./pages/StoryPage";
import Deck from "./pages/Deck";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";
import VocabPage from "./pages/VocabPage";
import GrammarPage from "./pages/GrammarPage";
import VideoLearningPage from "./pages/VideoLearningPage";
import { BookOpen, Layers, BarChart3, Settings, BookMarked, Cloud, CloudOff, Loader2, LogIn, LogOut, RefreshCw, Library, GraduationCap, Video } from "lucide-react";
import { toast } from "sonner";
import LoginPage from "./pages/LoginPage";

// ─── Feature Flags ────────────────────────────────────────────────────────────
// Video feature enabled — user can paste transcripts manually.
const ENABLE_VIDEO = true;

// ─── Nav Items ────────────────────────────────────────────────────────────────
const ALL_NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: BarChart3,    enabled: true },
  { path: "/deck",      label: "Deck",       icon: Layers,       enabled: true },
  { path: "/sessions",  label: "Sessions",   icon: BookOpen,     enabled: true },
  { path: "/vocab",     label: "Vocab",      icon: Library,      enabled: true },
  { path: "/grammar",   label: "Grammar",    icon: GraduationCap, enabled: true },
  { path: "/video",     label: "Video",      icon: Video,        enabled: ENABLE_VIDEO },
  { path: "/settings",  label: "Settings",   icon: Settings,     enabled: true },
] as const;

const NAV_ITEMS = ALL_NAV_ITEMS.filter((item) => item.enabled);

// ─── Sync Status Indicator ────────────────────────────────────────────────────

function SyncStatusBadge() {
  const { syncState, triggerSync, isSyncing } = useSync();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const handleSync = async () => {
    try {
      await triggerSync();
      toast.success("Sync complete");
    } catch {
      toast.error("Sync failed");
    }
  };

  const formatLastSync = (ts: number | null): string => {
    if (!ts) return "Never synced";
    const diff = Date.now() - ts;
    if (diff < 60_000) return "Just now";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
    return `${Math.floor(diff / 86_400_000)}d ago`;
  };

  return (
    <button
      onClick={handleSync}
      disabled={isSyncing}
      title={syncState.status === "error" ? `Sync error: ${syncState.error}` : "Click to sync"}
      className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSyncing ? (
        <Loader2 size={10} className="animate-spin shrink-0" />
      ) : syncState.status === "error" ? (
        <CloudOff size={10} className="text-destructive shrink-0" />
      ) : syncState.status === "success" ? (
        <Cloud size={10} className="text-primary shrink-0" />
      ) : (
        <RefreshCw size={10} className="shrink-0" />
      )}
      <span>
        {isSyncing
          ? "Syncing…"
          : syncState.status === "error"
          ? "Sync error"
          : formatLastSync(syncState.lastSyncTime)}
      </span>
    </button>
  );
}

// ─── Auth Button ──────────────────────────────────────────────────────────────

function AuthButton() {
  const { user, isAuthenticated, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-primary">
              {(user as { name?: string }).name?.[0]?.toUpperCase() ?? "U"}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground truncate">
            {(user as { name?: string }).name ?? "Logged in"}
          </span>
        </div>
        <button
          onClick={() => logout()}
          title="Log out"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={12} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => (window.location.href = "/login")}
      className="flex items-center gap-1.5 text-[10px] text-primary hover:text-primary/80 font-medium transition-colors"
    >
      <LogIn size={11} />
      Sign in to sync
    </button>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  const [location, navigate] = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border bg-sidebar h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <BookMarked size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-tight" style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}>
              汉语阅读
            </p>
            <p className="text-[10px] text-muted-foreground">Chinese Reader</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const isActive = location === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={[
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              ].join(" ")}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Footer — auth + sync status */}
      <div className="px-4 py-4 border-t border-border/50 space-y-2">
        <AuthButton />
        <SyncStatusBadge />
      </div>
    </aside>
  );
}

// ─── Bottom Tab Bar (mobile) ──────────────────────────────────────────────────

function BottomTabBar() {
  const [location, navigate] = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex">
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
        const isActive = location === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={[
              "flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground",
            ].join(" ")}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

/// ─── Main Layout ──────────────────────────────────────────────────────────────
function AppLayout() {
  const [location] = useLocation();
  // Story page gets full-width treatment (no container constraint — StoryPage handles its own max-w)
  const isStoryPage = location.startsWith("/story/");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        {isStoryPage ? (
          <Switch>
            <Route path="/story/:id" component={StoryPage} />
          </Switch>
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8">
            <Switch>
              {/* Default landing page: Dashboard */}
              <Route path="/">
                <Redirect to="/dashboard" />
              </Route>
              {/* Standalone auth pages */}
              <Route path="/login" component={LoginPage} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/deck" component={Deck} />
              <Route path="/sessions" component={Sessions} />
              <Route path="/vocab" component={VocabPage} />
              <Route path="/grammar" component={GrammarPage} />
              {/* Video route — hidden when ENABLE_VIDEO is false, code intact for easy restore */}
              {ENABLE_VIDEO && <Route path="/video" component={VideoLearningPage} />}
              <Route path="/settings" component={SettingsPage} />
            </Switch>
          </div>
        )}
      </main>
      <BottomTabBar />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <ThemeSettingsProvider>
        <TooltipProvider>
          <AuthProvider>
            <AppProvider>
              <TypographyProvider>
                {/* SyncProvider must be inside AppProvider so it can access IndexedDB data */}
                <GrammarProgressProvider>
                <SyncProvider>
                  <Toaster position="top-right" richColors />
                  <AppLayout />
                </SyncProvider>
                </GrammarProgressProvider>
              </TypographyProvider>
            </AppProvider>
          </AuthProvider>
        </TooltipProvider>
        </ThemeSettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
