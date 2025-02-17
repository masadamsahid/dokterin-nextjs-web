import EmailTemplate from "@/emails";
import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const res = await req.json();

  try {

    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [res.data.Email],
      subject: 'Appointment Booking Confirmation',
      react: EmailTemplate({ response: res.data }),
    });

    console.log(`Sent to ${res.data.Email}`, {
      ...res
    });
    


    return NextResponse.json({ data: 'Email sent' });
  } catch (error) {
    return NextResponse.json({ error });
  }
}