import { analyticsConfig } from "@/config/analytics";
import { googleTagBootstrap } from "@/lib/analytics/google-tag";

export function GoogleAnalyticsLoader() {
  if (!analyticsConfig.isConfigured) {
    return null;
  }

  return (
    <>
      <script
        id="mf-google-tag-bootstrap"
        dangerouslySetInnerHTML={{ __html: googleTagBootstrap() }}
      />
      <script
        id="mf-ga4-script"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`}
      />
    </>
  );
}
