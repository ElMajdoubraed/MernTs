import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { PasswordField, TextField } from "../../components/inputs";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginView() {
  const { i18n, t } = useTranslation();
  const siteKey = process.env.REACT_APP_RECAPTCHA_KEY as string;

  function onChange(value: any) {
    console.log("Captcha value:", value);
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="h-10 w-auto" src="/favicon.ico" alt="mern-ts" />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900 underline decoration-sky-500">
            {t("login.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("login.notmember")}{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {t("login.signup")}
            </a>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <TextField
              label="input.email"
              name="email"
              type="email"
              id="email"
              required
            />
            <PasswordField
              label="input.password"
              name="password"
              id="password"
              required
            />
            <div className="re-captcha">
              <ReCAPTCHA
                sitekey={siteKey}
                hl={i18n.language || "ar"}
                size="normal"
                badge="inline"
                onChange={onChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("login.submit")}
              </button>
            </div>
          </form>

          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-bold">
                {t("login.or")}
              </span>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex flex-row gap-4">
              <a
                href="/api/auth/github"
                className="w-[50%] flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    bg-gray-900 hover:bg-gray-700"
              >
                <AiFillGithub className="mr-2 mt-1" />
                Github
              </a>
              <a
                href="/api/auth/google"
                className="w-[50%] flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500
                "
              >
                <AiFillGoogleCircle className="mr-2 mt-1" />
                Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
