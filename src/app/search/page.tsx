import type { Doctor } from "@/lib/data-types";
import GlobalApi from "@/app/_utils/GlobalApi";
import DoctorList from "@/app/_components/DoctorList";

type Props = {}

const SearchPage = async (props: Props) => {
  const doctor_list: Doctor[] = await GlobalApi.getDoctorList().then(({ data: res }) => {
    return res.data as Doctor[];
  });
  if (!doctor_list || doctor_list.length < 1) return null;

  return (
    <div>
      <DoctorList doctors={doctor_list} heading={`${doctor_list.length} Result(s)`} />
    </div>
  );
}

export default SearchPage;