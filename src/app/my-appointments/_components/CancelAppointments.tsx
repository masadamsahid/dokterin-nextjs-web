"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/data-types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  appointment: Appointment;
}

const CancelAppointments = ({ appointment }: Props) => {
  const router = useRouter();

  const handleCancle = async () => {
    await GlobalApi.deleteAppointmentById(appointment.documentId).then(() => {
      toast.success('Success cancel appointment');
    }).catch((err) => {
      console.error(err);
      toast.error('Failed cancal appointment')
    });
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size='sm' className="border-red-400 text-red-400 hover:bg-red-500 hover:text-white">
          Cancel Appointment
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently cancel your appointment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleCancle()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelAppointments;