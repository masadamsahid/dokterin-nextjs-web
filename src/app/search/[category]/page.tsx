import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Doctor } from "@/lib/data-types";

type Props = {
  params: {
    category: string;
  };
}

const SearchCategoryPage = async ({ params }: Props) => {
  const { category: slug } = await params;
  const doctor_list: Doctor[] = await GlobalApi.getDoctorByCategory(slug).then(({ data: res }) => {
    return res.data as Doctor[];
  });
  if (!doctor_list || doctor_list.length < 1) return null;

  // console.log({doctor_list});
  

  return (
    <div>
      <DoctorList doctors={doctor_list} heading={`${doctor_list.length} Result(s)`} />
    </div>
  );
}

export default SearchCategoryPage;