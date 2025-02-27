import React, {useState} from 'react';
import kc from "@/lib/keycloak.ts";

type Props = {
    classes?: string;
};

function Login(classes: Props) {

    const [form, setForm] = useState({ email: "", password: "", rememberMe: false });

    const inputs = [
        {
            title: "Email",
            placeholder: "sample@gmail.com",
            type: "email",
            classes: "",
        },
        {
            title: "Password",
            placeholder: "••••••••",
            type: "password",
            classes: "",
        },
    ];
    const handleSubmit = (e: unknown) => {
        e.preventDefault();
        console.log("form", form);
        // submit form here...
    };
    return (
        <div>
            <div className={'flex justify-center items-center mt-56'}>

                <section className="z-[10] mx-4 w-full">
                    <div className="mx-auto flex w-full flex-col items-center justify-center">
                        <div
                            className={`mx-12 w-full rounded-md bg-zinc-100 text-black shadow-lg dark:bg-zinc-900 dark:text-white md:w-[480px] ${classes}`}
                        >
                            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                                <h1 className="text-xl font-bold leading-tight tracking-tight">{kc.tokenParsed?.preferred_username}</h1>
                                <h1 className="text-xl font-bold leading-tight tracking-tight">{kc.tokenParsed?.auth_time}</h1>
                                <h1 className="text-xl font-bold leading-tight tracking-tight mb-10">{kc.tokenParsed?.name}</h1>
                                <form
                                    className="space-y-4 md:space-y-6"
                                    onSubmit={handleSubmit}
                                >
                                    {inputs.map(({title, type, placeholder, classes}) => (
                                        <div key={title}>
                                            <label
                                                htmlFor={title}
                                                className="mb-2 block text-sm font-medium"
                                            >
                                                {title}
                                            </label>
                                            {!kc.authenticated && <input
                                                autoComplete="false"
                                                onChange={(e) =>
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        [e.target.name]: e.target.value,
                                                    }))
                                                }
                                                type={type || "text"}
                                                //name must be equal to form key
                                                name={title}
                                                id={title}
                                                className={`block w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-black outline-none placeholder:text-black/40 focus:ring focus:ring-emerald-400 dark:border-gray-500 dark:bg-gray-300 sm:text-sm ${classes}`}
                                                placeholder={placeholder}
                                            />}
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="remember"
                                                    checked={form.rememberMe}
                                                    aria-describedby="remember"
                                                    onChange={() => setForm((prev) => ({
                                                        ...prev,
                                                        rememberMe: !form.rememberMe
                                                    }))}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border outline-none focus:ring focus:ring-emerald-400"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember">Remember me</label>
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="text-sm font-medium outline-none hover:underline focus:ring focus:ring-emerald-400"
                                        >
                                            Forget password?
                                        </a>
                                    </div>
                                    {
                                        !kc.authenticated ? <button
                                                onClick={() => {
                                                    kc.login({
                                                        idpHint: 'google',
                                                        redirectUri: window.location.origin
                                                    }).then(r => r)
                                                }}
                                                type="submit"
                                                className="w-full rounded-md bg-emerald-400 px-5 py-2.5 text-center text-sm font-medium text-black outline-none focus:ring focus:ring-gray-800 dark:bg-emerald-600 dark:focus:ring-gray-200"
                                            >
                                                Sign in
                                            </button> :
                                            <button
                                                onClick={() => {
                                                    kc.logout({redirectUri: window.location.origin}).then(r => r)
                                                }}
                                                type="submit"
                                                className="w-full rounded-md bg-emerald-400 px-5 py-2.5 text-center text-sm font-medium text-black outline-none focus:ring focus:ring-gray-800 dark:bg-emerald-600 dark:focus:ring-gray-200"
                                            >
                                                Log out
                                            </button>
                                    }

                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default Login;