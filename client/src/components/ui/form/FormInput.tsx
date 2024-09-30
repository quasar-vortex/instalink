import useFormContext from "./useFormContext";

type FormFieldProps = {
  label: string;
  placeholder: string;
  name: string;
  type: "text" | "email" | "password" | "textarea";
  error?: string | null;
  isOptional?: boolean;
};
const FormInput = ({ type, label, name, ...rest }: FormFieldProps) => {
  const {
    formMethods: {
      formState: { errors },
      register,
    },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const El = () =>
    type === "textarea" ? (
      <textarea
        className="border-2 w-full mb-2 border-gray-300 focus:border-gray-500 duration-200 rounded-sm indent-1 py-2"
        {...rest}
        {...register(name)}
      />
    ) : (
      <input
        type={type}
        className="border-2 w-full mb-2 border-gray-300 focus:border-gray-500 duration-200 rounded-sm indent-1 py-2"
        {...rest}
        {...register(name)}
      />
    );
  return (
    <div className="w-full">
      <label className="block mb-2" htmlFor={name}>
        {label}
      </label>
      <El />
      <span className="block text-red-600 text-sm font-bold max-w-md text-left">
        {error}
      </span>
    </div>
  );
};

export default FormInput;
