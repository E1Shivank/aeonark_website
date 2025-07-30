import { useEffect } from 'react';

interface CalendlyWidgetProps {
  url: string;
  height?: number;
  className?: string;
}

export default function CalendlyWidget({ 
  url, 
  height = 630, 
  className = "" 
}: CalendlyWidgetProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`calendly-inline-widget ${className}`} 
         data-url={url}
         style={{ minWidth: '320px', height: `${height}px` }}>
    </div>
  );
}