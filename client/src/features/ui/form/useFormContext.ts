import { createContext, useContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
type FormContextProps = {
  formMethods: UseFormReturn<FieldValues>;
};

export const FormContext = createContext<FormContextProps | undefined>(
  undefined
);

const useFormContext = () => {
  const ctx = useContext<FormContextProps | undefined>(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within a provider");
  return ctx;
};

export default useFormContext;
