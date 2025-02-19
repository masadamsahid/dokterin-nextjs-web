import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentList from "./_components/AppointmentList";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GlobalApi from "../_utils/GlobalApi";
import type { Appointment } from "@/lib/data-types";
import { redirect } from "next/navigation";

type Props = {}

const MyAppointments = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email) return redirect('/api/auth/login?post_login_redirect_url=/');

  const appointments = await GlobalApi.getUserAppointmentList(user.email).then(({ data: res }) => {
    return res.data as Appointment[];
  }).catch((err) => {
    console.error(err);
    console.log(err.response);
  });
  if (!appointments) return;

  // console.log(appointments);

  const { upcoming, expired } = appointments.reduce((appointments, curr) => {
    if(new Date(curr.Appointment_Date) >= new Date()) appointments.upcoming.push(curr);
    else appointments.expired.push(curr);

    return appointments;
  }, { upcoming: [] as Appointment[], expired: [] as Appointment[] });


  return (
    <div className="px-4 sm:px-10 my-10">
      <h2 className="font-bold text-2xl">
        My Appointments
      </h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <AppointmentList appointments={upcoming} />
        </TabsContent>
        <TabsContent value="expired">
          <AppointmentList appointments={expired} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyAppointments;