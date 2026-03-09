import React, { useEffect, useState, useContext, useCallback } from "react";

import AuthContext from "../auth/authContext";
import AlertContext from "../alert/alertContext";
import Alerts from "../components/Alerts";
import Navbar from "../components/NavbarHistory";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Dashboard() {
  const { loadUser } = useContext(AuthContext);
  const { addAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ user: { name: "" }, bookings: [] });
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await loadUser();
      if (!res) {
        throw new Error("Failed to load user data");
      }

      setData(res || { user: { name: "" }, bookings: [] });
    } catch (err) {
      console.log(err);
      navigate("/", { replace: true });
      addAlert("Failed to load dashboard data", "danger");
    } finally {
      setLoading(false);
    }
  }, [loadUser, addAlert, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/booking/${id}`);

      addAlert("Order successfully deleted!", "success");
      await loadData();
    } catch (err) {
      console.log(err);

      addAlert("Delete failed. Please try again.", "danger");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-700 to-gray-800 text-white px-4 pb-16">
        <h1 className="text-center pt-12 text-4xl md:text-5xl font-bold text-yellow-500 underline">
          Welcome {data?.user?.name || "User"}
        </h1>

        <div className="mt-6 flex justify-center">
          <Alerts />
        </div>

        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-12 max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.bookings.map((book, index) => (
              <div
                key={book._id}
                className="relative bg-gray-200 text-black rounded-2xl shadow-xl p-6 pb-20"
              >
                <h2 className="text-center text-xl font-bold mb-4">
                  Order #{index + 1}
                </h2>

                <div className="space-y-2 text-sm">
                  <InfoLine label="Book ID" value={book._id} />
                  <InfoLine label="Start Time" value={book.startTime} />
                  <InfoLine label="End Time" value={book.endTime} />
                  <InfoLine label="Players" value={book.numberOfPersons} />
                  <InfoLine label="Locker PIN" value={book.pin} />

                  {book.shoes?.map((shoe, i) => (
                    <InfoLine
                      key={`shoe-${i}`}
                      label="Shoe Size"
                      value={shoe}
                    />
                  ))}

                  {book.tshirt?.map((shirt, i) => (
                    <InfoLine
                      key={`shirt-${i}`}
                      label="T-Shirt Size"
                      value={shirt}
                    />
                  ))}

                  <InfoLine label="Towels" value={book.towels || 0} />
                </div>

                <button
                  onClick={() => deleteOrder(book._id)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full transition"
                >
                  Delete Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-300 pb-1">
      <span className="font-semibold opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
