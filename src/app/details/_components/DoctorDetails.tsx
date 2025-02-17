import type { Doctor } from "@/lib/data-types";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import BookAppointment from "./BookAppointment";

type Props = {
  doctor: Doctor;
}

const DoctorDetails = ({ doctor }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 border p-5 mt-5 rounded-lg">
        <div>
          <Image src={doctor.Image.url} alt={doctor.Name} width={200} height={200} className="rounded-lg h-[270px] object-cover md:w-full" />
        </div>

        <div className="col-span-2 mt-5 flex flex-col gap-3 items-baseline">
          <h2 className="font-bold text-2xl">{doctor.Name}</h2>
          <p className="flex gap-2 text-gray-500 text-base">
            <GraduationCap />
            <span>{doctor.Year_of_Experience} of Experience</span>
          </p>
          <p className="flex gap-2 text-gray-500 text-base">
            <MapPin />
            <span>{doctor.Address}</span>
          </p>
          <p className="text-[10px] bg-primary/20 p-1 rounded-full px-2 text-primary">
            {doctor.categories[0].Name}
          </p>
          <BookAppointment doctor={doctor} />
        </div>
      </div>

      <div className="border rounded-lg p-5">
        <h2 className="font-bold text-[20px]">About The Doctor</h2>
        <p className="text-gray-500 tracking-wider">{doctor.About}</p>
      </div>
    </div>
  );
}

export default DoctorDetails;