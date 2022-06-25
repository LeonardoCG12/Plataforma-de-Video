import { gql, useQuery } from "@apollo/client";
import { DefaultUi, Player, Youtube } from "@vime/react";
import {
  CaretRight,
  CircleNotch,
  DiscordLogo,
  FileArrowDown,
  Image,
  Lightning,
} from "phosphor-react";

import "@vime/core/themes/default.css";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      videoId
      title
      description
      teacher {
        name
        bio
        avatarURL
      }
    }
  }
`;

interface GetLessonBySlugResponse {
  lesson: {
    videoId: string;
    title: string;
    description: string;
    teacher: {
      name: string;
      bio: string;
      avatarURL: string;
    };
  };
}

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: { slug: props.lessonSlug },
  });

  if (!data) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400">
        <CircleNotch size={90} weight="bold" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[68.75rem] max-h-[60vh] aspect-video">
          <Player>
            <Youtube key={data.lesson.videoId} videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className="p-8 max-w-[68.75rem] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img
                className="h-16 w-16 rounded-full border-2 border-blue-500"
                src={data.lesson.teacher.avatarURL}
                alt="Foto do professor"
              />
              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a
              href=""
              className="flex font-bold p-4 text-sm bg-green-500 rounded items-center justify-center uppercase gap-2 hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href=""
              className="flex font-bold p-4 text-sm text-blue-500 border border-blue-500 rounded items-center justify-center uppercase gap-2 hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            href="#"
            className="flex items-stretch bg-gray-700 rounded overflow-hidden gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="flex bg-green-700 h-full p-6 items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="flex h-full p-6 items-center">
              <CaretRight size={24} />
            </div>
          </a>
          <a
            href="#"
            className="flex items-stretch bg-gray-700 rounded overflow-hidden gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="flex bg-green-700 h-full p-6 items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos da Maratona Explorer e personalize a
                sua máquina
              </p>
            </div>
            <div className="flex h-full p-6 items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
