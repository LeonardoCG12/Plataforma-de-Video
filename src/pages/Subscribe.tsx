import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useCreateSubscriberMutation } from "../graphql/generated";
import { Logo } from "../components/Logo";
import { ReactLogo } from "../components/ReactLogo";
import imgUrl from "../../src/assets/code-mockup.png";

export function Subscribe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await toast.promise(
      createSubscriber({
        variables: {
          name,
          email,
        },
      }),
      {
        loading: "Cadastrando...",
        success: <b>Cadastro realizado</b>,
        error: <b>Este email já está sendo usado</b>,
      },
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 2000,
      }
    );

    setTimeout(() => {
      navigate("/event");
    }, 2500);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center relative overflow-hidden">
        <div className="mt-[0.625rem] absolute z-0">
          <ReactLogo />
        </div>
        <div className="w-full max-w-[68.75rem] flex flex-col gap-3 items-center justify-center mt-10 mx-auto sm:flex-row sm:gap-8 sm:mt-20 sm:justify-between sm:z-20 sm:absolute ">
          <div className="max-w-[40rem] text-center sm:text-start">
            <div className="w-full flex justify-center sm:w-auto sm:justify-start">
              <Logo />
            </div>
            <h1 className="mt-8 text-3xl leading-tight sm:text-[2.5rem]">
              Construa uma{" "}
              <strong className="text-blue-500">aplicação completa</strong>, do
              zero, com <strong className="text-blue-500">React</strong>
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              Em apenas uma semana você vai dominar na prática uma das
              tecnologias mais utilizadas e com alta demanda para acessar as
              melhores oportunidades do mercado.
            </p>
          </div>
          <div className="p-8 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block">
              Inscreva-se gratuitamente
            </strong>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-2 w-full"
            >
              <input
                type="text"
                placeholder="Seu nome completo"
                onChange={(event) => setName(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Digite seu email"
                onChange={(event) => setEmail(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex mt-4 bg-green-500 max-h-[3.25rem] uppercase py-4 rounded font-bold text-sm items-center justify-center hover:bg-green-700 focus:outline-none transition-colors disabled:opacity-50"
              >
                Garantir minha vaga
              </button>
            </form>
          </div>
        </div>
        <img
          src={imgUrl}
          alt="Imagem de código"
          className="mt-2 z-10 sm:mt-96 sm:absolute"
        />
      </div>
    </>
  );
}
