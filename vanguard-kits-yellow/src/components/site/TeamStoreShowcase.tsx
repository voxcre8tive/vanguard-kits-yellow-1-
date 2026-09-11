import { Check, ShoppingBag, Users } from "lucide-react";

/**
 * Static presentational mockup of the Vanguard Kits team store interface.
 * Data is intentionally inert; the real storefront will be driven by the
 * business management system through the service layer in src/lib/api.
 */
const STORE_ITEMS = [
  { name: "Home Game Jersey", meta: "Sizes YS–3XL", price: "$—" },
  { name: "Warm-Up Jacket", meta: "Team colorway", price: "$—" },
  { name: "Training Tee", meta: "Player & parent", price: "$—" },
  { name: "Supporter Hoodie", meta: "Fanwear", price: "$—" },
];

export function TeamStoreMockup() {
  return (
    <div className="relative border border-border bg-surface shadow-[0_40px_90px_-50px_black]">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
        <p className="truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          vanguardkits.com/store/your-team
        </p>
        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="border-b border-border bg-surface-2 px-5 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Team Store</p>
            <p className="font-display text-2xl uppercase leading-none">Your Program Name</p>
          </div>
          <span className="border border-primary/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Open
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> Roster ordering
          </span>
          <span>Closes: editable date</span>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {STORE_ITEMS.map((item) => (
          <li key={item.name} className="flex items-center gap-4 px-5 py-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center border border-border bg-surface-2 text-muted-foreground">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.meta}</p>
            </div>
            <span className="text-sm text-muted-foreground">{item.price}</span>
            <span className="hidden border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/70 sm:block">
              Add
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-border px-5 py-4">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-primary" /> Individual checkout for players & parents
        </p>
        <span className="bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
          Checkout
        </span>
      </div>
    </div>
  );
}
