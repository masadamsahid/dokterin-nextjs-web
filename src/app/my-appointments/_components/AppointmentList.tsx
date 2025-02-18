import type { Appointment } from "@/lib/data-types";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import moment from 'moment';

type Props = {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments, ...props }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {appointments && appointments.map(({ doctor, ...appointment }) => (
        <div key={appointment.documentId} className="flex gap-4 items-center border border-gray-300 p-3 rounded-lg">
          <Image
            src={doctor.Image.url}
            alt={doctor.Name}
            width={100}
            height={100}
            className="min-w-[70px] min-h-[70px] size-[70px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-[18px]">{doctor.Name}</h2>
            <p className="flex gap-2 text-gray-700 items-start">
              <MapPin className="min-h-4 min-w-4 size-4 lg:size-5 text-primary" /> {doctor.Address}
            </p>
            <p className="flex gap-2 text-gray-700 items-start">
              <Calendar className="min-h-4 min-w-4 size-4 lg:size-5 text-primary" /> Appointment on {moment(appointment.Date).format('LL')}
            </p>
            <p className="flex gap-2 text-gray-700 items-start">
              <Clock className="min-h-4 min-w-4 size-4 lg:size-5 text-primary" /> at {appointment.Time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentList;