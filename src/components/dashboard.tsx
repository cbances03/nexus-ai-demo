"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUp,
  Plus,
  MessageSquare,
  Trash2,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Copy,
  Check,
  Orbit,
  Info,
} from "lucide-react";
import { tools, type ToolId } from "@/lib/data";
import { reply, type Conversation } from "@/lib/chat";
import { useWorkspace } from "@/hooks/use-workspace";
import { Modal, Toast } from "./ui";
export function Dashboard({ initialTool }: { initialTool?: ToolId }) {
  const { data, corrupt, update } = useWorkspace();
  const [selectedTool, setSelectedTool] = useState<ToolId>(
    initialTool ?? "atlas",
  );
  const [forceNew, setForceNew] = useState(!!initialTool);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [copied, setCopied] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const active = forceNew
    ? undefined
    : data.conversations.find((c) => c.id === data.activeId);
  const tool = tools.find((t) => t.id === (active?.tool ?? selectedTool))!;
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    end.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
    });
  }, [active?.messages.length, busy]);
  function saved(ok: boolean) {
    if (!ok)
      setNotice(
        "Almacenamiento no disponible. Los cambios duran solo en esta pestaña.",
      );
  }
  function newChat(id: ToolId = tool.id) {
    setForceNew(true);
    setSelectedTool(id);
    setInput("");
    setError("");
    setHistoryOpen(false);
    textarea.current?.focus();
  }
  function send(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const text = input.trim();
    if (!text) {
      setError("Escribe una idea antes de enviarla.");
      textarea.current?.focus();
      return;
    }
    if (active && active.messages.length >= 98) {
      setError(
        "Esta conversación alcanzó el límite de la demo. Inicia una nueva.",
      );
      return;
    }
    if (!active && data.conversations.length >= 30) {
      setError(
        "Has alcanzado 30 conversaciones. Elimina alguna para continuar.",
      );
      return;
    }
    const id = active?.id ?? crypto.randomUUID();
    const toolId = tool.id;
    const message = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: text,
    };
    saved(
      update((prev) => {
        const existing = prev.conversations.find((c) => c.id === id);
        const conversation: Conversation = existing
          ? { ...existing, messages: [...existing.messages, message] }
          : { id, title: text.slice(0, 52), tool: toolId, messages: [message] };
        return {
          activeId: id,
          conversations: existing
            ? prev.conversations.map((c) => (c.id === id ? conversation : c))
            : [conversation, ...prev.conversations],
        };
      }),
    );
    window.history.replaceState(null, "", "/dashboard");
    setForceNew(false);
    setInput("");
    setError("");
    setBusy(true);
    timer.current = setTimeout(() => {
      saved(
        update((prev) => ({
          ...prev,
          conversations: prev.conversations.map((c) =>
            c.id === id
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    {
                      id: crypto.randomUUID(),
                      role: "assistant",
                      content: reply(toolId, text),
                    },
                  ],
                }
              : c,
          ),
        })),
      );
      setBusy(false);
    }, 650);
  }
  function remove() {
    let persisted: boolean;
    if (confirm === "all") {
      persisted = update({ activeId: null, conversations: [] });
      setForceNew(true);
    } else {
      persisted = update((prev) => {
        const remaining = prev.conversations.filter((c) => c.id !== confirm);
        return {
          conversations: remaining,
          activeId:
            prev.activeId === confirm
              ? (remaining[0]?.id ?? null)
              : prev.activeId,
        };
      });
    }
    setNotice(
      persisted
        ? confirm === "all"
          ? "Historial borrado de esta demo."
          : "Conversación eliminada."
        : "Almacenamiento no disponible. La eliminación solo se aplica en esta pestaña.",
    );
    setConfirm(null);
  }
  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setNotice("Respuesta copiada.");
    } catch {
      setNotice(
        "No se pudo copiar. Selecciona el texto para copiarlo manualmente.",
      );
    }
  }
  return (
    <main id="contenido" className="workspace">
      <aside
        className={`workspace-sidebar ${historyOpen ? "history-open" : ""}`}
      >
        <div className="workspace-sidebar-title">
          <Orbit size={18} />
          <span>Mi espacio</span>
          <span className="chip">LOCAL</span>
        </div>
        <button
          className="button new-chat"
          disabled={busy}
          onClick={() => newChat()}
        >
          <Plus size={17} /> Nueva conversación
        </button>
        <span className="sidebar-label">HERRAMIENTAS</span>
        <div className="workspace-tools">
          {tools.map((t) => (
            <button
              key={t.id}
              disabled={busy}
              className={tool.id === t.id ? "selected" : ""}
              aria-pressed={tool.id === t.id}
              onClick={() => newChat(t.id)}
            >
              <t.icon size={18} />
              <span>
                {t.name}
                <small>{t.category}</small>
              </span>
              {tool.id === t.id && <span className="tiny-dot" />}
            </button>
          ))}
        </div>
        <div className="history-heading">
          <span className="sidebar-label">
            CONVERSACIONES · {data.conversations.length}
          </span>
          <button
            className="icon-button"
            aria-label="Borrar todo el historial"
            disabled={busy || !data.conversations.length}
            onClick={() => setConfirm("all")}
          >
            <Trash2 size={14} />
          </button>
        </div>
        <div className="history-list">
          {!data.conversations.length && (
            <p>
              Aún no hay conversaciones.
              <br />
              Tu próxima idea puede ser la primera.
            </p>
          )}
          {data.conversations.map((c) => (
            <div
              key={c.id}
              className={
                active?.id === c.id ? "history-item selected" : "history-item"
              }
            >
              <button
                disabled={busy}
                onClick={() => {
                  saved(update((prev) => ({ ...prev, activeId: c.id })));
                  setForceNew(false);
                  setHistoryOpen(false);
                  setError("");
                }}
                aria-current={active?.id === c.id ? "true" : undefined}
              >
                <MessageSquare size={14} />
                <span>
                  {c.title}
                  {c.example && <small>Ejemplo precargado</small>}
                </span>
              </button>
              <button
                className="icon-button"
                aria-label={`Eliminar ${c.title}`}
                disabled={busy}
                onClick={() => setConfirm(c.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="sidebar-privacy">
          <ShieldCheck size={17} />
          <span>
            Guardado en tu navegador
            <small>Sin cuenta. Sin sincronización.</small>
          </span>
        </div>
      </aside>
      <section className="workspace-main" aria-label="Conversación">
        <div className="workspace-toolbar">
          <button
            className="history-toggle button button-secondary"
            aria-expanded={historyOpen}
            onClick={() => setHistoryOpen(!historyOpen)}
          >
            Historial <ChevronDown size={15} />
          </button>
          <div className="workspace-tool-title">
            <tool.icon size={18} />
            <span>{tool.name}</span>
            <span className="toolbar-divider">/</span>
            <small>{tool.label}</small>
          </div>
          <span className="demo-label">
            <span className="tiny-dot" /> SIMULADOR LOCAL
          </span>
        </div>
        <div className="simulation-banner">
          <Info size={16} />
          <p>
            Respuestas con reglas y plantillas locales.{" "}
            <strong>No hay una IA conectada.</strong>
          </p>
        </div>
        {corrupt && (
          <div className="storage-warning" role="alert">
            El historial guardado no es válido. Mostramos un ejemplo seguro; al
            guardar una conversación se reemplazarán los datos dañados.
          </div>
        )}
        <div className="chat-scroll">
          {active?.messages.length ? (
            <>
              <div className="conversation-title">
                <span className="eyebrow">
                  {active.example
                    ? "CONVERSACIÓN DE EJEMPLO"
                    : "TU CONVERSACIÓN"}
                </span>
                <h1>{active.title}</h1>
              </div>
              <div
                className="messages"
                role="log"
                aria-label="Mensajes"
                aria-live="polite"
                aria-relevant="additions"
              >
                {active.messages.map((m) => (
                  <article key={m.id} className={`message ${m.role}`}>
                    <div className="message-avatar">
                      {m.role === "assistant" ? <tool.icon size={17} /> : "TÚ"}
                    </div>
                    <div className="message-content">
                      <div className="message-meta">
                        <strong>
                          {m.role === "assistant" ? tool.name : "Tú"}
                        </strong>
                        {m.role === "assistant" && <span>Resultado local</span>}
                      </div>
                      <p>{m.content}</p>
                      {m.role === "assistant" && (
                        <button
                          className="copy-button"
                          onClick={() => copy(m.id, m.content)}
                          aria-label="Copiar respuesta"
                        >
                          {copied === m.id ? (
                            <Check size={13} />
                          ) : (
                            <Copy size={13} />
                          )}{" "}
                          Copiar
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="chat-welcome">
              <span className={`tool-icon large ${tool.color}`}>
                <tool.icon size={31} />
              </span>
              <span className="eyebrow">TU ESPACIO PARA EXPLORAR</span>
              <h1>{tool.label}.</h1>
              <p>{tool.description}</p>
              <div className="starter-prompts">
                <button
                  disabled={busy}
                  onClick={() => {
                    setInput(tool.prompt);
                    textarea.current?.focus();
                  }}
                >
                  <Sparkles size={17} />
                  <span>{tool.prompt}</span>
                  <Plus size={16} />
                </button>
              </div>
              <p className="welcome-tip">
                El ejemplo se carga en el editor. Puedes adaptarlo antes de
                enviar.
              </p>
            </div>
          )}
          {busy && (
            <div className="typing" role="status">
              <span />
              <span />
              <span /> Preparando respuesta local…
            </div>
          )}
          <div ref={end} />
        </div>
        <form className="composer-area" onSubmit={send} noValidate>
          <div className="composer">
            <label htmlFor="chat-input" className="sr-only">
              Tu mensaje para {tool.name}
            </label>
            <textarea
              ref={textarea}
              id="chat-input"
              placeholder={`Comparte tu idea con ${tool.name}…`}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError("");
              }}
              maxLength={2000}
              rows={2}
              disabled={busy}
              aria-invalid={!!error}
              aria-describedby={error ? "chat-error" : "chat-help"}
            />
            <div className="composer-controls">
              <span>
                <tool.icon size={13} /> {tool.name}
                <span className="input-count">{input.length}/2000</span>
              </span>
              <button
                className="send-button"
                type="submit"
                aria-label="Enviar mensaje"
                disabled={busy}
              >
                <ArrowUp size={19} />
              </button>
            </div>
          </div>
          {error && (
            <p id="chat-error" className="form-error" role="alert">
              {error}
            </p>
          )}
          <p id="chat-help" className="composer-help">
            Revisa los resultados antes de usarlos. No compartas información
            sensible en una demo.
          </p>
        </form>
      </section>
      {confirm && (
        <Modal
          title={
            confirm === "all"
              ? "¿Borrar todo el historial?"
              : "¿Eliminar esta conversación?"
          }
          close={() => setConfirm(null)}
        >
          <p className="modal-description">
            Esta acción elimina{" "}
            {confirm === "all" ? "las conversaciones" : "esta conversación"} del
            almacenamiento de esta demo y no se puede deshacer.
          </p>
          <div className="dialog-actions">
            <button
              className="button button-secondary"
              onClick={() => setConfirm(null)}
            >
              Cancelar
            </button>
            <button className="button button-danger" onClick={remove}>
              Confirmar eliminación
            </button>
          </div>
        </Modal>
      )}
      <Toast message={notice} />
    </main>
  );
}
