"use client";

import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    // جلوگیری از لود دوباره در حالت development
    if (document.getElementById("tawk-script")) return;

    // Property ID و Widget ID خودت رو اینجا بذار
    const propertyId = "PROPERTY_ID_خودت";
    const widgetId = "WIDGET_ID_خودت";

    // اسکریپت Tawk.to
    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      // پاک‌سازی در صورت unmount
      const existingScript = document.getElementById("tawk-script");
      if (existingScript) existingScript.remove();
    };
  }, []);

  return null;
}