/**
 * Device & GPU Capability Detection Utility
 * Detects low-power mobile GPUs, hardware constraints, data-saver mode,
 * and user battery-saver preferences to optimize canvas/3D rendering.
 */

import { useState, useEffect } from "react";

/**
 * Checks whether the current device is a low-power mobile or GPU-constrained device.
 */
export function isLowPowerDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  // 1. User prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  // 2. Data-Saver / Save-Data mode enabled in browser/OS
  if (navigator.connection && navigator.connection.saveData) {
    return true;
  }

  // 3. Low hardware concurrency (<= 4 cores on mobile is typical for low-power devices)
  const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  if (isMobile && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return true;
  }

  // 4. Low device memory (<= 4GB RAM)
  if (isMobile && navigator.deviceMemory && navigator.deviceMemory <= 4) {
    return true;
  }

  // 5. Software / degraded WebGL renderer check
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
        const lowEndKeywords = ["swiftshader", "llvmpipe", "software rasterizer", "mali-400", "adreno 304", "adreno 306"];
        if (lowEndKeywords.some((kw) => renderer.toLowerCase().includes(kw))) {
          return true;
        }
      }
    }
  } catch (_) {
    // Canvas context probe blocked or unsupported
  }

  return false;
}

/**
 * React hook to subscribe to low-power / battery-saver state.
 * Allows user manual override via localStorage.
 */
export function usePerformanceMode() {
  const [isLowPower, setIsLowPower] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("devakumar_battery_saver");
    if (stored !== null) return stored === "true";
    return isLowPowerDevice();
  });

  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    // Listen for OS battery status if supported
    let batteryInstance = null;
    if (typeof navigator !== "undefined" && "getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        batteryInstance = battery;
        const updateBattery = () => {
          setBatteryLevel(battery.level);
          // If battery is unplugged and below 20%, automatically activate low-power mode
          if (!battery.charging && battery.level < 0.2) {
            setIsLowPower(true);
          }
        };
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      }).catch(() => {});
    }

    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener("levelchange", () => {});
        batteryInstance.removeEventListener("chargingchange", () => {});
      }
    };
  }, []);

  const toggleBatterySaver = () => {
    setIsLowPower((prev) => {
      const next = !prev;
      localStorage.setItem("devakumar_battery_saver", String(next));
      return next;
    });
  };

  return {
    isLowPower,
    batteryLevel,
    toggleBatterySaver,
  };
}
