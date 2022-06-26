import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center overflow-hidden">
      <div className="w-full flex flex-col items-center relative">
        <div className="mt-[0.625rem] absolute z-0">
          <ReactLogo />
        </div>
        <div className="w-full max-w-[68.75rem] flex items-center justify-between mt-20 mx-auto absolute z-20">
          <div className="max-w-[40rem]">
            <Logo />
            <h1 className="mt-8 text-[2.5rem] leading-tight">
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
                className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 focus:outline-none transition-colors disabled:opacity-50"
              >
                Garantir minha vaga
              </button>
            </form>
          </div>
        </div>
        <img
          src={imgUrl}
          alt="Imagem de código"
          className="mt-96 absolute z-10"
        />
      </div>
    </div>
  );
}
