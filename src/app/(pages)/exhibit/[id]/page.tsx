import Container from '@/components/shared/container';
import ExhibitSlider from './ExhibitSlider';
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function ExhibitPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Запрос к бэкенду
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    let exhibit = null;
    let error = null;

    try {
        const res = await fetch(`${apiUrl}/exhibits/${id}`, {
            cache: 'no-store', // или 'force-cache' с revalidate, если хотите кэшировать
        });

        if (!res.ok) {
            if (res.status === 404) {
                error = 'Экспонат не найден';
            } else {
                error = `Ошибка загрузки: ${res.status}`;
            }
        } else {
            const data = await res.json();
            exhibit = data;
        }
    } catch (err) {
        error = 'Не удалось загрузить данные. Проверьте соединение с сервером.';
    }

    // Если ошибка или экспонат не найден
    if (error || !exhibit) {
        return (
            <Container className="mt-[60px]">
                <div className="p-4 text-red-600">{error || 'Экспонат не найден'}</div>
            </Container>
        );
    }

    return (
        <div className="mt-[60px]">
            <Container className="flex flex-col lg:flex-row justify-center items-center lg:justify-between bg-[#F5E5D3] border-[#BD9E7B] rounded-[20px]">
                <ExhibitSlider
                    images={exhibit.images}
                    title={exhibit.title}
                />
                <div className="w-[400px] md:w-[600px] flex-col items-center text-center m-[36px]">
                    <h1 className="text-[#000000] font-bold text-[30px]">{exhibit.title}</h1>
                    <ScrollArea className="pt-[20px] pr-4 h-[450px]">
                        <p className="text-[18px] text-[#000000]">{exhibit.subtitle}</p>
                    </ScrollArea>
                </div>
            </Container>
        </div>
    );
}