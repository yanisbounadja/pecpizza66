"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "./site-config";
import {
  Flame,
  Leaf,
  MapPin,
  Phone,
  Pizza,
  Rocket,
  Scooter,
  ShoppingBag,
  Sparkles,
  Star,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from "lucide-react";

const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "Menu", href: "#menu" },
  { label: "A propos", href: "#apropos" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

const features = [
  { icon: Pizza, title: "Pate artisanale", text: "Fermentation soignee pour une texture legere et savoureuse." },
  { icon: Flame, title: "Cuisson parfaite", text: "Une cuisson maitrisee pour une pizza doree et reguliere." },
  { icon: Leaf, title: "Recettes genereuses", text: "Des associations gourmandes inspirees de l'Italie." },
  { icon: MapPin, title: "A Ille-sur-Tet", text: "Une pizzeria locale, proche de vous, au coeur de la ville." },
];

const pizzas = [
  {
    name: "Margherita",
    description: "Sauce tomate, mozzarella fondante, basilic frais.",
    price: "10,90 EUR",
    icon: UtensilsCrossed,
    category: "Base Tomate",
  },
  {
    name: "Reine",
    description: "Sauce tomate, mozzarella, jambon, champignons.",
    price: "12,90 EUR",
    icon: Star,
    category: "Base Tomate",
  },
  {
    name: "Merguez",
    description: "Sauce tomate, mozzarella, merguez, herbes.",
    price: "13,90 EUR",
    icon: Flame,
    category: "Base Tomate",
  },
  {
    name: "Boeuf BBQ",
    description: "Sauce tomate, mozzarella, boeuf, sauce barbecue.",
    price: "14,50 EUR",
    icon: UtensilsCrossed,
    category: "Base Tomate",
  },
  {
    name: "Calzone",
    description: "Sauce tomate, mozzarella, jambon, champignons.",
    price: "13,90 EUR",
    icon: Sparkles,
    category: "Base Tomate",
  },
  {
    name: "Vegetarienne",
    description: "Sauce tomate, mozzarella, legumes de saison.",
    price: "12,90 EUR",
    icon: Leaf,
    category: "Base Tomate",
  },
  {
    name: "Tartiflette",
    description: "Base creme, mozzarella, pommes de terre, lardons, oignons.",
    price: "15,90 EUR",
    icon: Pizza,
    category: "Base Creme",
  },
  {
    name: "Poulet Curry",
    description: "Base creme, mozzarella, poulet marine curry.",
    price: "14,90 EUR",
    icon: Flame,
    category: "Base Creme",
  },
  {
    name: "Saumon",
    description: "Base creme, mozzarella, saumon, touche citronnee.",
    price: "16,90 EUR",
    icon: Star,
    category: "Base Creme",
  },
  {
    name: "Chevre Miel",
    description: "Base creme, mozzarella, chevre, filet de miel.",
    price: "14,90 EUR",
    icon: Sparkles,
    category: "Base Creme",
  },
  {
    name: "Kebab",
    description: "Base creme, mozzarella, viande kebab, oignons.",
    price: "13,90 EUR",
    icon: Rocket,
    category: "Base Creme",
  },
  {
    name: "4 Fromages",
    description: "Base creme, mozzarella, chevre, gorgonzola, emmental.",
    price: "14,90 EUR",
    icon: Pizza,
    category: "Base Creme",
  },
  {
    name: "Pizza de Saison",
    description: "Recette signature selon les produits du moment.",
    price: "15,90 EUR",
    icon: Rocket,
    category: "Specialite",
  },
  {
    name: "Nutella Banane Speculoos",
    description: "Pate pizza sucree, creme nutella, banane et speculoos.",
    price: "9,90 EUR",
    icon: Sparkles,
    category: "Dessert",
  },
];

const reviews = [
  {
    quote: "Une des meilleures pizzas du coin.",
    author: "Camille R.",
  },
  {
    quote: "Pate excellente, service rapide, rien a dire.",
    author: "Julien M.",
  },
  {
    quote: "Tres bonne adresse a Ille-sur-Tet.",
    author: "Nora B.",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const ctaPrimary =
  "rounded-full bg-[#C62828] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(198,40,40,0.45)] transition hover:scale-[1.03] hover:bg-[#B71C1C] hover:shadow-[0_18px_40px_rgba(198,40,40,0.55)]";
const ctaSecondary =
  "rounded-full border border-[#2E7D32]/40 bg-[#2E7D32]/15 px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition hover:scale-[1.03] hover:bg-[#2E7D32]/25";
const pizzaMenuImageUrl =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80";

/** Parent du menu : orchestre le stagger sans exiger un second passage `whileInView` sur la grille (problème mobile). */
const menuSectionOrchestrator = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const IconBadge = ({ icon: Icon, className }: { icon: LucideIcon; className?: string }) => (
  <span className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-1.5">
    <Icon className={className ?? "h-4 w-4"} strokeWidth={2} />
  </span>
);

type PizzaItem = (typeof pizzas)[number];

export default function Page() {
  const { scrollY } = useScroll();
  const heroBadgeY = useTransform(scrollY, [0, 500], [0, -24]);
  const orbY = useTransform(scrollY, [0, 1200], [0, -100]);
  const heroCardY = useTransform(scrollY, [0, 800], [0, -45]);
  const [selectedPizza, setSelectedPizza] = useState<PizzaItem | null>(null);

  useEffect(() => {
    if (!selectedPizza) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPizza(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPizza]);

  return (
    <main className="relative overflow-hidden bg-[#0B0B0B] text-[#F5F5F5] selection:bg-[#C62828] selection:text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: orbY }}
          className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#C62828]/30 blur-3xl"
        />
        <motion.div
          style={{ y: heroBadgeY }}
          className="absolute right-0 top-40 h-72 w-72 rounded-full bg-[#2E7D32]/20 blur-3xl"
        />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#2E7D32]/12 blur-3xl" />
        <div className="absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-[#C62828]/16 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(46,125,50,0.04)_0%,rgba(11,11,11,0)_18%,rgba(11,11,11,0.78)_100%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0B]/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#accueil" className="inline-flex items-center">
            <img src="/logo-pec.png" alt="Logo PEC" className="h-12 w-12 rounded-full object-cover sm:h-14 sm:w-14" />
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.08em] text-[#A0A0A0] transition hover:text-[#F5F5F5]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#2E7D32]/45 bg-[#2E7D32]/18 px-4 py-2 text-sm font-medium text-[#F5F5F5] transition hover:scale-[1.04] hover:bg-[#2E7D32]/28"
            >
              <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden />
              Commander
            </a>
            <a
              href="https://gomanger.fr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#C62828]/45 bg-[#C62828]/22 px-4 py-2 text-sm font-medium text-white transition hover:scale-[1.04] hover:bg-[#C62828]/32"
            >
              <Scooter className="h-4 w-4 shrink-0" aria-hidden />
              GoManger
            </a>
          </div>
        </div>
      </header>

      <section
        id="accueil"
        className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl items-center px-5 py-16 sm:px-8"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <motion.span
              style={{ y: heroBadgeY }}
              className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#A0A0A0]"
            >
              Fait maison - Produits frais - A Ille-sur-Tet
            </motion.span>
            <div className="space-y-5">
              <h1 className="max-w-3xl bg-gradient-to-r from-[#F5F5F5] via-[#DADADA] to-[#F5F5F5] bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl lg:text-6xl">
                PEC — La pizza artisanale a Ille-sur-Tet
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[#A0A0A0] sm:text-lg">
                Des pizzas genereuses, une pate travaillee, des ingredients selectionnes et le gout du vrai.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className={ctaPrimary}>
                <span className="inline-flex items-center gap-2">
                  Commander maintenant
                  <Rocket className="h-4 w-4" />
                </span>
              </motion.a>
              <motion.a href="#menu" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className={ctaSecondary}>
                <span className="inline-flex items-center gap-2">
                  Voir le menu
                  <Sparkles className="h-4 w-4" />
                </span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            style={{ y: heroCardY }}
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto aspect-square max-w-[480px] rounded-full border border-white/15 bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#101010] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(46,125,50,0.22),transparent_45%),radial-gradient(circle_at_70%_75%,rgba(198,40,40,0.3),transparent_48%),#181818]">
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle,rgba(245,245,245,0.18)_0%,rgba(198,40,40,0.18)_55%,rgba(255,255,255,0)_80%)]"
                />
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white/20 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
                    alt="Pizza artisanale PEC"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-6 flex justify-center">
                  <img src="/logo-pec.png" alt="Logo PEC" className="h-14 w-14 rounded-full object-cover opacity-90" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto h-12 w-full max-w-7xl bg-[radial-gradient(circle_at_50%_-10%,rgba(198,40,40,0.2),transparent_55%)]" />

      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={sectionVariant}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-6 shadow-[0_16px_30px_rgba(0,0,0,0.2)]"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4 text-3xl"
              >
                <feature.icon className="h-7 w-7 text-[#2E7D32]" strokeWidth={2.2} />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[#A0A0A0]">{feature.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        id="menu"
        variants={menuSectionOrchestrator}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08, margin: "0px 0px 120px 0px" }}
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
      >
        <motion.div variants={sectionVariant} className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#2E7D32]">Menu selectionne</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Des pizzas gourmandes qui marquent les esprits</h2>
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pizzas.map((pizza) => (
            <motion.article
              key={pizza.name}
              variants={sectionVariant}
              whileHover={{ y: -8, scale: 1.015 }}
              tabIndex={0}
              role="button"
              aria-haspopup="dialog"
              aria-label={`Details de la pizza ${pizza.name}`}
              onClick={() => setSelectedPizza(pizza)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPizza(pizza);
                }
              }}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-6 text-left shadow-[0_20px_40px_rgba(0,0,0,0.25)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(46,125,50,0.14),transparent_35%)] opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="mb-5 block overflow-hidden rounded-2xl border border-white/15">
                <img
                  src={pizzaMenuImageUrl}
                  alt=""
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="inline-flex items-center gap-2 text-xl font-semibold">
                  {pizza.name}
                  <IconBadge icon={pizza.icon} className="h-4 w-4 text-[#2E7D32]" />
                </h3>
                <span className="rounded-full border border-[#2E7D32]/45 bg-[#2E7D32]/14 px-3 py-1 text-xs text-[#F5F5F5]/90">
                  {pizza.price}
                </span>
              </div>
              <p className="mb-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#A0A0A0]">
                {pizza.category}
              </p>
              <p className="text-sm leading-relaxed text-[#A0A0A0]">{pizza.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <div className="mx-auto h-12 w-full max-w-7xl bg-[radial-gradient(circle_at_50%_120%,rgba(46,125,50,0.2),transparent_55%)]" />

      <motion.section
        id="apropos"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
      >
        <div className="rounded-[2.2rem] border border-white/10 bg-[#1A1A1A] p-8 sm:p-12">
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#2E7D32]">A propos de PEC</p>
          <p className="max-w-4xl text-lg leading-relaxed text-[#F5F5F5]/88">
            Chez PEC, chaque pizza est preparee avec soin, avec une pate travaillee, des ingredients selectionnes et une cuisson maitrisee. Notre objectif : proposer une pizza genereuse, savoureuse et reguliere, au coeur d&apos;Ille-sur-Tet.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="avis"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
      >
        <h2 className="mb-10 inline-flex items-center gap-2 text-3xl font-semibold sm:text-4xl">
          Ils parlent de PEC
          <Star className="h-6 w-6 text-[#2E7D32]" />
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {reviews.map((review) => (
            <motion.article
              key={review.quote}
              variants={sectionVariant}
              whileHover={{ y: -6 }}
              className="rounded-[2rem] border border-white/10 bg-[#1A1A1A] p-6 shadow-[0_16px_30px_rgba(0,0,0,0.22)]"
            >
              <div className="mb-3 inline-flex items-center gap-1 text-[#2E7D32]">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="mb-4 text-[#F5F5F5]/88">{review.quote}</p>
              <p className="text-sm text-[#A0A0A0]">{review.author}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
      >
        <div className="rounded-[2.2rem] border border-white/20 bg-[linear-gradient(125deg,rgba(198,40,40,0.28),rgba(11,11,11,0.9),rgba(46,125,50,0.24))] p-8 sm:p-12">
          <h3 className="mb-3 text-3xl font-semibold sm:text-4xl">Une envie de pizza ce soir ?</h3>
          <p className="mb-8 max-w-2xl text-[#A0A0A0]">
            Une equipe rapide, une qualite constante et des recettes qui donnent vraiment envie de recommander.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href={`tel:${siteConfig.telephone}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className={ctaPrimary}
            >
              <span className="inline-flex items-center gap-2">
                Appeler PEC
                <Phone className="h-4 w-4" />
              </span>
            </motion.a>
            <motion.a
              href="https://maps.google.com/?q=Ille-sur-Tet"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-[#2E7D32]/45 bg-[#2E7D32]/15 px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition hover:bg-[#2E7D32]/25"
            >
              <span className="inline-flex items-center gap-2">
                Voir l&apos;itineraire
                <MapPin className="h-4 w-4" />
              </span>
            </motion.a>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-8"
      >
        <div className="grid gap-8 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(26,26,26,0.95),rgba(17,17,17,0.95))] p-8 shadow-[0_24px_55px_rgba(0,0,0,0.35)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <h2 className="inline-flex items-center gap-2 text-3xl font-semibold text-[#F5F5F5]">
              Contact
              <MapPin className="h-6 w-6 text-[#2E7D32]" />
            </h2>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-[#A0A0A0]">Etablissement</p>
              <p className="text-[#F5F5F5]/88">PEC</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=59+avenue+Pasteur+66130+Ille-sur-Tet"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-wrap items-center gap-2 text-sm text-[#A0A0A0] transition hover:text-[#2E7D32]"
              >
                <span className="font-medium text-[#F5F5F5] underline decoration-white/20 underline-offset-4 transition group-hover:decoration-[#2E7D32]/80">
                  59 avenue Pasteur, 66130 Ille-sur-Tet
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#2E7D32]">
                  <Leaf className="h-3.5 w-3.5" />
                  Google Maps
                </span>
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#C62828]/30 bg-[#C62828]/10 p-4">
                <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[#F5F5F5]/70">Telephone</p>
                <a
                  href={`tel:${siteConfig.telephone}`}
                  className="group inline-flex flex-col gap-1 text-sm font-medium text-[#F5F5F5] transition hover:text-white"
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#C62828]" />
                    {siteConfig.telephoneDisplay}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F5F5F5]/70 transition group-hover:text-[#F5F5F5]">
                    Appeler maintenant
                  </span>
                </a>
              </div>
              <div className="rounded-2xl border border-[#2E7D32]/30 bg-[#2E7D32]/10 p-4">
                <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[#F5F5F5]/70">Horaires</p>
                <p className="text-sm font-medium text-[#F5F5F5]">18h00 - 22H</p>
                <p className="text-xs text-[#A0A0A0]">Tous les jours, mardi fermee</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_14px_35px_rgba(0,0,0,0.35)]">
              <iframe
                title="Carte PEC Ille-sur-Tet"
                src="https://maps.google.com/maps?q=59%20avenue%20Pasteur%2066130%20Ille-sur-Tet&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedPizza ? (
          <motion.div
            key="pizza-modal"
            role="presentation"
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedPizza(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="pizza-dialog-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[min(90vh,880px)] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-white/15 bg-[#161616] p-6 pb-8 shadow-[0_-24px_60px_rgba(0,0,0,0.55)] sm:rounded-[2rem] sm:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/5 p-2 text-[#F5F5F5] transition hover:bg-white/10"
                onClick={() => setSelectedPizza(null)}
                aria-label="Fermer la fenetre"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
              <div className="mb-5 overflow-hidden rounded-2xl border border-white/15">
                <img
                  src={pizzaMenuImageUrl}
                  alt={`Pizza ${selectedPizza.name}`}
                  className="aspect-[4/3] w-full object-cover sm:aspect-video"
                />
              </div>
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3 pr-10">
                <h2 id="pizza-dialog-title" className="inline-flex items-center gap-2 text-2xl font-semibold text-[#F5F5F5]">
                  {selectedPizza.name}
                  <IconBadge icon={selectedPizza.icon} className="h-5 w-5 text-[#2E7D32]" />
                </h2>
                <span className="shrink-0 rounded-full border border-[#2E7D32]/45 bg-[#2E7D32]/14 px-3 py-1.5 text-sm font-medium text-[#F5F5F5]/95">
                  {selectedPizza.price}
                </span>
              </div>
              <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#A0A0A0]">
                {selectedPizza.category}
              </p>
              <p className="mb-6 text-base leading-relaxed text-[#C8C8C8]">{selectedPizza.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`tel:${siteConfig.telephone}`} className={ctaPrimary}>
                  <span className="inline-flex items-center gap-2">
                    Appeler
                    <Phone className="h-4 w-4" />
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedPizza(null)}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition hover:bg-white/10"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <footer className="border-t border-white/10 bg-[#111111] py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex items-center gap-4">
            <img
              src="/logo-pec.png"
              alt="Logo PEC"
              className="h-12 w-12 rounded-full border border-white/20 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            />
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-[0.12em] text-[#F5F5F5]">PEC © 2026</p>
              <p className="text-sm text-[#A0A0A0]">Pizzeria artisanale a Ille-sur-Tet</p>
              <a
                href="https://www.pappers.fr/entreprise/pec-102377082"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs text-[#707070] underline decoration-white/15 underline-offset-4 transition hover:text-[#2E7D32] hover:decoration-[#2E7D32]/60"
              >
                Fiche entreprise (Pappers)
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2E7D32]/35 bg-[#2E7D32]/10 px-4 py-2 text-xs font-medium text-[#F5F5F5]">
              <MapPin className="h-3.5 w-3.5" />
              Ille-sur-Tet
            </span>
            <a
              href="https://gomanger.fr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#C62828]/35 bg-[#C62828]/15 px-4 py-2 text-xs font-semibold text-[#F5F5F5] shadow-[0_8px_20px_rgba(198,40,40,0.22)] transition hover:-translate-y-0.5 hover:bg-[#C62828]/25"
            >
              <Scooter className="h-3.5 w-3.5 shrink-0" aria-hidden />
              GoManger
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
