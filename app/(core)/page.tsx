import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookIcon, BoxesIcon, ChartColumnIcon, Gamepad2Icon, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Feature = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: "Cursos Completos",
    description: "Aprenda de forma integrada e personalizada.",
    Icon: BookIcon,
  },
  {
    title: "Aprendizado Interativo",
    description: "Aprenda de forma interativa e dinâmica. Conheça novos conteúdos e tópicos.",
    Icon: Gamepad2Icon,
  },
  {
    title: "Progresso em Tempo Real",
    description: "Acompanhe o seu progresso em tempo real e acompanhe seus estudos.",
    Icon: ChartColumnIcon,
  },
  {
    title: "Suporte da Comunidade",
    description: "Encontre ajuda e suporte da comunidade.",
    Icon: BoxesIcon,
  }
]

const Home = () => {
  return (
    <div>
      <section className="relative py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="outline">
            O Futuro da Educação Online
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Melhore a sua experiência de aprendizagem
          </h1>
          <p className="max-w-2xl text-muted-foreground md:text-xl">
            Descubra um novo jeito de aprender e se tornar um profissional de qualidade. Acesse cursos de alta qualidade, ofereça-se de forma eficiente e obtenha resultados significativos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href={"/explore"}
              className={buttonVariants({
                size: "lg",
              })}
            >
              Explorar Cursos
            </Link>

            <Link
              href={"/sign-in"}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
              })}
            >
              Entrar
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <feature.Icon className="size-8 text-4xl mb-4" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Home;
