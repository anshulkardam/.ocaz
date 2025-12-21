import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // const { id } = evt.data;
    // const eventType = evt.type;
    // console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    // console.log("Webhook payload:", evt.data);

    if (evt.type === "user.created") {
      console.log("userId:", evt.data.id);
      await prisma.user.create({
        data: {
          id: evt.data.id,
          image: evt.data.image_url,
          name: [evt.data.first_name, evt.data.last_name].filter(Boolean).join(" "),
        },
      });
    }
    if (evt.type === "user.updated") {
      await prisma.user.upsert({
        where: { id: evt.data.id },
        update: {
          name: [evt.data.first_name, evt.data.last_name].filter(Boolean).join(" "),
          image: evt.data.image_url,
        },
        create: {
          id: evt.data.id,
          name: [evt.data.first_name, evt.data.last_name].filter(Boolean).join(" "),
          image: evt.data.image_url,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
