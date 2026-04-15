"use client";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isInvalidChar, setIsInvalidChar] = useState(false);
  const [isInvalidChar2, setIsInvalidChar2] = useState(false);

  const handleInputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    return /[A-Zㄱ-ㅎㅏ-ㅣ가-힣]/.test(input);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast("로그인 실패", {
        description: <span className="text-xs text-neutral-800">{error.message}</span>,
        position: "bottom-right",
        className: "bg-neutral-800",
      });
    }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <Button
        className="rounded bg-white p-2 px-4 text-base font-semibold text-black transition hover:bg-neutral-200"
        onClick={() => setIsOpen(true)}
      >
        로그인
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 flex w-96 max-w-full flex-col gap-10 rounded-lg bg-white p-6 text-black shadow-lg">
            <h2 className="mb-4 text-center text-xl font-bold">로그인</h2>
            <form id="form-rhf-login" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-8">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex flex-col">
                      <FieldLabel htmlFor="form-rhf-email" className="font-semibold">
                        이메일
                      </FieldLabel>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const isInvalid = handleInputValidation(e);

                          setIsInvalidChar(isInvalid);

                          if (!isInvalid) {
                            field.onChange(e);
                          }
                        }}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="you@example.com"
                        autoComplete="off"
                        className="border-b"
                      />
                      {isInvalidChar && (
                        <p className="text-xs text-red-500">
                          Uppercase letters and Korean characters are not allowed.
                        </p>
                      )}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-password" className="font-semibold">
                        비밀번호
                      </FieldLabel>
                      <div className="flex w-full gap-1">
                        <Input
                          {...field}
                          onChange={(e) => {
                            const isInvalid = handleInputValidation(e);

                            setIsInvalidChar2(isInvalid);

                            if (!isInvalid) {
                              field.onChange(e);
                            }
                          }}
                          id="form-rhf-password"
                          aria-invalid={fieldState.invalid}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="w-full border-b"
                        />
                        {showPassword ? (
                          <Eye
                            onClick={() => setShowPassword(!showPassword)}
                            className="h-5 w-5 cursor-pointer text-gray-400"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setShowPassword(!showPassword)}
                            className="h-5 w-5 cursor-pointer text-gray-400"
                          />
                        )}
                      </div>
                      {isInvalidChar2 && (
                        <p className="text-xs text-red-500">
                          Uppercase letters and Korean characters are not allowed.
                        </p>
                      )}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                form="form-rhf-login"
                className="flex w-full items-center justify-center rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:opacity-20 disabled:hover:bg-black"
              >
                {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "로그인"}
              </Button>
              <div className="flex w-full items-center justify-center gap-3">
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/forgot-password"
                  className="text-xs text-neutral-500 underline"
                >
                  비밀번호 찾기
                </Link>

                <Link
                  onClick={() => setIsOpen(false)}
                  href="/register"
                  className="text-xs text-neutral-500 underline"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
