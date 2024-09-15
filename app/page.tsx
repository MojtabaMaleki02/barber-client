// app/booking/page.tsx

import AppointmentForm from "../components/AppointmentForm";
import ServiceList from "@/components/ServiceList";
import Navbar from "@/components/Navbar";
import CombinedComponent from "@/components/CombinedComponent";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-3xl">
        
        <Navbar />
        <CombinedComponent/>
      </div>
    </div>
  );
}
