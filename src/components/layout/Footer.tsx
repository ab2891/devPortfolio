import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";

export function Footer() {
  return (
    <footer className="relative z-10 pb-8 pt-2">
      <Container>
        <LiquidGlassPanel className="rounded-full" contentClassName="px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-2 text-sm text-white/72 sm:flex-row sm:items-center sm:justify-between">
            <p>{siteConfig.name}</p>
            <p>Built for product-minded frontend and creative development work.</p>
          </div>
        </LiquidGlassPanel>
      </Container>
    </footer>
  );
}
