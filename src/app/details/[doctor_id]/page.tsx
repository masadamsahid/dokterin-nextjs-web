import GlobalApi from "@/app/_utils/GlobalApi";
import type { Doctor } from "@/lib/data-types";
import DoctorDetails from "../_components/DoctorDetails";

type Props = {
  params: {
    doctor_id: string;
  };
}

const DoctorDetailsPage = async ({ params }: Props) => {
  const { doctor_id } = await params;

  const doctor = await GlobalApi.getDoctorById(doctor_id).then(({ data: res }) => {
    return res.data as Doctor;
  });

  // console.log(doctor);
  

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]">
        Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4">

        {/* Details */}
        <div className="col-span-3">
          <DoctorDetails doctor={doctor} />
        </div>

        {/* Suggestions */}
        <div></div>
      </div>
    </div>
  );
}

export default DoctorDetailsPage;