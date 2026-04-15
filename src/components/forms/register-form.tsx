"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character.")
    .max(32, "Name must be at most 32 characters."),
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters.")
    .regex(/^[^A-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/, "Uppercase letters and Korean characters are not allowed.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)/,
      "Password must include at least one lowercase letter and one number."
    ),
  passwordConfirm: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters.")
    .regex(/^[^A-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/, "Uppercase letters and Korean characters are not allowed.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)/,
      "Password must include at least one lowercase letter and one number."
    ),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const [isInvalidChar, setIsInvalidChar] = useState(false);
  const [isInvalidChar2, setIsInvalidChar2] = useState(false);

  const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  return (
    <Card className="w-full max-w-md space-y-20 rounded-lg bg-white p-6 shadow-md">
      <CardHeader>
        <CardTitle className="mb-4 text-center text-xl font-bold">회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-8">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex flex-col">
                  <FieldLabel htmlFor="form-rhf-field1" className="font-semibold">
                    이름
                  </FieldLabel>
                  <input
                    {...field}
                    id="form-rhf-field1"
                    name="field1"
                    aria-invalid={fieldState.invalid}
                    placeholder="한송이"
                    className="border-b"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex flex-col">
                  <FieldLabel htmlFor="form-rhf-field2" className="font-semibold">
                    이메일
                  </FieldLabel>
                  <input
                    {...field}
                    id="form-rhf-field2"
                    name="field2"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="off"
                    className="border-b"
                  />
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
                  <FieldLabel htmlFor="form-rhf-field3" className="font-semibold">
                    비밀번호
                  </FieldLabel>
                  <div className="flex w-full gap-1">
                    <input
                      {...field}
                      onChange={(e) => {
                        const isInvalid = handlePasswordValidation(e);

                        setIsInvalidChar(isInvalid);

                        if (!isInvalid) {
                          field.onChange(e);
                        }
                      }}
                      id="form-rhf-field3"
                      name="field3"
                      aria-invalid={fieldState.invalid}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="one-time-code"
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
              name="passwordConfirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-field3" className="font-semibold">
                    비밀번호 확인
                  </FieldLabel>
                  <div className="flex w-full gap-1">
                    <input
                      {...field}
                      onChange={(e) => {
                        const isInvalid = handlePasswordValidation(e);

                        setIsInvalidChar2(isInvalid);

                        if (!isInvalid) {
                          field.onChange(e);
                        }
                      }}
                      id="form-rhf-field3"
                      name="field3"
                      inputMode="decimal"
                      aria-invalid={fieldState.invalid}
                      type="password"
                      placeholder="••••••••"
                      autoComplete="one-time-code"
                      className="w-full border-b"
                    />
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
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-3">
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          form="form-rhf-login"
          className="flex w-full items-center justify-center rounded bg-black px-4 py-2 text-white hover:bg-black/80 disabled:opacity-20 disabled:hover:bg-black"
        >
          {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "회원가입"}
        </Button>

        <Link href="/" className="text-xs text-neutral-500 underline">
          홈으로 돌아가기
        </Link>
      </CardFooter>
    </Card>
  );
}
