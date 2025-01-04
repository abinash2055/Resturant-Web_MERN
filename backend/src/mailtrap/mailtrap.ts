import { MailtrapClient } from "mailtrap";

const TOKEN = "6c4d52634d1e3cbc44358698bb59bf90";
const ENDPOINT = "https://send.api.mailtrap.io/";

export const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN!,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Personal Signature",
};
