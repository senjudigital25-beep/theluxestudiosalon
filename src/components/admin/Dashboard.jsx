import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Download,
  Loader2,
  CalendarDays,
  Users,
  Inbox,
  CheckCircle2,
  LogOut,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { ALL_SERVICES } from "@/lib/siteData";
import RecordPanel from "./RecordPanel";
import {
  BOOKING_STATUSES,
  LEAD_STATUSES,
  BOOKING_STATUS_STYLES,
  LEAD_STATUS_STYLES,
  toArray,
  formatDate,
  formatDateTime,
  downloadCsv,
} from "./helpers";

const SERVICE_OPTIONS = ["All", ...ALL_SERVICES.map((s) => s.name)];

export default function Dashboard({ user }) {
  const [bookings, setBookings] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState("bookings");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [active, setActive] = useState(null);

  const load = async (soft = false) => {
    soft ? setRefreshing(true) : setLoading(true);
    try {
      const [b, l] = await Promise.all([
        base44.entities.Booking.list({ sort: "-created_date", limit: 300 }),
        base44.entities.Lead.list({ sort: "-created_date", limit: 300 }),
      ]);
      setBookings(toArray(b));
      setLeads(toArray(l));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setStatusFilter("All");
    setServiceFilter("All");
  }, [tab]);

  const stats = useMemo(
    () => ({
      pending: bookings.filter((b) => b.status === "Pending").length,
      confirmed: bookings.filter((b) => b.status === "Confirmed").length,
      newLeads: leads.filter((l) => l.status === "New").length,
      total: bookings.length,
    }),
    [bookings, leads]
  );

  const query = search.trim().toLowerCase();

  const filteredBookings = useMemo(
    () =>
      bookings.filter((b) => {
        if (statusFilter !== "All" && b.status !== statusFilter) return false;
        if (serviceFilter !== "All" && b.service !== serviceFilter) return false;
        if (!query) return true;
        return [b.full_name, b.email, b.phone, b.service, b.service_category]
          .join(" ")
          .toLowerCase()
          .includes(query);
      }),
    [bookings, statusFilter, serviceFilter, query]
  );

  const filteredLeads = useMemo(
    () =>
      leads.filter((l) => {
        if (statusFilter !== "All" && l.status !== statusFilter) return false;
        if (serviceFilter !== "All" && l.service_interest !== serviceFilter) return false;
        if (!query) return true;
        return [l.name, l.email, l.phone, l.service_interest, l.message]
          .join(" ")
          .toLowerCase()
          .includes(query);
      }),
    [leads, statusFilter, serviceFilter, query]
  );

  const exportCsv = () => {
    if (tab === "bookings") {
      downloadCsv(
        `luxe-bookings-${new Date().toISOString().slice(0, 10)}.csv`,
        filteredBookings.map((b) => ({
          Name: b.full_name,
          Phone: b.phone,
          Email: b.email,
          Category: b.service_category,
          Service: b.service,
          Date: b.preferred_date,
          Time: b.preferred_time,
          Status: b.status,
          Notes: b.notes || "",
          "Internal notes": b.admin_notes || "",
          Received: formatDateTime(b.created_date),
        }))
      );
    } else {
      downloadCsv(
        `luxe-leads-${new Date().toISOString().slice(0, 10)}.csv`,
        filteredLeads.map((l) => ({
          Name: l.name,
          Email: l.email,
          Phone: l.phone || "",
          "Service interest": l.service_interest || "",
          Message: l.message,
          Status: l.status,
          "Internal notes": l.admin_notes || "",
          Received: formatDateTime(l.created_date),
        }))
      );
    }
  };

  const updateRecord = (type, updated) => {
    if (type === "booking") setBookings((list) => list.map((b) => (b.id === updated.id ? updated : b)));
    else setLeads((list) => list.map((l) => (l.id === updated.id ? updated : l)));
  };

  const removeRecord = (type, id) => {
    if (type === "booking") setBookings((list) => list.filter((b) => b.id !== id));
    else setLeads((list) => list.filter((l) => l.id !== id));
  };

  const statusOptions = tab === "bookings" ? BOOKING_STATUSES : LEAD_STATUSES;
  const statusStyles = tab === "bookings" ? BOOKING_STATUS_STYLES : LEAD_STATUS_STYLES;
  const rows = tab === "bookings" ? filteredBookings : filteredLeads;

  const statCards = [
    { label: "Pending bookings", value: stats.pending, icon: CalendarDays, accent: "text-gold" },
    { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2, accent: "text-emerald-300" },
    { label: "New leads", value: stats.newLeads, icon: Inbox, accent: "text-gold" },
    { label: "Total bookings", value: stats.total, icon: Users, accent: "text-ivory" },
  ];

  return (
    <div className="min-h-screen bg-ink pb-20">
      <div className="border-b border-white/10 bg-[#0d0d0d]">
        <div className="container-luxe flex flex-wrap items-center justify-between gap-4 py-5">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-[0.55rem] uppercase tracking-[0.22em] text-ivory/35 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-3 w-3" /> Back to website
            </Link>
            <h1 className="mt-2 font-heading text-[1.9rem] leading-tight text-ivory">Studio Dashboard</h1>
            <p className="font-body text-[0.7rem] text-ivory/35">
              Signed in as {user?.email} — appointments and enquiries
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load(true)}
              className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-body text-[0.58rem] uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:border-gold hover:text-gold"
            >
              <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={() => base44.auth.logout()}
              className="inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 font-body text-[0.58rem] uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:border-gold hover:text-gold"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="container-luxe pt-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.label} className="border border-white/10 bg-[#0f0f0f] p-5">
              <div className="flex items-center justify-between">
                <p className="font-body text-[0.52rem] uppercase tracking-[0.2em] text-ivory/35">
                  {card.label}
                </p>
                <card.icon className={`h-3.5 w-3.5 ${card.accent}`} />
              </div>
              <p className="mt-3 font-heading text-[2rem] leading-none text-ivory">
                {loading ? "—" : card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div className="flex">
            {[
              { key: "bookings", label: "Bookings", count: bookings.length },
              { key: "leads", label: "Leads", count: leads.length },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`relative px-1 pb-3 pr-8 font-body text-[0.62rem] uppercase tracking-[0.22em] transition-colors ${
                  tab === item.key ? "text-gold" : "text-ivory/40 hover:text-ivory/70"
                }`}
              >
                {item.label} <span className="ml-1.5 text-ivory/25">{item.count}</span>
                {tab === item.key ? <span className="absolute inset-x-0 -bottom-px h-px bg-gold" /> : null}
              </button>
            ))}
          </div>

          <button
            onClick={exportCsv}
            disabled={!rows.length}
            className="mb-2 inline-flex items-center gap-2 border border-gold/35 px-4 py-2 font-body text-[0.55rem] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-30"
          >
            <Download className="h-3 w-3" /> Export CSV
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ivory/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, email or service"
              className="w-full border border-white/12 bg-ink py-2.5 pl-10 pr-3 font-body text-[0.82rem] text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-white/12 bg-ink px-3 py-2.5 font-body text-[0.78rem] text-ivory/80 focus:border-gold focus:outline-none"
          >
            <option value="All">All statuses</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="border border-white/12 bg-ink px-3 py-2.5 font-body text-[0.78rem] text-ivory/80 focus:border-gold focus:outline-none"
          >
            <option value="All">All services</option>
            {SERVICE_OPTIONS.filter((s) => s !== "All").map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 border border-white/10 bg-[#0f0f0f]">
          <div className="hidden grid-cols-[1.4fr_1.3fr_1fr_auto] gap-4 border-b border-white/10 px-5 py-3 font-body text-[0.52rem] uppercase tracking-[0.2em] text-ivory/30 md:grid">
            <span>{tab === "bookings" ? "Client" : "Name"}</span>
            <span>Service</span>
            <span>{tab === "bookings" ? "Requested" : "Received"}</span>
            <span>Status</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 font-body text-[0.75rem] text-ivory/40">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading records
            </div>
          ) : rows.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Inbox className="mx-auto h-5 w-5 text-ivory/20" />
              <p className="mt-3 font-body text-[0.8rem] text-ivory/40">
                {query || statusFilter !== "All" || serviceFilter !== "All"
                  ? "No records match those filters."
                  : tab === "bookings"
                  ? "No booking requests yet."
                  : "No enquiries yet."}
              </p>
            </div>
          ) : (
            rows.map((record) => {
              const isBooking = tab === "bookings";
              return (
                <button
                  key={record.id}
                  onClick={() => setActive({ type: isBooking ? "booking" : "lead", record })}
                  className="grid w-full grid-cols-1 gap-1.5 border-b border-white/5 px-5 py-4 text-left transition-colors hover:bg-white/[0.04] md:grid-cols-[1.4fr_1.3fr_1fr_auto] md:items-center md:gap-4"
                >
                  <span>
                    <span className="block font-body text-[0.88rem] text-ivory">
                      {isBooking ? record.full_name : record.name}
                    </span>
                    <span className="mt-0.5 block font-body text-[0.68rem] text-ivory/35">
                      {record.phone || record.email}
                    </span>
                  </span>
                  <span className="font-body text-[0.78rem] text-ivory/65">
                    {isBooking ? record.service : record.service_interest || "General enquiry"}
                    <span className="mt-0.5 block font-body text-[0.65rem] text-ivory/30">
                      {isBooking ? record.service_category : (record.message || "").slice(0, 46)}
                    </span>
                  </span>
                  <span className="font-body text-[0.75rem] text-ivory/55">
                    {isBooking
                      ? `${formatDate(record.preferred_date)} · ${record.preferred_time}`
                      : formatDateTime(record.created_date)}
                  </span>
                  <span
                    className={`w-fit border px-2.5 py-1 font-body text-[0.55rem] uppercase tracking-[0.14em] ${
                      statusStyles[record.status] || "border-white/20 text-ivory/60"
                    }`}
                  >
                    {record.status}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <p className="mt-3 font-body text-[0.62rem] text-ivory/25">
          Showing up to 300 most recent records per type. Open a row to view details, change status or
          add internal notes.
        </p>
      </div>

      {active ? (
        <RecordPanel
          type={active.type}
          record={active.record}
          onClose={() => setActive(null)}
          onUpdated={(updated) => updateRecord(active.type, updated)}
          onDeleted={(id) => removeRecord(active.type, id)}
        />
      ) : null}
    </div>
  );
}