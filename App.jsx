import React, { useState, useEffect, useCallback } from "react";
import { Clock, Phone, User, Check, X, Lock, Unlock, Settings, ChevronLeft, ChevronRight, CalendarX, Loader2, ShieldCheck, MessageCircle, Send, UserPlus, ArrowLeft, UserCheck, Users } from "lucide-react";
import { storage } from "./lib/storage.js";

const COLORS = {
  bg: "#0A0A0A",
  surface: "#161616",
  surfaceAlt: "#1F1F1F",
  cream: "#EDEDED",
  creamMuted: "#8F8F8F",
  brass: "#C7CCD1",
  brassDim: "#6E7378",
  red: "#9C3B3B",
  redDim: "#5A2222",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Libre+Franklin:wght@300;400;500;600&display=swap');`;

const LOGO_SRC = "data:image/webp;base64,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";

function pad(n) { return String(n).padStart(2, "0"); }
function toDateStr(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function addDays(base, n) { const d = new Date(base); d.setDate(d.getDate() + n); return d; }
const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function generateSlots(workStart, workEnd, slotMinutes) {
  const slots = [];
  const [sh, sm] = workStart.split(":").map(Number);
  const [eh, em] = workEnd.split(":").map(Number);
  let cur = sh * 60 + sm;
  const end = eh * 60 + em;
  while (cur + slotMinutes <= end) {
    slots.push(`${pad(Math.floor(cur / 60))}:${pad(cur % 60)}`);
    cur += slotMinutes;
  }
  return slots;
}

function StripeDivider({ height = 10 }) {
  return (
    <div
      style={{
        height,
        backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.red} 0px, ${COLORS.red} 14px, ${COLORS.brass} 14px, ${COLORS.brass} 28px, #444 28px, #444 42px)`,
      }}
    />
  );
}

export default function BarberApp() {
  const [mode, setMode] = useState("cliente");
  const [barberUnlocked, setBarberUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [settings, setSettings] = useState({ shopName: "IL Capo BarberShop", tagline: "BarberShop", workStart: "11:00", workEnd: "20:00", slotMinutes: 45, barberPin: "1234", phone: "3319424155" });
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [dayOffset, setDayOffset] = useState(0);
  const [dayData, setDayData] = useState({ blockedDay: false, blockedSlots: [], appointments: [] });
  const [dayLoading, setDayLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", service: "Corte" });
  const [confirming, setConfirming] = useState(false);
  const [confirmedInfo, setConfirmedInfo] = useState(null);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState(settings);
  const [lookupPhone, setLookupPhone] = useState("");
  const [lookupResults, setLookupResults] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  // --- Social / accounts / chat state ---
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [regForm, setRegForm] = useState({ name: "", phone: "" });
  const [regError, setRegError] = useState("");
  const [regSaving, setRegSaving] = useState(false);
  const [clienteTab, setClienteTab] = useState("reservar");
  const [barberoTab, setBarberoTab] = useState("agenda");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [clientsList, setClientsList] = useState(null);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Load personal profile (this device's registered identity) once
  useEffect(() => {
    (async () => {
      try {
        const res = await storage.get("my-profile", false);
        if (res && res.value) {
          const p = JSON.parse(res.value);
          setProfile(p);
          setBookingForm((f) => ({ ...f, name: p.name, phone: p.phone }));
        }
      } catch (e) { /* not registered yet */ }
      setProfileLoaded(true);
    })();
  }, []);

  async function handleRegister() {
    if (!regForm.name.trim() || !regForm.phone.trim()) {
      setRegError("Completa tu nombre y teléfono.");
      return;
    }
    setRegSaving(true);
    setRegError("");
    const cleanPhone = regForm.phone.trim().replace(/\s/g, "");
    const newProfile = { name: regForm.name.trim(), phone: cleanPhone };
    try {
      await storage.set("my-profile", JSON.stringify(newProfile), false);
      const existing = await storage.get(`client-${cleanPhone}`, true).catch(() => null);
      const prev = existing && existing.value ? JSON.parse(existing.value) : {};
      const record = {
        name: newProfile.name,
        phone: cleanPhone,
        followsShop: true,
        shopFollows: prev.shopFollows || false,
        registeredAt: prev.registeredAt || new Date().toISOString(),
      };
      await storage.set(`client-${cleanPhone}`, JSON.stringify(record), true);
      setProfile(newProfile);
      setBookingForm((f) => ({ ...f, name: newProfile.name, phone: newProfile.phone }));
    } catch (e) {
      setRegError("No se pudo completar el registro. Intenta de nuevo.");
    }
    setRegSaving(false);
  }

  const loadChat = useCallback(async (phone) => {
    setChatLoading(true);
    try {
      const res = await storage.get(`chat-${phone}`, true);
      setChatMessages(res && res.value ? JSON.parse(res.value) : []);
    } catch (e) {
      setChatMessages([]);
    }
    setChatLoading(false);
  }, []);

  async function sendChatMessage(phone, from, text) {
    if (!text.trim()) return;
    setChatSending(true);
    const res = await storage.get(`chat-${phone}`, true).catch(() => null);
    const latest = res && res.value ? JSON.parse(res.value) : [];
    const msg = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, from, text: text.trim(), ts: new Date().toISOString() };
    const next = [...latest, msg];
    try {
      await storage.set(`chat-${phone}`, JSON.stringify(next), true);
      setChatMessages(next);
    } catch (e) { /* ignore */ }
    setChatSending(false);
  }

  const loadClients = useCallback(async () => {
    setClientsLoading(true);
    try {
      const listRes = await storage.list("client-", true);
      const keys = (listRes && listRes.keys) || [];
      const clients = [];
      for (const k of keys) {
        try {
          const res = await storage.get(k, true);
          if (res && res.value) clients.push(JSON.parse(res.value));
        } catch (e) { /* skip */ }
      }
      clients.sort((a, b) => (b.registeredAt || "").localeCompare(a.registeredAt || ""));
      setClientsList(clients);
    } catch (e) {
      setClientsList([]);
    }
    setClientsLoading(false);
  }, []);

  async function toggleShopFollows(client) {
    const next = { ...client, shopFollows: !client.shopFollows };
    setClientsList((list) => list.map((c) => (c.phone === client.phone ? next : c)));
    try {
      await storage.set(`client-${client.phone}`, JSON.stringify(next), true);
    } catch (e) { /* ignore */ }
  }

  const today = new Date();
  const selectedDate = addDays(today, dayOffset);
  const dateStr = toDateStr(selectedDate);
  const days = Array.from({ length: 21 }, (_, i) => addDays(today, i));

  // Load settings once
  useEffect(() => {
    (async () => {
      try {
        const res = await storage.get("settings", true);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setSettings(parsed);
          setSettingsDraft(parsed);
        }
      } catch (e) {
        // no settings yet, keep defaults
      }
      setSettingsLoaded(true);
    })();
  }, []);

  const loadDay = useCallback(async (ds) => {
    setDayLoading(true);
    setSelectedSlot(null);
    setConfirmedInfo(null);
    setError("");
    try {
      const res = await storage.get(`day-${ds}`, true);
      if (res && res.value) {
        setDayData(JSON.parse(res.value));
      } else {
        setDayData({ blockedDay: false, blockedSlots: [], appointments: [] });
      }
    } catch (e) {
      setDayData({ blockedDay: false, blockedSlots: [], appointments: [] });
    }
    setDayLoading(false);
  }, []);

  useEffect(() => { if (settingsLoaded) loadDay(dateStr); }, [dateStr, settingsLoaded, loadDay]);

  useEffect(() => {
    if (mode === "cliente" && clienteTab === "chat" && profile) loadChat(profile.phone);
  }, [mode, clienteTab, profile, loadChat]);

  useEffect(() => {
    if (mode === "barbero" && barberoTab === "clientes" && !selectedClient) loadClients();
  }, [mode, barberoTab, selectedClient, loadClients]);

  async function persistDay(ds, next) {
    try {
      await storage.set(`day-${ds}`, JSON.stringify(next), true);
      return true;
    } catch (e) {
      return false;
    }
  }

  async function persistSettings(next) {
    try {
      await storage.set("settings", JSON.stringify(next), true);
      return true;
    } catch (e) {
      return false;
    }
  }

  const allSlots = generateSlots(settings.workStart, settings.workEnd, settings.slotMinutes);
  const takenTimes = new Set(dayData.appointments.map((a) => a.time));
  const blockedSet = new Set(dayData.blockedSlots || []);

  async function handleBook() {
    if (!bookingForm.name.trim() || !bookingForm.phone.trim()) {
      setError("Completa tu nombre y teléfono.");
      return;
    }
    setConfirming(true);
    setError("");
    // re-fetch latest to avoid double-booking
    const res = await storage.get(`day-${dateStr}`, true).catch(() => null);
    const latest = res && res.value ? JSON.parse(res.value) : { blockedDay: false, blockedSlots: [], appointments: [] };
    if (latest.blockedDay || (latest.blockedSlots || []).includes(selectedSlot) || latest.appointments.some((a) => a.time === selectedSlot)) {
      setError("Ese horario ya no está disponible. Elige otro.");
      setConfirming(false);
      await loadDay(dateStr);
      return;
    }
    const appt = {
      id: `${dateStr}-${selectedSlot}-${Date.now()}`,
      time: selectedSlot,
      name: bookingForm.name.trim(),
      phone: bookingForm.phone.trim(),
      service: bookingForm.service,
    };
    const next = { ...latest, appointments: [...latest.appointments, appt] };
    const ok = await persistDay(dateStr, next);
    setConfirming(false);
    if (ok) {
      setDayData(next);
      setConfirmedInfo(appt);
      setSelectedSlot(null);
      setBookingForm({ name: "", phone: "", service: "Corte" });
    } else {
      setError("No se pudo guardar la cita. Intenta de nuevo.");
    }
  }

  async function toggleBlockedDay() {
    const next = { ...dayData, blockedDay: !dayData.blockedDay };
    setDayData(next);
    await persistDay(dateStr, next);
  }

  async function toggleSlotBlock(time) {
    const isBlocked = blockedSet.has(time);
    const nextBlocked = isBlocked ? dayData.blockedSlots.filter((t) => t !== time) : [...dayData.blockedSlots, time];
    const next = { ...dayData, blockedSlots: nextBlocked };
    setDayData(next);
    await persistDay(dateStr, next);
  }

  async function cancelAppointment(id) {
    const next = { ...dayData, appointments: dayData.appointments.filter((a) => a.id !== id) };
    setDayData(next);
    await persistDay(dateStr, next);
  }

  async function saveSettings() {
    setSettings(settingsDraft);
    await persistSettings(settingsDraft);
    setShowSettings(false);
  }

  async function handleLookup() {
    if (!lookupPhone.trim()) return;
    setLookupLoading(true);
    const found = [];
    for (const d of days) {
      const ds = toDateStr(d);
      try {
        const res = await storage.get(`day-${ds}`, true);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          parsed.appointments.forEach((a) => {
            if (a.phone.replace(/\s/g, "") === lookupPhone.trim().replace(/\s/g, "")) {
              found.push({ ...a, date: ds });
            }
          });
        }
      } catch (e) { /* skip */ }
    }
    setLookupResults(found);
    setLookupLoading(false);
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Libre Franklin', sans-serif", color: COLORS.cream }}>
      <style>{FONT_IMPORT}{`
        .oswald { font-family: 'Oswald', sans-serif; }
        ::-webkit-scrollbar { height: 6px; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.brassDim}; border-radius: 4px; }
        button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid ${COLORS.brass}; outline-offset: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ background: COLORS.surface }}>
        <div className="max-w-2xl mx-auto px-5 pt-8 pb-5 flex flex-col items-center text-center">
          <img src={LOGO_SRC} alt="IL Capo" style={{ height: 60, width: "auto" }} />
          <p className="oswald" style={{ color: COLORS.cream, fontSize: 13, letterSpacing: 4, marginTop: 8 }}>
            BARBERSHOP
          </p>
          <a
            href="tel:+523319424155"
            className="flex items-center gap-1.5 mt-3"
            style={{ color: COLORS.creamMuted, fontSize: 12 }}
          >
            <Phone size={12} /> 331 942 4155
          </a>
        </div>
      </div>
      <StripeDivider />

      {/* Mode tabs */}
      <div className="max-w-2xl mx-auto px-5 pt-5">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("cliente")}
            className="flex-1 py-2.5 rounded oswald"
            style={{
              background: mode === "cliente" ? COLORS.brass : COLORS.surfaceAlt,
              color: mode === "cliente" ? COLORS.bg : COLORS.creamMuted,
              fontWeight: 600, letterSpacing: 1, fontSize: 14,
            }}
          >
            CLIENTE
          </button>
          <button
            onClick={() => {
              if (barberUnlocked) { setMode("barbero"); return; }
              setMode("pin");
            }}
            className="flex-1 py-2.5 rounded oswald"
            style={{
              background: mode === "barbero" || mode === "pin" ? COLORS.brass : COLORS.surfaceAlt,
              color: mode === "barbero" || mode === "pin" ? COLORS.bg : COLORS.creamMuted,
              fontWeight: 600, letterSpacing: 1, fontSize: 14,
            }}
          >
            BARBERO
          </button>
        </div>
      </div>

      {mode === "pin" && (
        <div className="max-w-2xl mx-auto px-5 py-10 text-center">
          <ShieldCheck size={28} color={COLORS.brass} className="mx-auto mb-3" />
          <p className="oswald" style={{ fontSize: 15, letterSpacing: 1, color: COLORS.cream }}>ACCESO SOLO PARA EL BARBERO</p>
          <p style={{ fontSize: 12, color: COLORS.creamMuted, marginTop: 4, marginBottom: 16 }}>Ingresa tu PIN</p>
          <input
            type="password"
            inputMode="numeric"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            className="text-center rounded px-3 py-2.5 text-lg tracking-widest"
            style={{ background: COLORS.surfaceAlt, color: COLORS.cream, outline: "none", width: 140 }}
            placeholder="••••"
          />
          {pinError && <p style={{ color: "#E08A8A", fontSize: 12, marginTop: 8 }}>{pinError}</p>}
          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={() => {
                if (pinInput === settings.barberPin) {
                  setBarberUnlocked(true);
                  setMode("barbero");
                  setPinInput("");
                  setPinError("");
                } else {
                  setPinError("PIN incorrecto.");
                }
              }}
              className="oswald px-6 py-2.5 rounded"
              style={{ background: COLORS.brass, color: COLORS.bg, fontWeight: 700, fontSize: 13, letterSpacing: 1 }}
            >
              ENTRAR
            </button>
            <button
              onClick={() => { setMode("cliente"); setPinInput(""); setPinError(""); }}
              className="oswald px-6 py-2.5 rounded"
              style={{ background: COLORS.surfaceAlt, color: COLORS.creamMuted, fontWeight: 600, fontSize: 13, letterSpacing: 1 }}
            >
              CANCELAR
            </button>
          </div>
        </div>
      )}

      {mode !== "pin" && (
      <div className="max-w-2xl mx-auto px-5 py-6">

        {mode === "cliente" && !profileLoaded && (
          <div className="flex items-center justify-center py-16" style={{ color: COLORS.creamMuted }}>
            <Loader2 className="animate-spin" size={22} />
          </div>
        )}

        {mode === "cliente" && profileLoaded && !profile && (
          <RegistrationForm
            regForm={regForm}
            setRegForm={setRegForm}
            handleRegister={handleRegister}
            regSaving={regSaving}
            regError={regError}
          />
        )}

        {mode === "cliente" && profileLoaded && profile && (
          <>
            <div className="flex gap-2 mb-5">
              {[["reservar", "RESERVAR"], ["chat", "CHAT"], ["perfil", "PERFIL"]].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setClienteTab(key)}
                  className="flex-1 py-2 rounded oswald text-xs"
                  style={{
                    background: clienteTab === key ? COLORS.brassDim : COLORS.surfaceAlt,
                    color: clienteTab === key ? COLORS.cream : COLORS.creamMuted,
                    fontWeight: 600, letterSpacing: 1,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {clienteTab === "reservar" && (
              <>
                <DayStrip days={days} dateStr={dateStr} setDayOffset={setDayOffset} />
                {!settingsLoaded || dayLoading ? (
                  <div className="flex items-center justify-center py-16" style={{ color: COLORS.creamMuted }}>
                    <Loader2 className="animate-spin" size={22} />
                  </div>
                ) : (
                  <ClienteView
                    dateStr={dateStr}
                    selectedDate={selectedDate}
                    dayData={dayData}
                    allSlots={allSlots}
                    takenTimes={takenTimes}
                    blockedSet={blockedSet}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                    bookingForm={bookingForm}
                    setBookingForm={setBookingForm}
                    handleBook={handleBook}
                    confirming={confirming}
                    confirmedInfo={confirmedInfo}
                    setConfirmedInfo={setConfirmedInfo}
                    error={error}
                    slotMinutes={settings.slotMinutes}
                    lookupPhone={lookupPhone}
                    setLookupPhone={setLookupPhone}
                    handleLookup={handleLookup}
                    lookupResults={lookupResults}
                    lookupLoading={lookupLoading}
                  />
                )}
              </>
            )}

            {clienteTab === "chat" && (
              <ChatThread
                messages={chatMessages}
                loading={chatLoading}
                selfRole="client"
                input={chatInput}
                setInput={setChatInput}
                sending={chatSending}
                onSend={() => { sendChatMessage(profile.phone, "client", chatInput); setChatInput(""); }}
                emptyLabel={`Escríbele a ${settings.shopName}. Solo tú y él pueden ver este chat.`}
              />
            )}

            {clienteTab === "perfil" && (
              <PerfilView profile={profile} settings={settings} />
            )}
          </>
        )}

        {mode === "barbero" && (
          <>
            <div className="flex gap-2 mb-5">
              {[["agenda", "AGENDA"], ["clientes", "CLIENTES"]].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setBarberoTab(key); setSelectedClient(null); }}
                  className="flex-1 py-2 rounded oswald text-xs"
                  style={{
                    background: barberoTab === key ? COLORS.brassDim : COLORS.surfaceAlt,
                    color: barberoTab === key ? COLORS.cream : COLORS.creamMuted,
                    fontWeight: 600, letterSpacing: 1,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {barberoTab === "agenda" && (
              <>
                <DayStrip days={days} dateStr={dateStr} setDayOffset={setDayOffset} />
                {!settingsLoaded || dayLoading ? (
                  <div className="flex items-center justify-center py-16" style={{ color: COLORS.creamMuted }}>
                    <Loader2 className="animate-spin" size={22} />
                  </div>
                ) : (
                  <BarberoView
                    dateStr={dateStr}
                    selectedDate={selectedDate}
                    dayData={dayData}
                    allSlots={allSlots}
                    takenTimes={takenTimes}
                    blockedSet={blockedSet}
                    toggleBlockedDay={toggleBlockedDay}
                    toggleSlotBlock={toggleSlotBlock}
                    cancelAppointment={cancelAppointment}
                    showSettings={showSettings}
                    setShowSettings={setShowSettings}
                    settingsDraft={settingsDraft}
                    setSettingsDraft={setSettingsDraft}
                    saveSettings={saveSettings}
                  />
                )}
              </>
            )}

            {barberoTab === "clientes" && !selectedClient && (
              <ClientesListView
                clientsList={clientsList}
                clientsLoading={clientsLoading}
                toggleShopFollows={toggleShopFollows}
                onOpenChat={(client) => { setSelectedClient(client); loadChat(client.phone); }}
              />
            )}

            {barberoTab === "clientes" && selectedClient && (
              <div>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="flex items-center gap-1.5 mb-4 oswald text-xs"
                  style={{ color: COLORS.creamMuted, letterSpacing: 1 }}
                >
                  <ArrowLeft size={14} /> VOLVER A CLIENTES
                </button>
                <p className="oswald mb-3" style={{ fontSize: 15, color: COLORS.cream }}>{selectedClient.name}</p>
                <ChatThread
                  messages={chatMessages}
                  loading={chatLoading}
                  selfRole="barbero"
                  input={chatInput}
                  setInput={setChatInput}
                  sending={chatSending}
                  onSend={() => { sendChatMessage(selectedClient.phone, "barbero", chatInput); setChatInput(""); }}
                  emptyLabel="Aún no hay mensajes con este cliente."
                />
              </div>
            )}
          </>
        )}
      </div>
      )}
    </div>
  );
}

function fmtLong(d) {
  return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

function DayStrip({ days, dateStr, setDayOffset }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <button
        onClick={() => setDayOffset((o) => Math.max(0, o - 5))}
        style={{ color: COLORS.creamMuted }}
        aria-label="Días anteriores"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex gap-2 overflow-x-auto flex-1 pb-1">
        {days.map((d, i) => {
          const ds = toDateStr(d);
          const isSel = ds === dateStr;
          return (
            <button
              key={ds}
              onClick={() => setDayOffset(i)}
              className="flex-shrink-0 rounded px-3 py-2 text-center"
              style={{
                background: isSel ? COLORS.brass : COLORS.surface,
                minWidth: 56,
                border: isSel ? "none" : `1px solid ${COLORS.surfaceAlt}`,
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: 1, color: isSel ? COLORS.bg : COLORS.creamMuted }}>
                {DIAS[d.getDay()]}
              </div>
              <div className="oswald" style={{ fontSize: 17, fontWeight: 600, color: isSel ? COLORS.bg : COLORS.cream }}>
                {d.getDate()}
              </div>
              <div style={{ fontSize: 9, color: isSel ? COLORS.bg : COLORS.creamMuted }}>{MESES[d.getMonth()]}</div>
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setDayOffset((o) => Math.min(15, o + 5))}
        style={{ color: COLORS.creamMuted }}
        aria-label="Días siguientes"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function RegistrationForm({ regForm, setRegForm, handleRegister, regSaving, regError }) {
  return (
    <div className="text-center py-6">
      <UserPlus size={26} color={COLORS.brass} className="mx-auto mb-3" />
      <p className="oswald" style={{ fontSize: 16, color: COLORS.cream }}>Crea tu cuenta</p>
      <p style={{ fontSize: 12, color: COLORS.creamMuted, marginTop: 4, marginBottom: 18 }}>
        Regístrate para reservar, seguirnos y escribirnos directo.
      </p>
      <div className="flex flex-col gap-2.5 text-left">
        <label className="flex items-center gap-2 rounded px-3" style={{ background: COLORS.surfaceAlt }}>
          <User size={15} color={COLORS.creamMuted} />
          <input
            value={regForm.name}
            onChange={(e) => setRegForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Tu nombre"
            className="bg-transparent flex-1 py-2.5 text-sm"
            style={{ color: COLORS.cream, outline: "none" }}
          />
        </label>
        <label className="flex items-center gap-2 rounded px-3" style={{ background: COLORS.surfaceAlt }}>
          <Phone size={15} color={COLORS.creamMuted} />
          <input
            value={regForm.phone}
            onChange={(e) => setRegForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="Tu teléfono"
            className="bg-transparent flex-1 py-2.5 text-sm"
            style={{ color: COLORS.cream, outline: "none" }}
          />
        </label>
      </div>
      {regError && <p style={{ color: "#E08A8A", fontSize: 12, marginTop: 10 }}>{regError}</p>}
      <button
        onClick={handleRegister}
        disabled={regSaving}
        className="oswald w-full mt-4 py-2.5 rounded"
        style={{ background: COLORS.brass, color: COLORS.bg, fontWeight: 700, letterSpacing: 1, fontSize: 14 }}
      >
        {regSaving ? "CREANDO CUENTA..." : "CREAR CUENTA"}
      </button>
    </div>
  );
}

function ChatThread({ messages, loading, selfRole, input, setInput, sending, onSend, emptyLabel }) {
  return (
    <div className="flex flex-col" style={{ minHeight: 320 }}>
      <div className="flex-1 flex flex-col gap-2 mb-3" style={{ maxHeight: 380, overflowY: "auto" }}>
        {loading ? (
          <div className="flex items-center justify-center py-10" style={{ color: COLORS.creamMuted }}>
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center" style={{ color: COLORS.creamMuted }}>
            <MessageCircle size={22} className="mb-2" />
            <p style={{ fontSize: 12 }}>{emptyLabel}</p>
          </div>
        ) : (
          messages.map((m) => {
            const mine = m.from === selfRole;
            return (
              <div key={m.id} className="flex" style={{ justifyContent: mine ? "flex-end" : "flex-start" }}>
                <div
                  className="rounded px-3 py-2"
                  style={{
                    background: mine ? COLORS.brass : COLORS.surfaceAlt,
                    color: mine ? COLORS.bg : COLORS.cream,
                    maxWidth: "75%",
                    fontSize: 13,
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !sending) onSend(); }}
          placeholder="Escribe un mensaje..."
          className="flex-1 rounded px-3 py-2.5 text-sm"
          style={{ background: COLORS.surfaceAlt, color: COLORS.cream, outline: "none" }}
        />
        <button
          onClick={onSend}
          disabled={sending || !input.trim()}
          className="rounded px-3.5 flex items-center justify-center"
          style={{ background: COLORS.brass, color: COLORS.bg }}
          aria-label="Enviar"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function PerfilView({ profile, settings }) {
  return (
    <div className="text-center py-6">
      <div className="inline-flex items-center justify-center rounded-full mb-3" style={{ background: COLORS.surfaceAlt, width: 56, height: 56 }}>
        <User size={24} color={COLORS.brass} />
      </div>
      <p className="oswald" style={{ fontSize: 18, color: COLORS.cream }}>{profile.name}</p>
      <p style={{ fontSize: 13, color: COLORS.creamMuted, marginTop: 2 }}>{profile.phone}</p>
      <div className="inline-flex items-center gap-1.5 mt-4 rounded-full px-3 py-1.5" style={{ background: COLORS.surfaceAlt }}>
        <UserCheck size={13} color={COLORS.brass} />
        <span style={{ fontSize: 12, color: COLORS.cream }}>Sigues a {settings.shopName}</span>
      </div>
    </div>
  );
}

function ClientesListView({ clientsList, clientsLoading, toggleShopFollows, onOpenChat }) {
  if (clientsLoading || clientsList === null) {
    return (
      <div className="flex items-center justify-center py-16" style={{ color: COLORS.creamMuted }}>
        <Loader2 className="animate-spin" size={22} />
      </div>
    );
  }
  if (clientsList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center" style={{ color: COLORS.creamMuted }}>
        <Users size={24} className="mb-2" />
        <p style={{ fontSize: 13 }}>Aún no tienes clientes registrados.</p>
      </div>
    );
  }
  return (
    <div>
      <p className="oswald mb-3" style={{ fontSize: 13, letterSpacing: 1, color: COLORS.creamMuted }}>
        {clientsList.length} CLIENTE{clientsList.length === 1 ? "" : "S"} REGISTRADO{clientsList.length === 1 ? "" : "S"}
      </p>
      <div className="flex flex-col gap-2">
        {clientsList.map((c) => (
          <div key={c.phone} className="rounded px-3 py-2.5" style={{ background: COLORS.surface }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="oswald" style={{ fontSize: 14, fontWeight: 600, color: COLORS.cream }}>{c.name}</p>
                <p style={{ fontSize: 11, color: COLORS.creamMuted }}>{c.phone}</p>
              </div>
              <button
                onClick={() => onOpenChat(c)}
                className="rounded px-3 py-1.5 flex items-center gap-1.5"
                style={{ background: COLORS.surfaceAlt, color: COLORS.cream, fontSize: 12 }}
              >
                <MessageCircle size={13} /> Chat
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {c.followsShop && (
                <span className="rounded-full px-2 py-0.5" style={{ background: COLORS.surfaceAlt, fontSize: 10, color: COLORS.brass }}>
                  Te sigue
                </span>
              )}
              <button
                onClick={() => toggleShopFollows(c)}
                className="rounded-full px-2 py-0.5 flex items-center gap-1"
                style={{
                  background: c.shopFollows ? COLORS.brassDim : "transparent",
                  border: c.shopFollows ? "none" : `1px solid ${COLORS.surfaceAlt}`,
                  fontSize: 10,
                  color: c.shopFollows ? COLORS.cream : COLORS.creamMuted,
                }}
              >
                <UserCheck size={11} /> {c.shopFollows ? "Siguiendo" : "Seguir"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClienteView({
  dateStr, selectedDate, dayData, allSlots, takenTimes, blockedSet,
  selectedSlot, setSelectedSlot, bookingForm, setBookingForm, handleBook,
  confirming, confirmedInfo, setConfirmedInfo, error, slotMinutes,
  lookupPhone, setLookupPhone, handleLookup, lookupResults, lookupLoading,
}) {
  const [showLookup, setShowLookup] = useState(false);

  if (confirmedInfo) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center rounded-full mb-4" style={{ background: COLORS.brass, width: 56, height: 56 }}>
          <Check size={28} color={COLORS.bg} />
        </div>
        <h2 className="oswald" style={{ fontSize: 22, fontWeight: 600 }}>¡Cita confirmada!</h2>
        <p style={{ color: COLORS.creamMuted, marginTop: 8, fontSize: 14 }}>
          {fmtLong(selectedDate)} a las {confirmedInfo.time}
        </p>
        <p style={{ color: COLORS.creamMuted, fontSize: 14 }}>{confirmedInfo.service} · {confirmedInfo.name}</p>
        <button
          onClick={() => setConfirmedInfo(null)}
          className="oswald mt-6 px-5 py-2 rounded"
          style={{ background: COLORS.surfaceAlt, color: COLORS.cream, fontSize: 13, letterSpacing: 1 }}
        >
          RESERVAR OTRA CITA
        </button>
      </div>
    );
  }

  if (dayData.blockedDay) {
    return (
      <div className="text-center py-14" style={{ color: COLORS.creamMuted }}>
        <CalendarX size={30} className="mx-auto mb-3" />
        <p className="oswald" style={{ fontSize: 16, color: COLORS.cream }}>Sin citas disponibles este día</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>Elige otra fecha en el calendario de arriba.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="oswald mb-3" style={{ fontSize: 16, letterSpacing: 1, color: COLORS.creamMuted }}>
        HORARIOS · {fmtLong(selectedDate).toUpperCase()}
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {allSlots.map((t) => {
          const taken = takenTimes.has(t) || blockedSet.has(t);
          const sel = selectedSlot === t;
          return (
            <button
              key={t}
              disabled={taken}
              onClick={() => setSelectedSlot(t)}
              className="py-2.5 rounded oswald text-sm"
              style={{
                background: sel ? COLORS.brass : taken ? COLORS.surface : COLORS.surfaceAlt,
                color: sel ? COLORS.bg : taken ? COLORS.creamMuted : COLORS.cream,
                opacity: taken ? 0.45 : 1,
                border: sel ? "none" : `1px solid ${sel ? "transparent" : "#3a3327"}`,
                fontWeight: 600,
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      {selectedSlot && (
        <div style={{ background: COLORS.surface, borderRadius: 8, padding: 16 }} className="mb-6">
          <p style={{ fontSize: 13, color: COLORS.creamMuted, marginBottom: 12 }}>
            <Clock size={13} style={{ display: "inline", marginRight: 4, verticalAlign: -2 }} />
            {selectedSlot} · dura {slotMinutes} min
          </p>
          <div className="flex flex-col gap-2.5">
            <label className="flex items-center gap-2 rounded px-3" style={{ background: COLORS.surfaceAlt }}>
              <User size={15} color={COLORS.creamMuted} />
              <input
                value={bookingForm.name}
                onChange={(e) => setBookingForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Tu nombre"
                className="bg-transparent flex-1 py-2.5 text-sm"
                style={{ color: COLORS.cream, outline: "none" }}
              />
            </label>
            <label className="flex items-center gap-2 rounded px-3" style={{ background: COLORS.surfaceAlt }}>
              <Phone size={15} color={COLORS.creamMuted} />
              <input
                value={bookingForm.phone}
                onChange={(e) => setBookingForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="Tu teléfono"
                className="bg-transparent flex-1 py-2.5 text-sm"
                style={{ color: COLORS.cream, outline: "none" }}
              />
            </label>
            <select
              value={bookingForm.service}
              onChange={(e) => setBookingForm((f) => ({ ...f, service: e.target.value }))}
              className="rounded px-3 py-2.5 text-sm"
              style={{ background: COLORS.surfaceAlt, color: COLORS.cream }}
            >
              <option>Corte</option>
              <option>Corte + Barba</option>
              <option>Barba</option>
              <option>Corte niño</option>
            </select>
          </div>
          {error && <p style={{ color: "#E08A8A", fontSize: 12, marginTop: 10 }}>{error}</p>}
          <button
            onClick={handleBook}
            disabled={confirming}
            className="oswald w-full mt-4 py-2.5 rounded"
            style={{ background: COLORS.brass, color: COLORS.bg, fontWeight: 700, letterSpacing: 1, fontSize: 14 }}
          >
            {confirming ? "RESERVANDO..." : "CONFIRMAR CITA"}
          </button>
        </div>
      )}

      <button
        onClick={() => setShowLookup((s) => !s)}
        style={{ color: COLORS.brass, fontSize: 13 }}
        className="oswald"
      >
        {showLookup ? "Ocultar" : "Ver mis citas"}
      </button>
      {showLookup && (
        <div className="mt-3" style={{ background: COLORS.surface, borderRadius: 8, padding: 14 }}>
          <div className="flex gap-2">
            <input
              value={lookupPhone}
              onChange={(e) => setLookupPhone(e.target.value)}
              placeholder="Ingresa tu teléfono"
              className="flex-1 rounded px-3 py-2 text-sm"
              style={{ background: COLORS.surfaceAlt, color: COLORS.cream, outline: "none" }}
            />
            <button
              onClick={handleLookup}
              className="oswald px-4 rounded text-sm"
              style={{ background: COLORS.brassDim, color: COLORS.cream, fontWeight: 600 }}
            >
              Buscar
            </button>
          </div>
          {lookupLoading && <p style={{ color: COLORS.creamMuted, fontSize: 12, marginTop: 8 }}>Buscando...</p>}
          {lookupResults && !lookupLoading && (
            lookupResults.length === 0 ? (
              <p style={{ color: COLORS.creamMuted, fontSize: 12, marginTop: 8 }}>No se encontraron citas con ese teléfono.</p>
            ) : (
              <div className="mt-3 flex flex-col gap-2">
                {lookupResults.map((a) => (
                  <div key={a.id} className="flex justify-between text-sm" style={{ color: COLORS.cream }}>
                    <span>{a.date} · {a.time}</span>
                    <span style={{ color: COLORS.creamMuted }}>{a.service}</span>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function BarberoView({
  dateStr, selectedDate, dayData, allSlots, takenTimes, blockedSet,
  toggleBlockedDay, toggleSlotBlock, cancelAppointment,
  showSettings, setShowSettings, settingsDraft, setSettingsDraft, saveSettings,
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="oswald" style={{ fontSize: 16, letterSpacing: 1, color: COLORS.creamMuted }}>
          {fmtLong(selectedDate).toUpperCase()}
        </h2>
        <button onClick={() => setShowSettings((s) => !s)} style={{ color: COLORS.brass }}>
          <Settings size={18} />
        </button>
      </div>

      {showSettings && (
        <div style={{ background: COLORS.surface, borderRadius: 8, padding: 14 }} className="mb-5 flex flex-col gap-3">
          <p className="oswald" style={{ fontSize: 13, letterSpacing: 1, color: COLORS.brass }}>AJUSTES</p>
          <label style={{ fontSize: 12, color: COLORS.creamMuted }}>
            Nombre del negocio
            <input
              value={settingsDraft.shopName}
              onChange={(e) => setSettingsDraft((s) => ({ ...s, shopName: e.target.value }))}
              className="w-full mt-1 rounded px-3 py-2 text-sm"
              style={{ background: COLORS.surfaceAlt, color: COLORS.cream, outline: "none" }}
            />
          </label>
          <div className="flex gap-3">
            <label style={{ fontSize: 12, color: COLORS.creamMuted, flex: 1 }}>
              Hora inicio
              <input
                type="time"
                value={settingsDraft.workStart}
                onChange={(e) => setSettingsDraft((s) => ({ ...s, workStart: e.target.value }))}
                className="w-full mt-1 rounded px-3 py-2 text-sm"
                style={{ background: COLORS.surfaceAlt, color: COLORS.cream, outline: "none" }}
              />
            </label>
            <label style={{ fontSize: 12, color: COLORS.creamMuted, flex: 1 }}>
              Hora fin
              <input
                type="time"
                value={settingsDraft.workEnd}
                onChange={(e) => setSettingsDraft((s) => ({ ...s, workEnd: e.target.value }))}
                className="w-full mt-1 rounded px-3 py-2 text-sm"
                style={{ background: COLORS.surfaceAlt, color: COLORS.cream, outline: "none" }}
              />
            </label>
          </div>
          <label style={{ fontSize: 12, color: COLORS.creamMuted }}>
            Duración del corte (min)
            <select
              value={settingsDraft.slotMinutes}
              onChange={(e) => setSettingsDraft((s) => ({ ...s, slotMinutes: Number(e.target.value) }))}
              className="w-full mt-1 rounded px-3 py-2 text-sm"
              style={{ background: COLORS.surfaceAlt, color: COLORS.cream }}
            >
              {[15, 30, 45, 60].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
          <label style={{ fontSize: 12, color: COLORS.creamMuted }}>
            PIN de acceso (modo Barbero)
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={settingsDraft.barberPin}
              onChange={(e) => setSettingsDraft((s) => ({ ...s, barberPin: e.target.value.replace(/\D/g, "") }))}
              className="w-full mt-1 rounded px-3 py-2 text-sm tracking-widest"
              style={{ background: COLORS.surfaceAlt, color: COLORS.cream, outline: "none" }}
            />
          </label>
          <button
            onClick={saveSettings}
            className="oswald py-2 rounded"
            style={{ background: COLORS.brass, color: COLORS.bg, fontWeight: 700, fontSize: 13, letterSpacing: 1 }}
          >
            GUARDAR AJUSTES
          </button>
        </div>
      )}

      <button
        onClick={toggleBlockedDay}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded mb-5 oswald"
        style={{
          background: dayData.blockedDay ? COLORS.red : COLORS.surfaceAlt,
          color: COLORS.cream, fontWeight: 600, fontSize: 13, letterSpacing: 1,
        }}
      >
        {dayData.blockedDay ? <Lock size={15} /> : <Unlock size={15} />}
        {dayData.blockedDay ? "DÍA MARCADO COMO OCUPADO — TOCA PARA ABRIR" : "DÍA LIBRE PARA CITAS — TOCA PARA CERRAR"}
      </button>

      {!dayData.blockedDay && (
        <>
          <p style={{ fontSize: 12, color: COLORS.creamMuted, marginBottom: 8 }}>
            Toca un horario libre para bloquearlo manualmente.
          </p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {allSlots.map((t) => {
              const taken = takenTimes.has(t);
              const blocked = blockedSet.has(t);
              return (
                <button
                  key={t}
                  disabled={taken}
                  onClick={() => toggleSlotBlock(t)}
                  className="py-2.5 rounded oswald text-sm"
                  style={{
                    background: taken ? COLORS.brassDim : blocked ? COLORS.redDim : COLORS.surfaceAlt,
                    color: COLORS.cream,
                    opacity: taken ? 0.7 : 1,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </>
      )}

      <h3 className="oswald mb-2" style={{ fontSize: 14, letterSpacing: 1, color: COLORS.creamMuted }}>
        CITAS DEL DÍA ({dayData.appointments.length})
      </h3>
      {dayData.appointments.length === 0 ? (
        <p style={{ fontSize: 13, color: COLORS.creamMuted }}>Aún no hay citas agendadas.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {[...dayData.appointments].sort((a, b) => a.time.localeCompare(b.time)).map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded px-3 py-2.5" style={{ background: COLORS.surface }}>
              <div>
                <p className="oswald" style={{ fontSize: 14, fontWeight: 600 }}>{a.time} · {a.name}</p>
                <p style={{ fontSize: 12, color: COLORS.creamMuted }}>{a.service} · {a.phone}</p>
              </div>
              <button onClick={() => cancelAppointment(a.id)} style={{ color: COLORS.red }} aria-label="Cancelar cita">
                <X size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
