"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

export default function CommentSection() {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setSending(true);

    emailjs
      .sendForm(
        "service_kb5zotq",      // your EmailJS service ID
        "template_hx4vy36",     // your EmailJS template ID
        form.current,
        "QPsBNRpvFsbr7Kbf4"     // your EmailJS public key
      )
      .then(
        (result) => {
          toast.success("Wow! Message sent successfully.");
          form.current?.reset();
          setSending(false);
        },
        (error) => {
          toast.error("Oops! Something went wrong.");
          console.error(error);
          setSending(false);
        }
      );
  };

  return (
    <section className="py-20 bg-white/5 border-t border-white/10">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-6">Leave a Comment</h3>

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 bg-white/5 p-6 rounded-xl backdrop-blur-xl border border-white/10"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black/20 text-white"
            required
          />
          <textarea
            name="message"
            placeholder="Write a comment..."
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-black/20 text-white"
            rows={4}
            required
          />
          <button
            type="submit"
            disabled={sending}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition ${
              sending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {sending ? "Sending..." : "Send Comment"}
          </button>
        </form>
      </div>
    </section>
  );
}