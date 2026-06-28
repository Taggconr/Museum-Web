'use client';

import Container from '@/components/shared/container';
import LogoutButton from '@/components/ui/logout-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  fullname: string;
  login: string;
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Поиск
  const [searchLogin, setSearchLogin] = useState('');
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [searchError, setSearchError] = useState('');

  // Удаление
  const [deleteId, setDeleteId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Создание
  const [newFullname, setNewFullname] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Загрузка всех пользователей
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error('Ошибка загрузки:', res.status);
        }
      } catch (err) {
        console.error('Сетевая ошибка:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Поиск
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchLogin.trim();
    if (!trimmed) {
      setSearchError('Введите логин');
      setSearchResult(null);
      return;
    }

    const found = users.find(
      (user) => user.login.toLowerCase() === trimmed.toLowerCase()
    );

    if (found) {
      setSearchResult(found);
      setSearchError('');
    } else {
      setSearchResult(null);
      setSearchError('Пользователь не найден');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLogin(e.target.value);
    setSearchResult(null);
    setSearchError('');
  };

  // Удаление
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = deleteId.trim();
    if (!trimmed) {
      setDeleteMessage('Введите ID пользователя');
      return;
    }
    setDeleteMessage('');
    setIsDeleting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${trimmed}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setDeleteMessage('Пользователь удалён');
        setDeleteId('');
        setUsers((prev) => prev.filter((user) => user.id !== trimmed));
        if (searchResult && searchResult.id === trimmed) {
          setSearchResult(null);
          setSearchError('');
        }
      } else {
        const data = await res.json();
        setDeleteMessage(`Ошибка: ${data.message || 'Неизвестная ошибка'}`);
      }
    } catch (err) {
      setDeleteMessage('Сетевая ошибка');
    } finally {
      setIsDeleting(false);
    }
  };

  // Создание
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullname = newFullname.trim();
    const login = newLogin.trim();
    const password = newPassword.trim();

    if (!fullname || !login || !password) {
      setCreateMessage('Заполните все поля');
      return;
    }
    setCreateMessage('');
    setIsCreating(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, login, password }),
      });

      if (res.ok) {
        const newUser = await res.json();
        setUsers((prev) => [...prev, newUser]);
        setCreateMessage('Пользователь создан');
        setNewFullname('');
        setNewLogin('');
        setNewPassword('');
      } else {
        const data = await res.json();
        setCreateMessage(`Ошибка: ${data.message || 'Неизвестная ошибка'}`);
      }
    } catch (err) {
      setCreateMessage('Сетевая ошибка');
    } finally {
      setIsCreating(false);
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
            <li className="border-b-[2px] border-black">
              <Link className="text-black duration-200 hover:text-black/70" href="/dashboard/users">
                Пользователи
              </Link>
            </li>
            <li>
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
          {/* Список всех пользователей */}
          <div className="w-[250px] sm:w-full flex-col items-center text-center">
            <h1 className="text-[#000000] font-bold text-[30px]">Все пользователи</h1>
            <ScrollArea className="mt-[25px] pr-1 h-[350px]">
              {users.length === 0 ? (
                <p className="text-gray-500">Нет пользователей</p>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="mt-1">
                    <div className="flex flex-col gap-[25px] border-black border-2 p-3">
                      <div className="text-[18px] text-[#000000] flex gap-[25px]">
                        <p>id:</p>
                        <p>{user.id}</p>
                      </div>
                      <div className="text-[18px] text-[#000000] flex gap-[25px]">
                        <p>Имя:</p>
                        <p>{user.fullname}</p>
                      </div>
                      <div className="text-[18px] text-[#000000] flex gap-[25px]">
                        <p>Логин:</p>
                        <p>{user.login}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </div>

          {/* Поиск */}
          <div className="w-[250px] sm:w-full flex-col items-center text-center">
            <h1 className="text-[#000000] font-bold text-[30px]">Поиск пользователя по login</h1>
            <form onSubmit={handleSearch} className="mt-[25px] border-black border-2 p-4 flex flex-col items-center gap-[25px]">
              <input
                type="text"
                className="w-full p-1 border-black border-1 rounded-[5px]"
                placeholder="Введите login пользователя"
                value={searchLogin}
                onChange={handleSearchChange}
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
                  <p>Имя:</p>
                  <p>{searchResult.fullname}</p>
                </div>
                <div className="text-[18px] text-[#000000] flex gap-[25px]">
                  <p>Логин:</p>
                  <p>{searchResult.login}</p>
                </div>
              </div>
            )}
            {searchError && (
              <p className="mt-2 text-red-500">{searchError}</p>
            )}
          </div>

          {/* Удаление */}
          <div className="w-[250px] sm:w-full flex-col items-center text-center">
            <h1 className="text-[#000000] font-bold text-[30px]">Удалить пользователя</h1>
            <form onSubmit={handleDelete} className="mt-[25px] border-black border-2 p-4 flex flex-col items-center gap-[25px]">
              <input
                type="text"
                className="w-full p-1 border-black border-1 rounded-[5px]"
                placeholder="Введите id пользователя"
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

          {/* Создание */}
          <div className="w-[250px] sm:w-full flex-col items-center text-center">
            <h1 className="text-[#000000] font-bold text-[30px]">Создать нового пользователя</h1>
            <form onSubmit={handleCreate} className="mt-[25px] border-black border-2 p-4 flex flex-col items-center gap-[25px]">
              <input
                type="text"
                className="w-full p-1 border-black border-1 rounded-[5px]"
                placeholder="Придумайте имя для пользователя"
                value={newFullname}
                onChange={(e) => setNewFullname(e.target.value)}
                disabled={isCreating}
              />
              <input
                type="text"
                className="w-full p-1 border-black border-1 rounded-[5px]"
                placeholder="Придумайте login для пользователя"
                value={newLogin}
                onChange={(e) => setNewLogin(e.target.value)}
                disabled={isCreating}
              />
              <input
                type="password"
                className="w-full p-1 border-black border-1 rounded-[5px]"
                placeholder="Придумайте пароль пользователя"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
        </div>
      </div>
    </Container>
  );
}