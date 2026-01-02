import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Form({
  children,
  onSubmit,
  defaultValues = {},
  resolver,
  className = "",
}) {
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}