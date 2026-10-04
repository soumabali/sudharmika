import { SiteBoot } from "@/components/site-boot";
import { getSiteDocument } from "@/lib/site-document";

export default function Page() {
  const site = getSiteDocument();

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: site.body }} />
      <script dangerouslySetInnerHTML={{ __html: site.script }} />
      <SiteBoot />
    </>
  );
}
