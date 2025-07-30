import Hero from "@/components/sections/Hero";
import Offerings from "@/components/sections/Offerings";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Aeonark Labs | Building the Digital Future</title>
        <meta name="description" content="Aeonark Labs helps startups and businesses launch, scale, and dominate online — faster, smarter, leaner." />
      </Helmet>
      <Hero />
      <Offerings />
    </>
  );
}
