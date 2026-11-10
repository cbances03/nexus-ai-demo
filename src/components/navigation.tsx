"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Menu, X, Orbit } from "lucide-react";
import { navigation } from "@/lib/data";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Nexus AI, inicio">
      <span className="brand-symbol">
        <Orbit size={23} strokeWidth={1.6} />
      </span>
      nexus<span className="brand-ai">ai</span>
    </Link>
  );
}
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-small nav-cta" href="/dashboard">
          Abrir demo <ArrowUpRight size={15} />
        </Link>
        <button
          className="icon-button mobile-toggle"
          ref={toggle}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Navegación móvil"
        >
          {[...navigation, { href: "/dashboard", label: "Abrir demo" }].map(
            (n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {n.label}
                <ArrowUpRight size={16} />
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  if (usePathname() === "/dashboard")
    return (
      <footer className="workspace-footer">
        Nexus AI · Demo local · Sin conexión a un modelo de IA
      </footer>
    );
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <div>
          <Brand />
          <p>Más espacio para lo que imaginas.</p>
        </div>
        <nav aria-label="Navegación del pie">
          {navigation.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/dashboard">Dashboard demo</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Nexus AI. Producto ficticio de
          demostración.
        </span>
        <span>
          <span className="tiny-dot" /> Hecho para explorar. Sin cuentas ni
          pagos.
        </span>
      </div>
    </footer>
  );
}
