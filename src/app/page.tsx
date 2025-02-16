import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const doctorList = await GlobalApi.getDoctorList().then(({ data: res }) => {
    return res.data;
  }).catch((err) => {
    console.error({err});
  });

  console.log(doctorList);


  return (
    <div>
      <Hero />

      <CategorySearch />
      <DoctorList doctors={doctorList} />
    </div>
  );
}
