'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useEmailStore } from "@/store/email_verification";
import axios from "axios";

export default function InputWithButton() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const setEmail_zust = useEmailStore((state) => state.setEmail)

  async function btnFn() {
    if (!isValidEmail(email)) {
      setError("Please enter a valid Email address");
      return;
    }

    setError("");
    console.log(email);
    setEmail_zust(email.toLowerCase());

    const response = await axios.get("/api/register_email_check", {params: {email}})
    if(response.data.message === "FOUND"){
      setError(`${email} may be already registered! or try again later`)
      return;
    }
    router.push('/verify_email');
  }

  return (
    <div className="flex flex-col  max-w-sm gap-2">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button variant="outline" className="cursor-pointer" onClick={btnFn}>
        Submit
      </Button>
    </div>
  );
}
