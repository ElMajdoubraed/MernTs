import { useTranslation } from "react-i18next";

type TextFieldProps = {
  label: string;
  name: string;
  type: string;
  id?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
};

const TextField = ({
  label,
  name,
  type = "text",
  id,
  autoComplete,
  required = false,
  className = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
}: TextFieldProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {t(label)}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete || name}
          required={required}
          className={className}
        />
      </div>
    </div>
  );
};

export default TextField;
