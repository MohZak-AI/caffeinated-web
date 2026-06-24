import { landingContent } from "@/app/_content/landing";

export function WorkPreview({
  window: windowContent,
}: {
  window: (typeof landingContent)["examples"]["windows"][number];
}) {
  const isCommerce = windowContent.type === "ecommerce";

  return (
    <article
      data-testid={`example-browser-window-${windowContent.id}`}
      data-cursor="hover"
      data-cursor-label={isCommerce ? "shop" : "train"}
      className="group overflow-hidden rounded-[26px] border border-cw-ink/18 bg-cw-ink shadow-[0_34px_90px_rgba(21,17,43,0.18)] transition-transform duration-500 ease-out hover:-translate-y-1"
    >
      <BrowserBar url={windowContent.urlBar} />
      {isCommerce ? (
        <ShopifyStorePreview window={windowContent} />
      ) : (
        <GymLandingPreview window={windowContent} />
      )}
    </article>
  );
}

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/15 cw-liquid--dark px-4 py-3">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-[#ff5f56]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-[#27c93f]" />
      </span>
      <div className="flex-1 rounded-full border border-cw-cream/15 bg-cw-cream/6 px-3 py-1 text-center font-mono text-xs text-cw-cream/52">
        {url}
      </div>
    </div>
  );
}

function ShopifyStorePreview({
  window: windowContent,
}: {
  window: Extract<(typeof landingContent)["examples"]["windows"][number], { type: "ecommerce" }>;
}) {
  return (
    <div
      data-testid="shopify-storefront-panel"
      className="relative min-h-[38rem] overflow-hidden bg-[--cw-shopify-void] p-5 text-white sm:p-6"
    >
      <div className="pointer-events-none absolute -right-28 -top-32 size-96 rounded-full bg-[--cw-shopify-mint]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-8 size-80 rounded-full bg-cw-orange/10 blur-3xl" />

      <header className="relative flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-[-0.04em]">
          {windowContent.brandName}
        </h3>
        <span className="rounded-full border border-white/14 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
          Cart 03
        </span>
      </header>

      <div className="relative mt-8 grid gap-6">
        <div className="rounded-[28px] border border-[--cw-shopify-border] bg-[--cw-shopify-surface] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--cw-shopify-mint]">
            {windowContent.label}
          </p>
          <h4 className="mt-5 max-w-xl text-[clamp(3.1rem,8vw,7rem)] font-light leading-[0.9] tracking-[-0.08em] text-white">
            {windowContent.heroHeadline}
          </h4>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/66">
            {windowContent.heroSubheadline}
          </p>
          <button
            type="button"
            data-cursor="hover"
            data-cursor-label="checkout"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-[--cw-shopify-void] transition-opacity duration-300 hover:opacity-85"
          >
            {windowContent.heroCta}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-2xl border border-[--cw-shopify-border] bg-[--cw-shopify-panel] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--cw-shopify-mint]">
              Featured bundle
            </p>
            <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">
              {windowContent.heroProduct.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/58">
              {windowContent.heroProduct.tagline}
            </p>
            <p className="mt-5 font-mono text-3xl font-semibold text-[--cw-shopify-mint]">
              {windowContent.heroProduct.price}
            </p>
          </div>
          <div className="grid gap-2">
            {windowContent.products.map((product) => (
              <div
                key={product.id}
                data-testid="product-card"
                data-cursor="hover"
                data-cursor-label="view"
                className="flex items-center justify-between gap-3 rounded-2xl border border-[--cw-shopify-border] bg-white/[0.045] p-4 transition-colors duration-300 hover:bg-white/[0.075]"
              >
                <div>
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/48">
                    {product.origin}
                  </p>
                </div>
                <p className="font-mono text-lg font-semibold text-[--cw-shopify-mint]">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GymLandingPreview({
  window: windowContent,
}: {
  window: Extract<(typeof landingContent)["examples"]["windows"][number], { type: "landing" }>;
}) {
  return (
    <div
      data-testid="gym-v3-preview-shell"
      className="relative min-h-[38rem] overflow-hidden bg-cw-ink p-5 text-cw-cream sm:p-6"
    >
      <video
        data-testid="gym-v3-bg-video"
        className="cw-bg-video pointer-events-none absolute inset-0 size-full object-cover opacity-25"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/gym-landing.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cw-ink/72 via-cw-ink/58 to-cw-ink/82"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]" aria-hidden="true">
        <div className="absolute inset-y-0 left-1/3 w-px bg-cw-cream" />
        <div className="absolute inset-y-0 left-2/3 w-px bg-cw-cream" />
        <div className="absolute inset-x-0 top-28 h-px bg-cw-cream" />
      </div>
      <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-cw-orange/20 blur-3xl" />

      <header className="relative flex items-start justify-between gap-4 border-b border-cw-cream/12 pb-5">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-cw-orange">
            {windowContent.label}
          </p>
          <h3 className="mt-2 text-4xl font-semibold uppercase leading-[0.86] tracking-[-0.05em] text-cw-cream sm:text-5xl">
            {windowContent.brandName}
          </h3>
        </div>
        <span className="rounded-full border border-cw-orange/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cw-orange">
          01 / Live
        </span>
      </header>

      <div
        data-testid="gym-v3-service-panel"
        className="relative mt-6 border border-cw-cream/12 bg-cw-cream/[0.045] p-5 sm:p-6"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cw-orange">
          [ Performance floor ]
        </p>
        <h4 className="mt-4 max-w-xl text-[clamp(2.8rem,7vw,6.6rem)] font-semibold uppercase leading-[0.82] tracking-[-0.07em] text-cw-cream">
          {windowContent.heroHeadline.replace(".", "")}
          <span className="block text-transparent [-webkit-text-stroke:1px_var(--cw-orange)]">
            online.
          </span>
        </h4>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-cw-cream/68">
          {windowContent.heroSubheadline}
        </p>
        <button
          type="button"
          data-cursor="hover"
          data-cursor-label="join"
          className="mt-6 inline-flex h-11 items-center overflow-hidden rounded-full bg-cw-orange px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cw-ink shadow-[0_14px_30px_rgba(255,138,42,0.22)] transition-colors duration-300 hover:bg-cw-sun"
        >
          {windowContent.heroCta}
        </button>
      </div>

      <div className="mt-4 grid gap-px overflow-hidden border border-cw-cream/12 bg-cw-cream/12 sm:grid-cols-3">
        {windowContent.highlights.map((item) => (
          <div
            key={item.title}
            data-testid="landing-highlight"
            data-cursor="hover"
            data-cursor-label="program"
            className="group bg-cw-ink p-4 transition-colors duration-300 hover:bg-cw-cream/[0.07]"
          >
            <span className="mb-5 block size-2 rotate-45 bg-cw-cream/45 transition-colors duration-300 group-hover:bg-cw-orange" />
            <h5 className="text-sm font-semibold text-cw-cream">{item.title}</h5>
            <p className="mt-2 text-xs leading-relaxed text-cw-cream/58">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
