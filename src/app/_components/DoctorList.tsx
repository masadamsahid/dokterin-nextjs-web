import type { Doctor } from "@/lib/data-types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  doctors: Doctor[];
  heading?: string;
}

const DoctorList = ({ doctors, heading='Popular Doctors' }: Props) => {
  if (doctors.length < 1) return null; // TODO: return a "no doctor" component instead of just null;

  console.log(doctors);
  

  return (
    <div className="mb-10">
      <h2 className="font-bold text-xl px-8 text-center">
        {heading}
      </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {doctors.map(doctor => (
          <div key={doctor.id} className="border rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all duration-200 flex flex-col">
            <Image
              src={doctor.Image.url}
              alt={doctor.Name}
              width={500}
              height={200}
              className="h-[200px] w-full object-cover rounded-lg"
            />
            <div className="mt-3 flex items-baseline flex-col gap-1 flex-1">
              <p className="text-[10px] bg-primary/20 p-1 rounded-full px-2 text-primary">
                {doctor.categories[0]?.Name}
              </p>
              <h2 className="font-bold">
                {doctor.Name}
              </h2>
              <p className="text-primary text-sm">{doctor.Year_of_Experience}</p>
              <h2 className="text-gray-500 text-sm">{doctor.Address}</h2>

              <Link href={`/details/${doctor.documentId}`} className="p-2 px-3 border border-primary text-primary rounded-lg w-full text-center text-[11px] mt-auto cursor-pointer hover:bg-primary hover:text-white transition-all duration-200">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;