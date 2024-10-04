import z from "zod";
import { FormField } from "../../../types";
import FormInput from "./FormInput";
import Button from "../Button";
import { ReactNode } from "react";
import useFormContext, { FormContext } from "./useFormContext";
import { FieldValues, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormProvider = ({
  children,
  schema,
  defaultValues,
}: {
  children: ReactNode;
  schema: z.ZodSchema;
  defaultValues: Record<string, any> | undefined;
}) => {
  const formMethods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
    shouldUnregister: true,
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
  defaultValues: Record<string, any> | undefined;
};
const Form = ({ fields, onSubmit, disabled = false }: FormProps) => {
  const {
    formMethods: { handleSubmit, control },
  } = useFormContext();

  const fieldsWithDependencies = fields.filter((field) => field.dependsOn);

  const watchFields = fieldsWithDependencies.map(
    (input) => input.dependsOn!.field
  );

  const watchedValues = useWatch({
    control,
    name: watchFields,
  });

  const watchedValuesMap = watchFields.reduce((acc, fieldName, index) => {
    acc[fieldName] = watchedValues[index];
    return acc;
  }, {} as Record<string, any>);

  const fieldsToRender = fields.filter((field) => {
    if (field.dependsOn) {
      const { field: depField, value } = field.dependsOn;
      const depFieldValue = watchedValuesMap[depField as string];
      return depFieldValue === value;
    }
    return true;
  });
  const onSubmitHandler = handleSubmit(
    (data) => {
      onSubmit(data);
    },
    (errors) => {
      console.log("Validation Errors:", errors);
    }
  );
  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={onSubmitHandler}
    >
      {fieldsToRender.map(({ name, ...rest }) => {
        return <FormInput key={name as string} name={name} {...rest} />;
      })}
      <Button disabled={disabled} type="submit">
        Submit
      </Button>
    </form>
  );
};
const FormWithProvider = (p: FormProps) => (
  <FormProvider defaultValues={p.defaultValues} schema={p.schema}>
    <Form {...p} />
  </FormProvider>
);
export default FormWithProvider;
