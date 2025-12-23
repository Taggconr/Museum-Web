import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/container";
import HeroBaner from "@/components/section/hero-baner";
import GoExhibits from "@/components/section/goExhibits";
import MissionsCards from "@/components/widgets/missionsCards";

export default function Home() {
  return (
    <div className="">
      <main>
          <Container>
              <HeroBaner />
              <GoExhibits />
              <MissionsCards />
          </Container>

      </main>
    </div>
  );
}
