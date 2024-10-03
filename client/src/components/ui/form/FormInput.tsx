import clsx from "clsx";
import useFormContext from "./useFormContext";

type FormFieldProps = {
  label: string;
  placeholder: string;
  name: string;
  type: "text" | "email" | "password" | "textarea" | "checkbox";
  error?: string | null;
  isOptional?: boolean;
  dependsOn?: {
    field: string;
    value: boolean;
  };
};
const FormInput = ({ type, label, name, ...rest }: FormFieldProps) => {
  const {
    formMethods: {
      formState: { errors },
      register,
    },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div
      className={clsx({
        "w-full": true,
        "flex items-center justify-between whitespace-nowrap":
          type === "checkbox",
      })}
    >
      <label className={"block mb-2"} htmlFor={name}>
        {label}
      </label>
      <div className="flex items-end justify-end flex-1">
        {type === "textarea" ? (
          <textarea
            className="border-2 w-full mb-2 border-gray-300 focus:border-gray-500 duration-200 rounded-sm indent-1 py-2"
            {...rest}
            {...register(name)}
          />
        ) : (
          <input
            type={type}
            className={clsx({
              "border-2   mb-2 border-gray-300 focus:border-gray-500 duration-200 rounded-sm indent-1 py-2":
                true,
              "w-full": type !== "checkbox",
            })}
            {...rest}
            {...register(name)}
          />
        )}
      </div>
      <span className="block text-red-600 text-sm font-bold max-w-md text-left">
        {error}
      </span>
    </div>
  );
};

export default FormInput;
