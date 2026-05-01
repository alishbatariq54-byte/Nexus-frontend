import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  const calendarRef = useRef(null);

  // ---------------- STATES ----------------
  const [open, setOpen] = useState(false);

  const [availability, setAvailability] = useState([]);
  const [requests, setRequests] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showSlotBox, setShowSlotBox] = useState(false);
  const [slotTitle, setSlotTitle] = useState("");

  // ---------------- ADD AVAILABILITY ----------------
  const addSlot = () => {
    if (!selectedDate || !slotTitle) return;

    const newSlot = {
      id: Date.now(),
      title: slotTitle,
      date: selectedDate,
    };

    setAvailability([...availability, newSlot]);
    setSlotTitle("");
    setShowSlotBox(false);
  };

  // ---------------- SEND REQUEST ----------------
  const sendRequest = (slot) => {
    const newReq = {
      id: Date.now(),
      ...slot,
      status: "pending",
    };

    setRequests([...requests, newReq]);
  };

  // ---------------- ACCEPT REQUEST ----------------
  const acceptRequest = (id) => {
    const req = requests.find((r) => r.id === id);

    setMeetings([...meetings, { ...req, status: "confirmed" }]);

    setRequests(requests.filter((r) => r.id !== id));
  };

  // ---------------- DECLINE REQUEST ----------------
  const declineRequest = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <div className="relative p-5">

      {/* OPEN CALENDAR BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="p-3 bg-orange-100 rounded-full"
      >
        Show Calendar
      </button>

      {/* ---------------- MODAL ---------------- */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
<div
  className="bg-white w-[500px] max-h-[80vh] overflow-y-auto rounded-xl p-4 relative"
  onClick={(e) => e.stopPropagation()}
>
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-3"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-3">
              Meeting Calendar
            </h2>

            {/* ---------------- FULL CALENDAR ---------------- */}
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="auto"
              dateClick={(info) => {
                setSelectedDate(info.dateStr);
                setShowSlotBox(true);
              }}
              events={[
                ...availability,
                ...meetings,
              ]}
            />

            {/* ---------------- ADD SLOT ---------------- */}
            {showSlotBox && (
              <div className="mt-3 border p-3 rounded">
                <p className="text-sm mb-2">
                  Add slot for: {selectedDate}
                </p>

                <input
                  value={slotTitle}
                  onChange={(e) => setSlotTitle(e.target.value)}
                  placeholder="Enter slot title"
                  className="border p-2 w-full mb-2"
                />

                <button
                  onClick={addSlot}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add Availability
                </button>
              </div>
            )}

            {/* ---------------- AVAILABLE SLOTS ---------------- */}
            <h3 className="mt-4 font-semibold">Available Slots</h3>

            {availability.map((slot) => (
              <div
                key={slot.id}
                className="flex justify-between border p-2 mt-2 rounded"
              >
                <span>
                  {slot.title} ({slot.date})
                </span>

                <button
                  onClick={() => sendRequest(slot)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Request
                </button>
              </div>
            ))}

            {/* ---------------- REQUESTS ---------------- */}
            <h3 className="mt-4 font-semibold">Requests</h3>

            {requests.map((req) => (
              <div
                key={req.id}
                className="border p-2 mt-2 rounded"
              >
                <p>
                  {req.title} ({req.date})
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => acceptRequest(req.id)}
                    className="bg-green-500 text-white px-2 py-1"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => declineRequest(req.id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}

            {/* ---------------- CONFIRMED ---------------- */}
            <h3 className="mt-4 font-semibold">
              Confirmed Meetings
            </h3>

            {meetings.map((m) => (
              <div
                key={m.id}
                className="border p-2 mt-2 bg-green-50 rounded"
              >
                {m.title} ({m.date})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}