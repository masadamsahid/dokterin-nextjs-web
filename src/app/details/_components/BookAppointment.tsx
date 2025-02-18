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

const timeSlots = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5,].map((hour) => {
  return {
    identifier: `${Math.floor(hour).toString().padStart(2, '0')}:${hour % 1 === 0 ? '00' : '30'}`,
    milliseconds: hour * 60 * 60 * 1000,
  };
});

type TimeSlots = typeof timeSlots[0];

const BookAppointment = ({ doctor, ...props }: Props) => {
  const [date, setDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlots | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    // getTime();
  }, []);

  const selectedDateTimeSlot = new Date ((date ? date.getTime() : 0) + (selectedTimeSlot ? selectedTimeSlot.milliseconds : 0));


  const isPastDay = (day: Date) => {
    return day <= new Date();
  }

  const saveBooking = async () => {
    console.log("mulai");

    const data = {
      data: {
        UserName: `${user.given_name} ${user.family_name}`,
        Email: user.email,
        Appointment_Date: selectedDateTimeSlot.toISOString(),
        doctor: { connect: doctor.documentId },
        Notes: notes,
      },
    };
    console.log("define data udah");

    await GlobalApi.createAppointment(data).then(({ data: res }) => {
      console.log({ res });
      GlobalApi.sendEmail(data);
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
                {timeSlots.map((ts, i) => (
                  <button
                    key={ts.identifier}
                    onClick={() => setSelectedTimeSlot(ts)}
                    className={cn("p-1 px-2 border rounded-md text-center hover:bg-primary hover:text-white cursor-pointer", ts === selectedTimeSlot && "bg-primary text-white")}
                  >
                    {ts.identifier}
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