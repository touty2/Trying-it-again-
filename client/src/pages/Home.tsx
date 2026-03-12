/**
 * Home.tsx — redirect placeholder.
 * The root route redirects to /sessions which is the main entry point.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/sessions");
  }, [setLocation]);
  return null;
}
