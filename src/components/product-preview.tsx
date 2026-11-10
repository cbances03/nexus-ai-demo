"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Plus,
  MessageSquare,
  Orbit,
  PanelLeft,
  Sparkles,
} from "lucide-react";
import { tools, type ToolId } from "@/lib/data";
export function ProductPreview() {
  const [selected, setSelected] = useState<ToolId>("atlas");
  const tool = tools.find((t) => t.id === selected)!;
  return (
    <div className="product-preview">
      <div className="preview-bar">
        <div className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>Tu espacio de trabajo</span>
        <span className="demo-label">
          <span className="tiny-dot" /> DEMO LOCAL
        </span>
      </div>
      <div className="preview-body">
        <aside className="preview-sidebar" aria-label="Vista previa">
          <div className="preview-sidebar-heading">
            <Orbit size={18} /> nexus workspace
          </div>
          <Link href="/dashboard" className="preview-new">
            <Plus size={15} /> Nueva conversación
          </Link>
          <span className="sidebar-label">TU CAJA DE HERRAMIENTAS</span>
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={
                selected === t.id ? "preview-tool selected" : "preview-tool"
              }
              aria-pressed={selected === t.id}
            >
              <t.icon size={17} />
              {t.name}
              <span>{t.category}</span>
            </button>
          ))}
          <div className="preview-recent">
            <MessageSquare size={14} /> Tu próxima gran idea
          </div>
          <div className="preview-local">
            <span className="tiny-dot" /> Todo empieza con una idea
          </div>
        </aside>
        <div className="preview-main">
          <div className="preview-topline">
            <PanelLeft size={16} />
            <span>
              {tool.name} / {tool.category}
            </span>
            <span className="preview-version">Nexus 01</span>
          </div>
          <div className="preview-welcome">
            <span className={`tool-icon ${tool.color}`}>
              <tool.icon size={26} />
            </span>
            <h3>{tool.label}.</h3>
            <p>{tool.sample}</p>
            <Link
              href={`/dashboard?tool=${tool.id}`}
              className="preview-prompt"
            >
              {tool.prompt}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <Link
            href={`/dashboard?tool=${tool.id}`}
            className="preview-composer"
          >
            <span>¿Qué quieres crear hoy?</span>
            <span className="send-square">
              <ArrowUp size={18} />
            </span>
          </Link>
          <p className="preview-caption">
            <Sparkles size={12} /> Vista interactiva · Abre la demo para
            conversar
          </p>
        </div>
      </div>
    </div>
  );
}
