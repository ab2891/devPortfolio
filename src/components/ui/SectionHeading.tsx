import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-cyan/80">
        {eyebrow}
      </p>
      {title && (
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-balance text-base leading-7 text-foreground-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
