"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { Doctor } from "@/lib/data-types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

type Props = {
  doctor: Doctor;
}

const BookAppointment = ({ doctor, ...props }: Props) => {
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<{ time: string }[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      });
      timeList.push({
        time: i + ':30 AM'
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ':00 PM'
      });
      timeList.push({
        time: i + ':30 PM'
      });
    }

    setTimeSlot(timeList);
  }

  const isPastDay = (day: Date) => {
    return day <= new Date();
  }

  const saveBooking = async () => {
    console.log("mulai");
    
    const data = {
      data: {
        UserName: `${user.given_name} ${user.family_name}`,
        Email: user.email,
        Date: date,
        Time: selectedTimeSlot,
        doctor: { connect: doctor.documentId },
        Notes: notes,
      },
    };
    console.log("define data udah");
    
    await GlobalApi.createAppointment(data).then(({ data: res }) => {
      console.log({ res });
      toast.success('Success booking. A booking confirmation sent to your email');
    }).catch((err) => {
      console.error(err);
      toast.error('Failed booking appointment');
    });
    console.log("harusnya ada response");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3 rounded-full">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Book Appointment</DialogTitle>
          <DialogDescription asChild>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-baseline gap-3">
              <h2 className="flex gap-2 items-center">
                <CalendarDays className="text-primary size-5" /> Select Date
              </h2>
              <Calendar
                mode="single"
                selected={date}
                disabled={isPastDay}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>

            <div className="mt-3 md:mt-0">
              <h2 className="flex gap-2 items-center">
                <Clock className="text-primary size-5" /> Select Time Slot
              </h2>
              <div className="grid grid-cols-3 gap-3 border rounded-lg p-3 mt-3">
                {timeSlot.map((ts, i) => (
                  <button
                    key={ts.time}
                    onClick={() => setSelectedTimeSlot(ts.time)}
                    className={cn("p-1 px-2 border rounded-md text-center hover:bg-primary hover:text-white cursor-pointer", ts.time === selectedTimeSlot && "bg-primary text-white")}
                  >
                    {ts.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Textarea className="mt-3" placeholder="Notes..." onChange={(e) => setNotes(e.target.value)} />

        <DialogFooter className="sm:justify-end mt-5">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" disabled={!(date && selectedTimeSlot)} onClick={saveBooking}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;