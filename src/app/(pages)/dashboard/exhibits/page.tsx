'use client';

import Container from '@/components/shared/container';
import LogoutButton from '@/components/ui/logout-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Exhibit {
    id: string;
    category: string;
    title: string;
    subtitle: string;
    images?: string[];
}

export default function ExhibitsAdminPage() {
    const [exhibits, setExhibits] = useState<Exhibit[]>([]);
    const [loading, setLoading] = useState(true);

    // Поиск
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState<Exhibit | null>(null);
    const [searchError, setSearchError] = useState('');

    // Удаление
    const [deleteId, setDeleteId] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Создание
    const [createCategory, setCreateCategory] = useState('');
    const [createTitle, setCreateTitle] = useState('');
    const [createSubtitle, setCreateSubtitle] = useState('');
    const [createFiles, setCreateFiles] = useState<FileList | null>(null);
    const [createMessage, setCreateMessage] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    // Обновление
    const [updateId, setUpdateId] = useState('');
    const [updateCategory, setUpdateCategory] = useState('');
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateSubtitle, setUpdateSubtitle] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Загрузка всех экспонатов
    useEffect(() => {
        const fetchExhibits = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exhibits`, {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setExhibits(data);
                } else {
                    console.error('Ошибка загрузки:', res.status);
                }
            } catch (err) {
                console.error('Сетевая ошибка:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchExhibits();
    }, []);

    // Поиск по ID
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchId.trim();
        if (!trimmed) {
            setSearchError('Введите ID');
            setSearchResult(null);
            return;
        }
        setSearchError('');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exhibits/${trimmed}`, {
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                setSearchResult(data);
            } else {
                setSearchResult(null);
                setSearchError('Экспонат не найден');
            }
        } catch {
            setSearchError('Сетевая ошибка');
        }
    };

    // Удаление
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = deleteId.trim();
        if (!trimmed) {
            setDeleteMessage('Введите ID экспоната');
            return;
        }
        setDeleteMessage('');
        setIsDeleting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exhibits/${trimmed}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (res.ok) {
                setDeleteMessage('Экспонат удалён');
                setDeleteId('');
                setExhibits((prev) => prev.filter((ex) => ex.id !== trimmed));
                if (searchResult && searchResult.id === trimmed) {
                    setSearchResult(null);
                    setSearchError('');
                }
            } else {
                const data = await res.json();
                setDeleteMessage(`Ошибка: ${data.message || 'Неизвестная ошибка'}`);
            }
        } catch {
            setDeleteMessage('Сетевая ошибка');
        } finally {
            setIsDeleting(false);
        }
    };

    // Создание
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!createCategory.trim() || !createTitle.trim() || !createSubtitle.trim() || !createFiles || createFiles.length === 0) {
            setCreateMessage('Заполните все поля и выберите хотя бы одно изображение');
            return;
        }
        setCreateMessage('');
        setIsCreating(true);

        const formData = new FormData();
        formData.append('category', createCategory.trim());
        formData.append('title', createTitle.trim());
        formData.append('subtitle', createSubtitle.trim());
        for (let i = 0; i < createFiles.length; i++) {
            formData.append('images', createFiles[i]);
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exhibits`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (res.ok) {
                const newExhibit = await res.json();
                setExhibits((prev) => [...prev, newExhibit.result || newExhibit]);
                setCreateMessage('Экспонат создан');
                setCreateCategory('');
                setCreateTitle('');
                setCreateSubtitle('');
                setCreateFiles(null);
                const fileInput = document.getElementById('createFiles') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            } else {
                const data = await res.json();
                setCreateMessage(`Ошибка: ${data.message || 'Неизвестная ошибка'}`);
            }
        } catch {
            setCreateMessage('Сетевая ошибка');
        } finally {
            setIsCreating(false);
        }
    };

    // Обновление
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedId = updateId.trim();
        if (!trimmedId || !updateCategory.trim() || !updateTitle.trim() || !updateSubtitle.trim()) {
            setUpdateMessage('Заполните все поля');
            return;
        }
        setUpdateMessage('');
        setIsUpdating(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exhibits/${trimmedId}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category: updateCategory.trim(),
                    title: updateTitle.trim(),
                    subtitle: updateSubtitle.trim(),
                }),
            });

            if (res.ok) {
                const updated = await res.json();
                setUpdateMessage('Экспонат обновлён');
                setUpdateId('');
                setUpdateCategory('');
                setUpdateTitle('');
                setUpdateSubtitle('');
                setExhibits((prev) =>
                    prev.map((ex) => (ex.id === trimmedId ? { ...ex, ...updated } : ex))
                );
                if (searchResult && searchResult.id === trimmedId) {
                    setSearchResult({ ...searchResult, ...updated });
                }
            } else {
                const data = await res.json();
                setUpdateMessage(`Ошибка: ${data.message || 'Неизвестная ошибка'}`);
            }
        } catch {
            setUpdateMessage('Сетевая ошибка');
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <Container className="mt-[100px]">
                <p className="text-center">Загрузка...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-[100px]">
            <div className="w-full flex justify-center gap-[25px]">
                <nav className="flex justify-center bg-black/20 p-5 rounded-lg">
                    <ul className="w-full flex gap-[25px]">
                        <li>
                            <Link className="text-black duration-200 hover:text-black/70" href="/dashboard/users">
                                Пользователи
                            </Link>
                        </li>
                        <li className="border-b-[2px] border-black">
                            <Link className="text-black duration-200 hover:text-black/70" href="/dashboard/exhibits">
                                Экспонаты
                            </Link>
                        </li>
                    </ul>
                </nav>
                <LogoutButton />
            </div>

            <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Список всех экспонатов */}
                    <div className="w-[250px] sm:w-full flex-col items-center text-center">
                        <h1 className="text-[#000000] font-bold text-[30px]">Все экспонаты</h1>
                        <ScrollArea className="mt-[25px] pr-1 h-[350px]">
                            {exhibits.length === 0 ? (
                                <p className="text-gray-500">Нет экспонатов</p>
                            ) : (
                                exhibits.map((exhibit) => (
                                    <div key={exhibit.id} className="mt-1">
                                        <div className="flex flex-col gap-[25px] border-black border-2 p-3">
                                            <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                                <p>id:</p>
                                                <p>{exhibit.id}</p>
                                            </div>
                                            <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                                <p>Категория:</p>
                                                <p>{exhibit.category}</p>
                                            </div>
                                            <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                                <p>Название:</p>
                                                <p>{exhibit.title}</p>
                                            </div>
                                            <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                                <p>Описание:</p>
                                                <p>{exhibit.subtitle}</p>
                                            </div>
                                            <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                                <p>Изображений:</p>
                                                <p>{exhibit.images?.length || 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </ScrollArea>
                    </div>

                    {/* Поиск */}
                    <div className="w-[250px] sm:w-full flex-col items-center text-center">
                        <h1 className="text-[#000000] font-bold text-[30px]">Поиск экспоната по ID</h1>
                        <form onSubmit={handleSearch} className="mt-[25px] border-black border-2 p-4 flex flex-col items-center gap-[25px]">
                            <input
                                type="text"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Введите ID экспоната"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                            />
                            <button
                                className="bg-black/20 rounded-lg py-3 px-5 cursor-pointer duration-200 hover:bg-black/30"
                                type="submit"
                            >
                                Отправить
                            </button>
                        </form>

                        {searchResult && (
                            <div className="mt-4 flex flex-col gap-[25px] border-black border-2 p-3">
                                <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                    <p>id:</p>
                                    <p>{searchResult.id}</p>
                                </div>
                                <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                    <p>Категория:</p>
                                    <p>{searchResult.category}</p>
                                </div>
                                <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                    <p>Название:</p>
                                    <p>{searchResult.title}</p>
                                </div>
                                <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                    <p>Описание:</p>
                                    <p>{searchResult.subtitle}</p>
                                </div>
                                <div className="text-[18px] text-[#000000] flex gap-[25px]">
                                    <p>Изображений:</p>
                                    <p>{searchResult.images?.length || 0}</p>
                                </div>
                            </div>
                        )}
                        {searchError && (
                            <p className="mt-2 text-red-500">{searchError}</p>
                        )}
                    </div>

                    {/* Создание */}
                    <div className="w-[250px] sm:w-full flex-col items-center text-center">
                        <h1 className="text-[#000000] font-bold text-[30px]">Создать экспонат</h1>
                        <form onSubmit={handleCreate} className="mt-[25px] border-black border-2 p-4 flex flex-col items-center gap-[25px]">
                            <input
                                type="hidden"
                                name="category"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Категория"
                                value={createCategory}
                                disabled={isCreating}
                            />
                            <Select value={createCategory} onValueChange={(e) => {
                                setCreateCategory(e);
                            }} >
                                <SelectTrigger className="w-full border-black">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="vov">Великая Отечественная Война</SelectItem>
                                        <SelectItem value="history">Краеведческий уголок</SelectItem>
                                        <SelectItem value="svo">СВО</SelectItem>
                                        <SelectItem value="lifestyle">Быт</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <input
                                type="text"
                                name="title"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Название"
                                value={createTitle}
                                onChange={(e) => setCreateTitle(e.target.value)}
                                disabled={isCreating}
                            />
                            <input
                                type="text"
                                name="subtitle"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Описание"
                                value={createSubtitle}
                                onChange={(e) => setCreateSubtitle(e.target.value)}
                                disabled={isCreating}
                            />
                            <input
                                id="createFiles"
                                type="file"
                                multiple
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                onChange={(e) => setCreateFiles(e.target.files)}
                                disabled={isCreating}
                            />
                            <button
                                className="bg-black/20 rounded-lg py-3 px-5 cursor-pointer duration-200 hover:bg-black/30 disabled:opacity-50"
                                type="submit"
                                disabled={isCreating}
                            >
                                {isCreating ? 'Создание...' : 'Создать'}
                            </button>
                            {createMessage && <p className="text-sm">{createMessage}</p>}
                        </form>
                    </div>

                    {/* Обновление */}
                    <div className="w-[250px] sm:w-full flex-col items-center text-center">
                        <h1 className="text-[#000000] font-bold text-[30px]">Обновить экспонат</h1>
                        <form onSubmit={handleUpdate} className="mt-[25px] border-black border-2 p-4 flex flex-col items-center gap-[25px]">
                            <input
                                type="text"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="ID экспоната"
                                value={updateId}
                                onChange={(e) => setUpdateId(e.target.value)}
                                disabled={isUpdating}
                            />
                            <input
                                type="text"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Новая категория"
                                value={updateCategory}
                                onChange={(e) => setUpdateCategory(e.target.value)}
                                disabled={isUpdating}
                            />
                            <input
                                type="text"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Новое название"
                                value={updateTitle}
                                onChange={(e) => setUpdateTitle(e.target.value)}
                                disabled={isUpdating}
                            />
                            <input
                                type="text"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Новый Описание"
                                value={updateSubtitle}
                                onChange={(e) => setUpdateSubtitle(e.target.value)}
                                disabled={isUpdating}
                            />
                            <button
                                className="bg-black/20 rounded-lg py-3 px-5 cursor-pointer duration-200 hover:bg-black/30 disabled:opacity-50"
                                type="submit"
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Обновление...' : 'Обновить'}
                            </button>
                            {updateMessage && <p className="text-sm">{updateMessage}</p>}
                        </form>
                    </div>

                    {/* Удаление */}
                    <div className="w-[250px] sm:w-full flex-col items-center text-center">
                        <h1 className="text-[#000000] font-bold text-[30px]">Удалить экспонат</h1>
                        <form onSubmit={handleDelete} className="mt-[25px] border-black border-2 p-4 flex flex-col items-center gap-[25px]">
                            <input
                                type="text"
                                className="w-full p-1 border-black border-1 rounded-[5px]"
                                placeholder="Введите ID экспоната"
                                value={deleteId}
                                onChange={(e) => setDeleteId(e.target.value)}
                                disabled={isDeleting}
                            />
                            <button
                                className="bg-black/20 rounded-lg py-3 px-5 cursor-pointer duration-200 hover:bg-black/30 disabled:opacity-50"
                                type="submit"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Удаление...' : 'Удалить'}
                            </button>
                            {deleteMessage && <p className="text-sm">{deleteMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}