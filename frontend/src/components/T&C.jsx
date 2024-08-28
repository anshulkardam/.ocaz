
import { Accordion } from "flowbite-react";

export function Terms() {
    return (
        <Accordion collapseAll className="text-white mt-40 mr-10">
            <Accordion.Panel >
                <Accordion.Title>Terms and Conditions</Accordion.Title>
                <Accordion.Content>
                    Booking and Payment

                    By booking a ticket for an event, you agree to pay the full amount specified for the ticket(s) at the time of booking.
                    All payments must be completed through the payment methods provided on our website.
                    Your booking is not confirmed until payment is successfully processed.
                    Event Changes and Cancellations

                    Event details, including date, time, and location, are subject to change. We will notify you of any significant changes as soon as possible.
                    We reserve the right to cancel or reschedule an event. In the event of a cancellation, you will receive a full refund or a credit towards a future event, depending on availability.
                    Refunds and Exchanges

                    Tickets are non-refundable unless the event is canceled. In such cases, refunds will be processed within a specified timeframe.
                    Tickets cannot be exchanged for different events or dates.
                    Event Access

                    You must present a valid ticket or booking confirmation upon entry to the event.
                    Access to the event is subject to the event venue’s rules and regulations.
                    Code of Conduct

                    Attendees are expected to conduct themselves in a respectful and orderly manner. The event organizers reserve the right to remove any individual who behaves disruptively or violates the event’s code of conduct.
                    Liability

                    The event organizers are not responsible for any personal injury, loss, or damage to property that occurs during the event.
                    By attending the event, you acknowledge and accept the risks associated with attending the event and agree to hold the organizers harmless.
                    Personal Data

                    Your personal data collected during the booking process will be used in accordance with our Privacy Policy.
                    We may use your contact details to provide updates and information related to the event.
                    Photographs and Recordings

                    By attending the event, you consent to being photographed or recorded. Event images and recordings may be used for promotional purposes.
                    Compliance

                    All attendees must comply with local laws and regulations related to the event.
                    Contact Information

                    For any questions or concerns regarding the event or your booking, please contact us at [your contact information].
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>FAQ</Accordion.Title>
                <Accordion.Content>
                    1. What is [Your Website Name]?
                    [Your Website Name] is a platform that allows users to discover, attend, and create events. Whether you're looking for local activities or hosting an event yourself, we provide the tools to make it easy and accessible.

                    2. How do I sign up for an event?
                    To sign up for an event, simply create an account or log in if you already have one. Once logged in, browse through our events and click the "Attend" button on the event page. You'll receive a confirmation email once you're successfully signed up.

                    3. How can I create an event?
                    Creating an event is easy! Log in to your account and click on the "Create Event" button. Fill in the necessary details such as the event title, description, date, time, and location, then click "Submit." Your event will be reviewed and posted on our platform once approved.

                    4. Is there a fee to use [Your Website Name]?
                    Our platform is free to use for both event attendees and organizers. However, some events may have their own ticket fees, which are determined by the event organizers.

                    5. How do I cancel my event registration?
                    To cancel your registration for an event, log in to your account and navigate to the "My Events" section. Find the event you wish to cancel, and click the "Cancel Registration" button. Please note that each event may have its own cancellation policy.

                    6. What should I do if I forget my password?
                    If you forget your password, click on the "Forgot Password?" link on the sign-in page. Enter your registered email address, and we’ll send you instructions on how to reset your password.

                    7. How do I contact the event organizer?
                    To contact an event organizer, go to the event page and look for the "Contact Organizer" button or the organizer's contact details in the event description.

                    8. Can I share events on social media?
                    Absolutely! Each event page has social media sharing buttons, allowing you to easily share events with your friends and followers on platforms like Facebook, Twitter, and Instagram.

                    9. What types of events can I find on [Your Website Name]?
                    You can find a variety of events on our platform, ranging from music concerts and festivals to workshops, conferences, and community meet-ups. We aim to provide a diverse selection to cater to all interests.

                    10. Who can I contact for further assistance?
                    If you have any additional questions or need further assistance, please feel free to reach out to our support team via the "Contact Us" page. We’re here to help!
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
}
