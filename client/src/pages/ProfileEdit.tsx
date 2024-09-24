import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/slices/auth.slice";

import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import updateUserSchema, {
  updateUserFields,
  UpdateUserSchema,
} from "../models/update-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

type ImgUploader = {
  acceptedFiles: string[];
  onUpload: (fileId: string) => void;
};
const ImgUploader = () => {};
const ProfileEdit = () => {
  const nav = useNavigate();

  const [optionalFieldsSelected, setOptionalFieldsSelected] = useState(
    updateUserFields
      .filter((f) => f.isOptional)
      .reduce(
        (a, c) => ({ ...a, [c.name]: false }),
        {} as { [k in keyof UpdateUserSchema]: boolean }
      )
  );

  const {
    id,
    firstName,
    lastName,
    userName,
    bio,
    email,
    registeredDate,
    avatarFileId,
  } = useSelector(selectUserInfo);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = () => {};

  return (
    <section className="flex flex-col flex-1 h-full">
      <header className="flex justify-between p-4 w-full  border-b-2 border-slate-400">
        <h2 className="font-bold text-lg">Edit Profile</h2>
        <button onClick={() => nav("/dash/profile")} title="Profile Options">
          <FaChevronLeft className="text-lg hover:text-gray-600 duration-200" />
        </button>
      </header>

      <article className="bg-gray-100 p-4 flex flex-col items-center  gap-4 w-full flex-grow overflow-y-auto mx-auto">
        <div className="flex flex-col gap-4 w-full max-w-md">
          <Avatar size="lg" userId={id!} userName={userName!} />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <h5 className="font-bold">First Name:</h5>
                <p>{firstName}</p>
              </div>
              <div>
                <h5 className="font-bold">Last Name:</h5>
                <p>{lastName}</p>
              </div>
            </div>
            <div>
              <h5 className="font-bold">Member Since:</h5>
              <p>{registeredDate}</p>
            </div>
          </div>
        </div>
        <div className="my-4 border-t border-slate-300 w-full"></div>

        <div className="bg-white shadow-md shadow-gray-300/70 p-6 rounded-md w-full max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center flex-col text-black"
          >
            {updateUserFields.map((f) => (
              <div className="mb-4 w-full" key={f.name}>
                <div className="flex justify-between">
                  <label className="mb-2 block " htmlFor={f.name}>
                    {f.label}
                  </label>
                  {f.isOptional && (
                    <input
                      type="checkbox"
                      checked={optionalFieldsSelected[f.name]}
                      onChange={() => {
                        setOptionalFieldsSelected((p) => ({
                          ...p,
                          [f.name]: !optionalFieldsSelected[f.name],
                        }));
                      }}
                    />
                  )}
                </div>
                {f.type === "textarea" ? (
                  <textarea
                    {...f}
                    {...register(f.name)}
                    className={`border outline-none border-gray-300 indent-2 py-1 text-lg w-full resize-none`}
                    rows={4}
                    disabled={f.isOptional && !optionalFieldsSelected[f.name]}
                  />
                ) : (
                  <input
                    className="border outline-none border-gray-300 indent-2 py-1 text-lg w-full"
                    {...f}
                    {...register(f.name)}
                    disabled={f.isOptional && !optionalFieldsSelected[f.name]}
                  />
                )}

                {errors[f.name]?.message ? (
                  <span className="text-red-600 font-bold text-sm">
                    {errors[f.name]?.message}
                  </span>
                ) : null}
              </div>
            ))}
            <button type="submit" className="btn btn-blue">
              Submit
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default ProfileEdit;
