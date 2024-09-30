import z from "zod";
import { FormField } from "../../../types";
import FormInput from "./FormInput";
import Button from "../Button";
import { ReactNode, useEffect } from "react";
import useFormContext, { FormContext } from "./useFormContext";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormProvider = ({
  children,
  schema,
}: {
  children: ReactNode;
  schema: z.ZodSchema;
}) => {
  const formMethods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  return (
    <FormContext.Provider value={{ formMethods }}>
      {children}
    </FormContext.Provider>
  );
};

type FormProps = {
  schema: z.ZodSchema<FieldValues>;
  onSubmit: (data: FieldValues) => void;
  fields: FormField<FieldValues>[];
  disabled?: boolean;
};
const Form = ({ fields, onSubmit, disabled = false }: FormProps) => {
  const {
    formMethods: { handleSubmit, setValue },
  } = useFormContext();

  useEffect(() => {
    fields.forEach((f) => {
      if (f.value) setValue(f.name, f.value);
    });
  }, [fields, setValue]);
  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map(({ name, ...rest }) => {
        return <FormInput key={name as string} name={name} {...rest} />;
      })}
      <Button disabled={disabled} type="submit">
        Submit
      </Button>
    </form>
  );
};
const FormWithProvider = (p: FormProps) => (
  <FormProvider schema={p.schema}>
    <Form {...p} />
  </FormProvider>
);
export default FormWithProvider;
