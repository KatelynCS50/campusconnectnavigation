import { Logo } from "./site-nav";

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[var(--hero)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
        <div className="max-w-md">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Bridging the gap between academia and student life through intelligent navigation.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <FooterCol title="Navigation" items={["Find Teacher", "Campus Map", "Live Status"]} />
          <FooterCol title="Support" items={["Help Centre", "Privacy Policy", "Terms of Service"]} />
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          <p>Crafted for modern campuses.</p>
        </div>
      </div>
    </footer>
  );
}
