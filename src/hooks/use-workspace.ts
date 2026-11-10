"use client";
import { useMemo, useSyncExternalStore } from "react";
import {
  initialWorkspace,
  isWorkspace,
  storageKey,
  type Workspace,
} from "@/lib/chat";
let fallback: string | null = null;
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("nexus-storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("nexus-storage", callback);
  };
}
function snapshot() {
  if (fallback !== null) return fallback;
  try {
    return localStorage.getItem(storageKey) ?? "";
  } catch {
    return "";
  }
}
const serverSnapshot = () => "";
function parse(raw: string) {
  if (!raw) return { data: initialWorkspace, corrupt: false };
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isWorkspace(parsed)) return { data: parsed, corrupt: false };
  } catch {}
  return { data: initialWorkspace, corrupt: true };
}
export function useWorkspace() {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const state = useMemo(() => parse(raw), [raw]);
  function update(updater: Workspace | ((value: Workspace) => Workspace)) {
    const previous = parse(snapshot()).data;
    const next = typeof updater === "function" ? updater(previous) : updater;
    const value = JSON.stringify(next);
    let persisted = true;
    try {
      localStorage.setItem(storageKey, value);
      fallback = null;
    } catch {
      fallback = value;
      persisted = false;
    }
    window.dispatchEvent(new Event("nexus-storage"));
    return persisted;
  }
  return { ...state, update };
}
