
import { ALL_EXHIBITS_DATA } from '@/data/allExhibits-data';
import Container from '@/components/shared/container';
import Image from 'next/image';


export function generateStaticParams() {
    return ALL_EXHIBITS_DATA.map((exhibit) => ({ id: exhibit.id }));
}
// Получаем id через параметры серверного компонента
export default async function ExhibitPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const exhibit = ALL_EXHIBITS_DATA.find((e) => String(e.id) === id);

    if (!exhibit) {
        return <div className="p-4 text-red-600">Экспонат не найден</div>;
    }
    const imageUrl = '/' + exhibit.image;





    return (
        <div className="exhibit">
            <Container className="flex justify-center items-center bg-gray-300">
                <div className="flex flex-col">
                    <h1>Экспонат</h1>
                    <Image
                        loading={"lazy"}
                        className="h-[400px] w-[400px]"
                        height={400}
                        width={400}
                        src={imageUrl}
                        alt="Экспонат"
                    />
                </div>
            </Container>
        </div>
    );
}
