import React from "react";
import { useTranslation } from "react-i18next";

type PasswordFieldProps = {
  label: string;
  name: string;
  id?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
};

export default function PasswordField({
  label,
  name,
  id,
  autoComplete,
  required = false,
  className = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
}: PasswordFieldProps) {
  const { t } = useTranslation();
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);
  const viewPasswordHandler = () => {
    setViewPassword(!viewPassword);
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {t(label)}
          </label>
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("login.forgotpassword")}
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id={id}
            name={name}
            type={viewPassword ? "text" : "password"}
            autoComplete={autoComplete || name}
            required={required}
            className={className}
          />
        </div>
      </div>
      {/* view password checkbox*/}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="view_password"
              type="checkbox"
              onChange={viewPasswordHandler}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out focus:ring-2 focus:ring-offset-2"
            />
            <label
              htmlFor="view_password"
              className="ml-2 block text-sm leading-5 text-gray-900 font-medium cursor-pointer hover:text-indigo-600 transition ease-in-out duration-150 mr-2 text-sm font-medium leading-5 text-gray-900"
            >
              {t("login.viewpassword")}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
