type MotionGroup = {
  trigger: HTMLElement;
  items: HTMLElement[];
};

const groupSelector = '[class*="grid"], .method-steps, .analysis-steps, .transition-process ol, .faq-list';
const revealSelector = 'main .section-heading, main .faq-intro, main .values-heading, main .privacy-content > section, main .error-page > *';

function directChildren(element: Element): HTMLElement[] {
  return Array.from(element.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
}

function collectMotionGroups(): MotionGroup[] {
  const groups: MotionGroup[] = [];

  for (const element of document.querySelectorAll<HTMLElement>(revealSelector)) {
    groups.push({ trigger: element, items: [element] });
  }

  for (const element of document.querySelectorAll<HTMLElement>(`main ${groupSelector}`)) {
    const items = directChildren(element);
    if (items.length > 0) groups.push({ trigger: element, items });
  }

  return groups;
}

export async function initMotion(): Promise<void> {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const heroElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-motion-hero], .privacy-hero .internal-hero-copy'),
  );
  const groups = collectMotionGroups();
  if (heroElements.length === 0 && groups.length === 0) return;

  let gsap: typeof import('gsap').gsap;
  try {
    ({ gsap } = await import('gsap'));
  } catch {
    return;
  }
  if (reducedMotion.matches) return;

  const activeTweens: Array<{ kill: () => void }> = [];
  const animatedElements = new Set<HTMLElement>();

  for (const hero of heroElements) {
    const isVisual = hero.classList.contains('hero-visual');
    const targets = isVisual ? [hero] : directChildren(hero);
    if (targets.length === 0) continue;

    targets.forEach((target) => animatedElements.add(target));
    activeTweens.push(
      gsap.fromTo(
        targets,
        { y: isVisual ? 8 : 10, autoAlpha: 0.9, ...(isVisual ? { scale: 0.99 } : {}) },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: isVisual ? 0.72 : 0.56,
          stagger: isVisual ? 0 : 0.07,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
        },
      ),
    );
  }

  const groupsByTrigger = new Map(groups.map((group) => [group.trigger, group]));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const group = groupsByTrigger.get(entry.target as HTMLElement);
        if (!group) continue;

        group.items.forEach((item) => animatedElements.add(item));
        activeTweens.push(
          gsap.fromTo(
            group.items,
            { y: 12, autoAlpha: 0.9, transition: 'none' },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.48,
              stagger: group.items.length > 1 ? 0.055 : 0,
              ease: 'power2.out',
              clearProps: 'transform,opacity,visibility,transition',
            },
          ),
        );
      }
    },
    { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
  );

  groups.forEach(({ trigger }) => observer.observe(trigger));

  reducedMotion.addEventListener(
    'change',
    (event) => {
      if (!event.matches) return;
      observer.disconnect();
      activeTweens.forEach((tween) => tween.kill());
      gsap.set(Array.from(animatedElements), {
        clearProps: 'transform,opacity,visibility,transition',
      });
    },
    { once: true },
  );
}
