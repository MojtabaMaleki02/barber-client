// app/booking/page.tsx

import AppointmentForm from "../components/AppointmentForm";
import ServiceList from "@/components/ServiceList";
import Navbar from "@/components/Navbar";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-3xl">
        
        <Navbar />
        <div id="service-list">
          <ServiceList />
        </div>
        <div id="appointment-form">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}
