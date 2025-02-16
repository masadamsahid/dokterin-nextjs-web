import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import { Doctor } from "@/lib/data-types";

export default async function Home() {
  const doctorList: Doctor[] = await GlobalApi.getDoctorList().then(({ data: res, ...a }) => {
    // console.log({res, a});
    return res.data as Doctor[];
  }).catch((err) => {
    console.error({err});
    return [];
  });
  if(!doctorList || doctorList.length < 1) return null;

  // console.log(doctorList);


  return (
    <div>
      <Hero />

      <CategorySearch />
      <DoctorList doctors={doctorList} />
    </div>
  );
}
