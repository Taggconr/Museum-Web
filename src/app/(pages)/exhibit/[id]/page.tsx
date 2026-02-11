
import { ALL_EXHIBITS_DATA } from '@/data/allExhibits-data';
import Container from '@/components/shared/container';
import ExhibitSlider from './ExhibitSlider';
import {ScrollArea} from "@/components/ui/scroll-area"; // Импорт клиентского компонента


export function generateStaticParams() {
    return ALL_EXHIBITS_DATA.map((exhibit) => ({ id: exhibit.id }));
}

export default async function ExhibitPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const exhibit = ALL_EXHIBITS_DATA.find((e) => String(e.id) === id);

    if (!exhibit) {
        return <div className="p-4 text-red-600">Экспонат не найден</div>;
    }

    return (
        <div className="mt-[60px]">
            <Container className="flex flex-col lg:flex-row justify-center items-center lg:justify-between bg-[#F5E5D3] border-[#BD9E7B] rounded-[20px]">

                <ExhibitSlider
                    images={exhibit.images}
                    title={exhibit.title}
                />

                <div className="w-[400px] md:w-[600px] flex-col items-center text-center m-[36px]">
                    <h1 className={"text-[#000000] font-bold text-[30px]"}>{exhibit.title}</h1>
                    <ScrollArea className="pt-[20px] pr-4 h-[450px]">
                        <p className={"text-[18px] text-[#000000]"}>{exhibit.subtitle}</p>
                    </ScrollArea>
                </div>
            </Container>
        </div>
    );
}
